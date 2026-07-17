import { ArrowToTopRight } from "@solar-icons/react";
import type { ReactElement } from "react";

const BrandLogo = "/assets/WebsiteMode/andreihuyoa dot.svg";
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
  <section className="website-hero" aria-labelledby="website-intro-title">
    <div className="website-hero__portrait-wrap">
      <img
        className="website-hero__portrait"
        src={Portrait}
        alt="Carl Andrei Del Rosario"
        width="853"
        height="861"
      />
    </div>
    <div className="website-hero__copy">
      <h1 id="website-intro-title">
        <img src={BrandLogo} alt="Andrei Huyo-a" />
      </h1>
      <p>
        I&apos;m a full-stack engineer. I build modern web and mobile apps, with
        a focus on practical systems, reliable APIs, and AI-assisted
        development.
      </p>
      <p>
        Right now I&apos;m turning rough ideas into useful products—from
        appraisal workflows to healthcare recommendation systems.
      </p>
      <nav className="website-socials" aria-label="Social links">
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
