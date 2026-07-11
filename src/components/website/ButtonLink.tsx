import type { MouseEventHandler, ReactElement, ReactNode } from "react";

type Variant = "primary" | "secondary" | "surface" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  outlined?: boolean;
  className?: string;
}

type ButtonLinkProps =
  | (BaseProps & { href: string; onClick?: never })
  | (BaseProps & {
      href?: never;
      onClick: MouseEventHandler<HTMLButtonElement>;
    });

export const ButtonLink = (props: ButtonLinkProps): ReactElement => {
  const {
    children,
    variant = "ghost",
    outlined = false,
    className: layoutClassName = "",
  } = props;
  const styles: Record<Variant, string> = {
    primary:
      "border border-transparent bg-website-orange text-website-text hover:bg-website-orange/80",
    secondary:
      "border border-website-border-strong bg-website-surface hover:bg-(--website-green-soft)",
    surface:
      "border border-transparent bg-website-surface-soft hover:bg-website-orange/20",
    ghost: "border border-transparent hover:underline",
  };
  const outline = outlined
    ? "relative rounded-none transition-[transform,background-color] duration-75 before:pointer-events-none before:absolute before:-inset-1 before:rounded-xs before:border-2 before:border-dashed before:border-website-border-strong before:content-[''] active:translate-y-0.5 active:scale-[0.98]"
    : "rounded-sm transition-colors";
  const className = `box-border inline-flex h-10 items-center justify-center px-3 py-2 text-sm font-bold whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-(--website-green) focus-visible:ring-offset-4 ${styles[variant]} ${outline} ${layoutClassName}`;

  if ("href" in props && props.href) {
    const newTab = props.href.startsWith("http") || props.href.endsWith(".pdf");
    return (
      <a
        className={className}
        href={props.href}
        rel={props.href.startsWith("http") ? "noreferrer" : undefined}
        target={newTab ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={className} type="button" onClick={props.onClick}>
      {children}
    </button>
  );
};
