import {
  useAnimationControls,
  useInView,
  useReducedMotion,
  motion,
} from "motion/react";
import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactElement,
} from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

/** Reveals words once; copy stays readable until an observer actually starts its entrance. */
export const TextReveal = ({
  children,
  className,
  delay = 0,
}: TextRevealProps): ReactElement => {
  const ref = useRef<HTMLSpanElement>(null);
  const played = useRef(false);
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const parts = children.split(/(\s+)/);
  const count = parts.filter((part) => part.trim()).length;
  let wordIndex = 0;

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
    <span className={className} ref={ref} data-text-reveal>
      {parts.map((part, index) => {
        if (!part.trim()) return <Fragment key={index}>{part}</Fragment>;
        const offset =
          (wordIndex++ / Math.max(1, count - 1)) *
          Math.min(0.22, count * 0.025);
        return (
          <span
            className="-my-[0.08em] inline-flex overflow-hidden py-[0.08em] align-baseline"
            key={index}
          >
            <motion.span
              className="inline-block motion-reduce:transform-none! [a:focus-visible_&]:transform-none!"
              initial={false}
              animate={controls}
              variants={{ hidden: { y: "115%" }, visible: { y: "0%" } }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: reduceMotion ? 0 : delay + offset,
              }}
            >
              {part}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};
