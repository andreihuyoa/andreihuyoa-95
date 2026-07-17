import type { ReactElement } from "react";

const BrandLogo = "/assets/WebsiteMode/andreihuyoa dot.svg";

export const WebsiteHeader = (): ReactElement => (
  <header className="website-masthead shrink-0">
    <a
      className="website-masthead__brand"
      href="#top"
      aria-label="Andrei Huyo-a, home"
    >
      <img src={BrandLogo} alt="Andrei Huyo-a" />
    </a>
  </header>
);
