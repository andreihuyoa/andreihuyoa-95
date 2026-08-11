import type { ReactElement } from "react";

import { MotionReveal } from "../../../components/website/MotionReveal";
import { stack } from "../../../content/website";

/**
 * Displays the current technical stack as a dedicated tool index.
 */
const StackPage = (): ReactElement => (
  <MotionReveal>
    <section
      className="min-h-full py-10 max-[760px]:pt-5 max-[760px]:pb-12"
      aria-labelledby="stack-title"
    >
      <header className="mb-12 max-w-2xl">
        <p className="font-website-display text-website-text-muted m-0 text-sm tracking-tighter">
          04 - toolkit
        </p>
        <h1
          className="mt-3 mb-0 text-4xl leading-none font-semibold"
          id="stack-title"
        >
          Stack
        </h1>
        <p className="text-website-text-muted mt-4 mb-0 leading-[1.4]">
          {stack[0]?.description}
        </p>
      </header>

      <ul className="border-website-border grid list-none grid-cols-4 border-t border-l p-0 max-[900px]:grid-cols-3 max-[640px]:grid-cols-2">
        {stack[0]?.tags?.map((tag, index) => (
          <li
            className="border-website-border font-website-display flex min-h-28 items-end border-r border-b p-4 text-sm"
            key={tag}
          >
            <span className="text-website-text-muted mr-2 text-[10px]">
              {String(index + 1).padStart(2, "0")}
            </span>
            {tag}
          </li>
        ))}
      </ul>
    </section>
  </MotionReveal>
);

export default StackPage;
