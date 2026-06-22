import SocialsButton from "./SocialsButton";
import type { ReactNode } from "react";

const sidebarImage = "/assets/AndreiHuyoa95.png";
const ig = "/assets/StartMenu/Instagram.svg";
const git = "/assets/StartMenu/Github.svg";
const linkedin = "/assets/StartMenu/Linkedin.svg";
const website = "/assets/WinIcons/switch.png";
// const project1 = "/assets/StartMenu/Lokalista.svg";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onWebsiteClick: () => void;
}

const StartMenu = ({
  isOpen,
  onClose,
  onWebsiteClick,
}: StartMenuProps): ReactNode => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="border-95-white border-b-95-black border-r-95-black bg-95-gray font-MS95 absolute bottom-12 left-0 z-9999 flex overflow-hidden border-2 text-sm">
      {/* Sidebar Image*/}
      <div className="flex items-stretch">
        <img
          src={sidebarImage}
          alt="Carl Andrei Del Rosario"
          className="h-auto w-6"
        />
      </div>

      {/* Socials */}
      <div className="flex flex-col justify-center">
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

        <div className="mx-2 my-2 border-t border-gray-500" />
        <button
          type="button"
          className="hover:bg-95-navy hover:text-95-white flex cursor-pointer items-center px-2 py-3 text-left"
          onClick={() => {
            onWebsiteClick();
            onClose();
          }}
        >
          <img
            src={website}
            alt="Website"
            className="mr-2 h-6 w-6 scale-200 object-contain"
          />
          <span className="first-letter:underline">Website</span>
        </button>
        {/* <SocialsButton icon={project1} link="" text="Lokalista" /> */}
      </div>
    </div>
  );
};

export default StartMenu;
