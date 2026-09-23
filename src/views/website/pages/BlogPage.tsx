import type { ReactElement } from "react";

import { MotionReveal } from "../../../components/website/MotionReveal";

/**
 * Provides the editorial route foundation for future writing.
 */
const BlogPage = (): ReactElement => (
  <MotionReveal>
    <section
      className="min-h-full py-10 max-[760px]:pt-5 max-[760px]:pb-12"
      aria-labelledby="blog-title"
    >
      <header className="mb-16 max-w-3xl">
        <p className="font-website-display text-website-text-muted m-0 text-sm tracking-tighter">
          05 - notes
        </p>
        <h1
          className="mt-3 mb-0 text-4xl leading-none font-semibold"
          id="blog-title"
        >
          Blog
        </h1>
      </header>
    </section>
  </MotionReveal>
);

export default BlogPage;
