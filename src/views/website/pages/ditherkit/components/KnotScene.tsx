import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactElement } from "react";
import { parseHex } from "../../../../../lib/ditherEngine";
import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  NearestFilter,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  TorusKnotGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";

/** Pattern the knot is dithered with: Bayer 8×8, round-dot halftone, line screen. */
export type KnotPattern = 0 | 1 | 2;

interface KnotSceneProps {
  pattern: KnotPattern;
}

const FRAGMENT = `
uniform sampler2D tScene;
uniform float uPx;
uniform vec3 uInk;
uniform vec3 uPaper;
uniform float uMode;
uniform vec2 uRes;
float b2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float b4(vec2 a) { return b2(0.5 * a) * 0.25 + b2(a); }
float b8(vec2 a) { return b4(0.5 * a) * 0.25 + b2(a); }
void main() {
  vec2 cell = floor(gl_FragCoord.xy / uPx);
  vec2 cuv = (cell + 0.5) * uPx / uRes;
  vec4 scene = texture2D(tScene, cuv);
  float l = pow(dot(scene.rgb, vec3(0.299, 0.587, 0.114)), 0.85);
  float on;
  if (uMode < 0.5) {
    // Bayer fills the whole artboard: empty background gets a soft gradient
    // that stays sparse down the left, where the title and lead text sit, and
    // builds toward the right.
    if (scene.a < 0.5) {
      l = 0.03 + 0.24 * smoothstep(0.38, 1.0, cuv.x) * (0.6 + 0.4 * (1.0 - cuv.y));
    }
    on = step(b8(cell) + 0.0001, l);
  } else if (uMode < 1.5) {
    vec2 g = floor(gl_FragCoord.xy / (uPx * 2.0));
    vec2 gu = (g + 0.5) * uPx * 2.0 / uRes;
    float ll = dot(texture2D(tScene, gu).rgb, vec3(0.299, 0.587, 0.114));
    vec2 local = fract(gl_FragCoord.xy / (uPx * 2.0)) - 0.5;
    on = step(length(local), sqrt(ll) * 0.62);
  } else {
    float d = abs(fract((gl_FragCoord.x + gl_FragCoord.y) / (uPx * 2.0)) - 0.5) * 2.0;
    on = step(1.0 - l, d * 0.999);
  }
  gl_FragColor = vec4(mix(uPaper, uInk, on), 1.0);
}
`;

const VERTEX = `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

/**
 * A torus knot rendered with Three.js, then dithered in a shader with the
 * stage colors. It turns toward the cursor, pauses when off screen, and is a
 * still frame with reduced motion. Without WebGL the artboard shows a plain
 * dot grid instead.
 */
export const KnotScene = ({ pattern }: KnotSceneProps): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const patternRef = useRef<KnotPattern>(pattern);
  const redrawRef = useRef<() => void>(() => undefined);
  const reduceMotion = useReducedMotion() ?? false;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    patternRef.current = pattern;
    redrawRef.current();
  }, [pattern]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ canvas, antialias: false });
    } catch {
      const timer = window.setTimeout(() => setFailed(true), 0);
      return () => window.clearTimeout(timer);
    }

    const scene = new Scene();
    // No background: empty pixels stay transparent so the shader can tell them apart.
    renderer.setClearColor(0x000000, 0);
    const camera = new PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.set(0, 0, 6.2);
    const geometry = new TorusKnotGeometry(1.15, 0.36, 180, 28, 2, 3);
    const material = new MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.42,
      metalness: 0.05,
    });
    const knot = new Mesh(geometry, material);
    scene.add(knot);
    const key = new DirectionalLight(0xffffff, 1.25 * Math.PI);
    key.position.set(3, 4, 5);
    const rim = new DirectionalLight(0xffffff, 0.45 * Math.PI);
    rim.position.set(-4, -2, -3);
    scene.add(key, rim, new AmbientLight(0xffffff, 0.12 * Math.PI));

    const target = new WebGLRenderTarget(16, 16, {
      minFilter: NearestFilter,
      magFilter: NearestFilter,
    });
    const uniforms = {
      tScene: { value: target.texture },
      uPx: { value: 4 },
      uInk: { value: new Vector3() },
      uPaper: { value: new Vector3() },
      uMode: { value: 0 },
      uRes: { value: new Vector2() },
    };
    const dither = new ShaderMaterial({
      uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
    });
    const quad = new PlaneGeometry(2, 2);
    const post = new Scene();
    post.add(new Mesh(quad, dither));
    const postCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let time = 0;
    let frame = 0;
    let visible = true;

    // Raw sRGB values: the dither shader writes them straight to the screen, so
    // they must skip Three's linear color conversion.
    const readColors = (): void => {
      const styles = getComputedStyle(canvas);
      const set = (target: Vector3, variable: string): void => {
        const rgb = parseHex(styles.getPropertyValue(variable).trim());
        const [r, g, b] = rgb ?? [0, 0, 0];
        target.set(r / 255, g / 255, b / 255);
      };
      set(uniforms.uInk.value, "--dk-stage-ink");
      set(uniforms.uPaper.value, "--dk-stage");
    };

    const draw = (): void => {
      uniforms.uMode.value = patternRef.current;
      eased.x += (pointer.x - eased.x) * 0.06;
      eased.y += (pointer.y - eased.y) * 0.06;
      knot.rotation.y = time * 0.35 + eased.x * 0.9;
      knot.rotation.x = time * 0.18 + eased.y * 0.6;
      renderer.setRenderTarget(target);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.render(post, postCamera);
    };
    redrawRef.current = draw;

    const resize = (): void => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) {
        return;
      }
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const phone = window.innerWidth < 600;
      const wide = width > 760;
      renderer.setPixelRatio(ratio);
      renderer.setSize(width, height, false);
      const px = (window.innerWidth < 600 ? 3 : 4) * ratio;
      target.setSize(
        Math.ceil((width * ratio) / px),
        Math.ceil((height * ratio) / px),
      );
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      uniforms.uPx.value = px;
      uniforms.uRes.value.set(width * ratio, height * ratio);
      // Desktop: full size, right of the title. Phones: smaller and centered.
      knot.position.set(wide ? 1.1 : 0, phone ? 0.2 : 0, 0);
      knot.scale.setScalar(phone ? 0.5 : wide ? 1 : 0.85);
      readColors();
      draw();
    };

    // Real elapsed time, capped, so a busy frame doesn't make the knot jump.
    let last = 0;
    const loop = (now: number): void => {
      const delta = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      time += delta;
      draw();
      frame = visible ? window.requestAnimationFrame(loop) : 0;
    };

    const onPointerMove = (event: PointerEvent): void => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      if (reduceMotion) {
        eased.x = pointer.x;
        eased.y = pointer.y;
        draw();
      }
    };

    const artboard = canvas.parentElement ?? canvas;
    artboard.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", resize);
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && !reduceMotion && !frame) {
        last = 0;
        frame = window.requestAnimationFrame(loop);
      }
    });
    viewObserver.observe(canvas);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const onScheme = (): void => {
      readColors();
      draw();
    };
    media.addEventListener("change", onScheme);

    resize();
    if (!reduceMotion) {
      frame = window.requestAnimationFrame(loop);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      artboard.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      sizeObserver.disconnect();
      viewObserver.disconnect();
      themeObserver.disconnect();
      media.removeEventListener("change", onScheme);
      redrawRef.current = () => undefined;
      geometry.dispose();
      material.dispose();
      quad.dispose();
      dither.dispose();
      target.dispose();
      renderer.dispose();
    };
  }, [reduceMotion]);

  return (
    <>
      <canvas
        aria-hidden="true"
        className="absolute inset-0 block h-full w-full"
        hidden={failed}
        ref={canvasRef}
      />
      {failed ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(var(--dk-stage-ink)_1.5px,transparent_1.6px)] bg-size-[32px_32px] opacity-60"
        />
      ) : null}
    </>
  );
};
