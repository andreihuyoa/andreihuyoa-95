import { Link } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import type { ReactElement } from "react";

import { ComponentReveal } from "../../components/website/ComponentReveal";
import { TextReveal } from "../../components/website/TextReveal";
import { AnimatedBrandLogo } from "../../components/website/AnimatedBrandLogo";
import { PixelStarField } from "../../components/website/PixelStarField";
import {
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
        <TextReveal>{`${index} - ${section === "blogs" ? "blog" : section}`}</TextReveal>
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
        {rows.map((row, rowIndex) => (
          <ComponentReveal
            key={`${section}-${row.title}`}
            delay={Math.min(rowIndex * 0.04, 0.2)}
          >
            <Link
              className={`hover:bg-website-surface-soft/80 [[data-theme=dark]_&]:hover:bg-website-surface-soft/20 group gap-6 py-5 text-inherit no-underline ${row.thumbnail || row.thumbnailPlaceholder ? "grid grid-cols-[minmax(0,1fr)_8rem] items-center max-[560px]:grid-cols-[minmax(0,1fr)_5.5rem] max-[560px]:gap-4" : "flex items-baseline justify-between max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-2"}`}
              search={{ mode: "website" }}
              to={to}
            >
              <div className="min-w-0 flex-1 max-[760px]:w-full max-[760px]:flex-none">
                {(row.thumbnail || row.thumbnailPlaceholder) && row.meta ? (
                  <span className="font-website-display text-website-text-muted mb-2 block text-[11px] uppercase">
                    {row.meta}
                  </span>
                ) : null}
                <h3 className="group-hover:text-website-interactive m-0 text-[15px] leading-tight font-bold transition-colors duration-200">
                  {row.title}
                </h3>
                <p className="text-website-text-muted mt-1 mb-0 text-sm leading-[1.2]">
                  {row.description}
                </p>
              </div>
              {row.thumbnail ? (
                <span className="bg-website-surface-muted aspect-[3/2] overflow-hidden rounded-sm">
                  <img
                    src={row.thumbnail}
                    alt=""
                    loading="lazy"
                    width="192"
                    height="128"
                    className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                  />
                </span>
              ) : row.thumbnailPlaceholder ? (
                <span
                  className="border-website-border/30 bg-website-surface-muted/10 font-website-display text-website-text-muted flex aspect-[3/2] items-center justify-center rounded-sm border border-dashed text-[10px] tracking-widest"
                  role="img"
                  aria-label={`${row.title} thumbnail placeholder`}
                >
                  HILOM
                </span>
              ) : row.meta ? (
                <span className="font-website-display text-website-text-muted shrink-0 text-xs whitespace-nowrap">
                  {row.meta}
                </span>
              ) : null}
            </Link>
          </ComponentReveal>
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
        {tags.map((tag, tagIndex) => (
          <ComponentReveal
            as="span"
            delay={Math.min(tagIndex * 0.035, 0.2)}
            className="border-website-border bg-website-surface font-website-display text-website-text-muted rounded-md border px-2.5 py-1 text-xs"
            key={tag}
          >
            {tag}
          </ComponentReveal>
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
        <TextReveal>{`${index} - blog`}</TextReveal>
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
        {latestPosts.map((post, postIndex) => (
          <ComponentReveal
            key={post.slug}
            delay={Math.min(postIndex * 0.04, 0.2)}
          >
            <Link
              className="hover:bg-website-surface-soft/80 [[data-theme=dark]_&]:hover:bg-website-surface-soft/20 group grid grid-cols-[minmax(0,1fr)_8rem] items-center gap-6 py-4 text-inherit no-underline max-[560px]:grid-cols-[minmax(0,1fr)_5.5rem] max-[560px]:gap-4"
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
          </ComponentReveal>
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
        <ComponentReveal className="relative h-60.5 w-60.5 shrink-0 max-[1180px]:h-55 max-[1180px]:w-55 max-[760px]:mx-auto max-[760px]:h-[min(78vw,330px)] max-[760px]:w-[min(78vw,330px)]">
          <PixelStarField animated={!reduceMotion} />
          <div className="relative z-1 h-full w-full overflow-hidden">
            <img
              className="h-full w-full translate-y-8 scale-[1.25] object-contain object-center"
              src={portrait}
              alt="Carl Andrei Del Rosario"
              width="1086"
              height="1629"
            />
          </div>
        </ComponentReveal>

        <div className="max-w-136 min-w-80 flex-[1_1_24rem] pt-8 max-[1080px]:pt-4 max-[760px]:w-full max-[760px]:max-w-none max-[760px]:min-w-0 max-[760px]:flex-none max-[760px]:pt-0">
          <p className="font-website-display text-website-text-muted m-0 mb-3 text-xs leading-relaxed tracking-tighter text-balance">
            <TextReveal>Web, Mobile &amp; Automation Developer</TextReveal>
          </p>
          <div>
            <Link
              className="focus-visible:outline-website-interactive block w-full rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
              aria-label="Andrei Huyo-a, home"
              search={{ mode: "website" }}
              to="/"
            >
              <AnimatedBrandLogo className="website-brand-logo block h-auto w-full max-w-none" />
            </Link>
          </div>
          <p className="m-0 leading-relaxed">
            <TextReveal delay={0.08}>
              I build web and mobile apps with a focus on thoughtful design and
              reliable systems.
            </TextReveal>
          </p>
          <p className="mt-3 mb-0 leading-relaxed">
            <TextReveal delay={0.16}>
              Lately, I've been building tools and automations that make
              everyday work easier, with AI as part of how I explore, build, and
              refine them.
            </TextReveal>
          </p>

          <section className="mt-6" aria-labelledby="workflow-title">
            <h2
              className="font-website-display text-website-text-muted m-0 mb-3 text-xs font-normal tracking-tighter"
              id="workflow-title"
            >
              <TextReveal>AI In My Workflow</TextReveal>
            </h2>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {workflowTools.map((tool, toolIndex) => (
                <ComponentReveal
                  as="li"
                  delay={0.12 + toolIndex * 0.035}
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
                </ComponentReveal>
              ))}
            </ul>
          </section>

          <nav
            className="border-website-border/20 font-website-display mt-5 flex flex-wrap justify-between gap-x-6 gap-y-1 border-t pt-3 text-xs tracking-tighter max-[480px]:grid max-[480px]:grid-cols-2 max-[480px]:gap-x-4"
            aria-label="Social links"
          >
            {socialLinks.map((link, linkIndex) => {
              const external = link.href.startsWith("http");
              return (
                <ComponentReveal
                  key={link.label}
                  delay={0.16 + linkIndex * 0.035}
                >
                  <a
                    className="text-website-text-muted hover:text-website-interactive focus-visible:text-website-interactive focus-visible:outline-website-interactive inline-flex min-h-11 items-center gap-2 rounded-sm no-underline transition-[color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-px motion-reduce:transition-none hover:[&_span]:underline hover:[&_span]:decoration-dotted hover:[&_span]:underline-offset-4"
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
                </ComponentReveal>
              );
            })}
          </nav>
        </div>
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
