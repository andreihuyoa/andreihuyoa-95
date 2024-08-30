import React from "react";
import Button from "./Button";
import TaskBar from "./TaskBar";
import StartMenu from "./StartMenu";

const Window = () => {
  return (
    <div className="h-screen flex flex-col bg-95-cyan">
      <div className="flex-grow">{/* content here */}</div>
      <TaskBar>
        <Button>Start</Button>
      </TaskBar>
    </div>
  );
};

export default Window;
