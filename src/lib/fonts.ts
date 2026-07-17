import googleFonts from "google-fonts";

export type FontWeights = number | number[];

/** Add families here; pass a subset to `loadFonts` when a view mounts. */
export const fontRegistry = {
  "Instrument Sans": [400, 600, 700],
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

/** Website mode: local Departure Mono + remotely loaded Instrument Sans. */
export const loadWebsiteFonts = (): void => {
  loadFonts({
    "Instrument Sans": fontRegistry["Instrument Sans"],
  });
};
