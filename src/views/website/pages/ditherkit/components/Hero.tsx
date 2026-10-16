import { useCallback, useRef, useState, type ReactElement } from "react";

import {
  DITHERKIT_REPO_URL,
  WORDMARK_FONTS,
  WORDMARK_SOURCES,
} from "../content";
import { DitherWordmark } from "./DitherWordmark";
import { KnotScene, type KnotPattern } from "./KnotScene";

const PATTERNS: { id: KnotPattern; label: string; readout: string }[] = [
  { id: 0, label: "bayer", readout: "bayer 8×8" },
  { id: 1, label: "halftone", readout: "round-dot halftone" },
  { id: 2, label: "lines", readout: "line screen" },
];

const stageButton =
  "inline-flex h-10 items-center border px-4 font-dk-mono text-xs tracking-[0.08em] uppercase no-underline transition-colors";

/**
 * The opening artboard: the dithered 3D knot behind the "ditherkit by
 * andreihuyoa" title, an all-caps lead line, the two calls to action, and
 * chips that switch the knot's pattern.
 */
export const Hero = (): ReactElement => {
  const [pattern, setPattern] = useState<KnotPattern>(0);
  const titleRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const measure = useCallback(
    () => (titleRef.current?.getBoundingClientRect().width ?? 320) * 0.78,
    [],
  );
  const zone = useCallback(() => overlayRef.current, []);
  const readout =
    PATTERNS.find((item) => item.id === pattern)?.readout ?? "bayer 8×8";

  return (
    <section
      aria-labelledby="ditherkit-title"
      className="px-4 md:px-5"
      id="top"
    >
      <div className="font-dk-mono text-dk-muted flex justify-between gap-4 pt-4.5 pb-2.5 text-[11px] tracking-[0.12em] uppercase">
        <span>frame 01 · ditherkit</span>
        <span>torus knot · {readout}</span>
      </div>
      <div className="bg-dk-stage text-dk-stage-ink relative h-[min(78svh,760px)] min-h-140 overflow-hidden">
        <KnotScene pattern={pattern} />
        <div
          className="pointer-events-none absolute inset-0 flex flex-col justify-between p-[clamp(20px,4vw,44px)] *:pointer-events-auto max-md:py-6"
          ref={overlayRef}
        >
          <h1
            className="font-dk-title grid w-fit justify-items-start gap-[0.08em] text-[clamp(56px,10vw,150px)] leading-[0.9] font-bold italic"
            id="ditherkit-title"
          >
            <span className="flex items-baseline gap-[0.1em] tracking-tight">
              <span ref={titleRef}>ditherkit</span>
              <span className="font-dk-mono text-[max(11px,0.09em)] leading-none font-extrabold tracking-wide not-italic">
                BY
              </span>
            </span>
            <DitherWordmark
              className="-mt-[0.25em] block"
              fonts={WORDMARK_FONTS}
              label="andreihuyoa"
              sources={WORDMARK_SOURCES}
              width={measure}
              zone={zone}
            />
          </h1>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="grid max-w-[36rem] gap-4">
              {/* A halo in the stage color clears the dither right around the letters, without a visible box. */}
              <p className="m-0 text-[17px] leading-[1.35] font-medium tracking-[0.02em] uppercase [text-shadow:0_0_2px_var(--dk-stage),0_0_3px_var(--dk-stage),0_0_4px_var(--dk-stage),0_0_6px_var(--dk-stage),0_0_8px_var(--dk-stage),0_0_10px_var(--dk-stage)] max-md:text-[15px]">
                Turn any photo into ink. A free Photoshop plugin with thirty-one
                dithering and halftone patterns.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  className={`${stageButton} border-dk-stage-ink bg-dk-stage-ink text-dk-stage`}
                  href="#tool"
                >
                  try it live
                </a>
                <a
                  className={`${stageButton} border-dk-stage-ink bg-dk-stage text-dk-stage-ink`}
                  href={DITHERKIT_REPO_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  github
                </a>
              </div>
            </div>
            <div
              aria-label="Pattern on the 3D object"
              className="flex gap-1"
              role="group"
            >
              {PATTERNS.map((item) => (
                <button
                  aria-pressed={pattern === item.id}
                  className="border-dk-stage-ink bg-dk-stage text-dk-stage-ink aria-pressed:bg-dk-stage-ink aria-pressed:text-dk-stage font-dk-mono h-7 cursor-pointer border px-2.5 text-[11px] tracking-[0.08em] uppercase"
                  key={item.id}
                  onClick={() => setPattern(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
