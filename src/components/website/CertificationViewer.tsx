import {
  ArrowRightUpBrokenIcon,
  CloseCircleBrokenIcon,
} from "@solar-icons/react";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
  type PanInfo,
  type Transition,
} from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";

import type { Certification } from "../../content/certifications";
import { getCertificationFacts } from "../../lib/certifications";
import { motionTransition } from "./motion";

interface CertificationViewerProps {
  /** The open certification, or null when the viewer is closed. */
  certification: Certification | null;
  onClose: () => void;
}

interface ViewerPanelProps {
  certification: Certification;
  onClose: () => void;
}

const compactQuery = "(max-width: 760px)";
const subscribeToNothing = (): (() => void) => () => undefined;
const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const exitTransition: Transition = { duration: 0.24, ease: [0.22, 1, 0.36, 1] };
const cornerMarkPositions = [
  "top-3.5 left-3.5 border-t border-l",
  "top-3.5 right-3.5 border-t border-r",
  "bottom-3.5 left-3.5 border-b border-l",
  "right-3.5 bottom-3.5 border-r border-b",
];

/**
 * Locks page scrolling behind the viewer. Website mode scrolls an inner
 * container on desktop and the document on small screens, so both are held.
 */
const useScrollLock = (): void => {
  useEffect(() => {
    const container = document.querySelector<HTMLElement>(
      "[data-website-scroll-container]",
    );
    const rootOverflow = document.documentElement.style.overflow;
    const containerOverflow = container?.style.overflow ?? "";

    document.documentElement.style.overflow = "hidden";
    if (container) {
      container.style.overflow = "hidden";
    }

    return () => {
      document.documentElement.style.overflow = rootOverflow;
      if (container) {
        container.style.overflow = containerOverflow;
      }
    };
  }, []);
};

const ViewerPanel = ({
  certification,
  onClose,
}: ViewerPanelProps): ReactElement => {
  const reduceMotion = useReducedMotion();
  const dragControls = useDragControls();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const summaryId = useId();
  const [isCompact] = useState(() => window.matchMedia(compactQuery).matches);
  const { image, issuer, kind, logo, skills, summary, title, verification } =
    certification;
  const facts = getCertificationFacts(certification);

  useScrollLock();

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== "Tab" || !panelRef.current) {
      return;
    }

    // Keep Tab inside the dialog while it is open.
    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  const handleDragEnd = (_event: PointerEvent, info: PanInfo): void => {
    if (info.offset.y > 120 || info.velocity.y > 600) {
      onClose();
    }
  };

  const panelMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0, transition: exitTransition },
      }
    : isCompact
      ? {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%", transition: exitTransition },
        }
      : {
          initial: { opacity: 0, scale: 0.98, y: 16 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.99, y: 8, transition: exitTransition },
        };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center min-[761px]:items-center min-[761px]:p-8">
      <motion.div
        animate={{ opacity: 1 }}
        aria-hidden="true"
        className="absolute inset-0 bg-black/50"
        exit={{ opacity: 0, transition: exitTransition }}
        initial={{ opacity: 0 }}
        onClick={onClose}
        transition={motionTransition}
      />

      <motion.div
        {...panelMotion}
        aria-describedby={summaryId}
        aria-labelledby={titleId}
        aria-modal="true"
        className="bg-website-surface text-website-text border-website-border relative flex w-full flex-col overflow-hidden border shadow-[0_24px_48px_-24px_var(--website-shadow)] max-[760px]:h-[calc(100dvh-2.5rem)] max-[760px]:rounded-t-md max-[760px]:border-x-0 max-[760px]:border-b-0 min-[761px]:grid min-[761px]:max-h-[calc(100dvh-4rem)] min-[761px]:min-h-[36rem] min-[761px]:max-w-5xl min-[761px]:grid-cols-[minmax(0,1fr)_21rem] min-[761px]:rounded-md"
        drag={isCompact && !reduceMotion ? "y" : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragControls={dragControls}
        dragElastic={{ top: 0, bottom: 0.5 }}
        dragListener={false}
        onDragEnd={handleDragEnd}
        onKeyDown={handleKeyDown}
        ref={panelRef}
        role="dialog"
        transition={motionTransition}
      >
        {/* Drag handle: pulling the sheet down past 120px closes it. */}
        <div
          aria-hidden="true"
          className="flex h-12 shrink-0 touch-none justify-center pt-2 min-[761px]:hidden"
          onPointerDown={(event) => dragControls.start(event)}
        >
          <span className="bg-website-border h-1 w-9 rounded-full" />
        </div>

        <button
          aria-label="Close"
          className="hover:bg-website-surface-muted focus-visible:outline-website-text absolute top-1 right-1 z-10 flex size-11 cursor-pointer items-center justify-center rounded-md transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 min-[761px]:top-3 min-[761px]:right-3"
          onClick={onClose}
          ref={closeRef}
          type="button"
        >
          <CloseCircleBrokenIcon aria-hidden="true" size={20} />
        </button>

        <div className="max-[760px]:min-h-0 max-[760px]:flex-1 max-[760px]:overflow-y-auto max-[760px]:overscroll-contain min-[761px]:contents">
          <figure className="bg-website-surface-muted relative m-0 flex items-center justify-center p-10 max-[760px]:mx-4 max-[760px]:rounded-sm max-[760px]:p-5 min-[761px]:p-12">
            {cornerMarkPositions.map((position) => (
              <span
                aria-hidden="true"
                className={`border-website-text pointer-events-none absolute size-3.5 max-[760px]:hidden ${position}`}
                key={position}
              />
            ))}
            <img
              alt={image.alt}
              className={
                kind === "badge"
                  ? "block h-auto w-75 max-w-[70%] drop-shadow-[0_12px_20px_var(--website-shadow)] max-[760px]:w-44"
                  : "block h-auto w-full rounded-xs shadow-[0_16px_32px_-18px_var(--website-shadow)]"
              }
              decoding="async"
              height={image.height}
              src={image.src}
              width={image.width}
            />
          </figure>

          <div className="flex min-h-0 flex-col gap-5 px-4 pt-5 min-[761px]:overflow-y-auto min-[761px]:px-6">
            <div className="flex h-11 items-center gap-2.5 pr-12 min-[761px]:-mt-1">
              <span className="border-website-border/30 flex size-7 overflow-hidden rounded-sm border bg-white">
                <img
                  alt=""
                  className={`size-full ${logo.fit === "contain" ? "object-contain p-0.5" : "object-cover"}`}
                  height={28}
                  src={logo.src}
                  width={28}
                />
              </span>
              <span className="font-website-display text-website-text-muted text-xs uppercase">
                {kind}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h2
                className="m-0 text-2xl leading-tight font-semibold tracking-[-0.03em]"
                id={titleId}
              >
                {title}
              </h2>
              <p className="text-website-text-soft m-0">{issuer}</p>
            </div>

            <dl className="border-website-border/30 m-0 border-t">
              {facts.map((fact) => (
                <div
                  className="border-website-border/30 flex items-baseline justify-between gap-4 border-b py-2.5"
                  key={fact.label}
                >
                  <dt className="font-website-display text-website-text-muted shrink-0 text-xs uppercase">
                    {fact.label}
                  </dt>
                  <dd className="m-0 text-right text-sm leading-snug">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p
              className="text-website-text-soft m-0 text-sm leading-normal"
              id={summaryId}
            >
              {summary}
            </p>

            <ul
              aria-label="Skills"
              className="m-0 flex list-none flex-wrap gap-2 p-0"
            >
              {skills.map((skill) => (
                <li
                  className="border-website-border/50 font-website-display text-website-text-muted rounded-md border px-2.5 py-1 text-xs"
                  key={skill}
                >
                  {skill}
                </li>
              ))}
            </ul>

            <div className="bg-website-surface border-website-border/40 sticky bottom-0 -mx-4 mt-auto flex flex-col gap-3 border-t border-dashed px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] min-[761px]:-mx-6 min-[761px]:px-6 min-[761px]:pb-6">
              <a
                className="group/action border-website-border font-website-display text-website-text hover:bg-website-surface-muted hover:border-website-text focus-visible:outline-website-text flex h-11 items-center justify-center gap-2 rounded-md border text-[13px] no-underline transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                href={verification?.url ?? image.src}
                rel="noreferrer"
                target="_blank"
              >
                {verification
                  ? `verify on ${verification.site}`
                  : "open full size"}
                <ArrowRightUpBrokenIcon
                  aria-hidden="true"
                  className="transition-[translate] duration-240 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5 motion-reduce:transition-none"
                  size={14}
                />
              </a>
              <p className="font-website-display text-website-text-muted m-0 hidden items-center justify-center gap-1.5 text-xs min-[761px]:flex">
                <kbd className="border-website-border/50 bg-website-surface-muted rounded-sm border px-1.5 py-0.5 font-[inherit] text-[11px]">
                  esc
                </kbd>
                to close
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Detail view for one certification: full badge or certificate image, facts,
 * skills, and the verify action. Centered dialog on desktop, draggable bottom
 * sheet at 760px and below.
 */
export const CertificationViewer = ({
  certification,
  onClose,
}: CertificationViewerProps): ReactElement | null => {
  // Portal only on the client so prerendered HTML and hydration stay identical.
  const isClient = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  if (!isClient) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {certification ? (
        <ViewerPanel
          certification={certification}
          key={certification.id}
          onClose={onClose}
        />
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
