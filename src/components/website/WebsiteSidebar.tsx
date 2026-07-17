import {
  Bag,
  Calculator,
  Case,
  ChatRound,
  Letter,
  Monitor,
  Moon,
  Notebook,
  Soundwave,
  Sun,
  Suitcase,
  UsersGroupRounded,
} from "@solar-icons/react";
import type { ReactElement, ReactNode } from "react";

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
    className="website-sidebar-link"
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
    className="website-sidebar-link"
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
    className={`website-sidebar-link website-sidebar-section-button${active ? "is-active" : ""}`}
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
  onSelectSection,
}: WebsiteSidebarProps): ReactElement => (
  <aside
    className="website-sidebar font-website-display h-full min-h-0"
    aria-label="Portfolio navigation and contact"
  >
    <div className="website-sidebar__top">
      <nav className="website-sidebar__nav" aria-label="Portfolio sections">
        <SidebarSectionButton
          active={activeSection === "experience"}
          onClick={() => onSelectSection("experience")}
        >
          experience
        </SidebarSectionButton>
        <SidebarSectionButton
          active={activeSection === "projects"}
          onClick={() => onSelectSection("projects")}
        >
          projects
        </SidebarSectionButton>
        <SidebarSectionButton
          active={activeSection === "certifications"}
          onClick={() => onSelectSection("certifications")}
        >
          certifications
        </SidebarSectionButton>
        <SidebarSectionButton
          active={activeSection === "stack"}
          onClick={() => onSelectSection("stack")}
        >
          stack
        </SidebarSectionButton>
        <SidebarSectionButton
          active={activeSection === "recommendations"}
          onClick={() => onSelectSection("recommendations")}
        >
          recommendations
        </SidebarSectionButton>
        <SidebarSectionButton
          active={activeSection === "affiliations"}
          onClick={() => onSelectSection("affiliations")}
        >
          affiliations
        </SidebarSectionButton>
      </nav>

      <div className="website-sketch-rule" aria-hidden="true" />

      <div className="website-sidebar__group">
        <SidebarLink
          href="mailto:andrei.huyoa.me@gmail.com?subject=Portfolio%20collaboration"
          icon={<Case aria-hidden="true" size={14} weight="Linear" />}
        >
          collabs
        </SidebarLink>
        <SidebarLink
          href="mailto:andrei.huyoa.me@gmail.com?subject=Consulting%20inquiry"
          icon={<Suitcase aria-hidden="true" size={14} weight="Linear" />}
        >
          consulting
        </SidebarLink>
      </div>

      <div className="website-sketch-rule" aria-hidden="true" />

      <div className="website-sidebar__group">
        <SidebarButton
          icon={<Bag aria-hidden="true" size={14} weight="Linear" />}
        >
          shop
        </SidebarButton>
        <SidebarButton
          icon={<Notebook aria-hidden="true" size={14} weight="Linear" />}
        >
          blog
        </SidebarButton>
        <SidebarButton
          icon={<Monitor aria-hidden="true" size={14} weight="Linear" />}
        >
          gear
        </SidebarButton>
        <SidebarSectionButton
          active={activeSection === "resources"}
          onClick={() => onSelectSection("resources")}
          icon={<Calculator aria-hidden="true" size={14} weight="Linear" />}
        >
          resources
        </SidebarSectionButton>
      </div>
    </div>

    <div className="website-sidebar__bottom" id="contact">
      <div className="website-sidebar__shortcuts">
        <a href="mailto:andrei.huyoa.me@gmail.com?subject=Ask%20Andrei%20anything">
          <span className="website-sidebar__shortcut-label">ask anything</span>
          <span className="website-sidebar__key-combo">
            <kbd>⌘</kbd>
            <span>+</span>
            <kbd>K</kbd>
          </span>
        </a>
        <button type="button" title="typing test — coming soon">
          <span className="website-sidebar__shortcut-label">typing test</span>
          <span className="website-sidebar__key-combo">
            <kbd>⌘</kbd>
            <span>+</span>
            <kbd>J</kbd>
          </span>
        </button>
      </div>
      <div className="website-sketch-rule" aria-hidden="true" />
      <p className="website-sidebar__presence">31 people viewing right now</p>
      <a
        className="website-sidebar-link"
        href="mailto:andrei.huyoa.me@gmail.com?subject=Community%20chat"
      >
        <ChatRound aria-hidden="true" size={14} weight="Linear" />
        <span>community chat</span>
      </a>
      <div className="website-sketch-rule" aria-hidden="true" />
      <div
        className="website-sidebar__icon-buttons"
        aria-label="Display controls"
      >
        <a
          href="https://github.com/andreihuyoa"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          <UsersGroupRounded aria-hidden="true" size={14} weight="Linear" />
        </a>
        <button type="button" aria-label="Light theme" title="Light theme">
          <Sun aria-hidden="true" size={14} weight="Linear" />
        </button>
        <button
          type="button"
          aria-label="Dark theme"
          title="Dark theme — coming soon"
        >
          <Moon aria-hidden="true" size={14} weight="Linear" />
        </button>
        <button type="button" aria-label="Sound" title="Sound — coming soon">
          <Soundwave aria-hidden="true" size={14} weight="Linear" />
        </button>
      </div>
      <p>For work, collaborations &amp; everything else, reach me at</p>
      <a className="website-email-link" href="mailto:andrei.huyoa.me@gmail.com">
        <Letter aria-hidden="true" size={22} weight="Linear" />
        <span>andrei.huyoa.me@gmail.com</span>
      </a>
    </div>
  </aside>
);
