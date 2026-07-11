import { useEffect, type ReactElement } from "react";
import { loadWebsiteFonts } from "../lib/fonts";
import { Badge, ButtonLink, Panel, Row } from "../components/website";

const BrandLogo = "/assets/WebsiteMode/andrei.svg";
const Portrait = "/assets/Biography/mememe.jpg";
const ResumePdf = "/assets/Resume/Carl Andrei Del Rosario - Resume.pdf";

const projectLinks = [
  {
    href: "#project-healthcare",
    label: "Hilom",
  },
];

const thesisStack = [
  "Python",
  "Flask",
  "Neural Network",
  "Content-based filtering",
  "Amazon S3",
];

const experienceStacks = {
  shinka: ["Next.js", "Go/Echo", "Python", "Azure"],
  strastan: [
    "Next.js 14",
    "TypeScript",
    "AWS Lambda",
    "API Gateway",
    "AWS CDK",
  ],
  freelance: ["Figma", "HTML", "CSS"],
};

const formatCurrentDate = (): string =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

interface WebsiteModeProps {
  onOpenDesktop: () => void;
}

const WebsiteMode = ({ onOpenDesktop }: WebsiteModeProps): ReactElement => {
  const currentDate = formatCurrentDate();

  useEffect(() => {
    loadWebsiteFonts();
  }, []);

  return (
    <main className="bg-website-background text-website-text font-website-sans relative isolate min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[url('/assets/noise.svg')] bg-[length:300px_300px] bg-repeat opacity-30 mix-blend-multiply"
      />

      <div className="relative z-10">
        <header className="border-website-border bg-website-surface/20 font-website-sans sticky top-0 z-20 grid min-h-13 grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-b px-4 py-2 backdrop-blur-md lg:grid-cols-[auto_1fr_auto] lg:gap-4">
          <nav
            className="border-website-border order-3 col-span-2 flex w-full flex-wrap justify-between gap-x-4 gap-y-2 border-t pt-2 text-sm font-bold lg:order-1 lg:col-span-1 lg:justify-center lg:border-t-0 lg:pt-0"
            aria-label="Website sections"
          >
            <a className="hover:underline" href="#work">
              Work
            </a>
            <a className="hover:underline" href="#projects">
              Projects
            </a>
            <a className="hover:underline" href="#contact">
              Contact
            </a>
          </nav>

          <a
            className="order-1 flex items-center justify-start gap-2 text-sm font-extrabold no-underline lg:order-2 lg:justify-center"
            href="#top"
            aria-label="Andrei Huyo-a home"
          >
            <img src={BrandLogo} alt="Brand Logo" className="w-18" />
          </a>

          <button
            type="button"
            onClick={onOpenDesktop}
            aria-label="Switch to OS Mode"
            className="border-website-border-strong bg-website-surface-soft hover:bg-website-orange/20 shadow-website order-2 min-h-10 rounded-xs border-2 border-dashed p-2 text-sm font-bold transition-[transform,box-shadow,background-color] duration-75 hover:cursor-pointer active:translate-y-0.5 active:scale-[0.98] active:shadow-none lg:order-3"
          >
            Open Desktop
          </button>
        </header>

        <div
          id="top"
          className="border-website-border mx-auto grid w-[min(1320px,calc(100%-2rem))] grid-cols-1 border lg:grid-cols-[240px_minmax(0,1fr)_280px]"
        >
          <aside className="border-website-border space-y-4 border-b p-4 lg:border-r lg:border-b-0">
            <Panel title="Index">
              <nav className="font-website-sans grid gap-2 text-sm font-normal">
                <a className="hover:underline" href="#work">
                  Work experience
                </a>
                <a className="hover:underline" href="#projects">
                  Projects
                </a>
                <a className="hover:underline" href="#contact">
                  Contact
                </a>
              </nav>
            </Panel>

            <Panel title="Status">
              <div className="font-website-sans flex items-center gap-2 text-sm font-normal">
                <span className="h-2 w-2 rounded-full bg-(--website-green-dot)" />
                Available for work
              </div>
            </Panel>

            <Panel title="Contact" className="scroll-mt-20">
              <div id="contact" className="-mt-3" />
              <div className="mt-2 grid w-full gap-3">
                <ButtonLink
                  href="mailto:andrei.huyoa.me@gmail.com"
                  variant="secondary"
                >
                  Email
                </ButtonLink>
                <ButtonLink
                  href="https://www.github.com/andreihuyoa"
                  variant="secondary"
                >
                  GitHub
                </ButtonLink>
                <ButtonLink
                  href="https://www.linkedin.com/in/carl-andrei-del-rosario-3bab57257/"
                  variant="secondary"
                >
                  LinkedIn
                </ButtonLink>
              </div>
            </Panel>
          </aside>

          <div className="border-website-border space-y-4 border-b p-4 lg:border-r lg:border-b-0">
            <section className="website-panel">
              <div className="border-website-border bg-website-surface-muted grid grid-cols-1 items-center gap-3 border-b px-4 py-4 text-sm lg:grid-cols-[1fr_auto_1fr]">
                <span>{currentDate}</span>
                <h1 className="font-website-display m-0 text-left text-4xl leading-none font-extrabold tracking-[0.015em] lg:text-center">
                  Portfolio News
                </h1>
                {/* <span className="text-website-green justify-self-start font-bold lg:justify-self-end">
                Systems operational
              </span> */}
              </div>

              <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_120px]">
                <div>
                  <div className="website-label">Editor note</div>
                  <h2 className="font-website-display mt-1 text-2xl leading-tight font-extrabold tracking-[0.015em]">
                    Full stack developer building practical web systems.
                  </h2>
                  <p className="text-website-text-soft mt-2 max-w-2xl text-sm leading-6">
                    React, APIs, cloud deployments, and recommendation systems
                    from the Philippines.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <ButtonLink href={ResumePdf} variant="primary">
                      View resume
                    </ButtonLink>
                    <ButtonLink href="#contact" variant="secondary">
                      Contact
                    </ButtonLink>
                  </div>
                </div>
                <img
                  src={Portrait}
                  alt="Carl Andrei Del Rosario"
                  className="border-website-border mx-auto h-32 w-32 border object-cover lg:mx-0"
                />
              </div>
            </section>

            <Panel title="Work experience" className="scroll-mt-20">
              <div id="work" className="-mt-3" />
              <div className="flex flex-col gap-2">
                <Row
                  label="Full Stack Developer · Mar 2025–Jun 2026"
                  title="Shinka Studios"
                  meta={
                    <div className="flex flex-wrap gap-2">
                      {experienceStacks.shinka.map((technology) => (
                        <Badge key={technology}>{technology}</Badge>
                      ))}
                    </div>
                  }
                >
                  Built and maintained the Keystone Appraisal platform with
                  Next.js and Go/Echo, including automated DOCX reports,
                  Azure-based file delivery, and Python pipelines that turned
                  PDF and DOCX plats into bulk SQL inserts. Also developed an
                  internal data-collection browser extension, delivered five
                  responsive PH Business Network websites, and resolved around
                  20 support tickets each week.
                </Row>
                <Row
                  label="Full Stack Developer Intern · Feb–Jun 2026"
                  title="Strastan Solutions Corp."
                  meta={
                    <div className="flex flex-wrap gap-2">
                      {experienceStacks.strastan.map((technology) => (
                        <Badge key={technology}>{technology}</Badge>
                      ))}
                    </div>
                  }
                >
                  Developed Next.js 14 and TypeScript features for a virtual
                  events platform, integrating typed REST API clients and
                  session-based authentication. Built and tested AWS Lambda CRUD
                  handlers and API Gateway endpoints with AWS CDK, then added a
                  Postman collection to support team testing and onboarding.
                </Row>
                <Row
                  label="Frontend Developer · Apr–May 2024"
                  title="Freelance"
                  meta={
                    <div className="flex flex-wrap gap-2">
                      {experienceStacks.freelance.map((technology) => (
                        <Badge key={technology}>{technology}</Badge>
                      ))}
                    </div>
                  }
                >
                  Delivered responsive layouts across desktop, tablet, and
                  mobile, debugging existing frontend issues and adapting
                  reusable components from Figma designs for consistent
                  implementation.
                </Row>
              </div>
            </Panel>

            <Panel title="Projects" className="scroll-mt-20">
              <div id="projects" className="-mt-3" />
              <div className="flex flex-col gap-2">
                <Row
                  id="project-healthcare"
                  label="Thesis · Lead Developer & Researcher · Sep–Dec 2025"
                  title="Hilom — Healthcare Recommendation Model"
                  meta={
                    <div className="flex flex-wrap gap-2">
                      {thesisStack.map((technology) => (
                        <Badge key={technology}>{technology}</Badge>
                      ))}
                    </div>
                  }
                >
                  Built a hybrid recommendation API that matches users with
                  healthcare facilities in Ermita, Manila by combining
                  content-based filtering, a neural network, and Haversine
                  distance. The model achieved 80.7% Recall@5 and 0.65 mean
                  average precision against synthetic user data, with Amazon S3
                  used for healthcare datasets and trained models.
                </Row>
              </div>
            </Panel>
          </div>

          <aside className="space-y-4 p-4">
            <section className="website-panel">
              <div className="font-website-display border-website-border bg-website-surface-muted border-b px-3 py-2 text-sm font-bold tracking-[0.015em]">
                Jump to:
              </div>
              <div className="font-website-sans p-3 text-sm font-normal">
                <div className="space-y-1">
                  <a className="block hover:underline" href="#work">
                    Work experience
                  </a>
                  <a className="block hover:underline" href="#projects">
                    Projects
                  </a>
                  <a className="block hover:underline" href="#contact">
                    Contact
                  </a>
                </div>

                <div className="border-website-border mt-3 border-t pt-3">
                  <p className="text-xs font-bold tracking-wide uppercase">
                    Projects
                  </p>
                  <div className="mt-2 space-y-1">
                    {projectLinks.map((project) => (
                      <a
                        key={project.href}
                        className="block hover:underline"
                        href={project.href}
                      >
                        {project.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default WebsiteMode;
