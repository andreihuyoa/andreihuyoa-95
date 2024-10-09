import React from "react";
import SocialsButton from "./SocialsButton";

import HisResume from "../assets/Resume/CarlAndreiDelRosario.pdf";

import sidebarImage from "../assets/AndreiHuyoa95.png";
import testicon from "../assets/WinIcons/stardew_valley.png";

const StartMenu = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="flex text-sm font-MS95 absolute bottom-10 left-0 w- overflow-hidden z-[9999] bg-95-gray border-2 border-95-white border-r-95-black border-b-95-black ">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <img src={sidebarImage} alt="AndreiHuyoa95" className="w-8 h-auto" />
      </div>
      <div className="flex-grow">
        {/* Socials */}
        <SocialsButton
          icon={testicon}
          link="https://www.instagram.com/unabridgedeeyore"
          text="Instagram"
        />
        <SocialsButton
          icon={testicon}
          link="https://www.linkedin.com/in/carl-andrei-del-rosario-3bab57257/"
          text="LinkedIn"
        />
        <SocialsButton icon={testicon} link="https://www.github.com/andreihuyoa" text="Github" />
        <div className="my-2 border-t border-gray-500"></div>
        <SocialsButton icon={testicon} link={HisResume} text="Resume" />
        <SocialsButton icon={testicon} link="" text="Lokalista" />
      </div>
    </div>
  );
};

export default StartMenu;
