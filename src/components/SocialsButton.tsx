import type { ReactNode } from "react";

interface SocialsButtonProps {
  icon: string;
  link: string;
  text: string;
}

const SocialsButton = ({
  icon,
  link,
  text,
}: SocialsButtonProps): ReactNode => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="flex cursor-pointer items-center px-2 py-3 hover:bg-95-navy hover:text-95-white">
        <img src={icon} alt={text} className="mr-2 h-6 w-6" />
        <span className="first-letter:underline">{text}</span>
      </div>
    </a>
  );
};

export default SocialsButton;
