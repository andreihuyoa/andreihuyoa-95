import type { ReactNode } from "react";

interface TaskBarProps {
  children: ReactNode;
}

const TaskBar = ({ children }: TaskBarProps): ReactNode => {
  return (
    <div className="border-95-white bg-95-gray fixed right-0 bottom-0 left-0 flex h-12 items-center overflow-hidden border-t-2 px-1">
      {children}
    </div>
  );
};

export default TaskBar;
