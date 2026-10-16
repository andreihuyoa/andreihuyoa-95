/** One way of drawing the word: live text in a font, or an image of the logo. */
export type WordmarkSource =
  | {
      type: "text";
      text: string;
      family: string;
      weight?: number;
      style?: "normal" | "italic";
      /** Share of the width the text fills (default 1). */
      fit?: number;
    }
  | { type: "image"; src: string };

export type WordmarkEffect = "write" | "particles" | "halftone" | "liquid";

export interface WordmarkOptions {
  sources: WordmarkSource[];
  /** CSS pixels per grid cell. */
  cell: number;
  /** CSS width the mark should fill. */
  width: () => number;
  /** Element that tracks the cursor; defaults to the canvas. */
  zone: HTMLElement;
  /** CSS custom property the ink color is read from. */
  inkVariable: string;
  reduceMotion: boolean;
  /** Pause between style changes, in ms: [min, max]. */
  pause?: [number, number];
}

export interface WordmarkRenderer {
  start: () => Promise<void>;
  stop: () => void;
  redraw: () => void;
}

interface Particles {
  n: number;
  hx: Float32Array;
  hy: Float32Array;
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  seed: Float32Array;
  spring: boolean;
}

interface Transition {
  type: WordmarkEffect;
  progress: number;
  duration: number;
}

const ORDER: WordmarkEffect[] = ["write", "particles", "halftone", "liquid"];
const DURATIONS: Record<WordmarkEffect, number> = {
  write: 1.1,
  particles: 1.2,
  halftone: 0.9,
  liquid: 1.1,
};

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

/**
 * Draws a word as a grid of pixel particles and cycles it through several
 * fonts and styles. Each change waits an irregular pause and uses the next of
 * four transitions: write (left-to-right ink-in, also the entrance), particles
 * (burst and fly in), halftone (shrink to dots and grow back) and liquid (melt
 * and wobble). On hover, cells near the cursor are pushed away and shrink into
 * dots. At rest every cell sits on its grid, so the word stays readable. With
 * reduced motion, styles swap instantly every 6 seconds and nothing moves.
 */
export const createWordmarkRenderer = (
  canvas: HTMLCanvasElement,
  options: WordmarkOptions,
): WordmarkRenderer => {
  const { sources, cell, zone, inkVariable, reduceMotion } = options;
  const [pauseMin, pauseMax] = options.pause ?? [1800, 3400];
  const context = canvas.getContext("2d");
  const images = new Map<string, HTMLImageElement>();
  let cols = 0;
  let rows = 0;
  let planes: Float32Array[] = [];
  let index = 0;
  let current: Particles | null = null;
  let previous: Particles | null = null;
  let transition: Transition | null = null;
  let turn = 0;
  let frame = 0;
  let timer = 0;
  let running = false;
  let time = 0;
  let ink = "";
  const mouse = { x: -999, y: -999, inside: false };

  const fontOf = (
    source: Extract<WordmarkSource, { type: "text" }>,
    size: number,
  ): string =>
    `${source.style ?? "normal"} ${source.weight ?? 400} ${size}px ${source.family}`;

  const fitText = (
    target: CanvasRenderingContext2D,
    source: Extract<WordmarkSource, { type: "text" }>,
  ): TextMetrics => {
    target.font = fontOf(source, 100);
    const probe = target.measureText(source.text);
    const size = (100 * cols * (source.fit ?? 1)) / (probe.width * 1.02);
    target.font = fontOf(source, size);
    return target.measureText(source.text);
  };

  const imageFor = async (src: string): Promise<HTMLImageElement> => {
    const cached = images.get(src);
    if (cached) {
      return cached;
    }
    const image = await loadImage(src);
    images.set(src, image);
    return image;
  };

  const measureRows = async (): Promise<number> => {
    const probe = document.createElement("canvas").getContext("2d");
    let tallest = 0;
    for (const source of sources) {
      if (source.type === "text") {
        if (!probe) {
          continue;
        }
        const metrics = fitText(probe, source);
        tallest = Math.max(
          tallest,
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
        );
      } else {
        const image = await imageFor(source.src);
        tallest = Math.max(
          tallest,
          (cols * 0.98 * image.naturalHeight) / image.naturalWidth,
        );
      }
    }
    return Math.max(8, Math.ceil(tallest) + 2);
  };

  const rasterize = async (source: WordmarkSource): Promise<Float32Array> => {
    const off = document.createElement("canvas");
    off.width = cols;
    off.height = rows;
    const target = off.getContext("2d", { willReadFrequently: true });
    const plane = new Float32Array(cols * rows);
    if (!target) {
      return plane;
    }
    target.fillStyle = "white";
    if (source.type === "text") {
      const metrics = fitText(target, source);
      const height =
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      target.fillText(
        source.text,
        (cols - metrics.width) / 2,
        (rows - height) / 2 + metrics.actualBoundingBoxAscent,
      );
    } else {
      const image = await imageFor(source.src);
      const scale =
        Math.min(cols / image.naturalWidth, rows / image.naturalHeight) * 0.98;
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      target.drawImage(
        image,
        (cols - width) / 2,
        (rows - height) / 2,
        width,
        height,
      );
    }
    const data = target.getImageData(0, 0, cols, rows).data;
    for (let i = 0; i < plane.length; i += 1) {
      plane[i] = (data[i * 4 + 3] ?? 0) / 255;
    }
    return plane;
  };

  const particlesFor = (
    plane: Float32Array,
    enter: WordmarkEffect | null,
  ): Particles => {
    const cells: number[] = [];
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        if ((plane[y * cols + x] ?? 0) > 0.5) {
          cells.push(x, y);
        }
      }
    }
    const n = cells.length / 2;
    const p: Particles = {
      n,
      hx: new Float32Array(n),
      hy: new Float32Array(n),
      x: new Float32Array(n),
      y: new Float32Array(n),
      vx: new Float32Array(n),
      vy: new Float32Array(n),
      seed: new Float32Array(n),
      spring: true,
    };
    for (let i = 0; i < n; i += 1) {
      const hx = cells[i * 2] ?? 0;
      const hy = cells[i * 2 + 1] ?? 0;
      const seed = Math.random();
      p.hx[i] = hx;
      p.hy[i] = hy;
      p.seed[i] = seed;
      p.x[i] = hx;
      p.y[i] = hy;
      if (enter === "liquid") {
        p.x[i] = hx + (seed - 0.5) * 3;
        p.y[i] = hy + Math.sin(hx * 0.22) * rows * 0.22 + (seed - 0.5) * 2;
      }
      if (enter === "particles") {
        const angle = seed * Math.PI * 2;
        const radius = (0.4 + Math.random()) * rows * 1.4;
        p.x[i] = hx + Math.cos(angle) * radius;
        p.y[i] = hy + Math.sin(angle) * radius * 0.6;
      }
    }
    return p;
  };

  const readInk = (): void => {
    ink = getComputedStyle(canvas).getPropertyValue(inkVariable).trim();
  };

  const layout = async (): Promise<void> => {
    cols = Math.max(40, Math.floor(options.width() / cell));
    rows = await measureRows();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(cols * cell * ratio);
    canvas.height = Math.round(rows * cell * ratio);
    canvas.style.width = `${cols * cell}px`;
    canvas.style.height = `${rows * cell}px`;
    context?.setTransform(cell * ratio, 0, 0, cell * ratio, 0, 0);
    planes = await Promise.all(sources.map(rasterize));
    const plane = planes[index];
    current = plane ? particlesFor(plane, null) : null;
    readInk();
  };

  const update = (p: Particles): void => {
    const radius = Math.max(10, rows * 0.55);
    const push = mouse.inside && !reduceMotion;
    for (let i = 0; i < p.n; i += 1) {
      const x = p.x[i] ?? 0;
      const y = p.y[i] ?? 0;
      let ax = 0;
      let ay = 0;
      if (p.spring) {
        ax = ((p.hx[i] ?? 0) - x) * 0.14;
        ay = ((p.hy[i] ?? 0) - y) * 0.14;
      }
      if (push) {
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const distance = Math.hypot(dx, dy) || 1;
        if (distance < radius) {
          const force = ((radius - distance) / radius) ** 2 * 2.2;
          ax += (dx / distance) * force;
          ay += (dy / distance) * force;
        }
      }
      const damping = p.spring ? 0.8 : 0.95;
      const vx = ((p.vx[i] ?? 0) + ax) * damping;
      const vy = ((p.vy[i] ?? 0) + ay) * damping;
      p.vx[i] = vx;
      p.vy[i] = vy;
      p.x[i] = x + vx;
      p.y[i] = y + vy;
    }
  };

  const drawSet = (p: Particles, role: "old" | "new"): void => {
    if (!context) {
      return;
    }
    const radius = Math.max(10, rows * 0.5);
    const dots = mouse.inside && !reduceMotion;
    const type = transition?.type ?? null;
    const progress = transition ? transition.progress : 1;
    const fade =
      role === "old" && (type === "liquid" || type === "particles")
        ? Math.max(0, 1 - progress * 1.15)
        : 1;
    const sweep = type === "write" ? -4 + progress * (cols + 10) : 0;
    context.globalAlpha = fade;

    for (let i = 0; i < p.n; i += 1) {
      const hx = p.hx[i] ?? 0;
      const hy = p.hy[i] ?? 0;
      const seed = p.seed[i] ?? 0;
      const edge = sweep + Math.sin(hy * 0.9) * 2;
      if (type === "write" && (role === "new" ? hx > edge : hx <= edge)) {
        continue;
      }
      let x = p.x[i] ?? 0;
      let y = p.y[i] ?? 0;
      let r = 0.51;
      if (role === "old" && type === "liquid") {
        y +=
          Math.sin(hx * 0.25 + time * 9) * rows * 0.18 * progress +
          seed * rows * 0.5 * progress * progress;
        x += Math.sin(hy * 0.4 + time * 7) * 1.5 * progress;
      }
      if (type === "halftone") {
        const local = Math.min(1, Math.max(0, progress * 1.7 - seed * 0.7));
        r *= role === "new" ? local : 1 - local;
        if (r < 0.04) {
          continue;
        }
      }
      if (type === "write" && role === "new" && hx > edge - 3) {
        r = 0.62;
      }
      if (dots) {
        const distance = Math.hypot(x - mouse.x, y - mouse.y);
        if (distance < radius) {
          r = Math.min(r, 0.18 + 0.33 * (distance / radius));
        }
      }
      if (r > 0.5) {
        context.fillRect(x - r + 0.5, y - r + 0.5, r * 2, r * 2);
      } else {
        context.beginPath();
        context.arc(x + 0.5, y + 0.5, r, 0, Math.PI * 2);
        context.fill();
      }
    }
    context.globalAlpha = 1;
  };

  const paint = (): void => {
    if (!context || !current) {
      return;
    }
    context.clearRect(0, 0, cols, rows);
    context.fillStyle = ink;
    if (previous) {
      drawSet(previous, "old");
    }
    drawSet(current, "new");
  };

  const schedule = (): void => {
    window.clearTimeout(timer);
    if (!running) {
      return;
    }
    timer = window.setTimeout(
      step,
      reduceMotion ? 6000 : pauseMin + Math.random() * (pauseMax - pauseMin),
    );
  };

  const tick = (): void => {
    time += 0.016;
    if (transition) {
      transition.progress += 1 / (transition.duration * 60);
      if (transition.progress >= 1) {
        transition = null;
        previous = null;
        schedule();
      }
    }
    if (current) {
      update(current);
    }
    if (previous) {
      update(previous);
    }
    paint();
    frame = running ? window.requestAnimationFrame(tick) : 0;
  };

  function step(): void {
    if (sources.length < 2 || !planes.length || transition || !current) {
      return;
    }
    index = (index + 1) % sources.length;
    const plane = planes[index];
    if (!plane) {
      return;
    }
    if (reduceMotion) {
      current = particlesFor(plane, null);
      paint();
      schedule();
      return;
    }
    const type = ORDER[turn % ORDER.length] ?? "write";
    turn += 1;
    previous = current;
    if (type === "particles") {
      previous.spring = false;
      for (let i = 0; i < previous.n; i += 1) {
        const angle = (previous.seed[i] ?? 0) * Math.PI * 2;
        const speed = 1.2 + Math.random() * 2.4;
        previous.vx[i] = Math.cos(angle) * speed;
        previous.vy[i] = Math.sin(angle) * speed * 0.6;
      }
    }
    current = particlesFor(plane, type);
    transition = { type, progress: 0, duration: DURATIONS[type] };
  }

  const toGrid = (event: PointerEvent): { x: number; y: number } => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * cols - 0.5,
      y: ((event.clientY - rect.top) / rect.height) * rows - 0.5,
    };
  };

  const onPointerMove = (event: PointerEvent): void => {
    const point = toGrid(event);
    mouse.x = point.x;
    mouse.y = point.y;
    mouse.inside =
      point.y > -rows * 0.6 &&
      point.y < rows * 1.6 &&
      point.x > -cols * 0.1 &&
      point.x < cols * 1.1;
  };
  const onPointerLeave = (): void => {
    mouse.inside = false;
  };
  let resizeTimer = 0;
  const onResize = (): void => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      transition = null;
      previous = null;
      void layout().then(paint);
    }, 150);
  };

  return {
    start: async () => {
      running = true;
      zone.addEventListener("pointermove", onPointerMove);
      zone.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("resize", onResize);
      await layout();
      if (!running) {
        return;
      }
      if (reduceMotion) {
        paint();
        schedule();
        return;
      }
      transition = { type: "write", progress: 0, duration: 1.3 };
      frame = window.requestAnimationFrame(tick);
    },
    stop: () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.clearTimeout(resizeTimer);
      zone.removeEventListener("pointermove", onPointerMove);
      zone.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
    },
    redraw: () => {
      readInk();
      paint();
    },
  };
};
