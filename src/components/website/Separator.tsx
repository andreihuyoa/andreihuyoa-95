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
    orientation === "vertical" ? "h-full w-px" : "h-px w-full";

  return (
    <div
      className={`bg-website-border opacity-20 ${orientationClass} ${className}`}
      aria-hidden="true"
    />
  );
};
