import { parsePaletteFile, type RGB } from "../ditherEngine";

/** Most colors an imported palette may have, matching the Photoshop plugin. */
export const MAX_PALETTE_COLORS = 256;

const UNREADABLE =
  "This palette file couldn't be read. Ditherkit reads .ase, .aco and .gpl files.";

/**
 * Reads an imported .ase, .aco or .gpl palette into RGB colors, or returns
 * the message to show when the file can't be used.
 */
export const readPaletteFile = (
  name: string,
  data: ArrayBuffer,
): { colors: RGB[] } | { error: string } => {
  let colors: RGB[];

  try {
    colors = parsePaletteFile(name, data);
  } catch {
    return { error: UNREADABLE };
  }

  if (colors.length === 0) {
    return { error: UNREADABLE };
  }

  if (colors.length > MAX_PALETTE_COLORS) {
    return {
      error: `This palette has ${colors.length} colors. Use one with ${MAX_PALETTE_COLORS} or fewer.`,
    };
  }

  return { colors };
};
