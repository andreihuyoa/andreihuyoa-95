import Button from "./Button";

const SubHeader = ({ className = "", buttons = [] }) => {
  return (
    <div
      className={`flex gap-1 border border-95-white px-1 py-0.5 text-sm font-bold text-black outline outline-1 outline-95-darkgray ${className}`}
    >
      {buttons.map(({ icon, title, onClick }, index) => (
        <Button key={index} onClick={onClick}>
          {/* icon and title */}
          {icon && (
            <img src={icon} title={title} className="h-4 w-4 bg-transparent" />
          )}
          {title}
        </Button>
      ))}
    </div>
  );
};

export default SubHeader;
