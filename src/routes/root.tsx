import { useNavigate, useRouterState, useSearch } from "@tanstack/react-router";
import { useEffect, type ReactElement } from "react";

import App from "../App";
import { SeoHead } from "../components/website/SeoHead";
import { homeSeo } from "../seo";
import { getSavedMode, persistViewMode } from "../viewMode";
import WebsiteLayout from "../views/website/WebsiteLayout";

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

  return (
    <>
      <SeoHead metadata={homeSeo} />
      {effectiveMode === "os" ? (
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
