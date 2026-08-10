import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect, type ReactElement } from "react";
import App from "./App";
import { applySeoMetadata, homeSeo } from "./seo";
import {
  getSavedMode,
  isViewMode,
  persistViewMode,
  type ViewMode,
} from "./viewMode";
import WebsiteLayout from "./views/website/WebsiteLayout";
import {
  WebsiteBlogPage,
  WebsiteCertificationsPage,
  WebsiteExperiencePage,
  WebsiteLandingPage,
  WebsiteProjectsPage,
  WebsiteRecommendationsPage,
  WebsiteResourcesPage,
  WebsiteStackPage,
} from "./views/website/SectionPages";

interface HomeSearch {
  mode: ViewMode;
}

const validateHomeSearch = (search: Record<string, unknown>): HomeSearch => {
  return {
    mode: isViewMode(search.mode) ? search.mode : getSavedMode(),
  };
};

const RootRoute = (): ReactElement => {
  const { mode } = rootRoute.useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    applySeoMetadata(homeSeo);
    persistViewMode(mode);
  }, [mode]);

  return mode === "os" ? (
    <App
      mode={mode}
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
  );
};

const rootRoute = createRootRoute({
  validateSearch: validateHomeSearch,
  component: RootRoute,
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: WebsiteLandingPage,
});

const experienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/experience",
  component: WebsiteExperiencePage,
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: WebsiteProjectsPage,
});

const certificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/certifications",
  component: WebsiteCertificationsPage,
});

const stackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stack",
  component: WebsiteStackPage,
});

const recommendationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recommendations",
  component: WebsiteRecommendationsPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: WebsiteBlogPage,
});

const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resources",
  component: WebsiteResourcesPage,
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  experienceRoute,
  projectsRoute,
  certificationsRoute,
  stackRoute,
  recommendationsRoute,
  blogRoute,
  resourcesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const AppRouter = (): ReactElement => <RouterProvider router={router} />;
