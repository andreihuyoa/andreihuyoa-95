import { ArrowRightUpBrokenIcon } from "@solar-icons/react";
import type { ReactElement } from "react";

import { MotionReveal } from "../../../components/website/MotionReveal";
import {
  projectCategoryLabels,
  projects,
  type ProjectCategory,
  type ProjectItem,
} from "../../../content/website";

const categories: ProjectCategory[] = ["work", "personal"];

interface ProjectEntryProps {
  project: ProjectItem;
}

/**
 * Renders one project with its metadata, description, tags, and external
 * links. Links always open in a new tab.
 */
const ProjectEntry = ({ project }: ProjectEntryProps): ReactElement => (
  <article className="py-7" id={project.href.replace("#", "")}>
    <h3 className="m-0 text-xl leading-tight font-semibold">
      {project.url ? (
        <a
          className="hover:text-website-interactive inline-flex items-center gap-1.5 text-inherit no-underline transition-colors duration-200 hover:underline hover:decoration-dotted hover:underline-offset-4"
          href={project.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {project.title}
          <ArrowRightUpBrokenIcon aria-hidden="true" size={16} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : (
        project.title
      )}
    </h3>
    {project.organization ? (
      <p className="font-website-display text-website-text-muted mt-2 mb-0 text-[11px]">
        {project.organization}
        {project.date ? ` · ${project.date.replace("—", " – ")}` : null}
      </p>
    ) : null}
    <p className="text-website-text-muted mt-3 mb-0 max-w-3xl leading-[1.4]">
      {project.description}
    </p>
    {project.highlights?.length ? (
      <ul className="text-website-text-muted mt-4 mb-0 max-w-3xl list-disc space-y-1 pl-5 leading-[1.4]">
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    ) : null}
    <ul className="font-website-display text-website-text-muted mt-5 mb-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-[11px]">
      {project.tags.map((tag) => (
        <li key={tag}>· {tag}</li>
      ))}
    </ul>
  </article>
);

/**
 * Presents selected projects grouped into work and personal projects.
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

      <div className="space-y-12">
        {categories.map((category) => {
          const items = projects.filter(
            (project) => project.category === category,
          );

          if (items.length === 0) {
            return null;
          }

          return (
            <div
              aria-labelledby={`projects-${category}-title`}
              key={category}
              role="group"
            >
              <h2
                className="font-website-display text-website-text-muted m-0 pb-3 text-sm font-normal tracking-tighter"
                id={`projects-${category}-title`}
              >
                {projectCategoryLabels[category]}
              </h2>
              <div className="border-website-border divide-website-border divide-y border-y">
                {items.map((project) => (
                  <ProjectEntry key={project.title} project={project} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  </MotionReveal>
);

export default ProjectsPage;
