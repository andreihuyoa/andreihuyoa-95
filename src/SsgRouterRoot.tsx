import { RouterProvider } from "@tanstack/react-router";
import type { ReactElement } from "react";

import type { AppRouter } from "./router";

interface SsgRouterRootProps {
  getRouter: () => AppRouter | null;
}

/** Renders the router instance initialized by the SSG lifecycle. */
export const SsgRouterRoot = ({
  getRouter,
}: SsgRouterRootProps): ReactElement | null => {
  const router = getRouter();

  return router ? <RouterProvider router={router} /> : null;
};
