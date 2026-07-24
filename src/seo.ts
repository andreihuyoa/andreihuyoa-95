export const siteUrl = "https://andreihuyoa.com";
export const siteName = "Andrei Huyo-a";
export const defaultOgImage = "/assets/WebsiteMode/andrei-portrait-cutout.png";

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
}

export const homeSeo: SeoMetadata = {
  title: "Andrei Huyo-a | Full-Stack Engineer",
  description:
    "Portfolio of Carl Andrei Del Rosario, a full-stack engineer building reliable web apps, APIs, automation, and AI-assisted product workflows.",
  canonicalPath: "/",
  ogImage: defaultOgImage,
};

const resolveUrl = (path: string): string => new URL(path, siteUrl).toString();

const upsertMeta = (
  selector: string,
  attributes: Record<string, string>,
): void => {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  const element = existing ?? document.createElement("meta");

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (!existing) {
    document.head.appendChild(element);
  }
};

const upsertLink = (
  selector: string,
  attributes: Record<string, string>,
): void => {
  const existing = document.head.querySelector<HTMLLinkElement>(selector);
  const element = existing ?? document.createElement("link");

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (!existing) {
    document.head.appendChild(element);
  }
};

export const applySeoMetadata = ({
  canonicalPath,
  description,
  ogImage = defaultOgImage,
  title,
}: SeoMetadata): void => {
  const canonicalUrl = resolveUrl(canonicalPath);
  const imageUrl = resolveUrl(ogImage);

  document.title = title;
  upsertMeta('meta[name="description"]', {
    name: "description",
    content: description,
  });
  upsertMeta('meta[property="og:title"]', {
    property: "og:title",
    content: title,
  });
  upsertMeta('meta[property="og:description"]', {
    property: "og:description",
    content: description,
  });
  upsertMeta('meta[property="og:type"]', {
    property: "og:type",
    content: "website",
  });
  upsertMeta('meta[property="og:url"]', {
    property: "og:url",
    content: canonicalUrl,
  });
  upsertMeta('meta[property="og:site_name"]', {
    property: "og:site_name",
    content: siteName,
  });
  upsertMeta('meta[property="og:image"]', {
    property: "og:image",
    content: imageUrl,
  });
  upsertMeta('meta[name="twitter:card"]', {
    name: "twitter:card",
    content: "summary_large_image",
  });
  upsertMeta('meta[name="twitter:title"]', {
    name: "twitter:title",
    content: title,
  });
  upsertMeta('meta[name="twitter:description"]', {
    name: "twitter:description",
    content: description,
  });
  upsertMeta('meta[name="twitter:image"]', {
    name: "twitter:image",
    content: imageUrl,
  });
  upsertLink('link[rel="canonical"]', {
    rel: "canonical",
    href: canonicalUrl,
  });
};
