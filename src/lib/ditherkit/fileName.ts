/**
 * Names a dithered download after the original file and the pattern used,
 * e.g. `portrait.jpg` + `floyd-steinberg` → `portrait-floyd-steinberg.png`.
 * Characters that are unsafe in file names become hyphens.
 */
export const ditherFileName = (
  originalName: string,
  pattern: string,
): string => {
  const name = originalName.trim();
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : dot === 0 ? "" : name;
  const safe = base
    .toLowerCase()
    .replace(/[\s/\\:*?"<>|]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${safe || "image"}-${pattern}.png`;
};
