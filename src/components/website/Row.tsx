import type { ReactElement, ReactNode } from "react";

interface RowProps {
  id?: string;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export const Row = ({
  id,
  label,
  title,
  children,
  className = "",
}: RowProps): ReactElement => (
  <article
    id={id}
    className={`border-website-border border-t py-3 first:border-t-0 ${className}`}
  >
    <div className="website-label text-website-text-muted">{label}</div>
    <h3 className="mt-1 text-lg leading-tight font-extrabold">{title}</h3>
    <p className="text-website-text-soft mt-1 text-sm leading-6">{children}</p>
  </article>
);
