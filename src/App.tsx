import { useState } from "react";
import type { ReactElement } from "react";
import "./index.css";

import TaskBar from "./components/TaskBar";
import StartButton from "./components/StartButton";
import StartMenu from "./components/StartMenu";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import { useDesignMode } from "./components/mode/use-design-mode";
import WebsiteMode from "./views/WebsiteMode";

import Biography from "./views/Biography";
import Resume from "./views/Resume";
import Mail from "./views/Mail";
import Hilom from "./views/projects/hilom";

const BiographyIcon = "/assets/WinIcons/computer.png";
const ResumeIcon = "/assets/WinIcons/folder.png";
const MailIcon = "/assets/WinIcons/mail.png";
const NotFoundIcon = "/assets/WinIcons/world.png";
const SwitchIcon = "/assets/WinIcons/switch.png";

import { TaskBarButton } from "./components/TaskBarButton";

interface Position {
  x: number;
  y: number;
}

interface OpenWindow {
  windowId: string;
  title: string;
  content: ReactElement;
  icon: string;
  zIndex: number;
  minimized: boolean;
  position: Position;
}

const App = (): ReactElement => {
  const { mode, setMode } = useDesignMode();

  const getBiographyPosition = (): Position => {
    return {
      x: window.innerWidth * 0.1,
      y: window.innerHeight * 0.1,
    };
  };

  const getRandomPosition = (): Position => {
    const biographyPos = getBiographyPosition();

    const offsetX = Math.floor(Math.random() * 200) + 1;
    const offsetY = Math.floor(Math.random() * 50) + 1;

    return {
      x: biographyPos.x + offsetX,
      y: biographyPos.y + offsetY,
    };
  };

  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([
    {
      windowId: "biography",
      title: "Biography",
      content: <Biography />,
      icon: BiographyIcon,
      zIndex: 1,
      minimized: false,
      position: getBiographyPosition(),
    },
  ]);

  const [zIndexCounter, setZIndexCounter] = useState(1);

  const toggleStartMenu = (): void => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  //Open a window by adding it sa openWindows array if di pa open
  const openWindow = (
    windowId: string,
    title: string,
    content: ReactElement,
    icon: string,
  ): void => {
    const existingWindow = openWindows.find((win) => win.windowId === windowId);

    if (!existingWindow) {
      const position =
        windowId === "biography" ? getBiographyPosition() : getRandomPosition();

      setOpenWindows((prevWindows) => [
        ...prevWindows,
        {
          windowId,
          title,
          content,
          icon,
          zIndex: zIndexCounter,
          minimized: false,
          position,
        },
      ]);
      setZIndexCounter((prev) => prev + 1);
    } else {
      //if window is open just bring it sa front
      bringToFront(windowId);
    }
  };

  const bringToFront = (windowId: string): void => {
    setOpenWindows((prevWindows) =>
      prevWindows.map((win) =>
        win.windowId === windowId ? { ...win, zIndex: zIndexCounter } : win,
      ),
    );
    setZIndexCounter((prev) => prev + 1);
  };

  // Close a window by removing it from the openWindows array
  const closeWindow = (windowId: string): void => {
    setOpenWindows((prevWindows) =>
      prevWindows.filter((win) => win.windowId !== windowId),
    );
  };

  // Minimize a window by updating its minimized state to true
  const minimizeWindow = (windowId: string): void => {
    setOpenWindows((prevWindows) =>
      prevWindows.map((win) =>
        win.windowId === windowId ? { ...win, minimized: true } : win,
      ),
    );
  };

  // Toggle minimized state when the taskbar button is clicked
  const toggleMinimizedWindow = (windowId: string): void => {
    setOpenWindows((prevWindows) =>
      prevWindows.map((win) =>
        win.windowId === windowId ? { ...win, minimized: !win.minimized } : win,
      ),
    );
  };

  if (mode === "website") {
    return <WebsiteMode />;
  }

  return (
    <div className="flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden">
      {/* Desktop Area */}
      <div
        id="screen"
        className="relative flex h-[calc(100dvh-3rem)] max-h-[calc(100dvh-3rem)] flex-col overflow-hidden px-3 py-4"
      >
        {/* Folder Icons */}
        <DesktopIcon
          icon={BiographyIcon}
          title="Biography"
          onDoubleClick={() =>
            openWindow("biography", "Biography", <Biography />, BiographyIcon)
          }
        />
        <DesktopIcon
          icon={ResumeIcon}
          title="Resume"
          onDoubleClick={() =>
            openWindow("resume", "Resume", <Resume />, ResumeIcon)
          }
        />
        <DesktopIcon
          icon={MailIcon}
          title="Mail"
          onDoubleClick={() => openWindow("mail", "Mail", <Mail />, MailIcon)}
        />
        <DesktopIcon
          icon={NotFoundIcon}
          title="Hilom"
          onDoubleClick={() =>
            openWindow("hilom", "Hilom", <Hilom />, NotFoundIcon)
          }
        />
        <DesktopIcon
          icon={SwitchIcon}
          title="Website"
          onDoubleClick={() => setMode("website")}
        />
        {/* Opened Folders/Windows */}
        {openWindows.map((win) => (
          <Window
            key={win.windowId}
            windowId={win.windowId}
            title={win.title}
            icon={win.icon}
            zIndex={win.zIndex}
            onClose={() => closeWindow(win.windowId)}
            onMinimize={() => minimizeWindow(win.windowId)}
            onClick={() => bringToFront(win.windowId)}
            isMinimized={win.minimized}
            initialPos={win.position}
          >
            {win.content}
          </Window>
        ))}
      </div>

      <TaskBar>
        <StartButton onClick={toggleStartMenu} />
        {/* make this as a component later, para sa mga opened apps in taskbar */}
        {openWindows.map((win) => (
          <TaskBarButton
            key={win.windowId}
            onClick={() => toggleMinimizedWindow(win.windowId)}
            icon={win.icon}
            title={win.title}
          >
            {win.title}
          </TaskBarButton>
        ))}
      </TaskBar>
      {/* Start Menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
      />
    </div>
  );
};

export default App;
