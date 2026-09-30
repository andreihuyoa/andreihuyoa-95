import { ArrowRightUpBrokenIcon } from "@solar-icons/react";
import type { ReactElement } from "react";

import type { Certification } from "../../content/certifications";
import {
  formatCertificationDate,
  formatCredentialReference,
} from "../../lib/certifications";

interface CertificationCardProps {
  certification: Certification;
  /** Receives the card's trigger so focus can return to it on close. */
  onOpen: (certification: Certification, trigger: HTMLButtonElement) => void;
}

// Hover-in runs 320ms, hover-out falls back to the base 240ms.
const easeClass = "ease-[cubic-bezier(0.22,1,0.36,1)]";

const cornerMarkPositions = [
  "top-1.5 left-1.5 origin-top-left border-t border-l",
  "top-1.5 right-1.5 origin-top-right border-t border-r",
  "bottom-1.5 left-1.5 origin-bottom-left border-b border-l",
  "right-1.5 bottom-1.5 origin-bottom-right border-r border-b",
];

/**
 * Logo-first certification card. The title button covers the whole card and
 * opens the viewer; the verify link sits above it and is the only element
 * that leaves the site.
 */
export const CertificationCard = ({
  certification,
  onOpen,
}: CertificationCardProps): ReactElement => {
  const { issuedOn, issuer, kind, logo, title, verification } = certification;

  return (
    <article
      className={`group/card bg-website-surface border-website-border/40 hover:border-website-border has-[button:focus-visible]:border-website-border has-[button:focus-visible]:outline-website-text relative flex h-full flex-col gap-5 rounded-md border p-4 transition-[translate,scale,border-color] duration-240 ${easeClass} hover:-translate-y-px hover:duration-320 has-[button:active]:scale-[0.98] has-[button:active]:duration-120 has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-3 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:has-[button:active]:scale-100`}
    >
      {cornerMarkPositions.map((position) => (
        <span
          aria-hidden="true"
          className={`border-website-text pointer-events-none absolute size-2.5 scale-50 opacity-0 transition-[opacity,scale] duration-240 ${easeClass} group-hover/card:scale-100 group-hover/card:opacity-100 group-hover/card:duration-320 group-has-[button:focus-visible]/card:scale-100 group-has-[button:focus-visible]/card:opacity-100 motion-reduce:transition-none ${position}`}
          key={position}
        />
      ))}

      <div className="flex items-start justify-between gap-3">
        <span
          className={`border-website-border/30 flex size-10 shrink-0 overflow-hidden rounded-sm border bg-white transition-[translate,scale] duration-240 ${easeClass} group-hover/card:-translate-y-px group-hover/card:scale-106 group-hover/card:duration-450 group-has-[button:focus-visible]/card:scale-106 motion-reduce:transition-none motion-reduce:group-hover/card:translate-y-0 motion-reduce:group-hover/card:scale-100`}
        >
          <img
            alt=""
            className={`size-full ${logo.fit === "contain" ? "object-contain p-1" : "object-cover"}`}
            decoding="async"
            height={40}
            loading="lazy"
            src={logo.src}
            width={40}
          />
        </span>
        <time
          className="font-website-display text-website-text-muted text-xs uppercase"
          dateTime={issuedOn}
        >
          {formatCertificationDate(issuedOn)}
        </time>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="m-0 text-[17px] leading-tight font-semibold tracking-[-0.03em]">
          <button
            aria-haspopup="dialog"
            className="cursor-pointer text-left after:absolute after:inset-0 after:rounded-md focus-visible:outline-none"
            onClick={(event) => onOpen(certification, event.currentTarget)}
            type="button"
          >
            {title}
          </button>
        </h3>
        <p className="text-website-text-muted m-0 text-sm leading-snug">
          {issuer} · {kind}
        </p>
      </div>

      <div className="border-website-border/40 font-website-display text-website-text-muted mt-auto flex items-center justify-between gap-3 border-t border-dashed pt-3 text-xs">
        <span>{formatCredentialReference(certification)}</span>
        {verification ? (
          <a
            aria-label={`Verify ${title} on ${verification.site}, opens in a new tab`}
            className="group/verify text-website-text-muted hover:text-website-interactive focus-visible:text-website-interactive focus-visible:outline-website-text relative z-1 -my-3.5 -mr-2 inline-flex items-center gap-1.5 rounded-sm px-2 py-3.5 no-underline transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2"
            href={verification.url}
            rel="noreferrer"
            target="_blank"
          >
            <span className="group-hover/verify:underline group-hover/verify:decoration-dotted group-hover/verify:underline-offset-4">
              verify
            </span>
            <ArrowRightUpBrokenIcon
              aria-hidden="true"
              className={`transition-[translate] duration-240 ${easeClass} group-hover/verify:translate-x-0.5 group-hover/verify:-translate-y-0.5 motion-reduce:transition-none`}
              size={14}
            />
          </a>
        ) : null}
      </div>
    </article>
  );
};
