import { motion } from "motion/react";
import type { ReactElement } from "react";

interface PixelStar {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
  phase: 0 | 1;
}

const pixelStars: PixelStar[] = [
  {
    x: 8,
    y: 16,
    size: 14,
    delay: 0.1,
    duration: 1.6,
    driftX: -3,
    driftY: 2,
    phase: 0,
  },
  {
    x: 19,
    y: 33,
    size: 24,
    delay: 0.8,
    duration: 1.9,
    driftX: 2,
    driftY: -2,
    phase: 1,
  },
  {
    x: 7,
    y: 51,
    size: 36,
    delay: 0.2,
    duration: 2.4,
    driftX: -2,
    driftY: 3,
    phase: 0,
  },
  {
    x: 24,
    y: 66,
    size: 16,
    delay: 1.1,
    duration: 1.7,
    driftX: 3,
    driftY: -1,
    phase: 1,
  },
  {
    x: 35,
    y: 14,
    size: 18,
    delay: 0.5,
    duration: 2.1,
    driftX: 2,
    driftY: 2,
    phase: 0,
  },
  {
    x: 65,
    y: 13,
    size: 12,
    delay: 1.3,
    duration: 1.8,
    driftX: -2,
    driftY: -2,
    phase: 1,
  },
  {
    x: 79,
    y: 25,
    size: 20,
    delay: 0.4,
    duration: 2,
    driftX: 3,
    driftY: 1,
    phase: 0,
  },
  {
    x: 91,
    y: 39,
    size: 28,
    delay: 1,
    duration: 2.5,
    driftX: -3,
    driftY: 2,
    phase: 1,
  },
  {
    x: 86,
    y: 60,
    size: 14,
    delay: 0.7,
    duration: 1.6,
    driftX: 2,
    driftY: -3,
    phase: 0,
  },
  {
    x: 72,
    y: 75,
    size: 18,
    delay: 1.5,
    duration: 2.2,
    driftX: -2,
    driftY: 2,
    phase: 1,
  },
  {
    x: 55,
    y: 82,
    size: 12,
    delay: 0.3,
    duration: 1.9,
    driftX: 1,
    driftY: -2,
    phase: 0,
  },
  {
    x: 37,
    y: 80,
    size: 26,
    delay: 1.2,
    duration: 2.6,
    driftX: -2,
    driftY: -1,
    phase: 1,
  },
  {
    x: 11,
    y: 75,
    size: 12,
    delay: 0.6,
    duration: 1.5,
    driftX: 2,
    driftY: 2,
    phase: 0,
  },
  {
    x: 3,
    y: 35,
    size: 10,
    delay: 1.7,
    duration: 1.7,
    driftX: -1,
    driftY: -2,
    phase: 1,
  },
  {
    x: 96,
    y: 70,
    size: 22,
    delay: 0.9,
    duration: 2.3,
    driftX: 2,
    driftY: 3,
    phase: 0,
  },
  {
    x: 84,
    y: 12,
    size: 10,
    delay: 1.4,
    duration: 1.6,
    driftX: -2,
    driftY: 1,
    phase: 1,
  },
  {
    x: 18,
    y: 8,
    size: 12,
    delay: 0.2,
    duration: 1.8,
    driftX: 1,
    driftY: -2,
    phase: 0,
  },
  {
    x: 48,
    y: 2,
    size: 16,
    delay: 1.1,
    duration: 2.1,
    driftX: -2,
    driftY: 2,
    phase: 1,
  },
  {
    x: 94,
    y: 19,
    size: 12,
    delay: 0.5,
    duration: 1.7,
    driftX: 2,
    driftY: -1,
    phase: 0,
  },
  {
    x: 2,
    y: 63,
    size: 18,
    delay: 1.6,
    duration: 2.2,
    driftX: -2,
    driftY: 1,
    phase: 1,
  },
  {
    x: 31,
    y: 84,
    size: 14,
    delay: 0.8,
    duration: 1.9,
    driftX: 2,
    driftY: -2,
    phase: 0,
  },
  {
    x: 68,
    y: 83,
    size: 24,
    delay: 0.1,
    duration: 2.4,
    driftX: -3,
    driftY: 2,
    phase: 1,
  },
  {
    x: 52,
    y: 88,
    size: 12,
    delay: 1.3,
    duration: 1.6,
    driftX: 2,
    driftY: -1,
    phase: 0,
  },
  {
    x: 14,
    y: 85,
    size: 20,
    delay: 0.4,
    duration: 2,
    driftX: -2,
    driftY: -3,
    phase: 1,
  },
];

export const PixelStarField = (): ReactElement => (
  <div
    className="pointer-events-none absolute inset-[-12%] z-0"
    aria-hidden="true"
  >
    {pixelStars.map((star, index) => (
      <motion.span
        className="absolute block"
        key={`${star.x}-${star.y}-${index}`}
        style={{
          height: star.size,
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: star.size,
        }}
        animate={{
          scale: [1, 1 + 3 / star.size, 1],
          x: [0, star.driftX, 0],
          y: [0, star.driftY, 0],
        }}
        transition={{
          delay: star.delay,
          duration: star.duration,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <motion.span
          className="bg-website-text-muted absolute top-1/3 left-0 block h-1/3 w-full opacity-35"
          animate={{
            opacity:
              star.phase === 0
                ? [0.35, 0.35, 0, 0, 0.35]
                : [0, 0, 0.35, 0.35, 0],
          }}
          transition={{
            delay: star.delay,
            duration: star.duration,
            ease: "linear",
            repeat: Infinity,
            times: [0, 0.48, 0.5, 0.98, 1],
          }}
        />
        <motion.span
          className="bg-website-text-muted absolute top-0 left-1/3 block h-full w-1/3 opacity-35"
          animate={{
            opacity:
              star.phase === 0
                ? [0.35, 0.35, 0, 0, 0.35]
                : [0, 0, 0.35, 0.35, 0],
          }}
          transition={{
            delay: star.delay,
            duration: star.duration,
            ease: "linear",
            repeat: Infinity,
            times: [0, 0.48, 0.5, 0.98, 1],
          }}
        />
        <motion.span
          className="bg-website-text-muted absolute inset-1/3 block opacity-35"
          animate={{
            opacity:
              star.phase === 0
                ? [0, 0, 0.35, 0.35, 0]
                : [0.35, 0.35, 0, 0, 0.35],
          }}
          transition={{
            delay: star.delay,
            duration: star.duration,
            ease: "linear",
            repeat: Infinity,
            times: [0, 0.48, 0.5, 0.98, 1],
          }}
        />
      </motion.span>
    ))}
  </div>
);
