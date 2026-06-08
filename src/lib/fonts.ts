import googleFonts from "google-fonts";

export type FontWeights = number | number[];

/** Add families here; pass a subset to `loadFonts` when a view mounts. */
export const fontRegistry = {
  Inter: [400, 500, 600, 700, 800],
  "Instrument Serif": [400, 600, 700],
} as const satisfies Record<string, FontWeights>;

export type FontRegistryKey = keyof typeof fontRegistry;

const loadedKeys = new Set<string>();

const registryKey = (fonts: Record<string, FontWeights>): string =>
  JSON.stringify(fonts);

/** Injects a Google Fonts stylesheet once per unique font set. */
export const loadFonts = (fonts: Record<string, FontWeights>): void => {
  const key = registryKey(fonts);
  if (loadedKeys.has(key)) return;

  loadedKeys.add(key);
  googleFonts.add(fonts);
};

/** Website mode: Inter (body) + Instrument Serif (headings). */
export const loadWebsiteFonts = (): void => {
  loadFonts({
    Inter: fontRegistry.Inter,
    "Instrument Serif": fontRegistry["Instrument Serif"],
  });
};
