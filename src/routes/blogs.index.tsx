import { Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { MotionReveal } from "../components/website/MotionReveal";
import { SeoHead } from "../components/website/SeoHead";
import { formatBlogDate, getAllPosts } from "../lib/blog";

const posts = getAllPosts();

/** Renders the reverse-chronological blog archive from MDX frontmatter. */
const BlogsIndexPage = (): ReactElement => (
  <>
    <SeoHead
      metadata={{
        canonicalPath: "/blogs",
        description:
          "Personal essays by Andrei Huyo-a about attention, ambition, creative work, and the systems that keep the work moving.",
        title: "Blog | Andrei Huyo-a",
      }}
    />
    <MotionReveal>
      <section aria-labelledby="blogs-title">
        <header className="mb-14 max-w-3xl">
          <p className="font-website-display text-website-text-muted m-0 text-sm tracking-tighter">
            05 - writing
          </p>
          <h1
            className="mt-3 mb-4 text-5xl leading-none font-semibold tracking-[-0.05em] max-[640px]:text-4xl"
            id="blogs-title"
          >
            Blog
          </h1>
          <p className="text-website-text-soft m-0 max-w-2xl text-lg leading-relaxed">
            Personal essays about attention, ambition, creative work, and the
            systems I use to keep moving.
          </p>
        </header>

        {posts.length ? (
          <div className="space-y-12">
            {posts.map((post) => (
              <article
                className="border-website-border grid grid-cols-[minmax(0,1fr)_minmax(13rem,20rem)] gap-8 border-t pt-8 max-[760px]:grid-cols-1 max-[760px]:gap-5"
                key={post.slug}
              >
                <div className="flex min-w-0 flex-col items-start">
                  <time
                    className="font-website-display text-website-text-muted text-xs tracking-tighter uppercase"
                    dateTime={post.date}
                  >
                    {formatBlogDate(post.date)}
                  </time>
                  <h2 className="mt-3 mb-3 text-3xl leading-tight font-semibold tracking-[-0.04em] max-[640px]:text-2xl">
                    <Link
                      className="hover:text-website-interactive text-inherit no-underline transition-colors"
                      params={{ slug: post.slug }}
                      search={{ mode: "website" }}
                      to="/blogs/$slug"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-website-text-soft mt-0 mb-5 line-clamp-1 text-base leading-relaxed max-[760px]:line-clamp-2">
                    {post.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        className="border-website-border font-website-display text-website-text-muted rounded-full border px-2.5 py-1 text-[11px]"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  className="bg-website-surface-muted aspect-[3/2] overflow-hidden rounded-sm"
                  aria-label={`Read ${post.title}`}
                  params={{ slug: post.slug }}
                  search={{ mode: "website" }}
                  to="/blogs/$slug"
                >
                  <img
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02] motion-reduce:transition-none"
                    src={post.coverImage}
                    alt=""
                    loading="lazy"
                  />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="border-website-border max-w-2xl border-t py-8">
            <p className="text-website-text-soft m-0 text-lg leading-relaxed">
              Nothing published yet. Drafts stay private until they have been
              reviewed.
            </p>
          </div>
        )}
      </section>
    </MotionReveal>
  </>
);

export default BlogsIndexPage;
