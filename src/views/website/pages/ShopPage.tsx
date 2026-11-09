import { Link } from "@tanstack/react-router";
import { useState, type ReactElement } from "react";

import { SeoHead } from "../../../components/website/SeoHead";
import { ComponentReveal } from "../../../components/website/ComponentReveal";
import { TextReveal } from "../../../components/website/TextReveal";
import { DITHERKIT_RELEASE_URL } from "./ditherkit/content";

const previews = [
  { name: "PICO-8", src: "/assets/WebsiteMode/shop/ditherkit-pico8.png" },
  {
    name: "Floyd–Steinberg",
    src: "/assets/WebsiteMode/shop/ditherkit-floyd.png",
  },
  { name: "Bayer", src: "/assets/WebsiteMode/shop/ditherkit-bayer.png" },
] as const;

/** A small, interactive catalog, beginning with the available free Photoshop plugin. */
const ShopPage = (): ReactElement => {
  const [selected, setSelected] = useState(0);

  return (
    <>
      <SeoHead
        metadata={{
          title: "Shop | Andrei Huyo-a",
          description:
            "Small tools for creative work. Download Ditherkit, a free, open source Photoshop plugin for dithering and halftones.",
          canonicalPath: "/shop",
        }}
      />
      <section
        className="py-10 max-[760px]:pt-3 max-[760px]:pb-12"
        aria-labelledby="shop-title"
      >
        <header className="border-website-border/25 mb-9 border-b pb-9">
          <div className="font-website-display text-website-text-muted mb-8 flex items-center justify-between gap-4 text-xs">
            <span>07 — SHOP</span>
            <span>01 / FREE TOOLS</span>
          </div>
          <h1
            className="m-0 text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] font-normal tracking-[-0.06em]"
            id="shop-title"
          >
            <TextReveal>The tool</TextReveal>{" "}
            <span className="font-website-redaction italic">
              <TextReveal delay={0.08}>shop.</TextReveal>
            </span>
          </h1>
          <p className="text-website-text-muted mt-6 mb-0 max-w-md text-base leading-relaxed">
            <TextReveal delay={0.16}>
              Small tools I make for creative work. Starting with Ditherkit,
              free and open source.
            </TextReveal>
          </p>
        </header>

        <ComponentReveal
          as="article"
          delay={0.12}
          className="border-website-border/60 bg-website-surface overflow-hidden rounded-xl border"
        >
          <div className="bg-website-green-soft relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-5 top-5 z-1 flex items-start justify-between gap-4 max-[480px]:inset-x-3 max-[480px]:top-3">
              <span className="border-website-border/30 bg-website-background text-website-text font-website-display rounded-full border px-3 py-2 text-[11px]">
                DITHERKIT / PHOTOSHOP
              </span>
              <span className="border-website-border/30 bg-website-background text-website-text font-website-display rounded-full border px-3 py-2 text-[11px]">
                FREE ↗
              </span>
            </div>
            <Link
              className="group block overflow-hidden focus-visible:-outline-offset-4!"
              to="/projects/ditherkit"
              aria-label="Explore Ditherkit"
              search={{ mode: "website" }}
            >
              <span className="relative block aspect-[8/5]">
                {previews.map((item, index) => (
                  <img
                    className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-300 [image-rendering:pixelated] motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none ${selected === index ? "opacity-100" : "opacity-0"}`}
                    src={item.src}
                    alt={
                      selected === index
                        ? `Ditherkit sphere sample rendered with ${item.name}`
                        : ""
                    }
                    aria-hidden={selected !== index}
                    width="320"
                    height="200"
                    key={item.name}
                  />
                ))}
              </span>
            </Link>
          </div>

          <div className="border-website-border/30 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t px-6 py-3 max-[480px]:px-4">
            <p className="font-website-display text-website-text-muted m-0 text-[11px]">
              SAME IMAGE. DIFFERENT TEXTURE.
            </p>
            <div
              className="flex flex-wrap gap-1"
              role="group"
              aria-label="Preview dithering patterns"
            >
              {previews.map((item, index) => (
                <button
                  className={`font-website-display min-h-11 cursor-pointer rounded-full border px-3 text-[11px] transition-colors focus-visible:transition-none ${selected === index ? "border-website-text bg-website-text text-website-background" : "text-website-text-muted hover:border-website-border/40 hover:text-website-text border-transparent"}`}
                  key={item.name}
                  type="button"
                  aria-label={`Preview ${item.name}`}
                  aria-pressed={selected === index}
                  onClick={() => setSelected(index)}
                >
                  {item.name === "Floyd–Steinberg" ? "Floyd" : item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="border-website-border/30 border-t p-7 max-[480px]:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-website-display text-website-text-muted m-0 mb-3 text-xs">
                  01 / IMAGE MAKING
                </p>
                <h2 className="m-0 text-[clamp(2.5rem,5vw,4.5rem)] leading-none font-semibold tracking-[-0.06em]">
                  Ditherkit
                </h2>
              </div>
              <span
                className="font-website-display text-website-text-muted text-xl"
                aria-hidden="true"
              >
                ↗
              </span>
            </div>
            <p className="text-website-text-muted mt-5 mb-0 max-w-xl text-base leading-relaxed">
              Dithering, halftones, and bitmap effects from one Photoshop panel.
              Pick a pattern, tune your palette, and keep the result in a single
              undo step.
            </p>
            <div className="font-website-display text-website-text-muted mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs">
              <span>31 patterns</span>
              <span>Photoshop 2024+</span>
              <span>Open source</span>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                className="border-website-text bg-website-text text-website-background font-website-display inline-flex min-h-12 items-center justify-between gap-7 rounded-full border px-5 py-3 text-xs no-underline transition-transform duration-150 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-px max-[480px]:w-full"
                href={DITHERKIT_RELEASE_URL}
                target="_blank"
                rel="noreferrer"
              >
                Download Ditherkit <span aria-hidden="true">↗</span>
              </a>
              <Link
                className="text-website-text font-website-display inline-flex min-h-12 items-center justify-center px-4 text-xs underline decoration-dotted underline-offset-4 max-[480px]:w-full"
                to="/projects/ditherkit"
                search={{ mode: "website" }}
              >
                Try it in your browser →
              </Link>
            </div>
          </div>
        </ComponentReveal>

        <footer className="border-website-border/25 font-website-display text-website-text-muted mt-8 flex flex-wrap justify-between gap-3 border-t pt-5 text-[11px]">
          <span>MADE BY ANDREI HUYO-A</span>
          <span>TOOLS FOR MAKING THINGS.</span>
        </footer>
      </section>
    </>
  );
};

export default ShopPage;
