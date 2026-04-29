import type { ReactElement, ReactNode } from "react";

interface PanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Panel = ({
  title,
  children,
  className = "",
}: PanelProps): ReactElement => {
  return (
    <section className={`website-panel ${className}`}>
      {title ? (
        <div
          className="website-label border-website-border bg-website-surface-muted text-website-text-soft border-b px-3 py-2"
        >
          {title}
        </div>
      ) : null}
      <div className="flex items-start justify-start p-2 ">{children}</div>
    </section>
  );
};
