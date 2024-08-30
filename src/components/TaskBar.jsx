import React from "react";

const TaskBar = ({ children }) => {
  return (
    <div className="h-10 bg-95-gray border-t-2 border-95-white flex items-center px-2">
      {children}
    </div>
  );
};

export default TaskBar;
