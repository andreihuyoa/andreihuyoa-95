const DesktopIcon = ({ icon, title, onDoubleClick }) => {
  return (
    <div
      className="my-2 flex h-12 w-12 cursor-pointer flex-col items-center p-2 text-95-black md:my-4 md:h-14 md:w-14"
      onDoubleClick={() => onDoubleClick(icon, title)}
    >
      <img
        src={icon}
        alt={title}
        className="mb-2 flex items-center bg-95-gray bg-transparent"
      />
      <div className="text-center text-xs tracking-wider text-white md:text-sm">
        {title}
      </div>
    </div>
  );
};

export default DesktopIcon;
