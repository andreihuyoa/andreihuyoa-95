import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from "react";

import {
  ALGORITHMS,
  algorithmInfo,
  autoPalette,
  type Pixels,
} from "../../../../../../lib/ditherEngine";
import {
  DEFAULT_EDITOR_SETTINGS,
  settingsSummary,
  toRenderOptions,
  type EditorSettings,
} from "../../../../../../lib/ditherkit/editorSettings";
import { ditherFileName } from "../../../../../../lib/ditherkit/fileName";
import { createLatestOnlyScheduler } from "../../../../../../lib/ditherkit/latestOnly";
import { readPaletteFile } from "../../../../../../lib/ditherkit/paletteFile";
import {
  canvasToPixels,
  paintPixels,
} from "../../../../../../lib/ditherkit/pixels";
import type {
  RenderRequest,
  WorkerImage,
  WorkerRequest,
  WorkerResponse,
} from "../../../../../../lib/ditherkit/render.worker";
import {
  paintSampleImage,
  SAMPLE_NAME,
} from "../../../../../../lib/ditherkit/sampleImage";
import {
  ACCEPTED_IMAGE_TYPES,
  checkImageDimensions,
  checkImageFile,
  UNREADABLE_IMAGE_MESSAGE,
} from "../../../../../../lib/ditherkit/uploadLimits";
import { PatternList } from "./PatternList";
import { PreviewStage } from "./PreviewStage";
import { SettingsPanel } from "./SettingsPanel";

interface SourceImage {
  pixels: Pixels;
  name: string;
}

const button =
  "inline-flex h-9 cursor-pointer items-center border px-4 font-dk-mono text-xs tracking-[0.08em] uppercase";

/** Decodes an uploaded file into pixels, or returns the message to show. */
const decodeImage = async (
  file: File,
): Promise<{ pixels: Pixels } | { error: string }> => {
  const fileError = checkImageFile(file);
  if (fileError) {
    return { error: fileError };
  }
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return { error: UNREADABLE_IMAGE_MESSAGE };
  }
  const sizeError = checkImageDimensions(bitmap.width, bitmap.height);
  if (sizeError) {
    bitmap.close();
    return { error: sizeError };
  }
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
  bitmap.close();
  const pixels = canvasToPixels(canvas);
  return pixels ? { pixels } : { error: UNREADABLE_IMAGE_MESSAGE };
};

/**
 * The live tool, laid out like doppio's editor: patterns on the left, the
 * canvas in the middle, settings on the right. Opens with the built-in sample
 * dithered; uploads replace it. Rendering runs in a Web Worker and only the
 * newest change is rendered. Images never leave the browser.
 */
export const Editor = (): ReactElement => {
  const [settings, setSettings] = useState<EditorSettings>(
    DEFAULT_EDITOR_SETTINGS,
  );
  const [source, setSource] = useState<SourceImage | null>(null);
  const [result, setResult] = useState<Pixels | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [thumbnails, setThumbnails] = useState<Record<string, WorkerImage>>({});
  // The tool wakes up only when it is near the screen, so the first load is
  // just the hero.
  const [active, setActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const jobId = useRef(0);
  const thumbId = useRef(0);
  const scheduler = useRef<ReturnType<
    typeof createLatestOnlyScheduler<RenderRequest>
  > | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Built-in sample, painted once the tool is near the screen.
  useEffect(() => {
    if (!active) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      const canvas = document.createElement("canvas");
      paintSampleImage(canvas);
      const pixels = canvasToPixels(canvas);
      if (pixels) {
        setSource({ pixels, name: SAMPLE_NAME });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [active]);

  useEffect(() => {
    if (!active) {
      return;
    }
    const worker = new Worker(
      new URL(
        "../../../../../../lib/ditherkit/render.worker.ts",
        import.meta.url,
      ),
      { type: "module" },
    );
    const send = (request: WorkerRequest): void => worker.postMessage(request);
    const queue = createLatestOnlyScheduler<RenderRequest>((job) => {
      setBusy(true);
      send(job);
    });
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const response = event.data;
      if (response.kind === "thumbnails") {
        if (response.id === thumbId.current) {
          setThumbnails(
            Object.fromEntries(
              response.items.map((item) => [item.algorithm, item]),
            ),
          );
        }
        return;
      }
      if (response.id === jobId.current) {
        const { data, width, height } = response;
        setResult({ data, width, height, components: 4 });
        setBusy(false);
      }
      queue.done();
    };
    worker.onerror = () => {
      setBusy(false);
      setError(
        "The preview couldn't be rendered. Try a different pattern or image.",
      );
      queue.done();
    };
    workerRef.current = worker;
    scheduler.current = queue;

    return () => {
      worker.terminate();
      workerRef.current = null;
      scheduler.current = null;
    };
  }, [active]);

  useEffect(() => {
    if (!source || !scheduler.current) {
      return;
    }
    jobId.current += 1;
    scheduler.current.request({
      kind: "render",
      id: jobId.current,
      width: source.pixels.width,
      height: source.pixels.height,
      data: new Uint8ClampedArray(source.pixels.data),
      options: toRenderOptions(settings),
    });
  }, [settings, source]);

  // Pattern thumbnails come from the worker whenever the image changes.
  useEffect(() => {
    if (!source || !workerRef.current) {
      return;
    }
    thumbId.current += 1;
    const request: WorkerRequest = {
      kind: "thumbnails",
      id: thumbId.current,
      width: source.pixels.width,
      height: source.pixels.height,
      data: new Uint8ClampedArray(source.pixels.data),
      algorithms: ALGORITHMS.map((algorithm) => algorithm.id),
      maxEdge: 72,
      options: { mode: "mono", cell: 6 },
    };
    workerRef.current.postMessage(request);
  }, [source]);

  const update = useCallback((patch: Partial<EditorSettings>) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const loadFile = useCallback(async (file: File) => {
    setError("");
    const decoded = await decodeImage(file);
    if ("error" in decoded) {
      setError(decoded.error);
      return;
    }
    setSource({ pixels: decoded.pixels, name: file.name });
  }, []);

  const download = (): void => {
    if (!result || !source) {
      return;
    }
    const canvas = document.createElement("canvas");
    paintPixels(canvas, result);
    canvas.toBlob((blob) => {
      if (!blob) {
        setError("The PNG couldn't be saved. Try again.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = ditherFileName(source.name, settings.algorithm);
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  };

  const extractPalette = (): void => {
    if (source) {
      update({
        colorMode: "palette",
        palette: autoPalette(source.pixels, toRenderOptions(settings), 6),
      });
    }
  };

  const importPalette = async (file: File): Promise<void> => {
    setError("");
    const parsed = readPaletteFile(file.name, await file.arrayBuffer());
    if ("error" in parsed) {
      setError(parsed.error);
      return;
    }
    update({ colorMode: "palette", palette: parsed.colors });
  };

  const readout = useMemo(() => {
    if (!source) {
      return "loading the sample…";
    }
    const name =
      source.name.length > 28 ? `${source.name.slice(0, 25)}…` : source.name;
    return `${name} · ${source.pixels.width} × ${source.pixels.height} · ${algorithmInfo(settings.algorithm).name.toLowerCase()}`;
  }, [settings.algorithm, source]);

  return (
    <section
      aria-labelledby="tool-title"
      ref={sectionRef}
      className="flex scroll-mt-14 flex-col px-4 pt-6 min-[1081px]:h-[calc(100svh-3.5rem)] min-[1081px]:min-h-[560px] md:px-5"
      id="tool"
    >
      <div className="border-dk-line flex h-11 items-center justify-between border-b">
        <h2
          className="font-dk-mono text-dk-muted m-0 text-[11px] font-normal tracking-[0.12em] uppercase"
          id="tool-title"
        >
          the tool
        </h2>
        <span className="font-dk-mono text-dk-muted text-[11px] tracking-[0.12em] uppercase">
          31 patterns · runs in your browser
        </span>
      </div>
      <div className="border-dk-line grid min-h-0 flex-1 grid-cols-[250px_minmax(0,1fr)_290px] border-b max-[1080px]:grid-cols-[220px_minmax(0,1fr)] max-[720px]:grid-cols-1">
        <div className="bg-dk-panel border-dk-line flex min-h-0 min-w-0 flex-col border-r max-[720px]:border-r-0 max-[720px]:border-b">
          <div className="border-dk-line font-dk-mono flex items-center justify-between border-b px-4.5 py-3.5 text-xs tracking-[0.12em] uppercase">
            pattern
            <small className="text-dk-muted tracking-[0.04em] normal-case">
              31 in six families
            </small>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto max-[720px]:max-h-72">
            <PatternList
              onSelect={(algorithm) => update({ algorithm })}
              selected={settings.algorithm}
              thumbnails={thumbnails}
            />
          </div>
        </div>

        <div className="bg-dk-ground flex min-h-0 min-w-0 flex-col">
          <PreviewStage
            busy={busy}
            onDropFile={(file) => void loadFile(file)}
            result={result}
            source={source?.pixels ?? null}
          />
          <p
            className="text-dk-danger m-0 min-h-5 px-4 pb-2 text-[13px]"
            role="alert"
          >
            {error}
          </p>
          <div className="border-dk-line flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3">
            <span className="font-dk-mono text-dk-muted text-xs tabular-nums">
              {readout}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                className={`${button} border-dk-ink text-dk-ink bg-transparent`}
                onClick={() => uploadRef.current?.click()}
                type="button"
              >
                upload image
              </button>
              <input
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                aria-label="Upload an image"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (file) {
                    void loadFile(file);
                  }
                }}
                ref={uploadRef}
                type="file"
              />
              <button
                className={`${button} border-dk-accent bg-dk-accent text-dk-on-accent disabled:cursor-default disabled:opacity-60`}
                disabled={!result}
                onClick={download}
                type="button"
              >
                download png
              </button>
            </div>
            <p className="text-dk-muted m-0 w-full text-xs">
              PNG, JPG or WebP, up to 5 MB and 2,048 px. Images stay in your
              browser; nothing is uploaded.
            </p>
          </div>
        </div>

        <div className="bg-dk-panel border-dk-line min-h-0 min-w-0 overflow-y-auto border-l max-[1080px]:col-span-full max-[1080px]:border-t max-[1080px]:border-l-0">
          <div className="border-dk-line font-dk-mono flex items-center justify-between border-b px-4.5 py-3.5 text-xs tracking-[0.12em] uppercase">
            settings
            <small className="text-dk-muted tracking-[0.04em] normal-case">
              {settingsSummary(settings)}
            </small>
          </div>
          <SettingsPanel
            onChange={update}
            onExtractPalette={extractPalette}
            onImportPalette={(file) => void importPalette(file)}
            settings={settings}
            source={source?.pixels ?? null}
          />
        </div>
      </div>
    </section>
  );
};
