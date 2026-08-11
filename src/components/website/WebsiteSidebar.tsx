import {
  CalculatorBrokenIcon,
  CaseBrokenIcon,
  // ChatRoundBrokenIcon,
  GlobeBrokenIcon,
  MailboxBrokenIcon,
  MonitorBrokenIcon,
  MoonBrokenIcon,
  NotebookBrokenIcon,
  SoundwaveBrokenIcon,
  SuitcaseBrokenIcon,
  SunBrokenIcon,
} from "@solar-icons/react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { ReactElement, ReactNode } from "react";

import type { WebsiteTheme } from "../../utils/websiteTheme";
import type { WebsiteSectionId } from "../../content/website";
import { Separator } from "./Separator";

const sidebarLinkClass =
  "inline-flex min-h-5 w-fit items-center gap-2 text-inherit no-underline transition-colors duration-200 hover:text-website-interactive hover:[&_span]:underline hover:[&_span]:decoration-dotted hover:[&_span]:underline-offset-4";
const sidebarGroupClass =
  "flex w-full flex-col items-start gap-2 overflow-hidden";

interface WebsiteSidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
  onOsMode: () => void;
  onThemeChange: (theme: WebsiteTheme) => void;
  themeChangeDisabled: boolean;
  theme: WebsiteTheme;
}

interface HamburgerMenuProps {
  isOpen: boolean;
  onOpen: () => void;
}

interface SidebarLinkProps {
  children: ReactNode;
  href: string;
  icon?: ReactNode;
  external?: boolean;
}

interface SidebarRouteLinkProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick: () => void;
  to: `/${WebsiteSectionId}`;
}

const SidebarLink = ({
  children,
  href,
  icon,
  external = false,
}: SidebarLinkProps): ReactElement => (
  <a
    className={sidebarLinkClass}
    href={href}
    rel={external ? "noreferrer" : undefined}
    target={external ? "_blank" : undefined}
  >
    {icon}
    <span>{children}</span>
  </a>
);

const SidebarRouteLink = ({
  children,
  icon,
  onClick,
  to,
}: SidebarRouteLinkProps): ReactElement => (
  <Link
    activeProps={{
      className:
        "[&_span]:text-website-text [&_span]:underline [&_span]:decoration-dotted [&_span]:underline-offset-4",
    }}
    className={sidebarLinkClass}
    onClick={onClick}
    search={{ mode: "website" }}
    to={to}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

const displayControlButtonClass = (isActive: boolean): string =>
  `relative flex size-4 shrink-0 items-center justify-center rounded-full transition-colors duration-200 hover:cursor-pointer disabled:cursor-default ${
    isActive
      ? "text-website-text"
      : "text-website-text-muted hover:text-website-interactive"
  }`;

interface ThemeButtonProps {
  icon: ReactNode;
  isActive: boolean;
  isDisabled: boolean;
  label: string;
  onClick: () => void;
}

const ThemeButton = ({
  icon,
  isActive,
  isDisabled,
  label,
  onClick,
}: ThemeButtonProps): ReactElement => (
  <motion.button
    className={displayControlButtonClass(isActive)}
    type="button"
    aria-label={label}
    aria-pressed={isActive}
    disabled={isDisabled}
    title={label}
    whileHover={isDisabled ? undefined : { y: -1 }}
    whileTap={isDisabled ? undefined : { scale: 0.78 }}
    onClick={onClick}
  >
    {isActive ? (
      <motion.span
        className="bg-website-surface-soft absolute inset-0 rounded-full"
        layoutId="active-website-theme"
        transition={{ type: "spring", stiffness: 520, damping: 34 }}
      />
    ) : null}
    <span className="relative z-1 flex items-center justify-center">
      {icon}
    </span>
  </motion.button>
);

const WebsiteMonogram = (): ReactElement => (
  <svg
    className="h-10 w-auto fill-current"
    width="52"
    height="58"
    viewBox="0 0 52 58"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M51.176 39.864C49.768 40.8027 47.7627 42.3173 45.16 44.408H43.944C42.5787 43.1707 41.2987 40.9093 40.104 37.624C39.208 35.1067 38.3333 32.568 37.48 30.008H18.536L15.144 37.432C20.0507 37.432 23.5067 38.3067 25.512 40.056L29.16 37.688L29.928 38.392L21.288 44.408H19.816C17.256 42.5307 14.2693 41.592 10.856 41.592C8.59467 41.592 6.58933 42.1893 4.84 43.384C2.92 44.7067 1.96 46.456 1.96 48.632C1.96 53.496 5.62933 55.928 12.968 55.928C14.888 55.928 16.744 55.736 18.536 55.352L18.92 56.632C15.0373 56.9307 13.3093 57.08 13.736 57.08C5.11733 57.08 0.808 54.264 0.808 48.632C0.808 45.7307 2.23733 43.128 5.096 40.824C7.784 38.648 10.6427 37.5173 13.672 37.432L22.504 17.72C21.608 16.312 20.328 15.608 18.664 15.608C16.744 15.608 15.3147 16.4827 14.376 18.232L13.416 17.848C14.44 13.4107 16.936 11.192 20.904 11.192C22.44 11.192 23.7627 11.5333 24.872 12.216L27.368 6.904C25.9173 5.79467 24.1467 5.24 22.056 5.24C19.7947 5.24 17.576 6.24266 15.4 8.248L14.568 7.8C15.4213 5.66667 16.744 3.87467 18.536 2.424C20.3707 0.930665 22.376 0.183998 24.552 0.183998C26.472 0.183998 28.2853 0.866665 29.992 2.232L31.016 0.183998H31.848C32.5733 4.92 35.0693 12.3653 39.336 22.52C43.6453 32.6747 46.7813 38.5413 48.744 40.12L50.536 39.032L51.176 39.864ZM35.432 25.336L28.2 7.864L20.456 25.336H35.432Z" />
  </svg>
);

export const HamburgerMenu = ({
  isOpen,
  onOpen,
}: HamburgerMenuProps): ReactElement => (
  <div className="absolute top-4 right-4 left-4 z-40 flex items-center justify-between min-[761px]:right-auto min-[761px]:items-start">
    <button
      className="border-website-border bg-website-surface-muted text-website-text shadow-website flex size-10 flex-col items-center justify-center gap-1 border min-[761px]:hidden"
      type="button"
      aria-label="Open navigation"
      aria-expanded={isOpen}
      onClick={onOpen}
    >
      <span className="h-px w-5 bg-current" aria-hidden="true" />
      <span className="h-px w-5 bg-current" aria-hidden="true" />
      <span className="h-px w-5 bg-current" aria-hidden="true" />
    </button>
    <Link
      className="text-website-text inline-flex shrink-0 transition-colors duration-300"
      aria-label="Andrei Huyo-a, home"
      search={{ mode: "website" }}
      to="/"
    >
      <WebsiteMonogram />
    </Link>
  </div>
);

export const WebsiteSidebar = ({
  isMobileOpen,
  onClose,
  onOsMode,
  onThemeChange,
  themeChangeDisabled,
  theme,
}: WebsiteSidebarProps): ReactElement => (
  <>
    <div
      className={`bg-website-text/20 fixed inset-0 z-40 transition-opacity min-[761px]:hidden ${
        isMobileOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      aria-hidden="true"
      onClick={onClose}
    />
    <aside
      className={`bg-website-background font-website-display text-website-text-muted border-website-border/20 fixed top-0 left-0 z-50 flex h-dvh max-h-dvh w-72 flex-col justify-start gap-4 overflow-x-visible overflow-y-auto border-r p-5 text-sm tracking-tighter transition-transform duration-200 max-[760px]:shadow-lg min-[761px]:z-30 min-[761px]:translate-x-0 ${
        isMobileOpen ? "translate-x-0" : "max-[760px]:-translate-x-full"
      }`}
      aria-label="Portfolio navigation and contact"
    >
      <div className="flex h-full min-h-0 flex-col items-center justify-between gap-4">
        {/* Navigation Links - Top Container */}
        <div className="flex min-h-0 w-full shrink flex-col gap-6 overflow-hidden pt-16 max-[760px]:pt-12">
          <button
            className="border-website-border bg-website-surface-muted text-website-text absolute top-4 right-4 z-10 flex size-9 items-center justify-center border min-[761px]:hidden"
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
          <nav className={sidebarGroupClass} aria-label="Portfolio sections">
            <SidebarRouteLink to="/experience" onClick={onClose}>
              experience
            </SidebarRouteLink>
            <SidebarRouteLink to="/projects" onClick={onClose}>
              projects
            </SidebarRouteLink>
            <SidebarRouteLink to="/certifications" onClick={onClose}>
              certifications
            </SidebarRouteLink>
            <SidebarRouteLink to="/stack" onClick={onClose}>
              stack
            </SidebarRouteLink>
          </nav>

          <Separator />

          <div className={sidebarGroupClass}>
            <SidebarLink
              href="mailto:andrei.huyoa.me@gmail.com?subject=Portfolio%20collaboration"
              icon={<CaseBrokenIcon aria-hidden="true" size={14} />}
            >
              collabs
            </SidebarLink>
            <SidebarLink
              href="mailto:andrei.huyoa.me@gmail.com?subject=Consulting%20inquiry"
              icon={<SuitcaseBrokenIcon aria-hidden="true" size={14} />}
            >
              consulting
            </SidebarLink>
          </div>

          <Separator />

          <div className={sidebarGroupClass}>
            <SidebarRouteLink
              to="/blog"
              onClick={onClose}
              icon={<NotebookBrokenIcon aria-hidden="true" size={14} />}
            >
              blog
            </SidebarRouteLink>
            <SidebarRouteLink
              to="/resources"
              onClick={onClose}
              icon={<CalculatorBrokenIcon aria-hidden="true" size={14} />}
            >
              resources
            </SidebarRouteLink>
          </div>
        </div>

        {/* Contact Information - Bottom Container */}
        <div
          className="[&_p]:font-inherit flex w-full shrink-0 flex-col gap-3 [&_p]:m-0 [&_p]:text-sm [&_p]:leading-tight [&_p]:tracking-normal"
          id="contact"
        >
          <Separator />
          <div className="flex flex-col items-start gap-2">
            <div
              className="flex items-start gap-2 overflow-hidden"
              aria-label="Display controls"
            >
              <div className="bg-website-surface-muted flex shrink-0 items-center gap-1 rounded-full border border-black/10 p-0.5">
                <ThemeButton
                  icon={<MonitorBrokenIcon aria-hidden="true" size={13} />}
                  isActive={theme === "system"}
                  isDisabled={themeChangeDisabled}
                  label="System theme"
                  onClick={() => onThemeChange("system")}
                />
                <ThemeButton
                  icon={<SunBrokenIcon aria-hidden="true" size={13} />}
                  isActive={theme === "light"}
                  isDisabled={themeChangeDisabled}
                  label="Light theme"
                  onClick={() => onThemeChange("light")}
                />
                <ThemeButton
                  icon={<MoonBrokenIcon aria-hidden="true" size={13} />}
                  isActive={theme === "dark"}
                  isDisabled={themeChangeDisabled}
                  label="Dark theme"
                  onClick={() => onThemeChange("dark")}
                />
              </div>
              <div className="bg-website-surface-muted flex shrink-0 items-center rounded-full border border-black/10 p-0.5">
                <motion.button
                  className={displayControlButtonClass(false)}
                  type="button"
                  aria-label="Windows 95 mode"
                  title="Windows 95 mode"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.78 }}
                  onClick={onOsMode}
                >
                  <GlobeBrokenIcon aria-hidden="true" size={13} />
                </motion.button>
              </div>
              <div className="bg-website-surface-muted flex shrink-0 items-center rounded-full border border-black/10 p-0.5">
                <motion.button
                  className={displayControlButtonClass(false)}
                  type="button"
                  aria-label="Sound"
                  title="Sound — coming soon"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.78 }}
                >
                  <SoundwaveBrokenIcon aria-hidden="true" size={13} />
                </motion.button>
              </div>
            </div>
          </div>
          <p>For work, collaborations &amp; everything else, reach me at</p>
          <a
            className="hover:text-website-interactive flex w-fit items-center gap-1 text-inherit no-underline transition-colors duration-200 hover:[&_span]:underline hover:[&_span]:decoration-dotted hover:[&_span]:underline-offset-4"
            href="mailto:andrei.huyoa.me@gmail.com"
          >
            <MailboxBrokenIcon aria-hidden="true" size={22} />
            <span className="underline decoration-dotted underline-offset-3">
              andrei.huyoa.me@gmail.com
            </span>
          </a>
        </div>
      </div>
    </aside>
  </>
);
