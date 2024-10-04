import React from "react";

const DesktopIcon = ({ icon, title, onClick, onDoubleClick }) => {
  return (
    <div
      className="flex flex-col items-center w-20 p-3 m-4  cursor-pointer"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <img
        src={icon}
        alt={title}
        className="w-12 h-12 bg-95-gray flex items-center justify-center bg-transparent mb-2"
      />
      <div className="text-white text-xs text-center">{title}</div>
    </div>
  );
};

export default DesktopIcon;
