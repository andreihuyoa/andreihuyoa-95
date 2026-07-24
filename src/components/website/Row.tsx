import type { ReactElement, ReactNode } from "react";

interface RowProps {
  id?: string;
  label: string;
  title: string;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Row = ({
  id,
  label,
  title,
  meta,
  children,
  className = "",
}: RowProps): ReactElement => (
  <article
    id={id}
    className={`border-website-border border-t py-3 first:border-t-0 ${className}`}
  >
    <div className="text-website-text-muted font-mono text-[11px] font-bold tracking-[0.12em] uppercase">
      {label}
    </div>
    <h3 className="font-website-display mt-1 text-lg leading-tight font-extrabold tracking-[0.015em]">
      {title}
    </h3>
    {meta ? <div className="mt-2">{meta}</div> : null}
    <p className="text-website-text-soft mt-1 text-justify text-sm leading-6">
      {children}
    </p>
  </article>
);
