import type { MDXComponents } from "mdx/types";
import type { ComponentType, ReactElement } from "react";

interface BlogMdxContentProps {
  Content: ComponentType<{ components?: MDXComponents }>;
}

const components: MDXComponents = {
  a: ({ href, ...props }) => {
    const external = href?.startsWith("http") ?? false;

    return (
      <a
        {...props}
        className="decoration-website-text-muted hover:text-website-interactive underline decoration-1 underline-offset-4 transition-colors"
        href={href}
        rel={external ? "noreferrer" : undefined}
        target={external ? "_blank" : undefined}
      />
    );
  },
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-website-border text-website-text-soft my-10 border-l-2 pl-6 text-2xl leading-[1.4] italic [font-synthesis:style] max-[640px]:pl-4 max-[640px]:text-xl"
    />
  ),
  code: (props) => (
    <code
      {...props}
      className="bg-website-surface-muted rounded px-1.5 py-0.5 font-mono text-[0.88em]"
    />
  ),
  em: (props) => <em {...props} className="italic [font-synthesis:style]" />,
  h2: (props) => (
    <h2
      {...props}
      className="mt-14 mb-5 text-3xl leading-tight font-semibold tracking-[-0.04em] max-[640px]:text-2xl"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="mt-10 mb-4 text-2xl leading-tight font-semibold tracking-[-0.03em] max-[640px]:text-xl"
    />
  ),
  hr: (props) => (
    <hr {...props} className="border-website-border my-12 border-0 border-t" />
  ),
  img: (props) => (
    <img
      {...props}
      className="my-10 block h-auto w-full rounded-sm object-cover"
      loading="lazy"
    />
  ),
  li: (props) => <li {...props} className="pl-1" />,
  ol: (props) => (
    <ol
      {...props}
      className="my-7 list-decimal space-y-3 pl-6 text-[1.08rem] leading-[1.85]"
    />
  ),
  p: (props) => <p {...props} className="my-6 text-[1.08rem] leading-[1.85]" />,
  pre: (props) => (
    <pre
      {...props}
      className="bg-website-surface-muted my-8 overflow-x-auto rounded-md p-5 font-mono text-sm leading-relaxed"
    />
  ),
  strong: (props) => <strong {...props} className="font-semibold" />,
  ul: (props) => (
    <ul
      {...props}
      className="my-7 list-disc space-y-3 pl-6 text-[1.08rem] leading-[1.85]"
    />
  ),
};

/** Applies the site's portable prose treatment to standard MDX elements. */
export const BlogMdxContent = ({
  Content,
}: BlogMdxContentProps): ReactElement => <Content components={components} />;
