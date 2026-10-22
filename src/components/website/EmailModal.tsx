import { CloseCircleBrokenIcon } from "@solar-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";

import {
  contactEmail,
  getGmailComposeUrl,
  getMailtoUrl,
} from "../../utils/links";

interface EmailModalProps {
  open: boolean;
  onClose: () => void;
}

const fieldClassName =
  "border-website-border bg-website-surface text-website-text focus:border-website-interactive w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors";

/**
 * Compose modal for contacting the site owner. It builds a prefilled draft
 * (subject and message) and hands it to the visitor's mail app, or to Gmail on
 * the web, since the site has no backend to send mail from.
 */
export const EmailModal = ({
  open,
  onClose,
}: EmailModalProps): ReactElement | null => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const subjectRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const container = document.querySelector<HTMLElement>(
      "[data-website-scroll-container]",
    );
    const rootOverflow = document.documentElement.style.overflow;
    const containerOverflow = container?.style.overflow ?? "";

    document.documentElement.style.overflow = "hidden";
    if (container) {
      container.style.overflow = "hidden";
    }
    subjectRef.current?.focus();

    return () => {
      document.documentElement.style.overflow = rootOverflow;
      if (container) {
        container.style.overflow = containerOverflow;
      }
      previouslyFocused?.focus();
    };
  }, [open]);

  if (typeof document === "undefined") {
    return null;
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) {
      return;
    }

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input, textarea",
      ),
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    window.location.href = getMailtoUrl({ subject, body });
  };

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reduceMotion ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onKeyDown={handleKeyDown}
          >
            <motion.form
              className="border-website-border-strong bg-website-background text-website-text font-website-body w-[min(32rem,calc(100vw-2rem))] rounded-md border p-5 shadow-[0_12px_40px_var(--website-shadow)]"
              initial={{
                y: reduceMotion ? 0 : 12,
                opacity: reduceMotion ? 1 : 0,
              }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: reduceMotion ? 0 : 12, opacity: reduceMotion ? 1 : 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="m-0 text-lg font-semibold" id={titleId}>
                    Send me an email
                  </h2>
                  <p className="text-website-text-muted m-0 text-sm">
                    To {contactEmail}
                  </p>
                </div>
                <button
                  className="text-website-text-muted hover:text-website-interactive cursor-pointer border-0 bg-transparent p-0 transition-colors"
                  type="button"
                  aria-label="Close"
                  onClick={onClose}
                >
                  <CloseCircleBrokenIcon aria-hidden="true" size={22} />
                </button>
              </div>

              <label className="text-website-text-muted mb-1 block text-xs uppercase">
                Subject
                <input
                  ref={subjectRef}
                  className={`${fieldClassName} mt-1 normal-case`}
                  type="text"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="What's this about?"
                />
              </label>
              <label className="text-website-text-muted mt-3 block text-xs uppercase">
                Message
                <textarea
                  className={`${fieldClassName} mt-1 min-h-40 resize-y normal-case`}
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  placeholder="Write your message…"
                />
              </label>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <a
                  className="text-website-text-muted hover:text-website-interactive text-xs underline decoration-dotted underline-offset-3"
                  href={getGmailComposeUrl({ subject, body })}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open in Gmail instead
                </a>
                <button
                  className="border-website-border-strong bg-website-text text-website-background cursor-pointer rounded-md border px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-85"
                  type="submit"
                >
                  Send email
                </button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
