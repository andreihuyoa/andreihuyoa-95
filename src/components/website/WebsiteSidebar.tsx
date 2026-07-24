import {
  BagBrokenIcon,
  CalculatorBrokenIcon,
  CaseBrokenIcon,
  ChatRoundBrokenIcon,
  MailboxBrokenIcon,
  MonitorBrokenIcon,
  MoonBrokenIcon,
  NotebookBrokenIcon,
  SoundwaveBrokenIcon,
  SuitcaseBrokenIcon,
  SunBrokenIcon,
} from "@solar-icons/react";
import type { ReactElement, ReactNode } from "react";

const sidebarLinkClass =
  "inline-flex min-h-5 w-fit items-center gap-2 text-inherit no-underline hover:text-website-text hover:[&_span]:underline hover:[&_span]:decoration-dotted hover:[&_span]:underline-offset-4";
const sidebarButtonClass = `${sidebarLinkClass} cursor-pointer border-0 bg-transparent p-0 font-[inherit] tracking-[inherit]`;
const sketchRuleClass =
  "h-0 w-full border-t-2 border-website-text-muted opacity-85";
const sidebarGroupClass =
  "flex w-full flex-col items-start gap-2 overflow-hidden";

export type WebsiteSectionId =
  | "experience"
  | "projects"
  | "certifications"
  | "stack"
  | "recommendations"
  | "affiliations"
  | "resources";

interface WebsiteSidebarProps {
  activeSection: WebsiteSectionId;
  isMobileOpen: boolean;
  onClose: () => void;
  onSelectSection: (section: WebsiteSectionId) => void;
}

interface SidebarLinkProps {
  children: ReactNode;
  href: string;
  icon?: ReactNode;
  external?: boolean;
}

interface SidebarButtonProps {
  children: ReactNode;
  icon?: ReactNode;
}

interface SidebarSectionButtonProps extends SidebarButtonProps {
  active: boolean;
  onClick: () => void;
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

const SidebarButton = ({
  children,
  icon,
}: SidebarButtonProps): ReactElement => (
  <button
    className={sidebarButtonClass}
    type="button"
    title={`${String(children)} — coming soon`}
  >
    {icon}
    <span>{children}</span>
  </button>
);

const SidebarSectionButton = ({
  active,
  children,
  icon,
  onClick,
}: SidebarSectionButtonProps): ReactElement => (
  <button
    className={`${sidebarButtonClass} ${active ? "[&_span]:text-website-text [&_span]:underline [&_span]:decoration-dotted [&_span]:underline-offset-4" : ""}`}
    type="button"
    aria-pressed={active}
    onClick={onClick}
  >
    {icon}
    <span>{children}</span>
  </button>
);

export const WebsiteSidebar = ({
  activeSection,
  isMobileOpen,
  onClose,
  onSelectSection,
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
      className={`bg-website-background font-website-display text-website-text-muted fixed top-0 left-0 z-50 flex h-dvh max-h-dvh w-72 flex-col justify-start gap-4 overflow-x-visible overflow-y-auto p-5 text-sm tracking-tighter transition-transform duration-200 max-[760px]:shadow-lg min-[761px]:z-30 min-[761px]:translate-x-0 ${
        isMobileOpen ? "translate-x-0" : "max-[760px]:-translate-x-full"
      }`}
      aria-label="Portfolio navigation and contact"
    >
      <div className="flex h-full min-h-0 flex-col items-center justify-between gap-4">
        <div className="flex min-h-0 w-full shrink flex-col items-center justify-center gap-3 overflow-hidden pt-32 max-[760px]:pt-14">
          <button
            className="border-website-border bg-website-surface-muted text-website-text absolute top-4 right-4 z-10 flex size-9 items-center justify-center border min-[761px]:hidden"
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
          <nav className={sidebarGroupClass} aria-label="Portfolio sections">
            <SidebarSectionButton
              active={activeSection === "experience"}
              onClick={() => {
                onSelectSection("experience");
                onClose();
              }}
            >
              experience
            </SidebarSectionButton>
            <SidebarSectionButton
              active={activeSection === "projects"}
              onClick={() => {
                onSelectSection("projects");
                onClose();
              }}
            >
              projects
            </SidebarSectionButton>
            <SidebarSectionButton
              active={activeSection === "certifications"}
              onClick={() => {
                onSelectSection("certifications");
                onClose();
              }}
            >
              certifications
            </SidebarSectionButton>
            <SidebarSectionButton
              active={activeSection === "stack"}
              onClick={() => {
                onSelectSection("stack");
                onClose();
              }}
            >
              stack
            </SidebarSectionButton>
            <SidebarSectionButton
              active={activeSection === "recommendations"}
              onClick={() => {
                onSelectSection("recommendations");
                onClose();
              }}
            >
              recommendations
            </SidebarSectionButton>
            <SidebarSectionButton
              active={activeSection === "affiliations"}
              onClick={() => {
                onSelectSection("affiliations");
                onClose();
              }}
            >
              affiliations
            </SidebarSectionButton>
          </nav>

          <div className={sketchRuleClass} aria-hidden="true" />

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

          <div className={sketchRuleClass} aria-hidden="true" />

          <div className={sidebarGroupClass}>
            <SidebarButton
              icon={<BagBrokenIcon aria-hidden="true" size={14} />}
            >
              shop
            </SidebarButton>
            <SidebarButton
              icon={<NotebookBrokenIcon aria-hidden="true" size={14} />}
            >
              blog
            </SidebarButton>
            <SidebarButton
              icon={<MonitorBrokenIcon aria-hidden="true" size={14} />}
            >
              gear
            </SidebarButton>
            <SidebarSectionButton
              active={activeSection === "resources"}
              onClick={() => {
                onSelectSection("resources");
                onClose();
              }}
              icon={<CalculatorBrokenIcon aria-hidden="true" size={14} />}
            >
              resources
            </SidebarSectionButton>
          </div>
        </div>

        <div
          className="[&_p]:font-inherit flex w-full shrink-0 flex-col gap-3 [&_p]:m-0 [&_p]:text-sm [&_p]:leading-tight [&_p]:tracking-normal"
          id="contact"
        >
          <p className="font-website-display text-sm tracking-tighter">
            31 people viewing right now
          </p>
          <a
            className={sidebarLinkClass}
            href="mailto:andrei.huyoa.me@gmail.com?subject=Community%20chat"
          >
            <ChatRoundBrokenIcon aria-hidden="true" size={14} />
            <span>community chat</span>
          </a>
          <div className={sketchRuleClass} aria-hidden="true" />
          <div className="flex flex-col items-start gap-2">
            <div
              className="flex items-start gap-2 overflow-hidden"
              aria-label="Display controls"
            >
              <div className="bg-website-surface-muted flex shrink-0 items-center gap-1 rounded-full border border-black/10 p-0.5">
                <button
                  className="bg-website-surface-soft text-website-text flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full"
                  type="button"
                  aria-label="System theme"
                  title="System theme"
                >
                  <MonitorBrokenIcon aria-hidden="true" size={13} />
                </button>
                <button
                  className="bg-website-background text-website-text-muted flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full"
                  type="button"
                  aria-label="Light theme"
                  title="Light theme"
                >
                  <SunBrokenIcon aria-hidden="true" size={13} />
                </button>
                <button
                  className="bg-website-background text-website-text-muted flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full"
                  type="button"
                  aria-label="Dark theme"
                  title="Dark theme — coming soon"
                >
                  <MoonBrokenIcon aria-hidden="true" size={13} />
                </button>
              </div>
              <div className="bg-website-surface-muted flex shrink-0 items-center rounded-full border border-black/10 p-0.5">
                <button
                  className="bg-website-background text-website-text-muted flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full"
                  type="button"
                  aria-label="Sound"
                  title="Sound — coming soon"
                >
                  <SoundwaveBrokenIcon aria-hidden="true" size={13} />
                </button>
              </div>
            </div>
          </div>
          <p>For work, collaborations &amp; everything else, reach me at</p>
          <a
            className="hover:text-website-text flex w-fit items-center gap-1 text-inherit no-underline hover:[&_span]:underline hover:[&_span]:decoration-dotted hover:[&_span]:underline-offset-4"
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
