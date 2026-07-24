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
import { getSavedMode, isViewMode, type ViewMode } from "./viewMode";

interface HomeSearch {
  mode: ViewMode;
}

const rootRoute = createRootRoute();

const validateHomeSearch = (search: Record<string, unknown>): HomeSearch => {
  return {
    mode: isViewMode(search.mode) ? search.mode : getSavedMode(),
  };
};

const HomeRoute = (): ReactElement => {
  const { mode } = homeRoute.useSearch();
  const navigate = useNavigate({ from: homeRoute.fullPath });

  useEffect(() => {
    applySeoMetadata(homeSeo);
  }, []);

  return (
    <App
      mode={mode}
      onModeChange={(nextMode) => {
        void navigate({
          search: (previous) => ({ ...previous, mode: nextMode }),
        });
      }}
    />
  );
};

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  validateSearch: validateHomeSearch,
  component: HomeRoute,
});

const routeTree = rootRoute.addChildren([homeRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const AppRouter = (): ReactElement => <RouterProvider router={router} />;
