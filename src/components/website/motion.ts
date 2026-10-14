import type { Transition, Variants } from "motion/react";

export const motionTransition: Transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: motionTransition },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: motionTransition },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = fadeUp;

export const scaleOnHover = {
  scale: 1.015,
  transition: { duration: 0.18 },
};

export const revealViewport = {
  once: true,
  amount: 0.18,
} as const;

let initialLoadPending = true;

/** Whether the page is still on its first load, when the intro transition plays. */
export const isInitialLoadPending = (): boolean => initialLoadPending;

/** Marks the first load as handled so the intro never replays on navigation. */
export const finishInitialLoadReveal = (): void => {
  initialLoadPending = false;
};
