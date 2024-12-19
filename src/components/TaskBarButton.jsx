export const TaskBarButton = ({ children, onClick, icon, title }) => {
  return (
    <button
      onClick={onClick}
      className={`mr-1 flex items-center border-2 border-95-white border-b-95-black border-r-95-black bg-95-gray px-2 py-1 text-sm focus:outline-none active:border-95-black active:border-b-95-white active:border-r-95-white`}
    >
      <img src={icon} alt={title} className="mr-2 h-4 w-4" />
      {children}
    </button>
  );
};

// Merge TaskBarButton and StartButton as one lol
