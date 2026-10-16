import type { ReactElement } from "react";

import { DITHERKIT_RELEASE_URL, DITHERKIT_REPO_URL } from "../content";

const STEPS = [
  <>
    Download{" "}
    <code className="font-dk-mono bg-dk-panel-2 px-1.5 text-[13px]">
      ditherkit-1.0.0.ccx
    </code>{" "}
    from the latest release.
  </>,
  <>
    Double-click it. Creative Cloud asks you to confirm a third-party plugin;
    accept.
  </>,
  <>
    Restart Photoshop. The plugin is under <em>Plugins › Ditherkit</em>.
  </>,
];

const button =
  "inline-flex h-10 items-center border px-4 font-dk-mono text-xs tracking-[0.08em] uppercase no-underline";

/** How to install the Photoshop plugin, with links to the release and source. */
export const Install = (): ReactElement => (
  <section
    aria-labelledby="install-title"
    className="px-4 pt-10 md:px-5"
    id="install"
  >
    <div className="border-dk-line flex h-11 items-center justify-between border-b">
      <span className="font-dk-mono text-dk-muted text-[11px] tracking-[0.12em] uppercase">
        install
      </span>
      <span className="font-dk-mono text-dk-muted text-[11px] tracking-[0.12em] uppercase">
        photoshop 2024 (v25) or newer
      </span>
    </div>
    <div className="border-dk-line grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] border-b max-[760px]:grid-cols-1">
      <div className="border-dk-line border-r px-5 py-8 max-[760px]:border-r-0 max-[760px]:border-b">
        <h2
          className="m-0 mb-3 text-[clamp(28px,3vw,40px)] leading-[1.1] font-light tracking-[-0.02em] text-balance"
          id="install-title"
        >
          free, open source, and yours to keep
        </h2>
        <p className="text-dk-ink-2 m-0 mb-5 max-w-[48ch]">
          Ditherkit is MIT licensed and free to use in personal and client work.
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            className={`${button} border-dk-accent bg-dk-accent text-dk-on-accent`}
            href={DITHERKIT_RELEASE_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            latest release
          </a>
          <a
            className={`${button} border-dk-ink text-dk-ink`}
            href={DITHERKIT_REPO_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            source on github
          </a>
        </div>
      </div>
      <ol className="divide-dk-line m-0 grid list-none divide-y px-5 py-8">
        {STEPS.map((step, index) => (
          <li
            className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 py-4 first:pt-0 last:pb-0"
            key={index}
          >
            <span className="bg-dk-panel-2 text-dk-ink-2 font-dk-mono grid size-5.5 place-items-center rounded-full text-[11px]">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
