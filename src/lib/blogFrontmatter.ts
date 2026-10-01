interface ParsedBlogSource {
  content: string;
  data: Record<string, unknown>;
}

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

export default parseBlogSource;
