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
  const [isBiographyOpen, setIsBiographyOpen] = useState(false);

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const closeBiographyWindow = () => {
    setIsBiographyOpen(false);
  };

  return (
    <div className="h-screen bg-95-cyan flex flex-col relative">
      {/* Desktop Area */}
      <div className="flex-grow">
        {/* Folder Icons */}

        <DesktopIcon label={Biography} onDoubleClick={() => setIsBiographyOpen(true)} />
        <DesktopIcon />
        <DesktopIcon />
        {/* <Biography /> */}
      </div>
      <TaskBar>
        <StartButton onClick={toggleStartMenu} style={{ border: "2px solid red" }} />
      </TaskBar>

      {/* Start Menu */}
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
      {/* Opened Folders/Windows */}
      {isBiographyOpen && (
        <Window title="Biography" onClose={closeBiographyWindow}>
          <Biography />
        </Window>
      )}
    </div>
  );
};

export default App;
