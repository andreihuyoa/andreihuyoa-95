import { getContactUrl, getMailtoUrl } from "../utils/links";

export const brandLogo = "/assets/WebsiteMode/andreihuyoa dot.svg";
export const portrait = "/assets/WebsiteMode/grad-pic-dither.png";

export type WebsiteSectionId =
  | "experience"
  | "projects"
  | "certifications"
  | "stack"
  | "recommendations"
  | "blog"
  | "resources";

export interface WebsiteListItem {
  title: string;
  description: string;
  date: string;
  href?: string;
  tags?: string[];
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

export interface WebsitePageDetail {
  index: string;
  description: string;
}

export const socialLinks = [
  { label: "github", href: getContactUrl("github") },
  { label: "linkedin", href: getContactUrl("linkedin") },
  { label: "instagram", href: getContactUrl("instagram") },
  { label: "email", href: getMailtoUrl() },
];

export const experiences: WebsiteListItem[] = [
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

export const pageDetails: Record<WebsiteSectionId, WebsitePageDetail> = {
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
    description: "Thoughts, writing, notes, engineering,and essays about tech.",
  },
  resources: {
    index: "07",
    description: "Downloads, references, and useful resources will go here.",
  },
};
