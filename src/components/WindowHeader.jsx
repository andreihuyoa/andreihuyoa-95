import React from "react";

import Button from "./Button";

const WindowHeader = ({ className = "", title, onSend }) => {
  return (
    <div
      className={`p-1 border border-95-white outline outline-1 outline-95-darkgray text-sm font-bold text-black ${className}`}
    >
      <Button onClick={onSend}>{title}</Button>
    </div>
  );
};

export default WindowHeader;
