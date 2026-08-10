import { Outlet, useNavigate } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactElement } from "react";

import {
  HamburgerMenu,
  WebsiteSidebar,
} from "../../components/website/WebsiteSidebar";
import { ThemePixelTransition } from "../../components/website/ThemePixelTransition";
import {
  applyWebsiteTheme,
  getSavedWebsiteTheme,
  persistWebsiteTheme,
  watchSystemTheme,
  type WebsiteTheme,
} from "../../utils/websiteTheme";

/**
 * Owns the website-mode chrome: sidebar navigation, route outlet, and theme
 * transition behavior.
 */
const WebsiteLayout = (): ReactElement => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pendingTheme, setPendingTheme] = useState<WebsiteTheme | null>(null);
  const [theme, setTheme] = useState<WebsiteTheme>(getSavedWebsiteTheme);
  const [transitionColor, setTransitionColor] = useState("");
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();

  useEffect(() => {
    persistWebsiteTheme(theme);

    if (theme !== "system") {
      return;
    }

    return watchSystemTheme(() => applyWebsiteTheme("system"));
  }, [theme]);

  useEffect(
    () => () => {
      delete document.documentElement.dataset.themeTransitioning;
    },
    [],
  );

  useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    const scrollY = window.scrollY;
    const bodyOverflow = document.body.style.overflow;
    const bodyPosition = document.body.style.position;
    const bodyTop = document.body.style.top;
    const bodyWidth = document.body.style.width;
    const rootOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = rootOverflow;
      document.body.style.overflow = bodyOverflow;
      document.body.style.position = bodyPosition;
      document.body.style.top = bodyTop;
      document.body.style.width = bodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isSidebarOpen]);

  const handleThemeChange = (nextTheme: WebsiteTheme): void => {
    if (nextTheme === theme || pendingTheme) {
      return;
    }

    if (reduceMotion) {
      setTheme(nextTheme);
      return;
    }

    const currentTextColor = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--website-text")
      .trim();

    setTransitionColor(currentTextColor);
    document.documentElement.dataset.themeTransitioning = "true";
    setPendingTheme(nextTheme);
  };

  const handleThemeCovered = (): void => {
    if (!pendingTheme) {
      return;
    }

    persistWebsiteTheme(pendingTheme);
    setTheme(pendingTheme);
  };

  const handleThemeTransitionComplete = (): void => {
    delete document.documentElement.dataset.themeTransitioning;
    setPendingTheme(null);
  };

  return (
    <main className="bg-website-background font-website-sans text-website-text flex h-dvh max-h-dvh flex-col overflow-hidden text-[15px] tracking-[-0.03em] motion-reduce:*:animate-none! motion-reduce:*:scroll-auto! motion-reduce:*:transition-none! max-[760px]:h-auto max-[760px]:max-h-none max-[760px]:min-h-dvh max-[760px]:overflow-visible">
      {pendingTheme && !reduceMotion ? (
        <ThemePixelTransition
          color={transitionColor}
          onComplete={handleThemeTransitionComplete}
          onCovered={handleThemeCovered}
        />
      ) : null}
      <div className="relative z-1 flex h-full min-h-0 w-full flex-1 items-start overflow-hidden max-[760px]:h-auto max-[760px]:overflow-visible">
        <HamburgerMenu
          isOpen={isSidebarOpen}
          onOpen={() => setIsSidebarOpen(true)}
        />
        <WebsiteSidebar
          isMobileOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onOsMode={() => {
            void navigate({ to: "/", search: { mode: "os" } });
          }}
          onThemeChange={handleThemeChange}
          theme={pendingTheme ?? theme}
          themeChangeDisabled={pendingTheme !== null}
        />
        <div className="ml-72 h-full min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain scroll-smooth px-20 [scrollbar-gutter:stable] *:mx-auto *:w-full *:max-w-5xl max-lg:px-12 max-md:mx-auto max-md:ml-0 max-md:h-auto max-md:w-full max-md:overflow-visible max-md:px-4 max-md:pt-18">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default WebsiteLayout;
