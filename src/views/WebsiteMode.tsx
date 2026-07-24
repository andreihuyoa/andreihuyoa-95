import { useRef, useState, type ReactElement, type RefObject } from "react";
import {
  ContentListSection,
  HeroSection,
  MotionReveal,
  StatsSection,
  WebsiteSidebar,
  type WebsiteListItem,
  type WebsiteSectionId,
} from "../components/website";

const BrandLogo = "/assets/WebsiteMode/andreihuyoa dot.svg";

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

const sectionDetails: Record<
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
  affiliations: {
    index: "06",
    description: "Communities, organizations, and affiliations will go here.",
  },
  resources: {
    index: "07",
    description: "Downloads, references, and useful resources will go here.",
  },
};

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
  const details = sectionDetails[section];

  return (
    <section className="flex min-h-[320px] flex-wrap items-start gap-10 p-2.5 max-[760px]:flex-col max-[760px]:gap-6 max-[760px]:px-0">
      <div className="h-[242px] w-[242px] shrink-0 max-[1180px]:h-[220px] max-[1180px]:w-[220px] max-[760px]:hidden" />
      <div className="max-w-[34rem] min-w-80 flex-[1_1_24rem] pt-8 max-[1080px]:pt-4 max-[760px]:max-w-none max-[760px]:min-w-0 max-[760px]:pt-0">
        <p className="font-website-display text-website-text-muted m-0 text-sm tracking-[-0.05em]">
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

const renderSection = (section: WebsiteSectionId): ReactElement => {
  switch (section) {
    case "experience":
      return (
        <>
          <MotionReveal>
            <HeroSection />
          </MotionReveal>
          <StatsSection />
          <div
            className="border-website-text mb-0 h-3 border-b-4 border-dotted"
            aria-hidden="true"
          />
          <MotionReveal>
            <ContentListSection
              id="experience"
              index={sectionDetails.experience.index}
              title="experience"
              items={experiences}
            />
          </MotionReveal>
        </>
      );
    case "projects":
      return (
        <WebsitePageShell section="projects">
          <ContentListSection
            id="projects"
            index={sectionDetails.projects.index}
            title="projects"
            items={projects}
          />
        </WebsitePageShell>
      );
    case "stack":
      return (
        <WebsitePageShell section="stack">
          <ContentListSection
            id="stack"
            index={sectionDetails.stack.index}
            title="stack"
            items={stack}
          />
        </WebsitePageShell>
      );
    default:
      return (
        <WebsitePageShell section={section}>
          <WebsitePageIntro section={section} />
        </WebsitePageShell>
      );
  }
};

const WebsiteMode = (): ReactElement => {
  const [activeSection, setActiveSection] =
    useState<WebsiteSectionId>("experience");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const contentRef: RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  const selectSection = (section: WebsiteSectionId): void => {
    setActiveSection(section);
    contentRef.current?.scrollTo({ top: 0 });
  };

  return (
    <main className="bg-website-background font-website-sans text-website-text flex h-dvh max-h-dvh flex-col overflow-hidden text-[15px] tracking-[-0.03em] motion-reduce:*:!animate-none motion-reduce:*:!scroll-auto motion-reduce:*:!transition-none max-[760px]:h-auto max-[760px]:max-h-none max-[760px]:min-h-dvh max-[760px]:overflow-visible">
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
      <a
        className="pointer-events-none fixed top-5 left-5 z-40 block w-156 max-w-none max-[760px]:left-16 max-[760px]:w-[calc(100vw-5rem)]"
        aria-label="Andrei Huyo-a, home"
      >
        <img
          className="block h-auto w-full max-w-none"
          src={BrandLogo}
          alt="Andrei Huyo-a"
        />
      </a>
      <div className="relative z-1 flex h-full min-h-0 w-full flex-1 items-start overflow-hidden max-[760px]:h-auto max-[760px]:overflow-visible">
        <WebsiteSidebar
          activeSection={activeSection}
          isMobileOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onSelectSection={selectSection}
        />
        <div
          className="ml-72 h-full min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain scroll-smooth [scrollbar-gutter:stable] max-[760px]:mx-auto max-[760px]:h-auto max-[760px]:w-[min(calc(100%_-_32px),620px)] max-[760px]:overflow-visible max-[760px]:pt-18"
          ref={contentRef}
        >
          <div className="min-h-full" key={activeSection}>
            {renderSection(activeSection)}
          </div>
        </div>
      </div>
    </main>
  );
};

export default WebsiteMode;
