import type { ReactElement } from "react";

export interface WebsiteListItem {
  title: string;
  description: string;
  date: string;
  href?: string;
  tags?: string[];
}

interface ContentListSectionProps {
  id: string;
  index: string;
  title: string;
  items: WebsiteListItem[];
}

interface ContentListItemProps {
  item: WebsiteListItem;
}

const itemClassName =
  "border-website-text grid min-h-[91px] grid-cols-[minmax(0,1fr)_auto] items-center gap-6 border-t py-2.5 text-inherit no-underline max-[760px]:grid-cols-1 max-[760px]:items-start max-[760px]:gap-2 max-[760px]:py-4";

const ContentListItem = ({ item }: ContentListItemProps): ReactElement => {
  const content = (
    <>
      <div className="flex min-w-0 flex-col gap-[3px]">
        <h3 className="m-0 text-[15px] leading-[1.2] font-bold">
          {item.title}
        </h3>
        <p className="text-website-text-muted m-0 text-sm leading-[1.2]">
          {item.description}
        </p>
        {item.tags?.length ? (
          <ul
            className="font-website-display text-website-text-muted mt-1 mb-0 flex list-none flex-wrap gap-x-3 gap-y-1 p-0 text-[11px] tracking-[-0.04em]"
            aria-label={`${item.title} technologies`}
          >
            {item.tags.map((tag) => (
              <li
                className="inline-flex items-baseline gap-1 whitespace-nowrap"
                key={tag}
              >
                <span aria-hidden="true">·</span>
                <span>{tag}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <time className="text-website-text-muted text-sm leading-[1.218] whitespace-nowrap max-[760px]:order-[-1] max-[760px]:text-xs">
        {item.date}
      </time>
    </>
  );

  return item.href ? (
    <a
      className={`${itemClassName} hover:[&_h3]:underline hover:[&_h3]:decoration-dotted`}
      href={item.href}
      key={item.title}
    >
      {content}
    </a>
  ) : (
    <article className={itemClassName} key={item.title}>
      {content}
    </article>
  );
};

export const ContentListSection = ({
  id,
  index,
  title,
  items,
}: ContentListSectionProps): ReactElement => (
  <ContentListSectionInner id={id} index={index} title={title} items={items} />
);

const ContentListSectionInner = ({
  id,
  index,
  title,
  items,
}: ContentListSectionProps): ReactElement => (
  <section className="scroll-mt-5" id={id} aria-labelledby={`${id}-title`}>
    <div className="font-website-display border-website-text flex min-h-[49px] items-center justify-between gap-5 border-t py-[15px] text-sm tracking-[-0.05em]">
      <h2 className="m-0 font-[inherit]" id={`${id}-title`}>
        {index} - {title}
      </h2>
    </div>
    <div>
      {items.map((item, index) => (
        <ContentListItem item={item} key={`${item.title}-${index}`} />
      ))}
    </div>
  </section>
);
