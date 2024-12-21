const TaskBar = ({ children }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex h-12 items-center overflow-hidden border-t-2 border-95-white bg-95-gray px-1">
      {children}
    </div>
  );
};

export default TaskBar;
