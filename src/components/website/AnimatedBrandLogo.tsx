import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useLayoutEffect, useRef, type ReactElement } from "react";

import { brandLogoGlyphs } from "../../content/website";

interface AnimatedBrandLogoProps {
  className?: string;
}

/** Reveals the original vector glyphs in reading order, with a quiet double heartbeat on the i-dot. */
export const AnimatedBrandLogo = ({
  className,
}: AnimatedBrandLogoProps): ReactElement => {
  const ref = useRef<SVGSVGElement>(null);
  const played = useRef(false);
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useLayoutEffect(() => {
    controls.set(
      reduceMotion || played.current || !inView ? "visible" : "hidden",
    );
  }, [controls, inView, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      played.current = true;
      controls.set("visible");
    } else if (inView) {
      played.current = true;
      void controls.start("visible");
    }
  }, [controls, inView, reduceMotion]);

  return (
    <motion.svg
      className={className}
      width="625"
      height="123"
      viewBox="0 0 625 123"
      aria-hidden="true"
      focusable="false"
      ref={ref}
      initial={false}
      animate={controls}
      data-brand-reveal
    >
      {Array.from("andreihuyoa.").map((letter, index) => (
        <motion.g
          className="motion-reduce:transform-none!"
          variants={{ hidden: { y: 130 }, visible: { y: 0 } }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: reduceMotion ? 0 : index * 0.04,
          }}
          key={index}
          data-brand-letter={letter}
        >
          <use href={`${brandLogoGlyphs}#letter-${index}`} />
          {letter === "i" ? (
            <g
              className="motion-safe:animate-website-heartbeat origin-center [transform-box:fill-box]"
              data-brand-heart
            >
              <use href={`${brandLogoGlyphs}#heart`} />
            </g>
          ) : null}
        </motion.g>
      ))}
    </motion.svg>
  );
};
