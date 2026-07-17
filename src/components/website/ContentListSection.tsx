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

export const ContentListSection = ({
  id,
  index,
  title,
  items,
}: ContentListSectionProps): ReactElement => (
  <section
    className="website-list-section"
    id={id}
    aria-labelledby={`${id}-title`}
  >
    <div className="website-list-section__heading">
      <h2 id={`${id}-title`}>
        {index} - {title}
      </h2>
    </div>
    <div>
      {items.map((item) => {
        const content = (
          <>
            <div className="website-list-item__content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.tags?.length ? (
                <ul
                  className="website-tags"
                  aria-label={`${item.title} technologies`}
                >
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              ) : null}
            </div>
            <time>{item.date}</time>
          </>
        );

        return item.href ? (
          <a className="website-list-item" href={item.href} key={item.title}>
            {content}
          </a>
        ) : (
          <article className="website-list-item" key={item.title}>
            {content}
          </article>
        );
      })}
    </div>
  </section>
);
