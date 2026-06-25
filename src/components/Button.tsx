import type { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button = ({
  children,
  onClick,
  className = "",
}: ButtonProps): ReactNode => {
  return (
    <button
      // font weight bold might create a different component since eto yung start button
      className={`font-MS95 bg-95-gray border-95-white border-r-95-black border-b-95-black active:border-95-black active:border-t-95-black active:border-l-95-black active:border-r-95-white active:border-b-95-white flex w-fit items-center gap-1 border-2 px-2 py-2 font-bold text-black ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
