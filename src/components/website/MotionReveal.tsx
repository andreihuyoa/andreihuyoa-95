import { motion, useReducedMotion } from "motion/react";
import type { ReactElement, ReactNode } from "react";
import { fadeUp, revealViewport } from "./motion";

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
}

export const MotionReveal = ({
  children,
  className,
}: MotionRevealProps): ReactElement => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      variants={fadeUp}
      viewport={revealViewport}
      whileInView={reduceMotion ? undefined : "visible"}
    >
      {children}
    </motion.div>
  );
};
