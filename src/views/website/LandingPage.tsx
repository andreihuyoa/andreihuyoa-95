import { ArrowRightUpBrokenIcon } from "@solar-icons/react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { ReactElement } from "react";

import { MotionReveal } from "../../components/website/MotionReveal";
import { PixelStarField } from "../../components/website/PixelStarField";
import {
  brandLogo,
  landingSectionPreviews,
  portrait,
  socialLinks,
  type LandingSectionPreview,
} from "../../content/website";
import { Separator } from "../../components/website/Separator";

/**
 * Shows one compact landing-page preview block for a portfolio section.
 */
const LandingPreviewSection = ({
  actionLabel,
  index,
  rows,
  section,
  tags,
  to,
  tagsActionLabel = "view all",
  tagsTo = to,
}: LandingSectionPreview): ReactElement => (
  <section
    className="relative py-4"
    id={section}
    aria-labelledby={`${section}-preview-title`}
  >
    {/* Sections - Section title and action link */}
    <div className="font-website-display text-website-text-muted mb-8 flex items-baseline justify-between gap-4 text-sm tracking-tighter">
      <h2 className="m-0 font-[inherit]" id={`${section}-preview-title`}>
        {index} - {section}
      </h2>
      <Link
        className="hover:text-website-interactive shrink-0 text-xs uppercase no-underline transition-colors duration-200"
        search={{ mode: "website" }}
        to={to}
      >
        {actionLabel} →
      </Link>
    </div>

    <div className="border-website-border divide-website-border divide-y border-y">
      {rows.map((row) => (
        <Link
          className="hover:bg-website-surface-soft group flex items-baseline justify-between gap-6 py-5 text-inherit no-underline max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-2"
          key={`${section}-${row.title}`}
          search={{ mode: "website" }}
          to={to}
        >
          <div className="min-w-0">
            <h3 className="group-hover:text-website-interactive m-0 truncate text-[15px] leading-tight font-bold transition-colors duration-200">
              {row.title}
            </h3>
            <p className="text-website-text-muted mt-1 mb-0 truncate text-sm leading-[1.2]">
              {row.description}
            </p>
          </div>
          <span className="font-website-display text-website-text-muted shrink-0 text-xs whitespace-nowrap">
            {row.meta}
          </span>
        </Link>
      ))}
    </div>

    {tags?.length ? (
      <div className="mt-7 flex flex-wrap gap-2">
        <div className="font-website-display text-website-text-muted mb-2 flex w-full items-baseline justify-between gap-4 text-xs tracking-tighter uppercase">
          <h3 className="m-0 font-[inherit]">Stack</h3>
          <Link
            className="hover:text-website-interactive shrink-0 no-underline transition-colors duration-200"
            search={{ mode: "website" }}
            to={tagsTo}
          >
            {tagsActionLabel} →
          </Link>
        </div>
        {tags.map((tag) => (
          <span
            className="border-website-border bg-website-surface font-website-display text-website-text-muted rounded-md border px-2.5 py-1 text-xs"
            key={tag}
          >
            {tag}
          </span>
        ))}
        <Link
          className="border-website-border hover:border-website-interactive hover:text-website-interactive font-website-display text-website-text-muted rounded-md border border-dashed px-2.5 py-1 text-xs no-underline transition-colors duration-200"
          search={{ mode: "website" }}
          to={tagsTo}
        >
          + more
        </Link>
      </div>
    ) : null}
  </section>
);

/**
 * Renders the website-mode landing page with the portrait, intro copy, socials,
 * and section previews.
 */
export const WebsiteLandingPage = (): ReactElement => (
  <>
    <MotionReveal>
      <section
        className="flex min-h-80 flex-wrap items-start justify-center gap-10 py-10 max-[1280px]:gap-7 max-[760px]:min-h-0 max-[760px]:flex-col max-[760px]:gap-6 max-[760px]:pt-0 max-[760px]:pb-7"
        aria-labelledby="website-intro-title"
      >
        <h1 className="sr-only" id="website-intro-title">
          Andrei Huyo-a
        </h1>
        <div className="relative h-60.5 w-60.5 shrink-0 max-[1180px]:h-55 max-[1180px]:w-55 max-[760px]:mx-auto max-[760px]:h-[min(78vw,330px)] max-[760px]:w-[min(78vw,330px)]">
          <PixelStarField />
          <div className="relative z-1 h-full w-full overflow-hidden">
            <img
              className="h-full w-full translate-y-8 scale-[1.25] object-contain object-center"
              src={portrait}
              alt="Carl Andrei Del Rosario"
              width="1086"
              height="1629"
            />
          </div>
        </div>

        <div className="max-w-136 min-w-80 flex-[1_1_24rem] overflow-hidden pt-8 max-[1080px]:pt-4 max-[760px]:max-w-none max-[760px]:min-w-0 max-[760px]:pt-0">
          <div>
            <Link
              className="w-full max-w-none max-[760px]:left-16 max-[760px]:w-[calc(100vw-5rem)]"
              aria-label="Andrei Huyo-a, home"
              search={{ mode: "website" }}
              to="/"
            >
              <img
                className="website-brand-logo block h-auto w-full max-w-none"
                src={brandLogo}
                alt="Andrei Huyo-a"
              />
            </Link>
          </div>
          <p className="m-0 leading-[1.2]">
            I&apos;m a full-stack developer building web and mobile
            applications, with a focus on strong visual design, reliable
            systems, and products.
          </p>
          <p className="mt-4 leading-[1.2]">
            Right now, I&apos;m turning ideas into tools that people can
            genuinely use in their everyday workflows, combining solid
            engineering with AI-assisted development.
          </p>
          <nav
            className="font-website-display flex flex-wrap justify-between gap-1.5 py-3.75 text-sm tracking-tighter [&_a]:inline-flex [&_a]:min-h-6 [&_a]:items-center [&_a]:gap-1 [&_a]:no-underline"
            aria-label="Social links"
          >
            {socialLinks.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <motion.a
                  className="text-website-text-muted hover:text-website-interactive transition-colors duration-200"
                  key={link.label}
                  href={link.href}
                  rel={external ? "noreferrer" : undefined}
                  target={external ? "_blank" : undefined}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {link.label}
                  {external ? (
                    <ArrowRightUpBrokenIcon aria-hidden="true" size={13} />
                  ) : null}
                </motion.a>
              );
            })}
          </nav>
        </div>
      </section>
      <Separator />
    </MotionReveal>

    <div className="py-4" aria-label="Portfolio overview">
      {landingSectionPreviews.map((section) => (
        <LandingPreviewSection {...section} key={section.section} />
      ))}
    </div>
  </>
);
