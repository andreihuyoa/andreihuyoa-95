import type { ReactElement } from "react";

import { MotionReveal } from "../../../components/website/MotionReveal";
import { projects } from "../../../content/website";

/**
 * Presents selected projects in a route-specific case-study list.
 */
const ProjectsPage = (): ReactElement => (
  <MotionReveal>
    <section
      className="min-h-full py-10 max-[760px]:pt-5 max-[760px]:pb-12"
      aria-labelledby="projects-title"
    >
      <header className="mb-12 max-w-2xl">
        <p className="font-website-display text-website-text-muted m-0 text-sm tracking-tighter">
          02 - selected work
        </p>
        <h1
          className="mt-3 mb-0 text-4xl leading-none font-semibold"
          id="projects-title"
        >
          Projects
        </h1>
      </header>

      <div className="border-website-border divide-website-border divide-y border-y">
        {projects.map((project) => (
          <article
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-8 py-7 max-[760px]:grid-cols-1 max-[760px]:gap-3"
            id={project.href?.replace("#", "")}
            key={project.title}
          >
            <div>
              <h2 className="m-0 text-xl leading-tight font-semibold">
                {project.title}
              </h2>
              <p className="text-website-text-muted mt-3 mb-0 max-w-3xl leading-[1.4]">
                {project.description}
              </p>
              {project.tags?.length ? (
                <ul className="font-website-display text-website-text-muted mt-5 mb-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-[11px]">
                  {project.tags.map((tag) => (
                    <li key={tag}>· {tag}</li>
                  ))}
                </ul>
              ) : null}
            </div>
            <time className="font-website-display text-website-text-muted shrink-0 text-xs">
              {project.date}
            </time>
          </article>
        ))}
      </div>
    </section>
  </MotionReveal>
);

export default ProjectsPage;
