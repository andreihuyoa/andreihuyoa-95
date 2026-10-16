// tests/ditherkitEditor.test.ts
import { describe, expect, test } from "vitest";
import {
  DEFAULT_EDITOR_SETTINGS,
  settingsSummary,
  toRenderOptions,
} from "../src/lib/ditherkit/editorSettings";
import { createLatestOnlyScheduler } from "../src/lib/ditherkit/latestOnly";

describe("toRenderOptions", () => {
  test("mono uses two colors between dark and light", () => {
    const o = toRenderOptions({
      ...DEFAULT_EDITOR_SETTINGS,
      colorMode: "mono",
      dark: "#14171b",
      light: "#f4f5f7",
    });
    expect(o.mode).toBe("mono");
    expect(o.dark).toEqual([20, 23, 27]);
    expect(o.light).toEqual([244, 245, 247]);
  });

  test("tone ramp keeps its step count, palette becomes indexed", () => {
    expect(
      toRenderOptions({
        ...DEFAULT_EDITOR_SETTINGS,
        colorMode: "tone",
        steps: 5,
      }),
    ).toMatchObject({ mode: "tone", steps: 5 });
    const palette: [number, number, number][] = [
      [0, 0, 0],
      [255, 0, 0],
    ];
    expect(
      toRenderOptions({
        ...DEFAULT_EDITOR_SETTINGS,
        colorMode: "palette",
        palette,
      }),
    ).toMatchObject({ mode: "indexed", palette });
  });

  test("levels, invert, scale and pattern geometry pass through", () => {
    const o = toRenderOptions({
      ...DEFAULT_EDITOR_SETTINGS,
      algorithm: "halftone-dot",
      inBlack: 12,
      gamma: 1.4,
      inWhite: 230,
      invert: true,
      pixelSize: 3,
      cell: 10,
      angle: 30,
    });
    expect(o).toMatchObject({
      algorithm: "halftone-dot",
      invert: true,
      pixelSize: 3,
      cell: 10,
      angle: 30,
      levels: {
        inBlack: 12,
        gamma: 1.4,
        inWhite: 230,
        outBlack: 0,
        outWhite: 255,
      },
    });
  });

  test("an invalid hex color falls back instead of producing NaN", () => {
    const o = toRenderOptions({ ...DEFAULT_EDITOR_SETTINGS, dark: "nope" });
    expect(o.dark).toEqual([0, 0, 0]);
  });
});

describe("settingsSummary", () => {
  test.each([
    [{ colorMode: "mono", pixelSize: 2 }, "mono · 2 px"],
    [
      { colorMode: "tone", steps: 4, pixelSize: 1 },
      "tone ramp, 4 steps · 1 px",
    ],
    [{ colorMode: "palette", pixelSize: 3 }, "palette, 4 colors · 3 px"],
  ] as const)("%j", (partial, expected) => {
    expect(settingsSummary({ ...DEFAULT_EDITOR_SETTINGS, ...partial })).toBe(
      expected,
    );
  });
});

describe("createLatestOnlyScheduler", () => {
  test("runs immediately when idle and keeps only the newest job while busy", () => {
    const sent: number[] = [];
    const scheduler = createLatestOnlyScheduler<number>((job) =>
      sent.push(job),
    );

    scheduler.request(1);
    scheduler.request(2);
    scheduler.request(3);
    expect(sent).toEqual([1]);

    scheduler.done();
    expect(sent).toEqual([1, 3]);

    scheduler.done();
    expect(scheduler.busy()).toBe(false);
    scheduler.request(4);
    expect(sent).toEqual([1, 3, 4]);
  });
});
