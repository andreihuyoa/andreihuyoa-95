import React from "react";

const StartButton = ({ onClick }) => {
  return (
    <button
      className="px-2 py-1 bg-95-gray border-t-95-white border-r-95-darkgray border-b-95-darkgray active:border-r-95-white active:border-b-95-white flex items-center"
      onClick={onClick}
    >
      <span className="mr-1 font-MS95 ">Start</span>
    </button>
  );
};

export default StartButton;
