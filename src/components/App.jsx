import React, { useState } from "react";
import "../index.css";
import TaskBar from "./TaskBar";
import StartButton from "./StartButton";
import StartMenu from "./StartMenu";
import Biography from "../views/Biography";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";

const App = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  //Open a window by adding it sa openWindows array if di pa open
  const openWindow = (windowId, label, content) => {
    if (!openWindows.some((win) => win.windowId === windowId)) {
      setOpenWindows((prevWindows) => [
        ...prevWindows,
        { windowId, label, content, minimized: false },
      ]);
    }
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
        <DesktopIcon />
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

      {openWindows.map((win) =>
        !win.minimized ? (
          <Window
            key={win.windowId}
            windowId={win.windowId}
            title={win.label}
            onClose={() => closeWindow(win.windowId)}
            onMinimize={() => minimizeWindow(win.windowId)}
          >
            {win.content}
          </Window>
        ) : null
      )}
    </div>
  );
};

export default App;
