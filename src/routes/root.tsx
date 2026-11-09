import {
  Outlet,
  useNavigate,
  useRouterState,
  useSearch,
} from "@tanstack/react-router";
import { useEffect, type ReactElement } from "react";

import App from "../App";
import { SeoHead } from "../components/website/SeoHead";
import { homeSeo } from "../seo";
import { getSavedMode, persistViewMode } from "../viewMode";
import WebsiteLayout from "../views/website/WebsiteLayout";

/** Pages that bring their own chrome instead of the website sidebar layout. */
const STANDALONE_PATHS = new Set(["/projects/ditherkit"]);
const AWAY_TITLE_EMOJIS = ["☹️", "🥺", "😭"] as const;

/** Selects website chrome for content routes and Windows mode for home only. */
const RootRouteComponent = (): ReactElement => {
  const { mode } = useSearch({ from: "__root__" });
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const navigate = useNavigate();
  const effectiveMode = pathname === "/" ? (mode ?? getSavedMode()) : "website";

  useEffect(() => {
    persistViewMode(effectiveMode);
  }, [effectiveMode]);

  useEffect(() => {
    let pageTitle = document.title;
    let awayTitle: string | undefined;
    let timer: number | undefined;
    let emojiIndex = 0;

    const updateAwayTitle = (): void => {
      // Route metadata can update the title while the page is in the background.
      if (document.title !== awayTitle) {
        pageTitle = document.title;
      }
      awayTitle = `Come back ${AWAY_TITLE_EMOJIS[emojiIndex] ?? AWAY_TITLE_EMOJIS[0]}`;
      document.title = awayTitle;
      emojiIndex = (emojiIndex + 1) % AWAY_TITLE_EMOJIS.length;
    };

    const restorePageTitle = (): void => {
      window.clearInterval(timer);
      timer = undefined;
      if (document.title === awayTitle) {
        document.title = pageTitle;
      }
      awayTitle = undefined;
    };

    const syncTitle = (): void => {
      if (document.hidden || !document.hasFocus()) {
        if (timer === undefined) {
          emojiIndex = 0;
          updateAwayTitle();
          timer = window.setInterval(updateAwayTitle, 2_000);
        }
      } else {
        restorePageTitle();
      }
    };

    document.addEventListener("visibilitychange", syncTitle);
    window.addEventListener("blur", syncTitle);
    window.addEventListener("focus", syncTitle);
    syncTitle();

    return () => {
      document.removeEventListener("visibilitychange", syncTitle);
      window.removeEventListener("blur", syncTitle);
      window.removeEventListener("focus", syncTitle);
      restorePageTitle();
    };
  }, []);

  return (
    <>
      <SeoHead metadata={homeSeo} />
      {STANDALONE_PATHS.has(pathname.replace(/\/+$/, "") || "/") ? (
        <Outlet />
      ) : effectiveMode === "os" ? (
        <App
          mode={effectiveMode}
          onModeChange={(nextMode) => {
            if (nextMode === "website") {
              void navigate({ to: "/", search: { mode: "website" } });
              return;
            }

            void navigate({ to: "/", search: { mode: "os" } });
          }}
        />
      ) : (
        <WebsiteLayout />
      )}
    </>
  );
};

export default RootRouteComponent;
