import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, type ReactElement } from "react";

import { useThemeChange } from "./useThemeChange";
import {
  createWordmarkRenderer,
  type WordmarkRenderer,
  type WordmarkSource,
} from "./wordmarkRenderer";

interface DitherWordmarkProps {
  /** The word, read by screen readers; the canvas is hidden from them. */
  label: string;
  sources: WordmarkSource[];
  /** Font faces to load before rasterizing, e.g. `400 100px "Silkscreen"`. */
  fonts: string[];
  /** CSS width the mark should fill. */
  width: () => number;
  /** Element that tracks the cursor for the hover effects. */
  zone: () => HTMLElement | null;
  className?: string;
}

/**
 * The andreihuyoa wordmark: the same word cycling through several fonts and
 * styles as pixel particles, with write, particle, halftone and liquid
 * transitions. Renders nothing on the server; the label is always present.
 */
export const DitherWordmark = ({
  label,
  sources,
  fonts,
  width,
  zone,
  className,
}: DitherWordmarkProps): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<WordmarkRenderer | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const canvas = canvasRef.current;
    const area = zone();
    if (!canvas || !area) {
      return;
    }

    let cancelled = false;
    const renderer = createWordmarkRenderer(canvas, {
      sources,
      cell: window.innerWidth < 600 ? 1 : 2,
      width,
      zone: area,
      inkVariable: "--dk-stage-ink",
      reduceMotion,
    });
    rendererRef.current = renderer;

    void Promise.all(fonts.map((font) => document.fonts.load(font)))
      .catch(() => [])
      .then(() => {
        if (!cancelled) {
          void renderer.start();
        }
      });

    return () => {
      cancelled = true;
      renderer.stop();
      rendererRef.current = null;
    };
  }, [fonts, reduceMotion, sources, width, zone]);

  useThemeChange(
    useCallback(() => {
      rendererRef.current?.redraw();
    }, []),
  );

  return (
    <span className={className}>
      <span className="sr-only">{label}</span>
      <canvas
        aria-hidden="true"
        className="block max-w-full [image-rendering:pixelated]"
        ref={canvasRef}
      />
    </span>
  );
};
