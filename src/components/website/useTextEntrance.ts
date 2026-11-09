import {
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "motion/react";
import { createContext, useContext, useLayoutEffect, useRef } from "react";

export const ThemeTextRevealCycle = createContext(0);

/** Plays once per theme cycle when the text comes into view. */
export const useTextEntrance = <T extends Element>() => {
  const ref = useRef<T>(null);
  const playedCycle = useRef<number | null>(null);
  const cycle = useContext(ThemeTextRevealCycle);
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { amount: 0.2 });

  useLayoutEffect(() => {
    if (reduceMotion) {
      playedCycle.current = cycle;
      controls.set("visible");
    } else if (inView && playedCycle.current !== cycle) {
      playedCycle.current = cycle;
      controls.set("hidden");
      void controls.start("visible");
    }
  }, [controls, cycle, inView, reduceMotion]);

  return { ref, controls, reduceMotion };
};
