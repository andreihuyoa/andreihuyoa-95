import React from "react";

const DesktopIcon = ({ icon, label, onClick }) => {
  return (
    <div className="flex flex-col items-center w-16 cursor-pointer" onClick={onClick}>
      <div className="w-8 h-8 bg-95-gray flex items-center justify-center mb-1">{icon}</div>
      <div className="text-white text-xs text-center">{label}</div>
    </div>
  );
};

export default DesktopIcon;
