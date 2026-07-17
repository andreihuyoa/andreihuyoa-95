import type { ReactElement } from "react";

const stats = [
  { value: "2024", label: "shipping since" },
  { value: "5", label: "responsive sites delivered" },
  { value: "20", label: "support tickets / week" },
  { value: "80.7%", label: "thesis Recall@5" },
];

export const StatsSection = (): ReactElement => (
  <section className="website-stats" aria-label="Selected portfolio statistics">
    {stats.map((stat) => (
      <div className="website-stat" key={stat.label}>
        <strong>{stat.value}</strong>
        <span>{stat.label}</span>
      </div>
    ))}
  </section>
);
