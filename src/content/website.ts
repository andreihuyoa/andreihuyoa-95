import { getContactUrl, getMailtoUrl } from "../utils/links";

export const brandLogo = "/assets/WebsiteMode/andreihuyoa dot.svg";
export const portrait = "/assets/WebsiteMode/grad-pic-dither.png";

export type WebsiteSectionId =
  | "experience"
  | "projects"
  | "certifications"
  | "stack"
  | "blog"
  | "resources";

export interface WebsiteListItem {
  title: string;
  description: string;
  date: string;
  href?: string;
  tags?: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  summary: string;
  responsibilities: string[];
  tags: string[];
}

export interface LandingSectionPreviewRow {
  title: string;
  description: string;
  meta: string;
}

export interface LandingSectionPreview {
  section: WebsiteSectionId;
  index: string;
  actionLabel: string;
  to: `/${WebsiteSectionId}`;
  rows: LandingSectionPreviewRow[];
  tags?: string[];
  tagsActionLabel?: string;
  tagsTo?: `/${WebsiteSectionId}`;
}

export const socialLinks = [
  { label: "github", href: getContactUrl("github") },
  { label: "linkedin", href: getContactUrl("linkedin") },
  { label: "instagram", href: getContactUrl("instagram") },
  { label: "email", href: getMailtoUrl() },
];

// Experience
export const experiences: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "Shinka Studios",
    date: "Mar 2025—Jun 2026",
    summary:
      "Worked across product development and internal tooling, mainly on appraisal workflows, document automation, and client websites.",
    responsibilities: [
      "Built and maintained features for the Keystone Appraisal platform across its Next.js frontend and Go services, including fixes to the data flow between both sides of the application.",
      "Automated DOCX appraisal reports and Azure file delivery, then built Python pipelines to process the source documents used by those workflows.",
      "Created an internal data-collection extension and supporting tools that made report generation and day-to-day operational work easier to track.",
      "Delivered five responsive PH Business Network websites, handling desktop and mobile layouts as well as production fixes after release.",
    ],
    tags: ["Next.js", "Go / Echo", "Python", "Azure"],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Strastan Solutions Corp.",
    date: "Feb—Jun 2026",
    summary:
      "Contributed to a virtual-events platform while getting hands-on experience with its frontend, authentication flow, and serverless backend.",
    responsibilities: [
      "Led a six-person development team, coordinating tasks and keeping the group aligned as features moved from planning into implementation.",
      "Developed typed Next.js features and worked within the existing component and application patterns instead of treating each screen as a standalone build.",
      "Integrated session-based authentication and connected protected user flows to the platform's backend behavior.",
      "Built and tested AWS Lambda CRUD handlers and API Gateway endpoints, with infrastructure defined through AWS CDK.",
      "Traced issues across the interface and serverless services, documenting and testing fixes before they were folded back into the main application.",
    ],
    tags: ["Next.js 14", "TypeScript", "AWS Lambda", "AWS CDK"],
  },
  {
    role: "Frontend Developer",
    company: "Freelance",
    date: "Apr—May 2024",
    summary:
      "Turned supplied designs into responsive pages while working around the constraints of an existing frontend codebase.",
    responsibilities: [
      "Translated Figma layouts into desktop, tablet, and mobile interfaces while keeping spacing and content behavior consistent across breakpoints.",
      "Adapted existing components where possible and added focused pieces only when the current UI could not support the design.",
      "Investigated and fixed frontend issues that affected layout, styling, and responsive behavior during delivery.",
    ],
    tags: ["React", "Tailwind CSS", "Figma", "HTML", "CSS"],
  },
];

// Projects
export const projects: WebsiteListItem[] = [
  {
    title: "Hilom — Healthcare Recommendation Model",
    date: "Sep—Dec 2025",
    href: "#hilom-project",
    description:
      "Led a hybrid recommendation API for healthcare facilities in Ermita, Manila, combining content-based filtering, a neural network, and Haversine distance. The model achieved 80.7% Recall@5 and 0.65 mean average precision.",
    tags: ["Python", "Flask", "Neural Network", "Amazon S3"],
  },
];

// Stack
export const stack: WebsiteListItem[] = [
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

export const landingSectionPreviews: LandingSectionPreview[] = [
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
    section: "resources",
    index: "05",
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
