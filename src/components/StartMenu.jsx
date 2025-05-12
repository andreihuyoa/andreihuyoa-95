import React from "react";
import SocialsButton from "./SocialsButton";

import HisResume from "../assets/Resume/CarlAndreiDelRosario.pdf";

import sidebarImage from "../assets/AndreiHuyoa95.png";
import ig from "../assets/StartMenu/Instagram.svg";
import git from "../assets/StartMenu/Github.svg";
import linkedin from "../assets/StartMenu/Linkedin.svg";
import file from "../assets/StartMenu/Attachment.svg";
import project1 from "../assets/StartMenu/Lokalista.svg";

const StartMenu = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="absolute bottom-12 left-0 z-[9999] flex overflow-hidden border-2 border-95-white border-b-95-black border-r-95-black bg-95-gray font-MS95 text-sm">
      {/* Sidebar */}
      <div className="flex items-stretch">
        <img src={sidebarImage} alt="AndreiHuyoa95" className="h-auto w-6" />
      </div>
      <div className="flex-grow justify-between">
        {/* Socials */}
        <SocialsButton
          icon={ig}
          link="https://www.instagram.com/unabridgedeeyore"
          text="Instagram"
        />
        <SocialsButton
          icon={linkedin}
          link="https://www.linkedin.com/in/carl-andrei-del-rosario-3bab57257/"
          text="LinkedIn"
        />
        <SocialsButton
          icon={git}
          link="https://www.github.com/andreihuyoa"
          text="Github"
        />
        <div className="my-2 border-t border-gray-500"></div>
        <SocialsButton icon={file} link={HisResume} text="Resume" />
        <SocialsButton icon={project1} link="" text="Lokalista" />
      </div>
    </div>
  );
};

export default StartMenu;
