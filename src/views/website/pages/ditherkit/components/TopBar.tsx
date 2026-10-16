import { Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { DITHERKIT_REPO_URL } from "../content";

const navLink =
  "text-dk-ink-2 hover:text-dk-ink flex items-center px-4 font-dk-mono text-[11px] tracking-[0.12em] uppercase no-underline transition-colors";

/**
 * Sticky top bar: the ditherkit brand, section links, a way back to the
 * portfolio, and the accent "try it live" block flush to the right edge.
 */
export const TopBar = (): ReactElement => (
  <header className="border-dk-line bg-dk-ground sticky top-0 z-20 flex h-14 items-stretch justify-between border-b pl-4 md:pl-5">
    <a
      className="font-dk-mono text-dk-ink flex items-center gap-2.5 text-[13px] tracking-[0.04em] no-underline"
      href="#top"
    >
      {/* A 2×2 checker: the smallest possible dither. */}
      <span
        aria-hidden="true"
        className="grid size-3.5 grid-cols-2 grid-rows-2"
      >
        <span className="bg-dk-ink" />
        <span />
        <span />
        <span className="bg-dk-ink" />
      </span>
      ditherkit by andreihuyoa
    </a>
    <nav aria-label="Page" className="flex items-stretch">
      <Link
        className={`${navLink} max-lg:hidden`}
        search={{ mode: "website" }}
        to="/projects"
      >
        ← portfolio
      </Link>
      <a className={`${navLink} max-md:hidden`} href="#how">
        how it works
      </a>
      <a className={`${navLink} max-md:hidden`} href="#tool">
        the tool
      </a>
      <a className={`${navLink} max-md:hidden`} href="#install">
        install
      </a>
      <a
        className={`${navLink} max-md:hidden`}
        href={DITHERKIT_REPO_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        github
      </a>
      <a
        className="bg-dk-accent text-dk-on-accent hover:bg-dk-accent/90 flex items-center px-5 text-[15px] no-underline transition-colors md:px-6"
        href="#tool"
      >
        try it live
      </a>
    </nav>
  </header>
);
