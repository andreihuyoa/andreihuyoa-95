import type { ReactElement } from "react";

import { MotionReveal } from "../../../components/website/MotionReveal";
import { experiences } from "../../../content/website";

interface ExperienceDuration {
  hasYears: boolean;
  label: string;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Converts a resume date range into an inclusive years-and-months duration.
 */
const formatExperienceDuration = (dateRange: string): ExperienceDuration => {
  const [startText, endText] = dateRange.split("—");
  const startMatch = startText?.trim().match(/^(\w{3})(?:\s+(\d{4}))?$/);
  const endMatch = endText?.trim().match(/^(\w{3})\s+(\d{4})$/);

  if (!startMatch || !endMatch) {
    return { hasYears: false, label: "" };
  }

  const startMonth = monthNames.indexOf(startMatch[1] ?? "");
  const endMonth = monthNames.indexOf(endMatch[1] ?? "");
  const endYear = Number(endMatch[2]);
  const startYear = Number(startMatch[2] ?? endYear);

  if (startMonth < 0 || endMonth < 0) {
    return { hasYears: false, label: "" };
  }

  const totalMonths =
    (endYear - startYear) * monthNames.length + endMonth - startMonth + 1;
  const years = Math.floor(totalMonths / monthNames.length);
  const months = totalMonths % monthNames.length;

  if (years === 0) {
    return { hasYears: false, label: `${months} MOS` };
  }

  return {
    hasYears: true,
    label: `${years} yr${years === 1 ? "" : "s"}${months > 0 ? ` ${months} mos` : ""}`,
  };
};

/**
 * Presents work history as a vertical timeline of detailed role summaries.
 */
const ExperiencePage = (): ReactElement => (
  <MotionReveal>
    <section
      className="min-h-full py-10 max-[760px]:pt-5 max-[760px]:pb-12"
      aria-labelledby="experience-title"
    >
      <header className="mx-auto mb-14 max-w-3xl max-[760px]:mb-10">
        <p className="font-website-display text-website-text-muted m-0 text-sm tracking-tighter">
          01 - work history
        </p>
        <h1
          className="mt-3 mb-0 text-4xl leading-none font-semibold"
          id="experience-title"
        >
          Experience
        </h1>
        <p className="text-website-text-muted mt-4 mb-0 max-w-2xl leading-[1.35]">
          The products, internal tools, and client work I have contributed to,
          with a closer look at what I handled in each role.
        </p>
      </header>

      <ol className="before:border-website-text/50 relative m-0 mx-auto max-w-3xl list-none p-0 before:absolute before:top-2.5 before:bottom-2.5 before:left-4 before:border-l before:border-dashed max-[640px]:before:top-2 max-[640px]:before:bottom-2 max-[640px]:before:left-3">
        {experiences.map((experience) => {
          const duration = formatExperienceDuration(experience.date);

          return (
            <li
              className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-8 pb-20 last:pb-0 max-[640px]:grid-cols-[1.5rem_minmax(0,1fr)] max-[640px]:gap-4 max-[640px]:pb-14"
              key={`${experience.company}-${experience.role}`}
            >
              <span
                className="border-website-text bg-website-background ring-website-background relative z-1 ml-1.5 size-5 rounded-[4px] border-2 border-dashed ring-6 max-[640px]:ml-1 max-[640px]:size-4 max-[640px]:rounded-[3px] max-[640px]:ring-5"
                aria-hidden="true"
              />

              <article>
                <div className="flex items-start justify-between gap-6 max-[640px]:flex-col max-[640px]:gap-2">
                  <div>
                    <p className="font-website-display text-website-text-muted m-0 text-xs tracking-tighter uppercase">
                      {experience.company}
                    </p>
                    <h2 className="mt-2 mb-0 text-xl leading-tight font-semibold">
                      {experience.role}
                    </h2>
                    {duration.label ? (
                      <p
                        className={`font-website-display text-website-text-muted mt-1.5 mb-0 text-xs tracking-wide ${duration.hasYears ? "[font-variant-caps:all-small-caps]" : "uppercase"}`}
                      >
                        {duration.label}
                      </p>
                    ) : null}
                  </div>
                  <time className="font-website-display text-website-text-muted shrink-0 text-xs whitespace-nowrap">
                    {experience.date}
                  </time>
                </div>

                <p className="text-website-text-soft mt-5 mb-0 leading-[1.4]">
                  {experience.summary}
                </p>

                <ul className="mt-6 mb-0 grid gap-3 pl-5 text-sm leading-[1.45]">
                  {experience.responsibilities.map((responsibility) => (
                    <li className="pl-1" key={responsibility}>
                      {responsibility}
                    </li>
                  ))}
                </ul>

                {/* Stack */}
                <ul
                  className="mt-7 mb-0 flex list-none flex-wrap gap-2 p-0"
                  aria-label={`${experience.role} technologies`}
                >
                  {experience.tags.map((tag) => (
                    <li
                      className="border-website-border bg-website-surface font-website-display text-website-text-muted rounded-md border px-2.5 py-1 text-xs"
                      key={tag}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  </MotionReveal>
);

export default ExperiencePage;
