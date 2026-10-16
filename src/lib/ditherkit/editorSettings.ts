import {
  PALETTES,
  parseHex,
  type RenderOptions,
  type RGB,
} from "../ditherEngine";

export type EditorColorMode = "mono" | "tone" | "palette";

/** Everything the Ditherkit page's editor lets a visitor change. */
export interface EditorSettings {
  algorithm: string;
  colorMode: EditorColorMode;
  /** Hex colors for mono and the tone ramp. */
  dark: string;
  light: string;
  /** Steps between dark and light in tone-ramp mode. */
  steps: number;
  palette: RGB[];
  inBlack: number;
  gamma: number;
  inWhite: number;
  invert: boolean;
  pixelSize: number;
  /** Cell size for halftone, mosaic and modulation patterns. */
  cell: number;
  /** Screen angle in degrees for halftone patterns. */
  angle: number;
}

const BLUEPRINT = PALETTES.find((palette) => palette.id === "blueprint");

export const DEFAULT_EDITOR_SETTINGS: EditorSettings = {
  algorithm: "floyd-steinberg",
  colorMode: "mono",
  dark: "#14171b",
  light: "#f4f5f7",
  steps: 4,
  palette: BLUEPRINT
    ? BLUEPRINT.colors
    : [
        [0, 0, 0],
        [255, 255, 255],
      ],
  inBlack: 0,
  gamma: 1,
  inWhite: 255,
  invert: false,
  pixelSize: 2,
  cell: 8,
  angle: 45,
};

/** Maps the editor's settings onto the dither engine's render options. */
export const toRenderOptions = (
  settings: EditorSettings,
): Partial<RenderOptions> => ({
  algorithm: settings.algorithm,
  mode:
    settings.colorMode === "palette"
      ? "indexed"
      : settings.colorMode === "tone"
        ? "tone"
        : "mono",
  dark: parseHex(settings.dark) ?? [0, 0, 0],
  light: parseHex(settings.light) ?? [255, 255, 255],
  steps: settings.steps,
  palette: settings.palette,
  levels: {
    inBlack: settings.inBlack,
    inWhite: settings.inWhite,
    gamma: settings.gamma,
    outBlack: 0,
    outWhite: 255,
  },
  invert: settings.invert,
  pixelSize: settings.pixelSize,
  cell: settings.cell,
  angle: settings.angle,
});

/** One-line summary for the settings pane header, e.g. "mono · 2 px". */
export const settingsSummary = (settings: EditorSettings): string => {
  const color =
    settings.colorMode === "tone"
      ? `tone ramp, ${settings.steps} steps`
      : settings.colorMode === "palette"
        ? `palette, ${settings.palette.length} colors`
        : "mono";

  return `${color} · ${settings.pixelSize} px`;
};
