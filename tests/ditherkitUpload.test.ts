// tests/ditherkitUpload.test.ts
import { describe, expect, test } from "vitest";
import {
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_EDGE,
  checkImageDimensions,
  checkImageFile,
} from "../src/lib/ditherkit/uploadLimits";

const MB = 1024 * 1024;

describe("checkImageFile", () => {
  test.each(["image/png", "image/jpeg", "image/webp"])("accepts %s", (type) => {
    expect(checkImageFile({ type, size: 1000 })).toBeNull();
  });

  test("accepts a file exactly at the size limit", () => {
    expect(
      checkImageFile({ type: "image/png", size: MAX_UPLOAD_BYTES }),
    ).toBeNull();
  });

  test("rejects a file one byte over the size limit and names its size", () => {
    expect(
      checkImageFile({ type: "image/png", size: MAX_UPLOAD_BYTES + 1 }),
    ).toBe("This image is 5.0 MB. Use one that's 5 MB or smaller.");
    expect(checkImageFile({ type: "image/jpeg", size: 12.4 * MB })).toBe(
      "This image is 12.4 MB. Use one that's 5 MB or smaller.",
    );
  });

  test.each(["image/gif", "image/svg+xml", "application/pdf", ""])(
    "rejects type %j",
    (type) => {
      expect(checkImageFile({ type, size: 1000 })).toBe(
        "That file isn't a PNG, JPG or WebP. Choose an image in one of those formats.",
      );
    },
  );
});

describe("checkImageDimensions", () => {
  test("accepts an image exactly at the edge limit", () => {
    expect(checkImageDimensions(MAX_UPLOAD_EDGE, 1200)).toBeNull();
    expect(checkImageDimensions(900, MAX_UPLOAD_EDGE)).toBeNull();
  });

  test("rejects an image one pixel over on either side", () => {
    expect(checkImageDimensions(2049, 1000)).toBe(
      "This image is 2,049 × 1,000 px. Use one that's 2,048 px or smaller on its longest side.",
    );
    expect(checkImageDimensions(3024, 4032)).toBe(
      "This image is 3,024 × 4,032 px. Use one that's 2,048 px or smaller on its longest side.",
    );
  });

  test("rejects an empty image", () => {
    expect(checkImageDimensions(0, 0)).toBe(
      "This image couldn't be read. Try exporting it again as PNG or JPG.",
    );
  });
});
