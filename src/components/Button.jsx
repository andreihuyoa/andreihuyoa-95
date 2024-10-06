import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      // font weight bold might create a different component since eto yung start button
      className="flex gap-1 items-center px-2 py-2 w-fit text-black font-MSW98UIRegular font-bold bg-95-gray border-2 border-95-white border-r-95-black border-b-95-black active:border-95-black active:border-t-95-black active:border-l-95-black active:border-r-95-white active:border-b-95-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
