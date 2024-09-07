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
  //   const [isBiographyOpen, setIsBiographyOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const openWindow = (windowId, label, content) => {
    if (!openWindows.some((win) => win.windowId === windowId)) {
      setOpenWindows((prevWindows) => [...prevWindows, { windowId, label, content }]);
    }
  };

  const closeWindow = (windowId) => {
    setOpenWindows((prevWindows) => prevWindows.filter((win) => win.windowId !== windowId));
  };

  //   const closeBiographyWindow = () => {
  //     setIsBiographyOpen(false);
  //   };

  return (
    <div id="screen" className="h-screen bg-95-cyan flex flex-col relative">
      {/* Desktop Area */}
      <div className="flex-grow">
        {/* Folder Icons */}

        <DesktopIcon
          label={Biography}
          onDoubleClick={() => openWindow("biography", "Biography", <Biography />)}
        />
        <DesktopIcon />
      </div>
      <TaskBar>
        <StartButton onClick={toggleStartMenu} />
        {openWindows.map((win) => (
          <button
            key={win.windowId}
            onClick={() => openWindow(win.windowId, win.label, win.content)}
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
          onClose={() => closeWindow(win.windowId)}
        >
          {win.content}
        </Window>
      ))}
      {/* {isBiographyOpen && (
        <Window title="Biography" onClose={closeBiographyWindow}>
          <Biography />
        </Window>
      )} */}
    </div>
  );
};

export default App;
