import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import { existsSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";

const mdxPlugin = mdx({ remarkPlugins: [remarkFrontmatter] });
const compileMdx = mdxPlugin.transform;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "prerendered-preview-routes",
      configurePreviewServer(server) {
        const output = resolve(server.config.root, server.config.build.outDir);
        server.middlewares.use((request, _response, next) => {
          const url = new URL(request.url ?? "/", "http://localhost");
          if (
            (request.method === "GET" || request.method === "HEAD") &&
            !url.pathname.endsWith("/")
          ) {
            const page = resolve(output, `.${url.pathname}`, "index.html");
            const withinOutput = relative(output, page);
            if (
              !withinOutput.startsWith("..") &&
              !isAbsolute(withinOutput) &&
              existsSync(page)
            ) {
              request.url = `${url.pathname}/index.html${url.search}`;
            }
          }
          next();
        });
      },
    },
    {
      enforce: "pre",
      ...mdxPlugin,
      transform(source, id) {
        if (id.includes("?raw")) {
          return null;
        }

        return compileMdx.call(this, source, id);
      },
    },
    react({ include: /\.(jsx|tsx|mdx)$/ }),
  ],
  ssgOptions: {
    beastiesOptions: false,
    concurrency: 1,
    dirStyle: "nested",
    entry: "src/main.tsx",
  },
});
