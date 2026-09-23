import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";

const mdxPlugin = mdx({ remarkPlugins: [remarkFrontmatter] });
const compileMdx = mdxPlugin.transform;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
