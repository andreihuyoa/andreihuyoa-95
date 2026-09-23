import { Link, useParams } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { BlogMdxContent } from "../components/blog/BlogMdxContent";
import { SeoHead } from "../components/website/SeoHead";
import { formatBlogDate, getPostBySlug } from "../lib/blog";

/** Renders one frontmatter-backed MDX essay and its crawlable metadata. */
const BlogPostPage = (): ReactElement => {
  const { slug } = useParams({ from: "/blogs-layout/blogs/$slug" });
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <section
        className="mx-auto max-w-2xl py-16"
        aria-labelledby="missing-post"
      >
        <h1 className="m-0 text-4xl" id="missing-post">
          Post not found
        </h1>
        <p className="text-website-text-soft mt-4 mb-8 text-lg">
          This essay may still be a draft, or the link may have changed.
        </p>
        <Link
          className="font-website-display text-website-text-muted hover:text-website-interactive text-sm no-underline"
          search={{ mode: "website" }}
          to="/blogs"
        >
          Browse all posts →
        </Link>
      </section>
    );
  }

  const { Content } = post;

  return (
    <article className="mx-auto max-w-[75ch] pb-16">
      <SeoHead
        metadata={{
          canonicalPath: `/blogs/${post.slug}`,
          description: post.description,
          ogImage: post.coverImage,
          publishedTime: `${post.date}T00:00:00.000Z`,
          title: post.title,
          type: "article",
        }}
      />

      <header className="mx-auto mb-10 max-w-[68ch] text-center">
        <time
          className="font-website-display text-website-text-muted text-xs tracking-tighter uppercase"
          dateTime={post.date}
        >
          {formatBlogDate(post.date)}
        </time>
        <h1 className="mt-5 mb-5 text-6xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance max-[760px]:text-5xl max-[520px]:text-4xl">
          {post.title}
        </h1>
        <p className="text-website-text-soft mx-auto mt-0 mb-6 max-w-[58ch] text-xl leading-relaxed max-[640px]:text-lg">
          {post.description}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {post.tags.map((tag) => (
            <span
              className="border-website-border font-website-display text-website-text-muted rounded-full border px-2.5 py-1 text-[11px]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <figure className="mx-[calc((min(100vw-2rem,64rem)-100%)/-2)] mt-0 mb-14 max-[760px]:mx-0">
        <img
          className="bg-website-surface-muted aspect-[3/2] h-auto w-full rounded-sm object-cover"
          src={post.coverImage}
          alt={`${post.title} cover`}
          width="1440"
          height="960"
        />
      </figure>

      <div className="font-website-redaction tracking-[-0.01em]">
        <BlogMdxContent Content={Content} />
      </div>

      <section
        className="border-website-border mt-16 border-t pt-8"
        aria-labelledby="further-reading"
      >
        <h2
          className="font-website-display text-website-text-muted m-0 text-xs tracking-tighter uppercase"
          id="further-reading"
        >
          Further reading
        </h2>
        <ol className="mt-5 mb-0 space-y-3 pl-5">
          {post.references.map((reference) => (
            <li key={reference.url}>
              <a
                className="decoration-website-text-muted hover:text-website-interactive underline underline-offset-4 transition-colors"
                href={reference.url}
                rel="noreferrer"
                target="_blank"
              >
                {reference.title}
              </a>
            </li>
          ))}
        </ol>
      </section>

      <figure className="mt-14 mb-0">
        <img
          className="bg-website-surface-muted aspect-[16/10] h-auto w-full rounded-sm object-cover"
          src={post.closingImage}
          alt=""
          width="1200"
          height="750"
          loading="lazy"
        />
      </figure>
    </article>
  );
};

export default BlogPostPage;
