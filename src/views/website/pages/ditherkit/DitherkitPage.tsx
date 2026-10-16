import { Link } from "@tanstack/react-router";
import { useEffect, type ReactElement } from "react";

import { SeoHead } from "../../../../components/website/SeoHead";
import {
  applyWebsiteTheme,
  getSavedWebsiteTheme,
  watchSystemTheme,
} from "../../../../utils/websiteTheme";
import { Editor } from "./components/editor/Editor";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Install } from "./components/Install";
import { TopBar } from "./components/TopBar";
import { DITHERKIT_FONTS_URL, DITHERKIT_REPO_URL } from "./content";

/**
 * The Ditherkit project page at /projects/ditherkit. It renders outside the
 * portfolio's sidebar layout with its own design system (`dk-*` tokens scoped
 * to `data-site="ditherkit"`), and follows the site's saved light/dark theme.
 */
const DitherkitPage = (): ReactElement => {
  useEffect(() => {
    const theme = getSavedWebsiteTheme();
    applyWebsiteTheme(theme);

    return theme === "system"
      ? watchSystemTheme(() => applyWebsiteTheme("system"))
      : undefined;
  }, []);

  return (
    <div
      className="bg-dk-ground text-dk-ink font-dk-sans min-h-dvh text-[15px] leading-normal antialiased"
      data-site="ditherkit"
    >
      {/* Plain stylesheet link (no precedence) so the prerendered HTML and the
          client tree match during hydration. */}
      <link href={DITHERKIT_FONTS_URL} rel="stylesheet" />
      <SeoHead
        metadata={{
          canonicalPath: "/projects/ditherkit",
          description:
            "Ditherkit is a free Photoshop plugin for dithering and halftones by andreihuyoa. Try all 31 patterns on your own image in the browser.",
          title: "Ditherkit | Andrei Huyo-a",
        }}
      />
      <TopBar />
      <main>
        <Hero />
        <HowItWorks />
        <Editor />
        <Install />
      </main>
      <footer className="font-dk-mono text-dk-muted flex flex-wrap justify-between gap-3 px-4 pt-5.5 pb-10 text-[11px] tracking-[0.12em] uppercase md:px-5">
        <Link
          className="hover:text-dk-ink no-underline"
          search={{ mode: "website" }}
          to="/projects"
        >
          ditherkit · made by andreihuyoa
        </Link>
        <a
          className="hover:text-dk-ink no-underline"
          href={DITHERKIT_REPO_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          github →
        </a>
      </footer>
    </div>
  );
};

export default DitherkitPage;
