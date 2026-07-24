import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const distIndexPath = resolve("dist/index.html");

const seo = {
  title: "Andrei Huyo-a | Full-Stack Engineer",
  description:
    "Portfolio of Carl Andrei Del Rosario, a full-stack engineer building reliable web apps, APIs, automation, and AI-assisted product workflows.",
};

const sections = [
  {
    title: "Experience",
    items: [
      "Full Stack Developer at Shinka Studios: Keystone Appraisal, DOCX reports, Azure delivery, Python document-processing pipelines, data-collection tooling, and responsive PH Business Network websites.",
      "Full Stack Developer Intern at Strastan Solutions Corp.: typed Next.js features, session-based authentication, AWS Lambda CRUD handlers, API Gateway, and AWS CDK.",
      "Frontend Developer freelance work: responsive desktop, tablet, and mobile layouts adapted from Figma designs.",
    ],
  },
  {
    title: "Projects",
    items: [
      "Hilom healthcare recommendation model for facilities in Ermita, Manila using content-based filtering, a neural network, and Haversine distance.",
    ],
  },
  {
    title: "Stack",
    items: [
      "TypeScript, React, Next.js, Go, Python, AWS, Azure, Figma, API services, document automation, and product design handoff.",
    ],
  },
  {
    title: "Contact",
    items: [
      "Email: andrei.huyoa.me@gmail.com. GitHub: github.com/andreihuyoa. LinkedIn: Carl Andrei Del Rosario.",
    ],
  },
];

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const prerenderedContent = `
    <div id="root"><main data-prerendered="true">
      <h1>${escapeHtml(seo.title)}</h1>
      <p>${escapeHtml(seo.description)}</p>
      ${sections
        .map(
          (section) => `
      <section>
        <h2>${escapeHtml(section.title)}</h2>
        <ul>
          ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n          ")}
        </ul>
      </section>`,
        )
        .join("\n")}
    </main></div>`;

const html = await readFile(distIndexPath, "utf8");

if (!html.includes('<div id="root"></div>')) {
  throw new Error("Could not find empty root element in dist/index.html");
}

await writeFile(
  distIndexPath,
  html.replace('    <div id="root"></div>', prerenderedContent),
);
