import type { ReactElement } from "react";
import { useDesignMode } from "../components/mode/use-design-mode";
import {
  Badge,
  ButtonLink,
  Panel,
  Row,
} from "../components/website";

const Logo = "/assets/a.svg";
const Portrait = "/assets/Biography/mememe.jpg";
const ResumePdf = "/assets/Resume/Carl Andrei Del Rosario - Resume.pdf";

const skills = ["TypeScript", "React", "Next.js", "Go", "Python", "AWS"];
const projectLinks = [
  {
    href: "#project-healthcare",
    label: "Healthcare Recommendation API Model",
  },
  { href: "#project-lokalista", label: "Lokalista" },
];

const WebsiteMode = (): ReactElement => {
  const { setMode } = useDesignMode();

  return (
    <main className="bg-website-background text-website-text min-h-screen">
      <header className="border-website-border/70 bg-website-surface/65 sticky top-0 z-20 grid min-h-[52px] grid-cols-[auto_1fr_auto] items-center gap-4 border-b px-4 py-2 backdrop-blur-md max-md:grid-cols-1 max-md:justify-items-start">
        <a
          className="flex items-center gap-2 text-sm font-extrabold no-underline"
          href="#top"
          aria-label="Andrei Huyo-a home"
        >
          <img
            src={Logo}
            alt=""
            aria-hidden="true"
            className="h-7 w-7 brightness-0"
          />
          <span>Andrei Huyo-a</span>
        </a>

        <nav
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-bold max-md:justify-start"
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

        <button
          type="button"
          onClick={() => setMode("os")}
          aria-label="Switch to OS Mode"
          className="border-website-border-strong bg-website-surface-soft min-h-10 border px-3 py-2 text-sm font-bold hover:bg-(--website-green-soft) focus:outline-2 focus:outline-offset-2 focus:outline-(--website-green)"
        >
          Open Desktop
        </button>
      </header>

      <div
        id="top"
        className="border-website-border mx-auto grid w-[min(1320px,calc(100%-2rem))] grid-cols-[240px_minmax(0,1fr)_280px] border max-xl:grid-cols-[220px_minmax(0,1fr)] max-lg:grid-cols-1"
      >
        <aside className="border-website-border space-y-4 border-r p-4 max-lg:border-r-0">
          <Panel title="Index">
            <nav className="grid gap-2 text-sm font-bold">
              <a className="hover:underline" href="#work">
                Work experience
              </a>
              <a className="hover:underline" href="#projects">
                Projects
              </a>
              <a className="hover:underline" href="#stack">
                Stack
              </a>
              <a className="hover:underline" href="#contact">
                Contact
              </a>
            </nav>
          </Panel>

          <Panel title="Status">
            <div className="flex items-center gap-2 text-sm font-bold">
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

        <div className="border-website-border space-y-4 border-r p-4 max-lg:border-r-0">
          <section className="website-panel">
            <div className="border-website-border bg-website-surface-muted grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b px-4 py-4 text-sm max-md:grid-cols-1">
              <span>Wednesday, April 29, 2026</span>
              <h1 className="m-0 text-center text-4xl leading-none font-extrabold max-md:text-left">
                Portfolio News
              </h1>
              {/* <span className="text-website-green justify-self-end font-bold max-md:justify-self-start">
                Systems operational
              </span> */}
            </div>

            <div className="grid grid-cols-[1fr_120px] gap-4 p-4 max-sm:grid-cols-1">
              <div>
                <div className="website-label">Editor note</div>
                <h2 className="mt-1 text-2xl leading-tight font-extrabold">
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
                className="border-website-border h-32 w-32 border object-cover"
              />
            </div>
          </section>

          <Panel title="Work experience" className="scroll-mt-20">
            <div id="work" className="-mt-3" />
            <div className="flex flex-col gap-2">
              <Row label="Industry" title="Shinka Studios">
                Built and maintained land sales application features with
                Next.js and Go.
              </Row>
              <Row label="Product" title="Lokalista">
                Led a freelancer management platform with payments and email
                workflows.
              </Row>
              <Row label="Automation" title="Browser extension refactors">
                Improved scraping automation and data flow between browser,
                frontend, and backend systems.
              </Row>
            </div>
          </Panel>

          <Panel title="Projects" className="scroll-mt-20">
            <div id="projects" className="-mt-3" />
            <div className="flex flex-col gap-2">
              <Row
                id="project-healthcare"
                label="Thesis"
                title="Healthcare Recommendation API Model"
              >
                Flask API and ranking model recommending hospitals from
                location, services, facility data, and feedback.
              </Row>
              <Row id="project-lokalista" label="Platform" title="Lokalista">
                Freelancer management platform with payment workflows and admin
                tooling.
              </Row>
              <Row
                id="project-browser"
                label="Automation"
                title="Browser extension refactors"
              >
                Improved extension architecture and data flow across client and
                backend layers.
              </Row>
            </div>
          </Panel>

          <Panel title="Stack" className="scroll-mt-20">
            <div id="stack" className="-mt-3" />
            <div className="mt-1 flex flex-wrap gap-2.5 pb-1">
              {skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </Panel>
        </div>

        <aside className="space-y-4 p-4 max-lg:pb-4">
          <section className="website-panel">
            <div className="border-website-border bg-website-surface-muted border-b px-3 py-2 text-sm font-bold">
              Jump to:
            </div>
            <div className="p-3 text-sm">
              <div className="space-y-1">
                <a className="block hover:underline" href="#work">
                  Work experience
                </a>
                <a className="block hover:underline" href="#projects">
                  Projects
                </a>
                <a className="block hover:underline" href="#stack">
                  Stack
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
    </main>
  );
};

export default WebsiteMode;
