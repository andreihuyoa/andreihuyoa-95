import type { ReactElement } from "react";

const stats = [
  { value: "2024", label: "shipping since" },
  { value: "5", label: "responsive sites delivered" },
  { value: "20", label: "support tickets / week" },
  { value: "80.7%", label: "thesis Recall@5" },
];

export const StatsSection = (): ReactElement => (
  <section
    className="border-website-border grid min-h-[100px] grid-cols-4 border-t max-[760px]:grid-cols-2"
    aria-label="Selected portfolio statistics"
  >
    {stats.map((stat, index) => (
      <div
        className={`border-website-border flex min-w-0 flex-col items-center justify-center gap-[3px] p-2.5 text-center ${index > 0 ? "border-l" : ""} ${index === 2 ? "max-[760px]:border-t max-[760px]:border-l-0" : ""} ${index === 3 ? "max-[760px]:border-t" : ""}`}
        key={stat.label}
      >
        <strong className="font-website-display text-lg font-normal tracking-[-0.05em]">
          {stat.value}
        </strong>
        <span className="text-website-text-muted text-xs leading-[1.2]">
          {stat.label}
        </span>
      </div>
    ))}
  </section>
);
