import { downscale, render, type RenderOptions } from "../ditherEngine";

/** A full-size render job from the Ditherkit editor. `data` is RGBA. */
export interface RenderRequest {
  kind: "render";
  id: number;
  width: number;
  height: number;
  data: Uint8ClampedArray;
  options: Partial<RenderOptions>;
}

/** Pattern thumbnails for the editor's list, rendered from a small copy. */
export interface ThumbnailRequest {
  kind: "thumbnails";
  id: number;
  width: number;
  height: number;
  data: Uint8ClampedArray;
  algorithms: string[];
  maxEdge: number;
  options: Partial<RenderOptions>;
}

export type WorkerRequest = RenderRequest | ThumbnailRequest;

/** An RGBA image coming back from the worker. */
export interface WorkerImage {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

export type WorkerResponse =
  | ({ kind: "render"; id: number } & WorkerImage)
  | {
      kind: "thumbnails";
      id: number;
      items: ({ algorithm: string } & WorkerImage)[];
    };

const toImage = (pixels: ReturnType<typeof render>): WorkerImage => ({
  width: pixels.width,
  height: pixels.height,
  data: new Uint8ClampedArray(pixels.data),
});

// Runs the dither engine off the main thread so the page never stalls:
// full renders for the preview, and the 31 pattern thumbnails.
self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const request = event.data;
  const source = {
    data: request.data,
    width: request.width,
    height: request.height,
    components: 4 as const,
  };

  if (request.kind === "render") {
    const image = toImage(render(source, request.options));
    const response: WorkerResponse = {
      kind: "render",
      id: request.id,
      ...image,
    };
    self.postMessage(response, { transfer: [image.data.buffer] });
    return;
  }

  const small = downscale(source, request.maxEdge);
  const items = request.algorithms.map((algorithm) => ({
    algorithm,
    ...toImage(render(small, { ...request.options, algorithm, pixelSize: 1 })),
  }));
  const response: WorkerResponse = {
    kind: "thumbnails",
    id: request.id,
    items,
  };
  self.postMessage(response, {
    transfer: items.map((item) => item.data.buffer),
  });
};
