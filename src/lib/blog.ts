import type { MDXComponents } from "mdx/types";
import type { ComponentType } from "react";
import matter from "gray-matter";

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
  closingImage: string;
  tags: string[];
  references: BlogReference[];
}

interface BlogMdxModule {
  default: ComponentType<{ components?: MDXComponents }>;
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
  slug: string,
  filePath: string,
): string => {
  const imagePath = requireString(value, field, filePath);

  if (!imagePath.startsWith(`/blog/${slug}/`) || !imagePath.endsWith(".webp")) {
    throw new Error(
      `${filePath}: frontmatter.${field} must be a WebP path inside /public/blog/${slug}/.`,
    );
  }

  return imagePath;
};

const parsePost = (filePath: string, source: string): BlogPost => {
  const parsed = matter(source);
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

  const coverImage = validateImagePath(
    data.coverImage,
    "coverImage",
    slug,
    filePath,
  );
  const closingImage = validateImagePath(
    data.closingImage,
    "closingImage",
    slug,
    filePath,
  );

  if (coverImage === closingImage) {
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
