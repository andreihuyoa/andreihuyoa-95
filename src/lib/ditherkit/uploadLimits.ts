/** Largest upload the Ditherkit page accepts, in bytes (5 MB). */
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Longest side, in pixels, the Ditherkit page accepts. */
export const MAX_UPLOAD_EDGE = 2048;

/** Image types the page can decode and dither. */
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

const UNREADABLE =
  "This image couldn't be read. Try exporting it again as PNG or JPG.";

/**
 * Checks an upload's type and size before it is decoded. Returns the message
 * to show, or null when the file is fine.
 */
export const checkImageFile = (file: {
  type: string;
  size: number;
}): string | null => {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "That file isn't a PNG, JPG or WebP. Choose an image in one of those formats.";
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    const megabytes = (file.size / (1024 * 1024)).toFixed(1);
    return `This image is ${megabytes} MB. Use one that's 5 MB or smaller.`;
  }

  return null;
};

/**
 * Checks a decoded image's dimensions. Oversized images are rejected rather
 * than downscaled. Returns the message to show, or null when the image is fine.
 */
export const checkImageDimensions = (
  width: number,
  height: number,
): string | null => {
  if (width <= 0 || height <= 0) {
    return UNREADABLE;
  }

  if (Math.max(width, height) > MAX_UPLOAD_EDGE) {
    const size = `${width.toLocaleString("en-US")} × ${height.toLocaleString("en-US")}`;
    return `This image is ${size} px. Use one that's 2,048 px or smaller on its longest side.`;
  }

  return null;
};

/** Message for a file the browser could not decode at all. */
export const UNREADABLE_IMAGE_MESSAGE = UNREADABLE;
