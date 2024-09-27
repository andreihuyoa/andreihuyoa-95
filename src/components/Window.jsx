import React, { useEffect, useRef, useState } from "react";
import interact from "interactjs";

const Window = ({ icon, title, windowId, onClose, onMinimize, children }) => {
  const windowRef = useRef(null);
  const label = useRef(null);
  const position = useRef({ x: 128, y: 80 }); //initial window position

  const [size, setSize] = useState({ width: 500, height: 800 });
  const [dragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const prevSize = useRef(size);

  const handleMaximize = () => {
    const screenRect = document.getElementById("screen").getBoundingClientRect();
    if (isMaximized) {
      setSize(prevSize.current);
      position.current = { x: 128, y: 80 };
    } else {
      prevSize.current = size;
      setSize({ width: screenRect.width, height: screenRect.height });
      position.current = { x: 0, y: 0 };
    }
    setIsMaximized(!isMaximized);
  };

  useEffect(() => {
    const windowElement = windowRef.current;

    interact(label.current)
      .draggable({
        listeners: {
          move(event) {
            position.current.x += event.dx;
            position.current.y += event.dy;

            const screenRect = document.getElementById("screen").getBoundingClientRect();
            const windowRect = windowElement.getBoundingClientRect();

            // Prevent moving outside left and top boundaries
            position.current.x = Math.max(position.current.x, 0);
            position.current.y = Math.max(position.current.y, 0);

            // Prevent moving outside right and bottom boundaries
            position.current.x = Math.min(position.current.x, screenRect.width - windowRect.width);
            position.current.y = Math.min(
              position.current.y,
              screenRect.height - windowRect.height
            );

            windowElement.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
          },
        },
      })
      .on("dragstart", () => setIsDragging(true))
      .on("dragend", () => setIsDragging(false));

    interact(windowElement).resizable({
      edges: { left: true, right: true, bottom: true, top: false },
      listeners: {
        move(event) {
          setSize({
            width: event.rect.width,
            height: event.rect.height,
          });

          position.current.x += event.deltaRect.left;
          position.current.y += event.deltaRect.top;

          windowElement.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
        },
      },
      modifiers: [
        interact.modifiers.restrictSize({
          min: { width: 600, height: 600 },
          max: {
            width: document.getElementById("screen").clientWidth - position.current.x,
            height: document.getElementById("screen").clientHeight - position.current.y,
          },
        }),
      ],
    });
  }, [size]);

  const windowStyle = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    transform: `translate(${position.current.x}px, ${position.current.y}px)`,
  };

  return (
    <div
      ref={windowRef}
      id={windowId}
      style={windowStyle}
      className="absolute overflow-hidden border-2 border-95-white border-r-95-black border-b-95-black bg-95-gray shadow-lg"
    >
      <div
        ref={label}
        className="flex items-center justify-between bg-95-navy p-1 border-b-2 border-95-white border-b-95-black cursor-auto"
      >
        <div>
          <img src={icon} alt="" />
          <span className="text-white text-xs">{title}</span>
        </div>

        <div className="">
          {/* make this buttons as components later */}
          <button onClick={onMinimize} className="text-white text-xs px-2">
            -
          </button>
          <button onClick={handleMaximize} className="text-white text-xs px-2">
            {isMaximized ? "🗗" : "🗖"}
          </button>
          <button onClick={onClose} className="text-white text-xs px-2">
            x
          </button>
        </div>
      </div>
      <div className="p-2 overflow-auto h-full">{children}</div>
    </div>
  );
};

export default Window;
