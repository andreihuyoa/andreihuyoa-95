import { useEffect, useRef, useState, type ReactElement } from "react";

import {
  ALGORITHMS,
  algorithmInfo,
  FAMILIES,
} from "../../../../../../lib/ditherEngine";
import { paintPixels } from "../../../../../../lib/ditherkit/pixels";
import type { WorkerImage } from "../../../../../../lib/ditherkit/render.worker";

interface PatternListProps {
  /** Thumbnails rendered by the worker, keyed by algorithm id. */
  thumbnails: Record<string, WorkerImage>;
  selected: string;
  onSelect: (algorithm: string) => void;
}

/**
 * The 31 patterns in six collapsible families (diffusion, ordered, halftone,
 * mosaic, noise, modulation), each pattern with a thumbnail rendered from the
 * current image. The selected pattern's family starts open. Thumbnails are
 * rendered in the worker, so the list never blocks the page.
 */
export const PatternList = ({
  thumbnails,
  selected,
  onSelect,
}: PatternListProps): ReactElement => {
  const canvases = useRef(new Map<string, HTMLCanvasElement>());
  const [open, setOpen] = useState<Set<string>>(
    () => new Set([algorithmInfo(selected).family]),
  );

  useEffect(() => {
    for (const [algorithm, image] of Object.entries(thumbnails)) {
      const canvas = canvases.current.get(algorithm);
      if (canvas) {
        paintPixels(canvas, { ...image, components: 4 });
      }
    }
  }, [thumbnails]);

  return (
    <div className="divide-dk-line divide-y">
      {FAMILIES.map((family) => {
        const items = ALGORITHMS.filter((item) => item.family === family.id);
        const active = items.find((item) => item.id === selected);

        return (
          <details
            className="group"
            key={family.id}
            onToggle={(event) => {
              const isOpen = event.currentTarget.open;
              setOpen((current) => {
                const next = new Set(current);
                if (isOpen) {
                  next.add(family.id);
                } else {
                  next.delete(family.id);
                }
                return next;
              });
            }}
            open={open.has(family.id)}
          >
            <summary className="hover:bg-dk-panel-2 font-dk-mono flex cursor-pointer list-none items-center justify-between gap-3 px-4.5 py-2.5 text-[11px] tracking-[0.12em] uppercase [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="text-dk-muted inline-block transition-transform group-open:rotate-90"
                >
                  ›
                </span>
                {family.name}
              </span>
              <span className="text-dk-muted tracking-[0.04em] normal-case">
                {active ? active.name : items.length}
              </span>
            </summary>
            <ul className="m-0 list-none px-2 pb-2">
              {items.map((algorithm) => (
                <li key={algorithm.id}>
                  <button
                    aria-pressed={selected === algorithm.id}
                    className="hover:bg-dk-panel-2 aria-pressed:bg-dk-panel-2 flex w-full cursor-pointer items-center gap-2.5 rounded-xs border-0 bg-transparent px-2.5 py-1.5 text-left text-sm aria-pressed:shadow-[inset_2px_0_0_var(--dk-accent)]"
                    onClick={() => onSelect(algorithm.id)}
                    type="button"
                  >
                    <canvas
                      aria-hidden="true"
                      className="border-dk-line h-6 w-9 shrink-0 border object-cover [image-rendering:pixelated]"
                      ref={(node) => {
                        if (node) {
                          canvases.current.set(algorithm.id, node);
                        } else {
                          canvases.current.delete(algorithm.id);
                        }
                      }}
                    />
                    <span>{algorithm.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </details>
        );
      })}
    </div>
  );
};
