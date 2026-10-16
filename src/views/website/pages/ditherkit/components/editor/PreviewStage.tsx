import {
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactElement,
} from "react";

import type { Pixels } from "../../../../../../lib/ditherEngine";
import { paintPixels } from "../../../../../../lib/ditherkit/pixels";

interface PreviewStageProps {
  source: Pixels | null;
  result: Pixels | null;
  busy: boolean;
  onDropFile: (file: File) => void;
}

/**
 * The canvas: the dithered result with the original revealed left of a
 * draggable split line. Shows a pulsing dot while a render is in flight, and
 * accepts an image dropped onto it.
 */
export const PreviewStage = ({
  source,
  result,
  busy,
  onDropFile,
}: PreviewStageProps): ReactElement => {
  const outRef = useRef<HTMLCanvasElement>(null);
  const origRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [dropping, setDropping] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });

  // Fit the image inside the stage at any size, never larger than 1:1.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        // contentRect excludes the stage's padding.
        setBox({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (source && origRef.current) {
      paintPixels(origRef.current, source);
    }
  }, [source]);

  useEffect(() => {
    if (result && outRef.current) {
      paintPixels(outRef.current, result);
    }
  }, [result]);

  const moveTo = (clientX: number): void => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (rect && rect.width) {
      setSplit(
        Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)),
      );
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      setSplit((value) =>
        Math.min(
          100,
          Math.max(0, value + (event.key === "ArrowLeft" ? -5 : 5)),
        ),
      );
    }
  };

  const onDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setDropping(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      onDropFile(file);
    }
  };

  const width = source?.width ?? 960;
  const height = source?.height ?? 640;
  const fitWidth = Math.max(
    120,
    Math.min(
      width,
      box.width || width,
      box.height ? box.height * (width / height) : width,
    ),
  );

  return (
    <div
      className={`relative grid min-h-0 flex-1 place-items-center p-[clamp(16px,3vw,40px)] outline-offset-[-8px] max-[1080px]:min-h-96 ${dropping ? "outline-dk-accent outline-2 outline-dashed" : ""}`}
      onDragLeave={() => setDropping(false)}
      onDragOver={(event) => {
        event.preventDefault();
        setDropping(true);
      }}
      onDrop={onDrop}
      ref={stageRef}
    >
      <div
        className="relative max-w-full touch-none leading-none select-none"
        onPointerDown={(event: PointerEvent<HTMLDivElement>) => {
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
          moveTo(event.clientX);
        }}
        onPointerMove={(event) => {
          if (dragging) {
            moveTo(event.clientX);
          }
        }}
        onPointerUp={() => setDragging(false)}
        ref={frameRef}
        style={{ aspectRatio: `${width} / ${height}`, width: `${fitWidth}px` }}
      >
        <canvas
          aria-label="Dithered preview"
          className="block h-full w-full [image-rendering:pixelated]"
          ref={outRef}
          role="img"
        />
        <canvas
          aria-hidden="true"
          className="absolute inset-0 block h-full w-full"
          ref={origRef}
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        />
        <span className="bg-dk-ground text-dk-ink-2 font-dk-mono absolute top-2 left-2 px-1.5 py-0.5 text-[10px] tracking-[0.12em] uppercase">
          original
        </span>
        <span className="bg-dk-ground text-dk-ink-2 font-dk-mono absolute top-2 right-2 px-1.5 py-0.5 text-[10px] tracking-[0.12em] uppercase">
          dithered
        </span>
        <div
          aria-label="Compare original and dithered"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={Math.round(split)}
          className="bg-dk-accent after:bg-dk-accent absolute top-0 bottom-0 -ml-px w-0.5 cursor-ew-resize after:absolute after:top-1/2 after:-left-1.75 after:-mt-2 after:size-4 after:rounded-full after:shadow-[0_0_0_3px_var(--dk-ground)] after:content-['']"
          onKeyDown={onKeyDown}
          role="slider"
          style={{ left: `${split}%` }}
          tabIndex={0}
        />
        {busy ? (
          <span
            aria-hidden="true"
            className="bg-dk-accent absolute right-2 bottom-2 size-2 animate-pulse rounded-full"
          />
        ) : null}
      </div>
    </div>
  );
};
