import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactElement } from "react";

interface ThemePixelTransitionProps {
  color: string;
  onCovered: () => void;
  onComplete: () => void;
}

const COLUMN_COUNT = 12;
const ROW_COUNT = 8;
const LAST_PIXEL = COLUMN_COUNT * ROW_COUNT - 1;
const pixels = Array.from(
  { length: COLUMN_COUNT * ROW_COUNT },
  (_, index) => index,
);

export const ThemePixelTransition = ({
  color,
  onComplete,
  onCovered,
}: ThemePixelTransitionProps): ReactElement => {
  const [phase, setPhase] = useState<"covering" | "revealing">("covering");
  const revealFrame = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (revealFrame.current !== null) {
        window.cancelAnimationFrame(revealFrame.current);
      }
    },
    [],
  );

  const handlePixelComplete = (pixel: number): void => {
    if (phase === "covering" && pixel === LAST_PIXEL) {
      onCovered();
      revealFrame.current = window.requestAnimationFrame(() => {
        setPhase("revealing");
      });
      return;
    }

    if (phase === "revealing" && pixel === 0) {
      onComplete();
    }
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-100 grid grid-cols-12 grid-rows-8 overflow-hidden"
      aria-hidden="true"
    >
      {pixels.map((pixel) => {
        const column = pixel % COLUMN_COUNT;
        const row = Math.floor(pixel / COLUMN_COUNT);
        const delayIndex =
          phase === "covering"
            ? column + row
            : COLUMN_COUNT - 1 - column + (ROW_COUNT - 1 - row);

        return (
          <motion.span
            animate={
              phase === "covering"
                ? { opacity: 1, scale: 1.02 }
                : { opacity: 0, scale: 1.08 }
            }
            className="block h-full w-full"
            initial={{ opacity: 0, scale: 0.55 }}
            key={pixel}
            style={{ backgroundColor: color }}
            transition={{
              delay: delayIndex * 0.009,
              duration: phase === "covering" ? 0.24 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={() => handlePixelComplete(pixel)}
          />
        );
      })}
    </div>
  );
};
