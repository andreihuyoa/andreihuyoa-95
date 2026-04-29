import type { ReactElement, ReactNode } from "react";

interface ButtonLinkProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
}

export const ButtonLink = ({
  children,
  href,
  variant = "ghost",
}: ButtonLinkProps): ReactElement => {
  const styles = {
    primary:
      "bg-website-orange text-website-text border border-website-border-strong shadow-website",
    secondary: "bg-website-surface border border-website-border-strong",
    ghost: "hover:underline",
  };

  return (
    <a
      className={`inline-flex min-h-10 items-center justify-center rounded-sm px-3 py-2 text-sm font-bold transition-colors hover:bg-(--website-green-soft) focus:outline-2 focus:outline-offset-2 focus:outline-(--website-green) ${styles[variant]}`}
      href={href}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      target={
        href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined
      }
    >
      {children}
    </a>
  );
};
