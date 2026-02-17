import Button from "./Button";

const SubHeader = ({ className = "", buttons = [] }) => {
  return (
    <div
      className={`border-95-white outline-95-darkgray flex gap-1 border px-1 py-0.5 text-sm font-bold text-black outline-1 ${className}`}
    >
      {buttons.map(({ icon, title, onClick }, index) => (
        <Button key={index} onClick={onClick}>
          {/* icon and title */}
          {icon && (
            <img
              src={icon}
              title={title}
              alt=""
              className="h-4 w-4 bg-transparent"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          {title}
        </Button>
      ))}
    </div>
  );
};

export default SubHeader;
