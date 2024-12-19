import React from "react";

const DesktopIcon = ({ icon, title, onDoubleClick }) => {
  return (
    <div
      className="m-4 flex w-20 cursor-pointer flex-col items-center p-3 text-95-black"
      onDoubleClick={() => onDoubleClick(icon, title)}
    >
      <img
        src={icon}
        alt={title}
        className="mb-2 flex h-12 w-12 items-center justify-center bg-95-gray bg-transparent"
      />
      <div className="text-center text-xs text-white">{title}</div>
    </div>
  );
};

export default DesktopIcon;
