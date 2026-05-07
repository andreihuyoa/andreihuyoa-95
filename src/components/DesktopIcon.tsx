import type { ReactNode } from "react";

interface DesktopIconProps {
  icon: string;
  title: string;
  onDoubleClick: (icon: string, title: string) => void;
  size?: string;
}

const DesktopIcon = ({
  icon,
  title,
  onDoubleClick,
  size = "h-14 w-14 md:h-16 md:w-16",
}: DesktopIconProps): ReactNode => {
  return (
    <div
      className="text-95-black flex h-20 w-20 cursor-pointer flex-col items-center md:h-24 md:w-24"
      onDoubleClick={() => onDoubleClick(icon, title)}
    >
      <img
        src={icon}
        alt={title}
        className={`mb-2 flex items-center bg-transparent ${size}`}
      />
      <div className="text-center text-xs tracking-wider text-white md:text-sm">
        {title}
      </div>
    </div>
  );
};

export default DesktopIcon;
