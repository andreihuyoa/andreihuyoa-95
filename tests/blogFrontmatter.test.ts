// tests/blogFrontmatter.test.ts
import { describe, expect, test } from "vitest";
import parseBlogSource from "../src/lib/blogFrontmatter";

const FILE = "test-post.mdx";

const validSource = `---
title: "Hello: World"
slug: "hello-world"
date: "2026-09-24"
tags:
  - "Attention"
  - Memory
references:
  - title: "First source"
    url: "https://example.com/one"
  - title: 'It''s the second'
    url: https://example.com/two
---

Body text here.
`;

describe("parseBlogSource", () => {
  test("parses fields, tags, references, and body", () => {
    const { data, content } = parseBlogSource(validSource, FILE);

    expect(data).toEqual({
      title: "Hello: World",
      slug: "hello-world",
      date: "2026-09-24",
      tags: ["Attention", "Memory"],
      references: [
        { title: "First source", url: "https://example.com/one" },
        { title: "It's the second", url: "https://example.com/two" },
      ],
    });
    expect(content.trim()).toBe("Body text here.");
  });

  test("accepts Windows line endings", () => {
    const { data } = parseBlogSource(validSource.replace(/\n/g, "\r\n"), FILE);
    expect(data.title).toBe("Hello: World");
  });

  test("throws when frontmatter is missing", () => {
    expect(() => parseBlogSource("# Just markdown", FILE)).toThrow(
      "test-post.mdx: valid YAML frontmatter is required.",
    );
  });

  test("throws on a tag with the wrong indentation", () => {
    const source = `---\ntags:\n    - "Too deep"\n---\nBody`;
    expect(() => parseBlogSource(source, FILE)).toThrow(
      /unsupported frontmatter line/,
    );
  });

  test("throws when a reference url has no title above it", () => {
    const source = `---\nreferences:\n    url: "https://example.com"\n---\nBody`;
    expect(() => parseBlogSource(source, FILE)).toThrow(
      /unsupported frontmatter line/,
    );
  });

  test("throws on an unterminated quoted string", () => {
    const source = `---\ntitle: "unterminated\n---\nBody`;
    expect(() => parseBlogSource(source, FILE)).toThrow(
      "frontmatter contains an invalid string",
    );
  });
});
