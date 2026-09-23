import {
  createBrowserHistory,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { isViewMode, type ViewMode } from "./viewMode";
import { WebsiteLandingPage } from "./views/website/LandingPage";
import BlogsLayout from "./routes/blogs";
import BlogsIndexPage from "./routes/blogs.index";
import BlogPostPage from "./routes/blogs.$slug";
import RootRouteComponent from "./routes/root";
import {
  WebsiteCertificationsPage,
  WebsiteExperiencePage,
  WebsiteProjectsPage,
  WebsiteResourcesPage,
  WebsiteStackPage,
} from "./views/website/pages";

interface HomeSearch {
  mode?: ViewMode;
}

const validateHomeSearch = (search: Record<string, unknown>): HomeSearch => {
  return isViewMode(search.mode) ? { mode: search.mode } : {};
};

const rootRoute = createRootRoute({
  validateSearch: validateHomeSearch,
  component: RootRouteComponent,
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

const blogsLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "blogs-layout",
  component: BlogsLayout,
});

const blogsIndexRoute = createRoute({
  getParentRoute: () => blogsLayoutRoute,
  path: "/blogs",
  component: BlogsIndexPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => blogsLayoutRoute,
  path: "/blogs/$slug",
  component: BlogPostPage,
});

const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resources",
  component: WebsiteResourcesPage,
});

export const routeTree = rootRoute.addChildren([
  landingRoute,
  experienceRoute,
  projectsRoute,
  certificationsRoute,
  stackRoute,
  blogsLayoutRoute.addChildren([blogsIndexRoute, blogPostRoute]),
  resourcesRoute,
]);

/** Creates a browser router or a route-specific memory router for SSG. */
export const createAppRouter = (initialPath?: string) => {
  const history = initialPath
    ? createMemoryHistory({ initialEntries: [initialPath] })
    : typeof window === "undefined"
      ? undefined
      : createBrowserHistory();

  return createRouter({ routeTree, history });
};

export type AppRouter = ReturnType<typeof createAppRouter>;

declare module "@tanstack/react-router" {
  interface Register {
    router: AppRouter;
  }
}
