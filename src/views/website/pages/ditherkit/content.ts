import type { WordmarkSource } from "./components/wordmarkRenderer";

export const DITHERKIT_REPO_URL =
  "https://github.com/andreihuyoa/rea-photoshop-plugins";
export const DITHERKIT_RELEASE_URL = `${DITHERKIT_REPO_URL}/releases/latest`;

/** Google Fonts used only on the Ditherkit page (Junicode is self-hosted). */
export const DITHERKIT_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500&family=Pinyon+Script&family=Silkscreen&family=UnifrakturMaguntia&family=Unbounded:wght@800&display=swap";

const WORD = "andreihuyoa";

/** The styles the andreihuyoa wordmark cycles through, in order. */
export const WORDMARK_SOURCES: WordmarkSource[] = [
  { type: "text", text: WORD, family: '"DM Serif Display", Georgia, serif' },
  { type: "image", src: "/assets/WebsiteMode/andreihuyoa dot.svg" },
  { type: "text", text: WORD, family: '"UnifrakturMaguntia", serif' },
  { type: "text", text: WORD, family: '"Silkscreen", monospace', fit: 0.96 },
  {
    type: "text",
    text: WORD,
    family: '"Junicode", Georgia, serif',
    style: "italic",
    weight: 700,
  },
  {
    type: "text",
    text: WORD,
    family: '"Unbounded", sans-serif',
    weight: 800,
    fit: 0.94,
  },
  { type: "text", text: WORD, family: '"Pinyon Script", cursive' },
  {
    type: "text",
    text: WORD,
    family: '"IBM Plex Mono", monospace',
    weight: 500,
    fit: 0.96,
  },
];

/** Faces to load before the wordmark rasterizes its sources. */
export const WORDMARK_FONTS = [
  '400 100px "DM Serif Display"',
  '400 100px "UnifrakturMaguntia"',
  '400 100px "Silkscreen"',
  'italic 700 100px "Junicode"',
  '800 100px "Unbounded"',
  '400 100px "Pinyon Script"',
  '500 100px "IBM Plex Mono"',
];

export const HOW_IT_WORKS = [
  {
    label: "load an image",
    title: "start with ours, or bring yours",
    body: "The tool opens with a sample loaded. Drop in your own PNG, JPG or WebP, up to 5 MB and 2,048 px on the longest side.",
  },
  {
    label: "pick a pattern",
    title: "thirty-one of them",
    body: "Error diffusion, ordered, halftone, mosaic, noise and scan-line modulation. Every thumbnail is rendered from your own image.",
  },
  {
    label: "tune it",
    title: "turn the knobs",
    body: "Levels over the histogram, pixel scale, and palettes you pull from the image or import from .ase, .aco and .gpl files.",
  },
  {
    label: "export",
    title: "keep it, or take it to Photoshop",
    body: "Save a PNG from the page. In Photoshop, Ditherkit writes the result into your document as a single undo step.",
  },
] as const;
