import type { ReactElement, ReactNode } from "react";

export const Badge = ({ children }: { children: ReactNode }): ReactElement => (
  <span className="inline-flex border border-website-border bg-website-green-soft px-2 py-1 font-mono text-[11px] font-bold text-website-green">
    {children}
  </span>
);
