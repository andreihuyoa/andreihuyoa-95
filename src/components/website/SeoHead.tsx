import type { ReactElement } from "react";
import { Head } from "vite-react-ssg/single-page";

import { defaultOgImage, siteName, siteUrl, type SeoMetadata } from "../../seo";

const resolveUrl = (path: string): string => new URL(path, siteUrl).toString();

interface SeoHeadProps {
  metadata: SeoMetadata;
}

/** Renders crawlable route-specific metadata during SSG and client navigation. */
export const SeoHead = ({ metadata }: SeoHeadProps): ReactElement => {
  const canonicalUrl = resolveUrl(metadata.canonicalPath);
  const imageUrl = resolveUrl(metadata.ogImage ?? defaultOgImage);

  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content={metadata.type ?? "website"} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={imageUrl} />
      {metadata.publishedTime ? (
        <meta
          property="article:published_time"
          content={metadata.publishedTime}
        />
      ) : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={imageUrl} />
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
};
