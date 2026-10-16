// tests/ditherkitPalette.test.ts
import { describe, expect, test } from "vitest";
import {
  MAX_PALETTE_COLORS,
  readPaletteFile,
} from "../src/lib/ditherkit/paletteFile";

const encoder = new TextEncoder();
const gpl = (lines: string[]): ArrayBuffer =>
  encoder.encode(["GIMP Palette", "Name: test", "#", ...lines].join("\n"))
    .buffer as ArrayBuffer;

describe("readPaletteFile", () => {
  test("reads a .gpl file", () => {
    expect(
      readPaletteFile("brand.gpl", gpl(["255 0 0 red", "0 0 255 blue"])),
    ).toEqual({
      colors: [
        [255, 0, 0],
        [0, 0, 255],
      ],
    });
  });

  test("rejects a palette with no colors", () => {
    expect(readPaletteFile("empty.gpl", gpl([]))).toEqual({
      error:
        "This palette file couldn't be read. Ditherkit reads .ase, .aco and .gpl files.",
    });
  });

  test("rejects a corrupt .ase file", () => {
    expect(
      readPaletteFile("broken.ase", new Uint8Array([1, 2, 3, 4]).buffer),
    ).toEqual({
      error:
        "This palette file couldn't be read. Ditherkit reads .ase, .aco and .gpl files.",
    });
  });

  test("rejects an unsupported extension", () => {
    expect(readPaletteFile("colors.json", gpl(["1 2 3"]))).toEqual({
      error:
        "This palette file couldn't be read. Ditherkit reads .ase, .aco and .gpl files.",
    });
  });

  test("accepts exactly the color cap and rejects one more", () => {
    const line = (i: number) => `${i % 256} 0 0`;
    const atCap = Array.from({ length: MAX_PALETTE_COLORS }, (_, i) => line(i));
    const result = readPaletteFile("big.gpl", gpl(atCap));
    expect("colors" in result && result.colors.length).toBe(MAX_PALETTE_COLORS);
    expect(readPaletteFile("bigger.gpl", gpl([...atCap, "1 1 1"]))).toEqual({
      error: `This palette has ${MAX_PALETTE_COLORS + 1} colors. Use one with ${MAX_PALETTE_COLORS} or fewer.`,
    });
  });
});
