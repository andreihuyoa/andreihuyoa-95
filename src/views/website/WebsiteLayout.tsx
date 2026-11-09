import { Outlet, useNavigate } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactElement } from "react";

import {
  HamburgerMenu,
  WebsiteSidebar,
} from "../../components/website/WebsiteSidebar";
import { ThemePixelTransition } from "../../components/website/ThemePixelTransition";
import { ThemeTextRevealCycle } from "../../components/website/useTextEntrance";
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
  const [textRevealCycle, setTextRevealCycle] = useState(0);
  const [transitionColor, setTransitionColor] = useState("");
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();

  useEffect(() => {
    persistWebsiteTheme(theme);

    if (theme !== "system") {
      return;
    }

    return watchSystemTheme(() => {
      applyWebsiteTheme("system");
      setTextRevealCycle((cycle) => cycle + 1);
    });
  }, [theme]);

  useEffect(
    () => () => {
      delete document.documentElement.dataset.themeTransitioning;
    },
    [],
  );

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px)");
    const closeOnDesktop = (event: MediaQueryListEvent): void => {
      if (event.matches) {
        setIsSidebarOpen(false);
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

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
    setTextRevealCycle((cycle) => cycle + 1);
  };

  const handleThemeTransitionComplete = (): void => {
    delete document.documentElement.dataset.themeTransitioning;
    setPendingTheme(null);
  };

  const handleSidebarClose = (): void => {
    setIsSidebarOpen(false);
    if (isSidebarOpen) {
      // Wait for React to remove inert from the navigation toggle's container.
      window.requestAnimationFrame(() => {
        document.getElementById("website-navigation-toggle")?.focus();
      });
    }
  };

  const layout = (
    <main className="bg-website-background font-website-sans text-website-text [&_:is(a,button,input,textarea)]:focus-visible:outline-website-interactive flex h-dvh max-h-dvh flex-col overflow-hidden text-[15px] tracking-[-0.03em] motion-reduce:*:animate-none! motion-reduce:*:scroll-auto! motion-reduce:*:transition-none! max-[760px]:h-auto max-[760px]:max-h-none max-[760px]:min-h-dvh max-[760px]:overflow-visible [&_:is(a,button,input,textarea)]:focus-visible:outline-2 [&_:is(a,button,input,textarea)]:focus-visible:outline-offset-4">
      <a
        className="bg-website-background text-website-text sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-sm focus:px-4 focus:py-3"
        href="#website-content"
        inert={isSidebarOpen}
      >
        Skip to content
      </a>
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
          onClose={handleSidebarClose}
          onOsMode={() => {
            void navigate({ to: "/", search: { mode: "os" } });
          }}
          onThemeChange={handleThemeChange}
          theme={pendingTheme ?? theme}
          themeChangeDisabled={pendingTheme !== null}
        />
        <div
          className="ml-72 h-full min-h-0 min-w-0 flex-1 [scrollbar-gutter:stable] overflow-x-hidden overflow-y-auto overscroll-contain px-20 *:mx-auto *:w-full *:max-w-5xl max-[760px]:mx-auto max-[760px]:ml-0 max-[760px]:h-auto max-[760px]:w-full max-[760px]:overflow-visible max-[760px]:px-4 max-[760px]:pt-18 min-[761px]:max-lg:px-12"
          data-website-scroll-container
          inert={isSidebarOpen}
          id="website-content"
          tabIndex={-1}
        >
          <Outlet />
        </div>
      </div>
    </main>
  );

  return (
    <ThemeTextRevealCycle value={textRevealCycle}>
      {layout}
    </ThemeTextRevealCycle>
  );
};

export default WebsiteLayout;
