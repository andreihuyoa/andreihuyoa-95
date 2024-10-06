import React from "react";

import Button from "./Button";

const SubHeader = ({ className = "", icon, title, onSend }) => {
  return (
    <div
      className={`p-1 border border-95-white outline outline-1 outline-95-darkgray text-sm font-bold text-black ${className}`}
    >
      <Button onClick={onSend}>
        <img src={icon} alt={title} className="w-3 h-3" /> {title}
      </Button>
    </div>
  );
};

export default SubHeader;
