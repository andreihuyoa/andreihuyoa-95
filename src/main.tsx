import { StrictMode } from "react";
import { ViteReactSSG } from "vite-react-ssg/single-page";
import "./index.css";
import { getAllPosts } from "./lib/blog";
import { SsgRouterRoot } from "./SsgRouterRoot";
import { createAppRouter, type AppRouter as PortfolioRouter } from "./router";

let activeRouter: PortfolioRouter | null = null;

const staticRoutes = [
  "/",
  "/experience",
  "/projects",
  "/projects/ditherkit",
  "/certifications",
  "/stack",
  "/blogs",
  "/resources",
  ...getAllPosts().map((post) => `/blogs/${post.slug}`),
];

export const includedRoutes = (): string[] => staticRoutes;

export const createRoot = ViteReactSSG(
  <StrictMode>
    <SsgRouterRoot getRouter={() => activeRouter} />
  </StrictMode>,
  async (context) => {
    activeRouter = createAppRouter(
      context.isClient ? undefined : (context.routePath ?? "/"),
    );
    // The router skips its Suspense boundary during SSG; match that on the client.
    if (context.isClient) {
      activeRouter.ssr = { manifest: undefined };
    }

    await activeRouter.load({ sync: true });
  },
);
