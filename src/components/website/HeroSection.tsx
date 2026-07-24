import { ArrowToTopRight } from "@solar-icons/react";
import type { ReactElement } from "react";

const Portrait = "/assets/WebsiteMode/andrei-portrait-cutout.png";

const socialLinks = [
  { label: "github", href: "https://github.com/andreihuyoa" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/carl-andrei-del-rosario-3bab57257/",
  },
  { label: "instagram", href: "https://www.instagram.com/unabridgedeeyore" },
  { label: "email", href: "mailto:andrei.huyoa.me@gmail.com" },
];

export const HeroSection = (): ReactElement => (
  <section
    className="flex min-h-[320px] flex-wrap items-start gap-10 p-2.5 pt-40 max-[1280px]:gap-7 max-[760px]:min-h-0 max-[760px]:flex-col max-[760px]:gap-6 max-[760px]:px-0 max-[760px]:pt-20 max-[760px]:pb-7"
    aria-labelledby="website-intro-title"
  >
    <h1 className="sr-only" id="website-intro-title">
      Andrei Huyo-a
    </h1>
    <div className="h-[242px] w-[242px] shrink-0 overflow-hidden max-[1180px]:h-[220px] max-[1180px]:w-[220px] max-[760px]:mx-auto max-[760px]:h-[min(78vw,330px)] max-[760px]:w-[min(78vw,330px)]">
      <img
        className="h-full w-full object-contain object-bottom mix-blend-luminosity contrast-[1.08] grayscale"
        src={Portrait}
        alt="Carl Andrei Del Rosario"
        width="853"
        height="861"
      />
    </div>
    <div className="max-w-[34rem] min-w-80 flex-[1_1_24rem] overflow-hidden pt-8 max-[1080px]:pt-4 max-[760px]:max-w-none max-[760px]:min-w-0 max-[760px]:pt-0">
      <p className="m-0 leading-[1.2]">
        I&apos;m a full-stack engineer. I build modern web and mobile apps, with
        a focus on practical systems, reliable APIs, and AI-assisted
        development.
      </p>
      <p className="mt-4 leading-[1.2]">
        Right now I&apos;m turning rough ideas into useful products—from
        appraisal workflows to healthcare recommendation systems.
      </p>
      <nav
        className="font-website-display flex flex-wrap gap-1.5 py-[15px] text-sm tracking-[-0.05em] [&_a]:inline-flex [&_a]:min-h-6 [&_a]:items-center [&_a]:gap-1 [&_a]:no-underline hover:[&_a]:underline hover:[&_a]:decoration-dotted"
        aria-label="Social links"
      >
        {socialLinks.map((link) => {
          const external = link.href.startsWith("http");
          return (
            <a
              key={link.label}
              href={link.href}
              rel={external ? "noreferrer" : undefined}
              target={external ? "_blank" : undefined}
            >
              {link.label}
              <ArrowToTopRight aria-hidden="true" size={13} weight="Linear" />
            </a>
          );
        })}
      </nav>
    </div>
  </section>
);
