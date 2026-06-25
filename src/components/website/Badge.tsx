import type { ReactElement, ReactNode } from "react";

export const Badge = ({ children }: { children: ReactNode }): ReactElement => (
  <span className="border-website-border bg-website-green-soft text-website-green inline-flex border px-2 py-1 font-mono text-[11px] font-bold">
    {children}
  </span>
);
