import React, { useEffect, useState } from "react";
import "../index.css";

import TaskBar from "./TaskBar";
import StartButton from "./StartButton";
import StartMenu from "./StartMenu";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";

import Biography from "../views/Biography";
import Resume from "../views/Resume";
import Mail from "../views/Mail";

const App = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState([
    {
      windowId: "biography",
      label: "Biography",
      content: <Biography />,
      zIndex: 1,
      minimized: false,
    },
  ]);
  const [zIndexCounter, setZIndexCounter] = useState(1);

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  //Open a window by adding it sa openWindows array if di pa open
  const openWindow = (windowId, label, content) => {
    const existingWindow = openWindows.find((win) => win.windowId === windowId);

    if (!existingWindow) {
      // add new window window with zIndex
      setOpenWindows((prevWindows) => [
        ...prevWindows,
        { windowId, label, content, zIndex: zIndexCounter, minimized: false },
      ]);
      setZIndexCounter((prev) => prev + 1);
    } else {
      //if window is open just bring it sa front
      bringToFront(windowId);
    }
  };

  const bringToFront = (windowId) => {
    setOpenWindows((prevWindows) =>
      prevWindows.map((win) =>
        win.windowId === windowId ? { ...win, zIndex: zIndexCounter } : win
      )
    );
    setZIndexCounter((prev) => prev + 1);
  };

  // Close a window by removing it from the openWindows array
  const closeWindow = (windowId) => {
    setOpenWindows((prevWindows) => prevWindows.filter((win) => win.windowId !== windowId));
  };

  // Minimize a window by updating its minimized state to true
  const minimizeWindow = (windowId) => {
    setOpenWindows((prevWindows) =>
      prevWindows.map((win) => (win.windowId === windowId ? { ...win, minimized: true } : win))
    );
  };

  // Toggle minimized state when the taskbar button is clicked
  const toggleMinimizedWindow = (windowId) => {
    setOpenWindows((prevWindows) =>
      prevWindows.map((win) =>
        win.windowId === windowId ? { ...win, minimized: !win.minimized } : win
      )
    );
  };

  return (
    <div id="screen" className="h-screen bg-95-cyan flex flex-col relative">
      {/* Desktop Area */}
      <div className="flex-grow">
        {/* Folder Icons */}

        <DesktopIcon
          label="Biography"
          onDoubleClick={() => openWindow("biography", "Biography", <Biography />)}
        />

        <DesktopIcon
          label="Résumé"
          onDoubleClick={() => openWindow("Résumé", "Résumé", <Resume />)}
        />

        <DesktopIcon label="Mail" onDoubleClick={() => openWindow("mail", "Mail", <Mail />)} />
      </div>

      <TaskBar>
        <StartButton onClick={toggleStartMenu} />
        {/* make this as a component later, para sa mga opened apps in taskbar */}
        {openWindows.map((win) => (
          <button
            key={win.windowId}
            onClick={() => toggleMinimizedWindow(win.windowId)}
            className="text-xs text-white px-2"
          >
            {win.label}
          </button>
        ))}
      </TaskBar>

      {/* Start Menu */}
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />

      {/* Opened Folders/Windows */}

      {openWindows.map((win) => (
        <Window
          key={win.windowId}
          windowId={win.windowId}
          title={win.label}
          zIndex={win.zIndex}
          onClose={() => closeWindow(win.windowId)}
          onMinimize={() => minimizeWindow(win.windowId)}
          onClick={() => bringToFront(win.windowId)}
          isMinimized={win.minimized}
        >
          {win.content}
        </Window>
      ))}
    </div>
  );
};

export default App;
