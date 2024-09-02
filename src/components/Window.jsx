import React, { useEffect, useRef } from "react";
import interact from "interactjs";

const Window = ({ title, onClose, children }) => {
  const windowRef = useRef(null);
  const titleBarRef = useRef(null);

  useEffect(() => {
    const windowElement = windowRef.current;

    interact(titleBarRef.current).draggable({
      listeners: {
        move(event) {
          const target = windowElement;
          const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
        },
      },
    });
    interact(windowElement).resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      modifiers: [interact.modifiers.restrictSize({ min: { width: 200, height: 100 } })],
      listeners: {
        move(event) {
          const target = event.target;
          let x = parseFloat(target.getAttribute("data-x")) || 0;
          let y = parseFloat(target.getAttribute("data-y")) || 0;

          // Update the size
          target.style.width = `${event.rect.width}px`;
          target.style.height = `${event.rect.height}px`;

          // Adjust the position
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.transform = `translate(${x}px, ${y}px)`;

          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
        },
      },
    });
  }, []);

  return (
    <div
      ref={windowRef}
      className="absolute top-20 left-32 w-[40rem] h-64 overflow-hidden border-2 border-95-white border-r-95-black border-b-95-black bg-95-gray shadow-lg"
    >
      <div
        ref={titleBarRef}
        className="flex items-center justify-between bg-95-blue p-1 border-b-2 border-95-white border-b-95-black cursor-auto"
      >
        <span className="text-white text-xs">{title}</span>
        <button onClick={onClose} className="text-white text-xs px-2">
          X
        </button>
      </div>
      <div className="p-2 overflow-auto h-full">{children}</div>
    </div>
  );
};

export default Window;
