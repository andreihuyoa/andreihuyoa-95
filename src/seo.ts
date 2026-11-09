export const siteUrl = "https://andreihuyoa.com";
export const siteName = "Andrei Huyo-a";
export const defaultOgImage = "/assets/WebsiteMode/andrei-portrait-cutout.png";

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  publishedTime?: string;
  type?: "article" | "website";
}

export const homeSeo: SeoMetadata = {
  title: "Andrei Huyo-a | Full-Stack Engineer",
  description:
    "Portfolio of Carl Andrei Del Rosario, a full-stack engineer building reliable web apps, APIs, automation, and AI-assisted product workflows.",
  canonicalPath: "/",
  ogImage: defaultOgImage,
};
