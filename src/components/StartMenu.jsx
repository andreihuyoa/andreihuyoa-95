import React from "react";
import SocialsButton from "./SocialsButton";
import sidebarImage from "../assets/AndreiHuyoa95.png";

const StartMenu = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="flex text-sm font-MSW98UIRegular absolute bottom-10 left-0 w- overflow-hidden z-[9999] bg-95-gray border-2 border-95-white border-r-95-black border-b-95-black ">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <img src={sidebarImage} alt="AndreiHuyoa95" className="w-8 h-auto" />
      </div>
      <div className="flex-grow">
        {/* Socials */}
        <SocialsButton icon="" link="www.instagram.com/unabridgedeeyore" text="Instagram" />
        <SocialsButton icon="" link="" text="LinkedIn" />
        <SocialsButton icon="" link="www.github.com/andreihuyoa" text="Github" />
        <div className="my-2 border-t border-gray-500"></div>
        <SocialsButton icon="" link="" text="Resume" />
        <SocialsButton icon="" link="" text="Lokalista" />
      </div>
    </div>
  );
};

export default StartMenu;
