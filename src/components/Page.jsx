import React from "react";
import Button from "./Button";

const Page = ({ title, children, onClose }) => {
  return (
    <div className="border-2 border-95-white border-r--95-black border-b-95-black bg--95-gray w-64">
      <div className="bg-95-navy text-white px-2 py-1 flex justify-between items-center">
        <span>{title}</span>
        <div className="flex gap-1">
          <Button className="px-1 py-0 text-xs mr-1">_</Button>
          <Button className="px-1 py-0 text-xs mr-1">□</Button>
          <Button className="px-1 py-0 text-xs mr-1" onClick={onClose}>
            ×
          </Button>
        </div>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
};

export default Page;
