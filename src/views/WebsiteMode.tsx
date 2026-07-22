import {
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type RefObject,
} from "react";
import {
  ContentListSection,
  HeroSection,
  MotionReveal,
  StatsSection,
  WebsiteSidebar,
  type WebsiteListItem,
  type WebsiteSectionId,
} from "../components/website";
import { loadWebsiteFonts } from "../lib/fonts";

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

interface SectionPlaceholderProps {
  section: WebsiteSectionId;
}

const SectionPlaceholder = ({
  section,
}: SectionPlaceholderProps): ReactElement => {
  const details = sectionDetails[section];

  return (
    <section
      className="border-website-text flex min-h-full flex-col border-t"
      aria-labelledby={`${section}-placeholder-title`}
    >
      <div className="font-website-display border-website-text flex min-h-12 items-center justify-between border-b py-4 text-sm">
        <span>
          {details.index} - {section}
        </span>
        <span className="text-website-text-muted">content scaffold</span>
      </div>
      <div className="flex flex-1 flex-col justify-center py-10">
        <p className="font-website-display text-website-text-muted text-sm">
          section ready
        </p>
        <h1
          className="mt-3 text-4xl font-semibold capitalize"
          id={`${section}-placeholder-title`}
        >
          {section}
        </h1>
        <p className="text-website-text-muted mt-4 max-w-md">
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
          <div className="website-dot-rule" aria-hidden="true" />
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
        <MotionReveal>
          <ContentListSection
            id="projects"
            index={sectionDetails.projects.index}
            title="projects"
            items={projects}
          />
        </MotionReveal>
      );
    case "stack":
      return (
        <MotionReveal>
          <ContentListSection
            id="stack"
            index={sectionDetails.stack.index}
            title="stack"
            items={stack}
          />
        </MotionReveal>
      );
    default:
      return <SectionPlaceholder section={section} />;
  }
};

const WebsiteMode = (): ReactElement => {
  const [activeSection, setActiveSection] =
    useState<WebsiteSectionId>("experience");
  const contentRef: RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadWebsiteFonts();
  }, []);

  const selectSection = (section: WebsiteSectionId): void => {
    setActiveSection(section);
    contentRef.current?.scrollTo({ top: 0 });
  };

  return (
    <main className="website-mode flex h-dvh flex-col overflow-hidden" id="top">
      // * Website header
      <header className="website-masthead shrink-0">
        <a
          className="website-masthead__brand"
          href="#top"
          aria-label="Andrei Huyo-a, home"
        >
          <img src={BrandLogo} alt="Andrei Huyo-a" />
        </a>
      </header>
      <div className="website-layout min-h-0 flex-1">
        <WebsiteSidebar
          activeSection={activeSection}
          onSelectSection={selectSection}
        />
        <div
          className="website-content h-full min-h-0 overflow-x-hidden overflow-y-auto"
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
