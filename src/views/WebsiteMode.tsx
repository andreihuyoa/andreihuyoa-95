import { Link, Outlet } from "@tanstack/react-router";
import { useState, type ReactElement } from "react";
import {
  MotionReveal,
  WebsiteSidebar,
  type WebsiteSectionId,
} from "../components/website";
import { ArrowRightUpBrokenIcon } from "@solar-icons/react";

const BrandLogo = "/assets/WebsiteMode/andreihuyoa dot.svg";
const Portrait = "/assets/WebsiteMode/andrei-portrait-cutout.png";

interface WebsiteListItem {
  title: string;
  description: string;
  date: string;
  href?: string;
  tags?: string[];
}

interface ContentListSectionProps {
  id: string;
  index: string;
  title: string;
  items: WebsiteListItem[];
}

interface ContentListItemProps {
  item: WebsiteListItem;
}

interface LandingSectionPreviewRow {
  title: string;
  description: string;
  meta: string;
}

interface LandingSectionPreview {
  section: WebsiteSectionId;
  index: string;
  actionLabel: string;
  to: `/${WebsiteSectionId}`;
  rows: LandingSectionPreviewRow[];
  tags?: string[];
  tagsActionLabel?: string;
  tagsTo?: `/${WebsiteSectionId}`;
}

const socialLinks = [
  { label: "github", href: "https://github.com/andreihuyoa" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/carl-andrei-del-rosario-3bab57257/",
  },
  { label: "instagram", href: "https://www.instagram.com/unabridgedeeyore" },
  { label: "email", href: "mailto:andrei.huyoa.me@gmail.com" },
];

// const stats = [
//   { value: "2024", label: "shipping since" },
//   { value: "5", label: "responsive sites delivered" },
//   { value: "20", label: "support tickets / week" },
//   { value: "80.7%", label: "thesis Recall@5" },
// ];

const itemClassName =
  "border-website-text grid min-h-[91px] grid-cols-[minmax(0,1fr)_auto] items-center gap-6 border-t py-2.5 text-inherit no-underline max-[760px]:grid-cols-1 max-[760px]:items-start max-[760px]:gap-2 max-[760px]:py-4";

const experiences: WebsiteListItem[] = [
  {
    title: "Full Stack Developer · Shinka Studios",
    date: "Mar 2025—Jun 2026",
    description:
      "Built and maintained the Keystone Appraisal platform, automated DOCX reports and Azure file delivery, created Python document-processing pipelines, shipped an internal data-collection extension, and delivered five responsive PH Business Network websites.",
    tags: ["Next.js", "Go / Echo", "Python", "Azure"],
  },
  {
    title: "Full Stack Developer Intern · Strastan Solutions Corp.",
    date: "Feb—Jun 2026",
    description:
      "Developed typed Next.js features for a virtual-events platform, integrated session-based authentication, and built tested AWS Lambda CRUD handlers and API Gateway endpoints with AWS CDK.",
    tags: ["Next.js 14", "TypeScript", "AWS Lambda", "AWS CDK"],
  },
  {
    title: "Frontend Developer · Freelance",
    date: "Apr—May 2024",
    description:
      "Delivered responsive desktop, tablet, and mobile layouts while debugging existing frontend issues and adapting reusable components from Figma designs.",
    tags: ["Figma", "HTML", "CSS"],
  },
];

const projects: WebsiteListItem[] = [
  {
    title: "Hilom — Healthcare Recommendation Model",
    date: "Sep—Dec 2025",
    href: "#hilom-project",
    description:
      "Led a hybrid recommendation API for healthcare facilities in Ermita, Manila, combining content-based filtering, a neural network, and Haversine distance. The model achieved 80.7% Recall@5 and 0.65 mean average precision.",
    tags: ["Python", "Flask", "Neural Network", "Amazon S3"],
  },
];

const stack: WebsiteListItem[] = [
  {
    title: "Tools I use to ship dependable web products",
    date: "Current",
    description:
      "A practical full-stack toolkit spanning typed interfaces, API services, document automation, cloud infrastructure, and product design handoff.",
    tags: [
      "TypeScript",
      "React",
      "Next.js",
      "Go",
      "Python",
      "AWS",
      "Azure",
      "Figma",
    ],
  },
];

const landingSectionPreviews: LandingSectionPreview[] = [
  {
    section: "blog",
    index: "01",
    actionLabel: "all posts",
    to: "/blog",
    rows: [
      {
        title: "Notes on practical systems and shipping useful products",
        description:
          "Short essays on full-stack engineering, automation, product decisions, and AI-assisted workflows.",
        meta: "Current",
      },
      {
        title: "Turning rough ideas into dependable interfaces",
        description:
          "What I think about when moving from prototype energy to tools people can actually use.",
        meta: "Drafts",
      },
    ],
  },
  {
    section: "experience",
    index: "02",
    actionLabel: "full history",
    to: "/experience",
    rows: [
      {
        title: "Full Stack Developer",
        description: "Shinka Studios",
        meta: "2025",
      },
      {
        title: "Full Stack Developer Intern",
        description: "Strastan Solutions Corp.",
        meta: "2026",
      },
      {
        title: "Frontend Developer",
        description: "Freelance",
        meta: "2024",
      },
    ],
    tags: [
      "TypeScript",
      "React",
      "Next.js",
      "Go",
      "Python",
      "AWS",
      "Azure",
      "Figma",
    ],
    tagsActionLabel: "view all",
    tagsTo: "/stack",
  },
  {
    section: "projects",
    index: "03",
    actionLabel: "all projects",
    to: "/projects",
    rows: [
      {
        title: "Hilom — Healthcare Recommendation Model",
        description:
          "A hybrid healthcare recommendation API using service matching, neural ranking, and Haversine distance.",
        meta: "Sep 2025",
      },
    ],
  },
  {
    section: "certifications",
    index: "04",
    actionLabel: "all certifications",
    to: "/certifications",
    rows: [
      {
        title: "Certification records",
        description:
          "Verification links and credential details for current technical certifications.",
        meta: "Soon",
      },
    ],
  },
  {
    section: "recommendations",
    index: "05",
    actionLabel: "all recommendations",
    to: "/recommendations",
    rows: [
      {
        title: "Recommendations and testimonials",
        description:
          "Notes from collaborators, mentors, and teams I have worked with.",
        meta: "Soon",
      },
    ],
  },
  {
    section: "resources",
    index: "06",
    actionLabel: "all resources",
    to: "/resources",
    rows: [
      {
        title: "Downloads and references",
        description:
          "Useful links, reference material, and resources collected in one place.",
        meta: "Soon",
      },
    ],
  },
];

const pageDetails: Record<
  WebsiteSectionId,
  { index: string; description: string }
> = {
  experience: {
    index: "01",
    description: "Work history and roles will live in this view.",
  },
  projects: {
    index: "02",
    description: "Selected projects and case studies will live in this view.",
  },
  certifications: {
    index: "03",
    description: "Certification records and verification links will go here.",
  },
  stack: {
    index: "04",
    description: "Tools, languages, and technical capabilities will go here.",
  },
  recommendations: {
    index: "05",
    description: "Recommendations and testimonials will go here.",
  },
  blog: {
    index: "06",
    description: "Writing, notes, and essays will go here.",
  },
  resources: {
    index: "07",
    description: "Downloads, references, and useful resources will go here.",
  },
};

const ContentListItem = ({ item }: ContentListItemProps): ReactElement => {
  const content = (
    <>
      <div className="flex min-w-0 flex-col gap-0.75">
        <h3 className="m-0 text-[15px] leading-[1.2] font-bold">
          {item.title}
        </h3>
        <p className="text-website-text-muted m-0 text-sm leading-[1.2]">
          {item.description}
        </p>
        {item.tags?.length ? (
          <ul
            className="font-website-display text-website-text-muted mt-1 mb-0 flex list-none flex-wrap gap-x-3 gap-y-1 p-0 text-[11px] tracking-[-0.04em]"
            aria-label={`${item.title} technologies`}
          >
            {item.tags.map((tag) => (
              <li
                className="inline-flex items-baseline gap-1 whitespace-nowrap"
                key={tag}
              >
                <span aria-hidden="true">·</span>
                <span>{tag}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <time className="text-website-text-muted text-sm leading-[1.218] whitespace-nowrap max-[760px]:-order-1 max-[760px]:text-xs">
        {item.date}
      </time>
    </>
  );

  return item.href ? (
    <a
      className={`${itemClassName} hover:[&_h3]:underline hover:[&_h3]:decoration-dotted`}
      href={item.href}
    >
      {content}
    </a>
  ) : (
    <article className={itemClassName}>{content}</article>
  );
};

const ContentListSection = ({
  id,
  index,
  title,
  items,
}: ContentListSectionProps): ReactElement => (
  <section className="scroll-mt-5" id={id} aria-labelledby={`${id}-title`}>
    <div className="font-website-display border-website-text flex min-h-12.25 items-center justify-between gap-5 border-t py-3.75 text-sm tracking-tighter">
      <h2 className="m-0 font-[inherit]" id={`${id}-title`}>
        {index} - {title}
      </h2>
    </div>
    <div>
      {items.map((item, index) => (
        <ContentListItem item={item} key={`${item.title}-${index}`} />
      ))}
    </div>
  </section>
);

const LandingPreviewSection = ({
  actionLabel,
  index,
  rows,
  section,
  tags,
  to,
  tagsActionLabel = "view all",
  tagsTo = to,
}: LandingSectionPreview): ReactElement => (
  <section
    className="relative py-12"
    id={section}
    aria-labelledby={`${section}-preview-title`}
  >
    <div className="font-website-display text-website-text-muted mb-8 flex items-baseline justify-between gap-4 text-sm tracking-tighter">
      <h2 className="m-0 font-[inherit]" id={`${section}-preview-title`}>
        {index} - {section}
      </h2>
      <Link
        className="hover:text-website-text shrink-0 text-xs uppercase no-underline"
        search={{ mode: "website" }}
        to={to}
      >
        {actionLabel} →
      </Link>
    </div>

    <div className="border-website-border divide-website-border divide-y border-y">
      {rows.map((row) => (
        <Link
          className="hover:bg-website-surface-soft group flex items-baseline justify-between gap-6 py-5 text-inherit no-underline max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-2"
          key={`${section}-${row.title}`}
          search={{ mode: "website" }}
          to={to}
        >
          <div className="min-w-0">
            <h3 className="group-hover:text-website-text-muted m-0 truncate text-[15px] leading-tight font-bold">
              {row.title}
            </h3>
            <p className="text-website-text-muted mt-1 mb-0 truncate text-sm leading-[1.2]">
              {row.description}
            </p>
          </div>
          <span className="font-website-display text-website-text-muted shrink-0 text-xs whitespace-nowrap">
            {row.meta}
          </span>
        </Link>
      ))}
    </div>

    {tags?.length ? (
      <div className="mt-7 flex flex-wrap gap-2">
        <div className="font-website-display text-website-text-muted mb-2 flex w-full items-baseline justify-between gap-4 text-xs tracking-tighter uppercase">
          <h3 className="m-0 font-[inherit]">Stack</h3>
          <Link
            className="hover:text-website-text shrink-0 no-underline"
            search={{ mode: "website" }}
            to={tagsTo}
          >
            {tagsActionLabel} →
          </Link>
        </div>
        {tags.map((tag) => (
          <span
            className="border-website-border bg-website-surface font-website-display text-website-text-muted rounded-md border px-2.5 py-1 text-xs"
            key={tag}
          >
            {tag}
          </span>
        ))}
        <Link
          className="border-website-border hover:border-website-border-strong hover:text-website-text font-website-display text-website-text-muted rounded-md border border-dashed px-2.5 py-1 text-xs no-underline"
          search={{ mode: "website" }}
          to={tagsTo}
        >
          + more
        </Link>
      </div>
    ) : null}
  </section>
);

export const WebsiteLandingPage = (): ReactElement => (
  <>
    <MotionReveal>
      <section
        className="flex min-h-80 flex-wrap items-start justify-center gap-10 pt-40 pb-8 max-[1280px]:gap-7 max-[760px]:min-h-0 max-[760px]:flex-col max-[760px]:gap-6 max-[760px]:pt-20 max-[760px]:pb-7"
        aria-labelledby="website-intro-title"
      >
        <h1 className="sr-only" id="website-intro-title">
          Andrei Huyo-a
        </h1>
        <div className="h-60.5 w-60.5 shrink-0 overflow-hidden max-[1180px]:h-55 max-[1180px]:w-55 max-[760px]:mx-auto max-[760px]:h-[min(78vw,330px)] max-[760px]:w-[min(78vw,330px)]">
          <img
            className="h-full w-full object-contain object-bottom mix-blend-luminosity contrast-[1.08] grayscale"
            src={Portrait}
            alt="Carl Andrei Del Rosario"
            width="853"
            height="861"
          />
        </div>
        <div className="max-w-136 min-w-80 flex-[1_1_24rem] overflow-hidden pt-8 max-[1080px]:pt-4 max-[760px]:max-w-none max-[760px]:min-w-0 max-[760px]:pt-0">
          <p className="m-0 leading-[1.2]">
            I&apos;m a full-stack engineer. I build modern web and mobile apps,
            with a focus on practical systems, reliable APIs, and AI-assisted
            development.
          </p>
          <p className="mt-4 leading-[1.2]">
            Right now I&apos;m turning rough ideas into useful products—from
            appraisal workflows to healthcare recommendation systems.
          </p>
          <nav
            className="font-website-display flex flex-wrap justify-between gap-1.5 py-3.75 text-sm tracking-tighter [&_a]:inline-flex [&_a]:min-h-6 [&_a]:items-center [&_a]:gap-1 [&_a]:no-underline"
            aria-label="Social links"
          >
            {socialLinks.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <a
                  className="text-website-text-muted hover:text-website-text transition-colors duration-200"
                  key={link.label}
                  href={link.href}
                  rel={external ? "noreferrer" : undefined}
                  target={external ? "_blank" : undefined}
                >
                  {link.label}
                  {external ? (
                    <ArrowRightUpBrokenIcon aria-hidden="true" size={13} />
                  ) : null}
                </a>
              );
            })}
          </nav>
        </div>
      </section>
    </MotionReveal>

    <div className="pb-10" aria-label="Portfolio overview">
      {landingSectionPreviews.map((section) => (
        <LandingPreviewSection {...section} key={section.section} />
      ))}
    </div>
  </>
);

// ! Deprecated: StatsSection is currently unused, but may be reintroduced in the future. It is kept here for reference and potential future use.
// const StatsSection = (): ReactElement => (
//   <section
//     className="border-website-border grid min-h-[100px] grid-cols-4 border-t max-[760px]:grid-cols-2"
//     aria-label="Selected portfolio statistics"
//   >
//     {stats.map((stat, index) => (
//       <div
//         className={`border-website-border flex min-w-0 flex-col items-center justify-center gap-[3px] p-2.5 text-center ${index > 0 ? "border-l" : ""} ${index === 2 ? "max-[760px]:border-t max-[760px]:border-l-0" : ""} ${index === 3 ? "max-[760px]:border-t" : ""}`}
//         key={stat.label}
//       >
//         <strong className="font-website-display text-lg font-normal tracking-[-0.05em]">
//           {stat.value}
//         </strong>
//         <span className="text-website-text-muted text-xs leading-[1.2]">
//           {stat.label}
//         </span>
//       </div>
//     ))}
//   </section>
// );

interface WebsitePageShellProps {
  children: ReactElement;
  section: WebsiteSectionId;
}

interface WebsitePageIntroProps {
  section: WebsiteSectionId;
}

const WebsitePageShell = ({
  children,
  section,
}: WebsitePageShellProps): ReactElement => (
  <MotionReveal>
    <div
      className="min-h-full pt-40 max-[760px]:pt-20"
      aria-labelledby={`${section}-title`}
    >
      {children}
    </div>
  </MotionReveal>
);

const WebsitePageIntro = ({ section }: WebsitePageIntroProps): ReactElement => {
  const details = pageDetails[section];

  return (
    <section className="flex min-h-80 flex-wrap items-start justify-center gap-10 max-[760px]:flex-col max-[760px]:gap-6">
      <div className="h-60.5 w-60.5 shrink-0 max-[1180px]:h-55 max-[1180px]:w-55 max-[760px]:hidden" />
      <div className="max-w-136 min-w-80 flex-[1_1_24rem] pt-8 max-[1080px]:pt-4 max-[760px]:max-w-none max-[760px]:min-w-0 max-[760px]:pt-0">
        <p className="font-website-display text-website-text-muted m-0 text-sm tracking-tighter">
          {details.index} - {section}
        </p>
        <h1
          className="mt-3 mb-0 text-4xl leading-none font-semibold capitalize"
          id={`${section}-title`}
        >
          {section}
        </h1>
        <p className="text-website-text-muted mt-4 mb-0 leading-[1.2]">
          {details.description}
        </p>
      </div>
    </section>
  );
};

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

export const WebsiteCertificationsPage = (): ReactElement => (
  <WebsitePageShell section="certifications">
    <WebsitePageIntro section="certifications" />
  </WebsitePageShell>
);

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

export const WebsiteRecommendationsPage = (): ReactElement => (
  <WebsitePageShell section="recommendations">
    <WebsitePageIntro section="recommendations" />
  </WebsitePageShell>
);

export const WebsiteBlogPage = (): ReactElement => (
  <WebsitePageShell section="blog">
    <WebsitePageIntro section="blog" />
  </WebsitePageShell>
);

export const WebsiteResourcesPage = (): ReactElement => (
  <WebsitePageShell section="resources">
    <WebsitePageIntro section="resources" />
  </WebsitePageShell>
);

const WebsiteMode = (): ReactElement => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="bg-website-background font-website-sans text-website-text flex h-dvh max-h-dvh flex-col overflow-hidden text-[15px] tracking-[-0.03em] motion-reduce:*:animate-none! motion-reduce:*:scroll-auto! motion-reduce:*:transition-none! max-[760px]:h-auto max-[760px]:max-h-none max-[760px]:min-h-dvh max-[760px]:overflow-visible">
      {/* Brand Logo */}
      <button
        className="border-website-border bg-website-surface-muted text-website-text shadow-website fixed top-4 left-4 z-40 flex size-10 flex-col items-center justify-center gap-1 border min-[761px]:hidden"
        type="button"
        aria-label="Open navigation"
        aria-expanded={isSidebarOpen}
        onClick={() => setIsSidebarOpen(true)}
      >
        <span className="h-px w-5 bg-current" aria-hidden="true" />
        <span className="h-px w-5 bg-current" aria-hidden="true" />
        <span className="h-px w-5 bg-current" aria-hidden="true" />
      </button>
      <Link
        className="fixed top-5 left-5 z-40 block w-156 max-w-none max-[760px]:left-16 max-[760px]:w-[calc(100vw-5rem)]"
        aria-label="Andrei Huyo-a, home"
        search={{ mode: "website" }}
        to="/"
      >
        <img
          className="block h-auto w-full max-w-none"
          src={BrandLogo}
          alt="Andrei Huyo-a"
        />
      </Link>
      <div className="relative z-1 flex h-full min-h-0 w-full flex-1 items-start overflow-hidden max-[760px]:h-auto max-[760px]:overflow-visible">
        <WebsiteSidebar
          isMobileOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="ml-72 h-full min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain scroll-smooth px-20 [scrollbar-gutter:stable] *:mx-auto *:w-full *:max-w-5xl max-lg:px-12 max-md:mx-auto max-md:ml-0 max-md:h-auto max-md:w-full max-md:overflow-visible max-md:px-4 max-md:pt-18">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default WebsiteMode;
