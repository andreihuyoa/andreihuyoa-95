import { getLatestCertifications } from "../lib/certifications";
import { getContactUrl } from "../utils/links";

export const brandLogo = "/assets/WebsiteMode/andreihuyoa dot.svg";
export const portrait = "/assets/WebsiteMode/grad-pic-dither.png";

export type WebsiteSectionId =
  | "experience"
  | "projects"
  | "certifications"
  | "stack"
  | "blogs"
  | "resources";

export interface WebsiteListItem {
  title: string;
  description: string;
  date: string;
  href?: string;
  sourceUrl?: string;
  tags?: string[];
}

export type ProjectCategory = "work" | "personal";

export interface ProjectItem {
  title: string;
  category: ProjectCategory;
  /** Employer or client the project was built for (work projects). */
  organization?: string;
  /** Resume date range, e.g. "Mar 2025—Aug 2026". */
  date?: string;
  href: string;
  description: string;
  /** Key contributions shown as a short list under the description. */
  highlights?: string[];
  /** External link on the title, always opened in a new tab. */
  url?: string;
  /** Live page for the project. When set, the title links here and `url` becomes a GitHub button. */
  liveTo?: "/projects/ditherkit";
  tags: string[];
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
  meta?: string;
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
];

// Experience
export const experiences: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "Shinka Studios",
    date: "Mar 2025—Aug 2026",
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
export const projectCategoryLabels: Record<ProjectCategory, string> = {
  work: "Work projects",
  personal: "Personal projects",
};

/**
 * Staging (staging.phbusinessnetwork.com) is currently down, so the PH Business
 * Network entry links to the production site instead.
 */
export const projects: ProjectItem[] = [
  {
    title: "PH Business Network",
    category: "work",
    organization: "Shinka Studios",
    date: "Mar 2025—Aug 2026",
    href: "#phbn-project",
    description:
      "Rebuilt the website frontend in Next.js to improve SEO readiness, site structure, user experience, and maintainable MDX content. Joined stakeholder meetings to gather requirements, review progress, and align implementation with business goals.",
    highlights: [
      "Improved SEO readiness across the site.",
      "Reworked the landing page: hero, past events, partner brands, and community sections.",
      "Handled the event photos: galleries, albums, and image viewing on desktop and mobile.",
    ],
    url: "https://phbusinessnetwork.com/",
    tags: ["Next.js", "MDX", "Tailwind CSS", "Motion"],
  },
  {
    title: "Keystone Appraisal Platform",
    category: "work",
    organization: "Shinka Studios",
    date: "Mar 2025—Aug 2026",
    href: "#keystone-project",
    description:
      "Built and maintained features across the Next.js frontend and Go services of a land sales appraisal platform, automated DOCX appraisal reports with Azure file delivery, and created internal tooling for report generation and operational visibility. Internal product, no public link.",
    tags: ["Next.js", "Go / Echo", "Python", "Azure"],
  },
  {
    title: "Ditherkit — Photoshop Dithering Plugin",
    category: "personal",
    href: "#ditherkit-project",
    description:
      "An open source Photoshop plugin for dithering and halftones: 31 patterns, palette tools, and a zoomable live preview, with each Dither applied as a single undo step. Built on Bolt UXP with a React webview UI, a shared design system for future plugins, and a tested TypeScript image engine.",
    url: "https://github.com/andreihuyoa/rea-photoshop-plugins",
    liveTo: "/projects/ditherkit",
    tags: ["TypeScript", "React", "Photoshop UXP", "Image Processing"],
  },
  {
    title: "Fig — Personal Saves Library",
    category: "personal",
    href: "#fig-project",
    description:
      "An iOS-first personal saved links library for keeping, organizing, searching, and returning to saved links across social media and the web that matter. Currently in active development with SwiftUI and SwiftData, alongside a lightweight macOS menu-bar companion.",
    url: "https://github.com/andreihuyoa/consider-it-done",
    tags: ["SwiftUI", "SwiftData", "iOS", "macOS"],
  },
  {
    title: "Hilom — Healthcare Recommendation API Model",
    category: "personal",
    href: "#hilom-project",
    description:
      "Led a hybrid recommendation API for healthcare facilities in Ermita, Manila, combining content-based filtering, a neural network, and Haversine distance. The model achieved 80.7% Recall@5 and 0.65 mean average precision.",
    url: "https://csrp.andreihuyoa.dev/",
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
    section: "experience",
    index: "01",
    actionLabel: "all history",
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
  },
  {
    section: "projects",
    index: "02",
    actionLabel: "all projects",
    to: "/projects",
    rows: [
      {
        title: "PH Business Network",
        description:
          "Rebuilt the Next.js website frontend for SEO, structure, and maintainable MDX content at Shinka Studios.",
        meta: "work",
      },
      {
        title: "Ditherkit — Photoshop Dithering Plugin",
        description:
          "An open source Photoshop plugin with 31 dithering and halftone patterns, palette tools and a live preview.",
        meta: "personal",
      },
      {
        title: "Fig — Personal Link Library",
        description:
          "An iOS-first SwiftUI and SwiftData app for saving, organizing, and returning to links that matter.",
        meta: "personal",
      },
      {
        title: "Hilom — Healthcare Recommendation Model",
        description:
          "A hybrid healthcare recommendation API using service matching, neural ranking, and Haversine distance.",
        meta: "personal",
      },
    ],
  },
  {
    section: "blogs",
    index: "03",
    actionLabel: "all posts",
    to: "/blogs",
    rows: [],
  },
  {
    section: "certifications",
    index: "04",
    actionLabel: "all certifications",
    to: "/certifications",
    rows: getLatestCertifications(3).map((certification) => ({
      title: certification.title,
      description: certification.issuer,
      meta: certification.issuedOn.slice(0, 4),
    })),
  },
  {
    section: "stack",
    index: "05",
    actionLabel: "view all",
    to: "/stack",
    rows: [],
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
