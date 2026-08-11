import type { ReactElement } from "react";

import {
  experiences,
  pageDetails,
  projects,
  stack,
} from "../../content/website";
import { ContentListSection } from "./ContentListSection";
import { WebsitePageIntro, WebsitePageShell } from "./WebsitePageShell";

/**
 * Renders the dedicated experience route.
 */
export const WebsiteExperiencePage = (): ReactElement => (
  <WebsitePageShell section="experience">
    <ContentListSection
      id="experience"
      index={pageDetails.experience.index}
      title="experience"
      items={experiences}
    />
  </WebsitePageShell>
);

/**
 * Renders the dedicated projects route.
 */
export const WebsiteProjectsPage = (): ReactElement => (
  <WebsitePageShell section="projects">
    <ContentListSection
      id="projects"
      index={pageDetails.projects.index}
      title="projects"
      items={projects}
    />
  </WebsitePageShell>
);

/**
 * Renders the dedicated certifications route.
 */
export const WebsiteCertificationsPage = (): ReactElement => (
  <WebsitePageShell section="certifications">
    <WebsitePageIntro section="certifications" />
  </WebsitePageShell>
);

/**
 * Renders the dedicated stack route.
 */
export const WebsiteStackPage = (): ReactElement => (
  <WebsitePageShell section="stack">
    <ContentListSection
      id="stack"
      index={pageDetails.stack.index}
      title="stack"
      items={stack}
    />
  </WebsitePageShell>
);

/**
 * Renders the dedicated blog route.
 */
export const WebsiteBlogPage = (): ReactElement => (
  <WebsitePageShell section="blog">
    <WebsitePageIntro section="blog" />
  </WebsitePageShell>
);

/**
 * Renders the dedicated resources route.
 */
export const WebsiteResourcesPage = (): ReactElement => (
  <WebsitePageShell section="resources">
    <WebsitePageIntro section="resources" />
  </WebsitePageShell>
);

export { WebsiteLandingPage } from "./LandingPage";
