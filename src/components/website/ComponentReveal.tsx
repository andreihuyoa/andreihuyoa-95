import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";

interface ComponentRevealProps {
  as?: "div" | "span" | "li" | "article";
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Slides and fades a component in once without clipping children, shadows or focus rings. */
export const ComponentReveal = ({
  as = "div",
  children,
  className = "",
  delay = 0,
}: ComponentRevealProps): ReactElement => {
  const ref = useRef<HTMLElement | null>(null);
  const played = useRef(false);
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const Tag = {
    div: motion.div,
    span: motion.span,
    li: motion.li,
    article: motion.article,
  }[as];

  useLayoutEffect(() => {
    controls.set(
      reduceMotion || played.current || !inView
        ? { y: 0, opacity: 1 }
        : { y: 12, opacity: 0 },
    );
  }, [controls, inView, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      played.current = true;
      controls.set({ y: 0, opacity: 1 });
    } else if (inView) {
      played.current = true;
      void controls.start({
        y: 0,
        opacity: 1,
      });
    }
  }, [controls, inView, reduceMotion]);

  return (
    <Tag
      className={`focus-within:transform-none! focus-within:opacity-100! motion-reduce:transform-none! motion-reduce:opacity-100! ${className}`}
      ref={(element: HTMLElement | null) => {
        ref.current = element;
      }}
      initial={false}
      animate={controls}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: reduceMotion ? 0 : delay,
      }}
      data-component-reveal
    >
      {children}
    </Tag>
  );
};
