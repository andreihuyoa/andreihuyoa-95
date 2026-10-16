/** Size of the built-in sample image, in pixels. */
export const SAMPLE_WIDTH = 960;
export const SAMPLE_HEIGHT = 640;

/** File name shown for the built-in sample in the editor's readout. */
export const SAMPLE_NAME = "sample.png";

/**
 * Paints the built-in sample: a generated dusk landscape with a sun, layered
 * hills, a tree and light grain. It has smooth gradients and hard edges, which
 * is what shows dithering patterns apart. Seeded, so it looks the same on
 * every visit.
 */
export const paintSampleImage = (canvas: HTMLCanvasElement): void => {
  const width = SAMPLE_WIDTH;
  const height = SAMPLE_HEIGHT;
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return;
  }

  let seed = 7;
  const random = (): number => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  const sky = context.createLinearGradient(0, 0, 0, height * 0.7);
  sky.addColorStop(0, "#1d2b4f");
  sky.addColorStop(0.55, "#c86b5a");
  sky.addColorStop(1, "#f4c88a");
  context.fillStyle = sky;
  context.fillRect(0, 0, width, height);

  const sun = context.createRadialGradient(
    width * 0.66,
    height * 0.5,
    6,
    width * 0.66,
    height * 0.5,
    180,
  );
  sun.addColorStop(0, "rgba(255,244,214,1)");
  sun.addColorStop(0.25, "rgba(255,226,170,0.9)");
  sun.addColorStop(1, "rgba(255,200,140,0)");
  context.fillStyle = sun;
  context.fillRect(0, 0, width, height);

  const hill = (
    top: number,
    amplitude: number,
    frequency: number,
    color: string,
    phase: number,
  ): void => {
    context.beginPath();
    context.moveTo(0, height);
    for (let x = 0; x <= width; x += 4) {
      context.lineTo(
        x,
        top +
          Math.sin(x * frequency + phase) * amplitude +
          Math.sin(x * frequency * 2.7 + phase * 2) * amplitude * 0.35,
      );
    }
    context.lineTo(width, height);
    context.closePath();
    context.fillStyle = color;
    context.fill();
  };

  hill(height * 0.62, 27, 0.0073, "#7a4b5c", 1.2);
  hill(height * 0.72, 33, 0.0053, "#4a3348", 2.4);
  hill(height * 0.84, 24, 0.0093, "#221a28", 0.4);

  context.fillStyle = "#120d16";
  context.fillRect(width * 0.2, height * 0.48, 10, height * 0.4);
  for (let i = 0; i < 26; i += 1) {
    context.beginPath();
    context.arc(
      width * 0.2 + 5 + Math.cos(i) * 57 * random(),
      height * 0.47 - random() * 69,
      21 + random() * 24,
      0,
      Math.PI * 2,
    );
    context.fill();
  }

  const image = context.getImageData(0, 0, width, height);
  for (let i = 0; i < image.data.length; i += 4) {
    const grain = (random() - 0.5) * 14;
    image.data[i] = (image.data[i] ?? 0) + grain;
    image.data[i + 1] = (image.data[i + 1] ?? 0) + grain;
    image.data[i + 2] = (image.data[i + 2] ?? 0) + grain;
  }
  context.putImageData(image, 0, 0);
};
