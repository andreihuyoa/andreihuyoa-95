# Blog authoring instructions

Use this checklist for every post added to `src/content/blog/`. A topic must be
supplied before drafting begins. Drafts go to Andrei for review and must not be
published or cross-posted automatically. After approval, Andrei will copy the
portable MDX body to Substack manually.

## Research and voice

1. Research the topic before writing. Prefer primary sources, original papers,
   official documentation, and reputable reporting. Verify every factual claim,
   number, quotation, and attribution. Never invent statistics or citations.
2. Write in first person as a grounded personal essay. Be candid without turning
   the piece into vague self-help. Use short paragraphs, an occasional rhetorical
   question, and a final line that resonates instead of summarizing the argument.
3. Use “how to crave doing hard things” by celine and “be delusional about your
   potential” by fatima only as register references: direct openings, vulnerable
   reflection, concrete tension, and clear emotional stakes. Do not copy their
   wording, anecdotes, claims, or structure.
4. Avoid em dash overuse. Prefer periods, commas, colons, or parentheses.

## Structure and portability

- The page template supplies the hero image, post header, further-reading list,
  and closing image from frontmatter. The MDX body should contain only portable
  Markdown/MDX prose. Do not import or embed site-specific React components.
- Open with a concrete personal moment or tension. Put 1 to 2 target keywords
  naturally within the first 100 words and repeat one in a useful subheading.
- Use descriptive subheadings only when they help the essay breathe. Do not turn
  the piece into a generic listicle.
- End the prose with a resonant line. A Markdown blockquote near the ending is
  welcome when it earns its place.
- Add 2 to 4 real sources in `references`; the site renders them as “Further
  reading.” Read the sources, cite the original URL, and do not lift their
  phrasing or structure.

## Frontmatter

The filename and `slug` must match. The title doubles as the SEO title, so keep
it specific, curiosity-driving, unique, and no longer than 60 characters. Keep
the description unique and no longer than 155 characters.

```yaml
---
title: "A specific title that creates honest curiosity"
slug: "matching-kebab-case-slug"
date: "YYYY-MM-DD"
description: "A one-sentence dek and search description under 155 characters."
coverImage: "/blog/matching-kebab-case-slug/descriptive-hero.webp"
closingImage: "/blog/matching-kebab-case-slug/descriptive-closing.webp"
tags:
  - "Topic"
  - "Personal essay"
references:
  - title: "Source or related essay title"
    url: "https://example.com/original-source"
  - title: "Second source title"
    url: "https://example.org/original-source"
---
```

Store both images in `public/blog/<slug>/`. Use pre-compressed WebP files and
descriptive, searchable filenames such as `craving-hard-things-hero.webp`, never
camera defaults such as `IMG_2031.webp`. Frontmatter paths must be absolute so
the same fixed URL is available to the page, Open Graph, and Twitter metadata.

## Review gate

Before presenting a draft, confirm that the research links resolve, the title
and description meet their limits, both images exist, the target keywords read
naturally, and the final prose contains no fabricated claims. Run the full
repository verification suite. Stop at review: do not publish, deploy, or post to
Substack without explicit approval.
