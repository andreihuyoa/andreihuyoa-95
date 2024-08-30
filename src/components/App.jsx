import React, { useState } from "react";
import "../index.css";
import TaskBar from "./TaskBar";
import StartButton from "./StartButton";
import StartMenu from "./StartMenu";

const App = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  return (
    <div className="h-screen bg-95-cyan flex flex-col relative">
      {/* Desktop Area */}
      <div className="flex-grow">{/* Folder Icons */}</div>
      <TaskBar>
        <StartButton onClick={toggleStartMenu} />
      </TaskBar>
      {/* Start Menu */}
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
    </div>
  );
};

export default App;
