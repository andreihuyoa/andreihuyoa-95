import type { MDXComponents } from "mdx/types";
import type { ComponentType } from "react";

export interface BlogReference {
  title: string;
  url: string;
}

export interface BlogFrontmatter {
  title: string;
  slug: string;
  date: string;
  description: string;
  coverImage: string;
  coverImageAlt: string;
  closingImage?: string;
  tags: string[];
  references: BlogReference[];
}

interface BlogMdxModule {
  default: ComponentType<{ components?: MDXComponents }>;
}

interface ParsedBlogSource {
  content: string;
  data: Record<string, unknown>;
}

export interface BlogPost extends BlogFrontmatter {
  Content: BlogMdxModule["default"];
}

const rawPostFiles = import.meta.glob<string>("../content/blog/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
});

const postModules = import.meta.glob<BlogMdxModule>("../content/blog/*.mdx", {
  eager: true,
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseFrontmatterString = (rawValue: string, filePath: string): string => {
  const value = rawValue.trim();

  if (value.startsWith('"')) {
    try {
      const parsed: unknown = JSON.parse(value);

      if (typeof parsed === "string") {
        return parsed;
      }
    } catch {
      throw new Error(`${filePath}: frontmatter contains an invalid string.`);
    }
  }

  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replace(/''/g, "'");
  }

  return value;
};

/** Parses the deliberately small YAML subset used by blog frontmatter. */
const parseBlogSource = (
  source: string,
  filePath: string,
): ParsedBlogSource => {
  const normalized = source.replace(/\r\n?/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/u.exec(normalized);

  if (!match) {
    throw new Error(`${filePath}: valid YAML frontmatter is required.`);
  }

  const [, frontmatter = "", content = ""] = match;
  const data: Record<string, unknown> = {};
  const tags: string[] = [];
  const references: Array<Record<string, string>> = [];
  let section: "references" | "tags" | undefined;
  let currentReference: Record<string, string> | undefined;

  frontmatter.split("\n").forEach((line) => {
    if (!line.trim()) {
      return;
    }

    const fieldMatch = /^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/u.exec(line);

    if (fieldMatch) {
      const [, field = "", rawValue = ""] = fieldMatch;

      if (!rawValue && (field === "tags" || field === "references")) {
        section = field;
        data[field] = field === "tags" ? tags : references;
        currentReference = undefined;
        return;
      }

      section = undefined;
      currentReference = undefined;
      data[field] = parseFrontmatterString(rawValue, filePath);
      return;
    }

    if (section === "tags") {
      const tagMatch = /^\s{2}-\s+(.+)$/u.exec(line);

      if (tagMatch?.[1]) {
        tags.push(parseFrontmatterString(tagMatch[1], filePath));
        return;
      }
    }

    if (section === "references") {
      const titleMatch = /^\s{2}-\s+title:\s+(.+)$/u.exec(line);
      const urlMatch = /^\s{4}url:\s+(.+)$/u.exec(line);

      if (titleMatch?.[1]) {
        currentReference = {
          title: parseFrontmatterString(titleMatch[1], filePath),
        };
        references.push(currentReference);
        return;
      }

      if (urlMatch?.[1] && currentReference) {
        currentReference.url = parseFrontmatterString(urlMatch[1], filePath);
        return;
      }
    }

    throw new Error(`${filePath}: unsupported frontmatter line: ${line}`);
  });

  return { content, data };
};

const requireString = (
  value: unknown,
  field: keyof BlogFrontmatter,
  filePath: string,
): string => {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${filePath}: frontmatter.${field} must be a string.`);
  }

  return value.trim();
};

const requireStringArray = (
  value: unknown,
  field: "tags",
  filePath: string,
): string[] => {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((item) => typeof item !== "string" || !item.trim())
  ) {
    throw new Error(
      `${filePath}: frontmatter.${field} must contain at least one string.`,
    );
  }

  return value.map((item) => item.trim());
};

const requireReferences = (
  value: unknown,
  filePath: string,
): BlogReference[] => {
  if (!Array.isArray(value) || value.length < 2 || value.length > 4) {
    throw new Error(
      `${filePath}: frontmatter.references must contain 2 to 4 sources.`,
    );
  }

  return value.map((reference, index) => {
    if (!isRecord(reference)) {
      throw new Error(
        `${filePath}: references[${index}] must contain title and url.`,
      );
    }

    const title = requireString(reference.title, "references", filePath);
    const url = requireString(reference.url, "references", filePath);
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
      throw new Error(
        `${filePath}: references[${index}].url must be an HTTP URL.`,
      );
    }

    return { title, url };
  });
};

const normalizeDate = (value: unknown, filePath: string): string => {
  const normalized =
    value instanceof Date
      ? value.toISOString().slice(0, 10)
      : requireString(value, "date", filePath);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    throw new Error(
      `${filePath}: frontmatter.date must use the YYYY-MM-DD format.`,
    );
  }

  return normalized;
};

const validateImagePath = (
  value: unknown,
  field: "coverImage" | "closingImage",
  filePath: string,
): string => {
  const imagePath = requireString(value, field, filePath);

  if (
    !imagePath.startsWith("/blog/") ||
    !/\.(?:avif|jpe?g|png|webp)$/i.test(imagePath)
  ) {
    throw new Error(
      `${filePath}: frontmatter.${field} must be a supported image path inside /public/blog/.`,
    );
  }

  return imagePath;
};

const parsePost = (filePath: string, source: string): BlogPost => {
  const parsed = parseBlogSource(source, filePath);
  const data: unknown = parsed.data;
  const module = postModules[filePath];

  if (!isRecord(data) || !module) {
    throw new Error(`${filePath}: the MDX post could not be loaded.`);
  }

  if (!parsed.content.trim()) {
    throw new Error(`${filePath}: the MDX body cannot be empty.`);
  }

  const slug = requireString(data.slug, "slug", filePath);
  const fileSlug = filePath
    .split("/")
    .pop()
    ?.replace(/\.mdx$/, "");

  if (slug !== fileSlug) {
    throw new Error(
      `${filePath}: frontmatter.slug must match the MDX filename.`,
    );
  }

  const title = requireString(data.title, "title", filePath);
  const description = requireString(data.description, "description", filePath);

  if (title.length > 60) {
    throw new Error(`${filePath}: title must be 60 characters or fewer.`);
  }

  if (description.length > 155) {
    throw new Error(
      `${filePath}: description must be 155 characters or fewer.`,
    );
  }

  const coverImage = validateImagePath(data.coverImage, "coverImage", filePath);
  const coverImageAlt = requireString(
    data.coverImageAlt,
    "coverImageAlt",
    filePath,
  );
  const closingImage = data.closingImage
    ? validateImagePath(data.closingImage, "closingImage", filePath)
    : undefined;

  if (closingImage && coverImage === closingImage) {
    throw new Error(
      `${filePath}: coverImage and closingImage must be different images.`,
    );
  }

  return {
    title,
    slug,
    date: normalizeDate(data.date, filePath),
    description,
    coverImage,
    coverImageAlt,
    closingImage,
    tags: requireStringArray(data.tags, "tags", filePath),
    references: requireReferences(data.references, filePath),
    Content: module.default,
  };
};

const posts = Object.entries(rawPostFiles)
  .map(([filePath, source]) => parsePost(filePath, source))
  .sort((left, right) => right.date.localeCompare(left.date));

const duplicateSlugs = posts.filter(
  (post, index) => posts.findIndex(({ slug }) => slug === post.slug) !== index,
);

if (duplicateSlugs.length) {
  throw new Error(
    `Duplicate blog slug: ${duplicateSlugs[0]?.slug ?? "unknown"}`,
  );
}

/** Returns published posts in reverse chronological order. */
export const getAllPosts = (): BlogPost[] => [...posts];

/** Returns the post whose frontmatter slug matches the route slug. */
export const getPostBySlug = (slug: string): BlogPost | undefined =>
  posts.find((post) => post.slug === slug);

/** Formats an ISO post date without shifting it across time zones. */
export const formatBlogDate = (date: string): string =>
  new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
