import React from "react";

const StartButton = ({ onClick }) => {
  return (
    <button
      //add shadow din siguro later
      className="px-2 py-1 bg-95-gray border-2 border-95-white border-r-95-black border-b-95-black active:border-95-black active:border-r-95-white active:border-b-95-white
      flex items-center space-x-1 focus:outline-none"
      onClick={onClick}
    >
      {/* Microsoft logo cutesy */}
      <div className="w-4 h-4 bg-[#008080] flex items-center justify-center">
        <div className="w-3 h-3 bg-95-gray grid grid-cols-2 grid-rows-2">
          <div className="bg-red-500"></div>
          <div className="bg-green-500"></div>
          <div className="bg-blue-500"></div>
          <div className="bg-yellow-500"></div>
        </div>
      </div>
      <span className="text-95-black text-sm font-MS95">Start</span>
    </button>
  );
};

export default StartButton;
