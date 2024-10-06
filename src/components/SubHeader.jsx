import React from "react";

import Button from "./Button";

const SubHeader = ({ className = "", buttons = [] }) => {
  return (
    <div
      className={`flex gap-1 py-0.5 px-1 border border-95-white outline outline-1 outline-95-darkgray text-sm font-bold text-black ${className}`}
    >
      {buttons.map(({ icon, title, onClick }, index) => (
        <Button key={index} onClick={onClick}>
          {/* icon and title */}
          {icon && <img src={icon} title={title} className="w-3 h-3 bg-transparent" />}
          {title}
        </Button>
      ))}
    </div>
  );
};

export default SubHeader;
