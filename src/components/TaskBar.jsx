const TaskBar = ({ children }) => {
  return (
    <div className="flex h-12 items-center border-t-2 border-95-white bg-95-gray px-1">
      {children}
    </div>
  );
};

export default TaskBar;
