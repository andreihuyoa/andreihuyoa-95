import { useCallback, useEffect, useRef, type ReactElement } from "react";

import { downscale } from "../../../../../lib/ditherEngine";
import {
  canvasToPixels,
  paintThumbnail,
} from "../../../../../lib/ditherkit/pixels";
import { paintSampleImage } from "../../../../../lib/ditherkit/sampleImage";
import { HOW_IT_WORKS } from "../content";
import { useThemeChange } from "./useThemeChange";

const MINI_PATTERNS = [
  "floyd-steinberg",
  "atkinson",
  "bayer-8",
  "halftone-dot",
  "halftone-line",
  "mosaic-round",
];

/** Six small pattern swatches rendered from the built-in sample. */
const MiniPatterns = (): ReactElement => {
  const refs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    const first = refs.current[0];
    if (!first) {
      return;
    }
    // Painted only once the swatches scroll near the screen, so first load stays light.
    const paint = (): void => {
      const canvas = document.createElement("canvas");
      paintSampleImage(canvas);
      const pixels = canvasToPixels(canvas);
      if (!pixels) {
        return;
      }
      const small = downscale(pixels, 168);
      MINI_PATTERNS.forEach((algorithm, index) => {
        const target = refs.current[index];
        if (target) {
          paintThumbnail(
            target,
            small,
            { algorithm, mode: "mono", cell: 6 },
            56,
          );
        }
      });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect();
          paint();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(first);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-[repeat(3,56px)] gap-1.5">
      {MINI_PATTERNS.map((algorithm, index) => (
        <canvas
          aria-hidden="true"
          className={`border-dk-line size-14 border object-cover [image-rendering:pixelated] ${index === 2 ? "outline-dk-accent outline-2 outline-offset-1" : ""}`}
          key={algorithm}
          ref={(node) => {
            refs.current[index] = node;
          }}
        />
      ))}
    </div>
  );
};

/** A levels histogram with five handles, drawn in the theme's colors. */
const MiniLevels = (): ReactElement => {
  const ref = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }
    const styles = getComputedStyle(canvas);
    const color = (name: string): string =>
      styles.getPropertyValue(name).trim();
    const { width, height } = canvas;
    context.clearRect(0, 0, width, height);
    context.fillStyle = color("--dk-muted");
    for (let i = 0; i < 48; i += 1) {
      const value =
        Math.exp(-(((i - 16) / 7) ** 2)) * 0.8 +
        Math.exp(-(((i - 34) / 5) ** 2)) * 0.6 +
        0.08;
      context.fillRect(
        i * (width / 48),
        height - 22 - value * (height - 34),
        width / 48 - 1,
        value * (height - 34),
      );
    }
    context.fillStyle = color("--dk-line");
    context.fillRect(0, height - 12, width, 2);
    [0.04, 0.28, 0.5, 0.72, 0.96].forEach((position, index) => {
      context.beginPath();
      context.arc(position * width, height - 11, 5, 0, Math.PI * 2);
      context.fillStyle = color(index === 2 ? "--dk-accent" : "--dk-ink");
      context.fill();
    });
  }, []);

  useEffect(draw, [draw]);
  useThemeChange(draw);

  return (
    <canvas
      aria-hidden="true"
      className="w-4/5"
      height={90}
      ref={ref}
      width={240}
    />
  );
};

const ART = [
  <div
    className="border-dk-muted font-dk-mono text-dk-muted grid h-30 w-[70%] place-items-center border border-dashed text-center text-[11px] tracking-[0.12em]"
    key="drop"
  >
    DROP
    <br />
    YOUR
    <br />
    IMAGE
  </div>,
  <MiniPatterns key="patterns" />,
  <MiniLevels key="levels" />,
  <div
    className="bg-dk-accent text-dk-on-accent grid h-11 w-4/5 place-items-center text-sm"
    key="export"
  >
    download dither.png
  </div>,
];

/** Four numbered columns divided by hairlines, doppio style. */
export const HowItWorks = (): ReactElement => (
  <section aria-labelledby="how-title" className="px-4 pt-10 md:px-5" id="how">
    <div className="border-dk-line flex h-11 items-center justify-between border-b">
      <h2
        className="font-dk-mono text-dk-muted m-0 text-[11px] font-normal tracking-[0.12em] uppercase"
        id="how-title"
      >
        how it works
      </h2>
      <span className="font-dk-mono text-dk-muted text-[11px] tracking-[0.12em] uppercase">
        four steps
      </span>
    </div>
    <ol className="border-dk-line divide-dk-line m-0 grid list-none grid-cols-4 divide-x border-b p-0 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1 max-[560px]:divide-x-0 max-[560px]:divide-y">
      {HOW_IT_WORKS.map((step, index) => (
        <li
          className="max-[900px]:nth-[-n+2]:border-dk-line flex min-w-0 flex-col max-[900px]:nth-[-n+2]:border-b max-[560px]:border-b-0!"
          key={step.label}
        >
          <div className="border-dk-line flex items-center gap-3 border-b px-5 py-3.5">
            <span className="bg-dk-panel-2 text-dk-ink-2 font-dk-mono grid size-5.5 place-items-center rounded-full text-[11px]">
              {index + 1}
            </span>
            <span className="font-dk-mono text-dk-ink-2 text-[11px] tracking-[0.12em] uppercase">
              {step.label}
            </span>
          </div>
          <div className="grid gap-3 px-5 pt-6 pb-5">
            <h3 className="m-0 text-[22px] leading-[1.3] font-normal tracking-[-0.01em]">
              {step.title}
            </h3>
            <p className="text-dk-ink-2 m-0 max-w-[36ch]">{step.body}</p>
          </div>
          <div className="mt-auto grid h-42.5 place-items-center p-4">
            {ART[index]}
          </div>
        </li>
      ))}
    </ol>
  </section>
);
