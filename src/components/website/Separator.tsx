import type { ReactElement } from "react";

interface SeparatorProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const Separator = ({
  className = "",
  orientation = "horizontal",
}: SeparatorProps): ReactElement => {
  const orientationClass =
    orientation === "vertical" ? "h-full w-0.5" : "h-0.5 w-full";

  return (
    <div
      className={`bg-website-border-strong opacity-80 ${orientationClass} ${className}`}
      aria-hidden="true"
    />
  );
};
