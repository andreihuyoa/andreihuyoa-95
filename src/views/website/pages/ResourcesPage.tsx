import type { ReactElement } from "react";

import { MotionReveal } from "../../../components/website/MotionReveal";

/**
 * Provides the dedicated route foundation for downloads and references.
 */
const ResourcesPage = (): ReactElement => (
  <MotionReveal>
    <section
      className="min-h-full py-10 max-[760px]:pt-5 max-[760px]:pb-12"
      aria-labelledby="resources-title"
    >
      <header className="mb-12 max-w-2xl">
        <p className="font-website-display text-website-text-muted m-0 text-sm tracking-tighter">
          06 - library
        </p>
        <h1
          className="mt-3 mb-0 text-4xl leading-none font-semibold"
          id="resources-title"
        >
          Resources
        </h1>
      </header>

      <div className="border-website-border grid grid-cols-[10rem_minmax(0,1fr)] border-y max-[640px]:grid-cols-1">
        <div className="border-website-border font-website-display text-website-text-muted border-r py-8 pr-6 text-xs max-[640px]:border-r-0 max-[640px]:border-b">
          Index / 00
        </div>
        <p className="text-website-text-muted m-0 py-8 pl-8 leading-[1.4] max-[640px]:pl-0">
          Downloads, references, and useful links will be collected here.
        </p>
      </div>
    </section>
  </MotionReveal>
);

export default ResourcesPage;
