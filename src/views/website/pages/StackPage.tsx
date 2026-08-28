import type { ReactElement } from "react";

import { MotionReveal } from "../../../components/website/MotionReveal";
import { stack } from "../../../content/website";

const stackImageByTag: Record<string, string> = {
  TypeScript: "/assets/Stack/typescript.svg",
  React: "/assets/Stack/react.svg",
  "Next.js": "/assets/Stack/nextjs.svg",
  Go: "/assets/Stack/go.svg",
  Python: "/assets/Stack/python.svg",
  AWS: "/assets/Stack/aws.svg",
  Azure: "/assets/Stack/azure.svg",
  Figma: "/assets/Stack/figma.svg",
};

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
            className="border-website-border relative isolate flex min-h-40 overflow-hidden border-r border-b p-4 text-sm"
            key={tag}
          >
            <img
              className="absolute inset-0 -z-2 size-full scale-110 object-contain p-10 opacity-45 blur-xs grayscale"
              src={stackImageByTag[tag]}
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
            <div
              className="absolute inset-0 -z-2 bg-black/15"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 -z-1 bg-black/20"
              aria-hidden="true"
            />
            <div className="font-website-display text-website-text mt-auto ml-auto flex max-w-[85%] items-baseline gap-2 text-right drop-shadow-sm">
              <span className="text-website-text/70 text-[10px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{tag}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  </MotionReveal>
);

export default StackPage;
