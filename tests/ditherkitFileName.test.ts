// tests/ditherkitFileName.test.ts
import { describe, expect, test } from "vitest";
import { ditherFileName } from "../src/lib/ditherkit/fileName";

describe("ditherFileName", () => {
  test.each([
    ["portrait.jpg", "floyd-steinberg", "portrait-floyd-steinberg.png"],
    ["Summer Trip 2026.PNG", "bayer-8", "summer-trip-2026-bayer-8.png"],
    ["café.webp", "halftone-dot", "café-halftone-dot.png"],
    ["no-extension", "atkinson", "no-extension-atkinson.png"],
    ["archive.tar.gz.png", "ign", "archive.tar.gz-ign.png"],
    [".png", "atkinson", "image-atkinson.png"],
    ["   ", "atkinson", "image-atkinson.png"],
    ["a/b\\c:d*e?.png", "beam-h", "a-b-c-d-e-beam-h.png"],
  ])("%j with %s -> %s", (name, pattern, expected) => {
    expect(ditherFileName(name, pattern)).toBe(expected);
  });
});
