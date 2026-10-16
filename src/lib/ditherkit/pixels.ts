import {
  downscale,
  render,
  type Pixels,
  type RenderOptions,
} from "../ditherEngine";

/** Reads a canvas into engine pixels (RGBA). */
export const canvasToPixels = (canvas: HTMLCanvasElement): Pixels | null => {
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return null;
  }

  const { data, width, height } = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height,
  );

  return { data, width, height, components: 4 };
};

/** Paints RGBA engine pixels onto a canvas, resizing it to fit. */
export const paintPixels = (canvas: HTMLCanvasElement, image: Pixels): void => {
  const context = canvas.getContext("2d");

  if (!context || image.components !== 4) {
    return;
  }

  canvas.width = image.width;
  canvas.height = image.height;
  const rgba = new Uint8ClampedArray(image.data);
  context.putImageData(new ImageData(rgba, image.width, image.height), 0, 0);
};

/**
 * Renders a small pattern thumbnail from the current image onto `canvas`.
 * Thumbnails are tiny, so this runs on the main thread.
 */
export const paintThumbnail = (
  canvas: HTMLCanvasElement,
  source: Pixels,
  options: Partial<RenderOptions>,
  maxEdge: number,
): void => {
  const small = downscale(source, maxEdge);
  paintPixels(canvas, render(small, { ...options, pixelSize: 1 }));
};
