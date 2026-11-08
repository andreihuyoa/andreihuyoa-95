import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import type { ReactElement } from "react";

import { PixelStarField } from "../../components/website/PixelStarField";
import {
  brandLogo,
  landingBlogThumbnails,
  landingSectionPreviews,
  portrait,
  socialLinks,
  workflowTools,
  type LandingSectionPreview,
} from "../../content/website";
import { Separator } from "../../components/website/Separator";
import { formatBlogDate, getAllPosts } from "../../lib/blog";

const latestPosts = getAllPosts().slice(0, 3);

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
        {index} - {section === "blogs" ? "blog" : section}
      </h2>
      <Link
        className="hover:text-website-interactive shrink-0 text-xs uppercase no-underline transition-colors duration-200 max-[760px]:inline-flex max-[760px]:min-h-11 max-[760px]:items-center"
        search={{ mode: "website" }}
        to={to}
      >
        {actionLabel} →
      </Link>
    </div>

    {rows.length ? (
      <div className="border-website-border/20 divide-website-border/20 divide-y border-t">
        {rows.map((row) => (
          <Link
            className="hover:bg-website-surface-soft/80 [[data-theme=dark]_&]:hover:bg-website-surface-soft/20 group flex items-baseline justify-between gap-6 py-5 text-inherit no-underline max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-2"
            key={`${section}-${row.title}`}
            search={{ mode: "website" }}
            to={to}
          >
            <div className="min-w-0 flex-1 max-[760px]:w-full max-[760px]:flex-none">
              <h3 className="group-hover:text-website-interactive m-0 text-[15px] leading-tight font-bold transition-colors duration-200">
                {row.title}
              </h3>
              <p className="text-website-text-muted mt-1 mb-0 text-sm leading-[1.2]">
                {row.description}
              </p>
            </div>
            {row.meta ? (
              <span className="font-website-display text-website-text-muted shrink-0 text-xs whitespace-nowrap">
                {row.meta}
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    ) : null}

    {tags?.length ? (
      <div className="mt-7 flex flex-wrap gap-2">
        {section !== "stack" ? (
          <div className="font-website-display text-website-text-muted mb-2 flex w-full items-baseline justify-between gap-4 text-xs tracking-tighter uppercase">
            <h3 className="m-0 font-[inherit]">Stack</h3>
            <Link
              className="hover:text-website-interactive shrink-0 no-underline transition-colors duration-200 max-[760px]:inline-flex max-[760px]:min-h-11 max-[760px]:items-center"
              search={{ mode: "website" }}
              to={tagsTo}
            >
              {tagsActionLabel} →
            </Link>
          </div>
        ) : null}
        {tags.map((tag) => (
          <span
            className="border-website-border bg-website-surface font-website-display text-website-text-muted rounded-md border px-2.5 py-1 text-xs"
            key={tag}
          >
            {tag}
          </span>
        ))}
        {section !== "stack" ? (
          <Link
            className="border-website-border hover:border-website-interactive hover:text-website-interactive font-website-display text-website-text-muted rounded-md border border-dashed px-2.5 py-1 text-xs no-underline transition-colors duration-200"
            search={{ mode: "website" }}
            to={tagsTo}
          >
            + more
          </Link>
        ) : null}
      </div>
    ) : null}
  </section>
);

/** Shows up to three latest posts with frontmatter-driven thumbnails. */
const LandingBlogPreviewSection = ({
  actionLabel,
  index,
  section,
  to,
}: LandingSectionPreview): ReactElement => (
  <section
    className="relative py-4"
    id={section}
    aria-labelledby={`${section}-preview-title`}
  >
    <div className="font-website-display text-website-text-muted mb-8 flex items-baseline justify-between gap-4 text-sm tracking-tighter">
      <h2 className="m-0 font-[inherit]" id={`${section}-preview-title`}>
        {index} - blog
      </h2>
      <Link
        className="hover:text-website-interactive shrink-0 text-xs uppercase no-underline transition-colors duration-200 max-[760px]:inline-flex max-[760px]:min-h-11 max-[760px]:items-center"
        search={{ mode: "website" }}
        to={to}
      >
        {actionLabel} →
      </Link>
    </div>

    {latestPosts.length ? (
      <div className="border-website-border/20 divide-website-border/20 divide-y border-t">
        {latestPosts.map((post) => (
          <Link
            className="hover:bg-website-surface-soft/80 [[data-theme=dark]_&]:hover:bg-website-surface-soft/20 group grid grid-cols-[minmax(0,1fr)_8rem] items-center gap-6 py-4 text-inherit no-underline max-[560px]:grid-cols-[minmax(0,1fr)_5.5rem] max-[560px]:gap-4"
            key={post.slug}
            params={{ slug: post.slug }}
            search={{ mode: "website" }}
            to="/blogs/$slug"
          >
            <div className="min-w-0">
              <time
                className="font-website-display text-website-text-muted text-[11px] tracking-tighter uppercase"
                dateTime={post.date}
              >
                {formatBlogDate(post.date)}
              </time>
              <h3 className="group-hover:text-website-interactive mt-2 mb-1 line-clamp-2 text-lg leading-tight font-semibold tracking-[-0.03em] transition-colors">
                {post.title}
              </h3>
              <p className="text-website-text-muted m-0 line-clamp-1 text-sm leading-snug max-[560px]:hidden">
                {post.description}
              </p>
            </div>
            <img
              className="bg-website-surface-muted aspect-[3/2] h-auto w-full rounded-sm object-cover"
              src={landingBlogThumbnails[post.slug] ?? post.coverImage}
              alt=""
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    ) : (
      <div className="border-website-border/20 border-t py-5">
        <p className="text-website-text-muted m-0 text-sm">
          No published posts yet.
        </p>
      </div>
    )}
  </section>
);

/**
 * Renders the website-mode landing page with the portrait, intro copy, socials,
 * and section previews.
 */
export const WebsiteLandingPage = (): ReactElement => {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section
        className="flex min-h-80 flex-wrap items-center justify-center gap-10 py-10 max-[1280px]:gap-7 max-[760px]:min-h-0 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-6 max-[760px]:pt-0 max-[760px]:pb-7"
        aria-labelledby="website-intro-title"
      >
        <h1 className="sr-only" id="website-intro-title">
          Andrei Huyo-a
        </h1>
        <div className="relative h-60.5 w-60.5 shrink-0 max-[1180px]:h-55 max-[1180px]:w-55 max-[760px]:mx-auto max-[760px]:h-[min(78vw,330px)] max-[760px]:w-[min(78vw,330px)]">
          {reduceMotion ? null : <PixelStarField />}
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

        <motion.div
          className="max-w-136 min-w-80 flex-[1_1_24rem] pt-8 max-[1080px]:pt-4 max-[760px]:w-full max-[760px]:max-w-none max-[760px]:min-w-0 max-[760px]:flex-none max-[760px]:pt-0"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-website-display text-website-text-muted m-0 mb-3 text-xs leading-relaxed tracking-tighter text-balance">
            Web, Mobile &amp; Automation Developer
          </p>
          <div>
            <Link
              className="focus-visible:outline-website-interactive block w-full rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
              aria-label="Andrei Huyo-a, home"
              search={{ mode: "website" }}
              to="/"
            >
              <img
                className="website-brand-logo block h-auto w-full max-w-none"
                src={brandLogo}
                width="625"
                height="123"
                alt="Andrei Huyo-a"
              />
            </Link>
          </div>
          <p className="m-0 leading-relaxed">
            I build web and mobile apps with a focus on thoughtful design and
            reliable systems.
          </p>
          <p className="mt-3 mb-0 leading-relaxed">
            Lately, I&apos;ve been building tools and automations that make
            everyday work easier, with AI as part of how I explore, build, and
            refine them.
          </p>

          <section className="mt-6" aria-labelledby="workflow-title">
            <h2
              className="font-website-display text-website-text-muted m-0 mb-3 text-xs font-normal tracking-tighter"
              id="workflow-title"
            >
              AI In My Workflow
            </h2>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {workflowTools.map((tool) => (
                <li
                  className="border-website-border/25 bg-website-surface/60 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[13px] leading-none whitespace-nowrap"
                  key={tool.name}
                >
                  <img
                    className={`h-4 w-5 shrink-0 object-contain ${tool.monochrome ? "[[data-theme=dark]_&]:invert" : ""}`}
                    src={`/assets/WebsiteMode/hero-icons/${tool.icon}.svg`}
                    alt=""
                    width="20"
                    height="16"
                  />
                  {tool.name}
                </li>
              ))}
            </ul>
          </section>

          <nav
            className="border-website-border/20 font-website-display mt-5 flex flex-wrap justify-between gap-x-6 gap-y-1 border-t pt-3 text-xs tracking-tighter max-[480px]:grid max-[480px]:grid-cols-2 max-[480px]:gap-x-4"
            aria-label="Social links"
          >
            {socialLinks.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <a
                  className="text-website-text-muted hover:text-website-interactive focus-visible:text-website-interactive focus-visible:outline-website-interactive inline-flex min-h-11 items-center gap-2 rounded-sm no-underline transition-[color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-px motion-reduce:transition-none hover:[&_span]:underline hover:[&_span]:decoration-dotted hover:[&_span]:underline-offset-4"
                  key={link.label}
                  href={link.href}
                  aria-label={link.title ?? link.label}
                  title={link.title ?? link.label}
                  rel={external ? "noreferrer" : undefined}
                  target={external ? "_blank" : undefined}
                >
                  <img
                    className={`h-4 w-4 shrink-0 object-contain ${link.monochrome ? "[[data-theme=dark]_&]:invert" : ""}`}
                    src={`/assets/WebsiteMode/hero-icons/${link.icon}.svg`}
                    alt=""
                    width="16"
                    height="16"
                  />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>
        </motion.div>
      </section>
      <Separator />

      <div className="py-4" aria-label="Portfolio overview">
        {landingSectionPreviews.map((section) =>
          section.section === "blogs" ? (
            <LandingBlogPreviewSection {...section} key={section.section} />
          ) : (
            <LandingPreviewSection {...section} key={section.section} />
          ),
        )}
      </div>
    </>
  );
};
