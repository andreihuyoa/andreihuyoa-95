import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const styles = readFileSync(
  new URL("../src/index.css", import.meta.url),
  "utf8",
);
const fonts = [
  ...styles.matchAll(/url\("(\/assets\/fonts\/[^"]+)"\) format\("([^"]+)"\)/g),
];

describe("local font assets", () => {
  it.each(fonts)(
    "serves %s in a supported font format",
    (_match, path, format) => {
      expect(["opentype", "truetype", "woff", "woff2"]).toContain(format);
      const asset = fileURLToPath(new URL(`../public${path}`, import.meta.url));
      expect(existsSync(asset), `Missing font: ${path}`).toBe(true);
    },
  );
});
