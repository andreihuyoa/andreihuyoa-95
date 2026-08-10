import type { ReactElement } from "react";

import { MotionReveal } from "../../components/website/MotionReveal";
import { pageDetails, type WebsiteSectionId } from "../../content/website";

interface WebsitePageShellProps {
  children: ReactElement;
  section: WebsiteSectionId;
}

interface WebsitePageIntroProps {
  section: WebsiteSectionId;
}

/**
 * Wraps website route pages with shared reveal timing and page spacing.
 */
export const WebsitePageShell = ({
  children,
  section,
}: WebsitePageShellProps): ReactElement => (
  <MotionReveal>
    <div
      className="min-h-full pt-10 max-[760px]:pt-20"
      aria-labelledby={`${section}-title`}
    >
      {children}
    </div>
  </MotionReveal>
);

/**
 * Shows placeholder copy for website sections that do not have full content yet.
 */
export const WebsitePageIntro = ({
  section,
}: WebsitePageIntroProps): ReactElement => {
  const details = pageDetails[section];

  return (
    <section className="flex min-h-80 flex-wrap items-start justify-center gap-10 max-[760px]:flex-col max-[760px]:gap-6">
      <div className="h-60.5 w-60.5 shrink-0 max-[1180px]:h-55 max-[1180px]:w-55 max-[760px]:hidden" />
      <div className="max-w-136 min-w-80 flex-[1_1_24rem] pt-8 max-[1080px]:pt-4 max-[760px]:max-w-none max-[760px]:min-w-0 max-[760px]:pt-0">
        <p className="font-website-display text-website-text-muted m-0 text-sm tracking-tighter">
          {details.index} - {section}
        </p>
        <h1
          className="mt-3 mb-0 text-4xl leading-none font-semibold capitalize"
          id={`${section}-title`}
        >
          {section}
        </h1>
        <p className="text-website-text-muted mt-4 mb-0 leading-[1.2]">
          {details.description}
        </p>
      </div>
    </section>
  );
};
