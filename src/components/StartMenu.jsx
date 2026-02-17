import SocialsButton from "./SocialsButton";

const HisResume = "/assets/Resume/Carl Andrei Del Rosario - Resume.pdf";

const sidebarImage = "/assets/AndreiHuyoa95.png";
const ig = "/assets/StartMenu/Instagram.svg";
const git = "/assets/StartMenu/Github.svg";
const linkedin = "/assets/StartMenu/Linkedin.svg";
const file = "/assets/StartMenu/Attachment.svg";
// const project1 = "/assets/StartMenu/Lokalista.svg";

// eslint-disable-next-line no-unused-vars
const StartMenu = ({ isOpen, onClose }) => {
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
        <SocialsButton icon={file} link={HisResume} text="Resume" />
        {/* <SocialsButton icon={project1} link="" text="Lokalista" /> */}
      </div>
    </div>
  );
};

export default StartMenu;
