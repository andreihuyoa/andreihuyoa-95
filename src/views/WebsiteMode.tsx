import { useRef, useState, type ReactElement, type RefObject } from "react";
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

const socialLinks = [
  { label: "github", href: "https://github.com/andreihuyoa" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/carl-andrei-del-rosario-3bab57257/",
  },
  { label: "instagram", href: "https://www.instagram.com/unabridgedeeyore" },
  { label: "email", href: "mailto:andrei.huyoa.me@gmail.com" },
];

const stats = [
  { value: "2024", label: "shipping since" },
  { value: "5", label: "responsive sites delivered" },
  { value: "20", label: "support tickets / week" },
  { value: "80.7%", label: "thesis Recall@5" },
];

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

const ContentListItem = ({ item }: ContentListItemProps): ReactElement => {
  const content = (
    <>
      <div className="flex min-w-0 flex-col gap-[3px]">
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
      <time className="text-website-text-muted text-sm leading-[1.218] whitespace-nowrap max-[760px]:order-[-1] max-[760px]:text-xs">
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
    <div className="font-website-display border-website-text flex min-h-[49px] items-center justify-between gap-5 border-t py-[15px] text-sm tracking-[-0.05em]">
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

const HeroSection = (): ReactElement => (
  <section
    className="flex min-h-80 flex-wrap items-start gap-10 p-2.5 pt-40 max-[1280px]:gap-7 max-[760px]:min-h-0 max-[760px]:flex-col max-[760px]:gap-6 max-[760px]:px-0 max-[760px]:pt-20 max-[760px]:pb-7"
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
        I&apos;m a full-stack engineer. I build modern web and mobile apps, with
        a focus on practical systems, reliable APIs, and AI-assisted
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
);

const StatsSection = (): ReactElement => (
  <section
    className="border-website-border grid min-h-[100px] grid-cols-4 border-t max-[760px]:grid-cols-2"
    aria-label="Selected portfolio statistics"
  >
    {stats.map((stat, index) => (
      <div
        className={`border-website-border flex min-w-0 flex-col items-center justify-center gap-[3px] p-2.5 text-center ${index > 0 ? "border-l" : ""} ${index === 2 ? "max-[760px]:border-t max-[760px]:border-l-0" : ""} ${index === 3 ? "max-[760px]:border-t" : ""}`}
        key={stat.label}
      >
        <strong className="font-website-display text-lg font-normal tracking-[-0.05em]">
          {stat.value}
        </strong>
        <span className="text-website-text-muted text-xs leading-[1.2]">
          {stat.label}
        </span>
      </div>
    ))}
  </section>
);

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

const WebsiteMode = (): ReactElement => {
  const [activeSection, setActiveSection] =
    useState<WebsiteSectionId>("experience");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const contentRef: RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  const selectSection = (section: WebsiteSectionId): void => {
    setActiveSection(section);
    contentRef.current
      ?.querySelector<HTMLElement>(`#${section}`)
      ?.scrollIntoView({ block: "start" });
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
          <div className="min-h-full">
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
            <WebsitePageShell section="projects">
              <ContentListSection
                id="projects"
                index={sectionDetails.projects.index}
                title="projects"
                items={projects}
              />
            </WebsitePageShell>
            <WebsitePageShell section="certifications">
              <WebsitePageIntro section="certifications" />
            </WebsitePageShell>
            <WebsitePageShell section="stack">
              <ContentListSection
                id="stack"
                index={sectionDetails.stack.index}
                title="stack"
                items={stack}
              />
            </WebsitePageShell>
            <WebsitePageShell section="recommendations">
              <WebsitePageIntro section="recommendations" />
            </WebsitePageShell>
            <WebsitePageShell section="affiliations">
              <WebsitePageIntro section="affiliations" />
            </WebsitePageShell>
            <WebsitePageShell section="resources">
              <WebsitePageIntro section="resources" />
            </WebsitePageShell>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WebsiteMode;
