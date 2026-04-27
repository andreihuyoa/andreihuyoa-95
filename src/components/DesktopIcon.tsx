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
  size = "w-12 h-12",
}: DesktopIconProps): ReactNode => {
  return (
    <div
      className="text-95-black my-2 flex h-12 w-12 cursor-pointer flex-col items-center p-2 md:my-4 md:h-14 md:w-14"
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
