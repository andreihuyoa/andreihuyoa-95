import React, { useEffect, useRef, useState } from "react";
import interact from "interactjs";

const Window = ({
  icon,
  title,
  windowId,
  onClose,
  onClick,
  onMinimize,
  isMinimized,
  children,
  zIndex,
  initialPos,
}) => {
  const windowRef = useRef(null);
  const label = useRef(null);
  const position = useRef(initialPos || { x: 128, y: 60 }); // initial window position

  const [size, setSize] = useState({ width: 500, height: 800 });
  const [isMaximized, setIsMaximized] = useState(false);
  const prevSize = useRef(size);
  const [isDragging, setIsDragging] = useState(false);

  const onMaximize = () => {
    const screenRect = document.getElementById("screen").getBoundingClientRect();
    if (isMaximized) {
      setSize(prevSize.current);
      position.current = initialPos || { x: 128, y: 80 };
      windowRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
      // setTimeout(() => {
      //   //change this to where last dragged instead of default
      // }, 500); //this set time out adds yung pag return ng max to min ng transition, wo this it snaps back, may bug rin na pag masyado ka mabilis mag minmax nababaliw siya
    } else {
      prevSize.current = size;
      setSize({ width: screenRect.width, height: screenRect.height });
      position.current = { x: 0, y: 0 };
    }
    setIsMaximized(!isMaximized);
  };

  useEffect(() => {
    const windowElement = windowRef.current;
    let offset = { x: 0, y: 0 };

    interact(label.current)
      .draggable({
        listeners: {
          start(event) {
            //prevent text/object selection when dragging
            setIsDragging(true);
            document.body.style.userSelect = "none";

            // Capture the initial offset between mouse and window
            const { x, y } = position.current;
            offset.x = event.clientX - x;
            offset.y = event.clientY - y;
          },
          move(event) {
            // position based on the mouse movement and offset
            position.current.x = event.clientX - offset.x;
            position.current.y = event.clientY - offset.y;

            //apply new pos to the window
            windowElement.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
          },
          end(event) {
            setIsDragging(false);
            document.body.style.userSelect = "";

            //bounds
            const screenRect = document.getElementById("screen").getBoundingClientRect();
            const minX = 0;
            const maxX = screenRect.width - size.width;
            const minY = 0;
            const maxY = screenRect.height - size.height;

            //clamp pos within bounds
            position.current.x = Math.max(minX, Math.min(maxX, position.current.x));
            position.current.y = Math.max(minY, Math.min(maxY, position.current.y));

            windowElement.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
          },
        },
        modifiers: [
          interact.modifiers.restrict({
            restriction: "parent", //allows drag but restrict final position on mouseup
            endOnly: true,
          }),
        ],
      })
      .on("dragstart", () => windowElement.classList.add("dragging"))
      .on("dragend", () => windowElement.classList.remove("dragging"));

    //resizing ng window
    interact(windowElement).resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        start() {
          setIsDragging(true);
          document.body.style.userSelect = "none";
        },
        move(event) {
          setSize({
            width: event.rect.width,
            height: event.rect.height,
          });

          // Update position based on resizing movement
          position.current.x += event.deltaRect.left;
          position.current.y += event.deltaRect.top;

          windowElement.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
        },
        end() {
          setIsDragging(false);
          document.body.style.userSelect = "";
        },
      },
      modifiers: [
        interact.modifiers.restrictSize({
          min: { width: 500, height: 500 },
          max: {
            width: document.getElementById("screen").clientWidth,
            height: document.getElementById("screen").clientHeight,
          },
        }),
      ],
    });
  }, [size]);

  const windowStyle = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    transform: `translate(${position.current.x}px, ${position.current.y}px)`,
    zIndex: zIndex,
    display: isMinimized ? "none" : "block",
    transition: isMaximized ? "width 0.6s ease, height 0.6s ease, transform 0.6s ease" : "none",
  };

  return (
    <div
      ref={windowRef}
      id={windowId}
      style={windowStyle}
      className="absolute overflow-hidden border-2 border-95-white border-r-95-black border-b-95-black bg-95-gray shadow-lg"
      onClick={onClick} // bringToFront onClick func
    >
      <div
        ref={label}
        className="flex items-center justify-between bg-95-navy p-1 border-b-2 border-95-white border-b-95-black cursor-default"
      >
        {/* Header */}
        <div className="flex items-center gap-1 ">
          <img src={icon} alt={title} className="w-5 h-5 bg-transparent" />
          <span className="text-white text-xs">{title}</span>
        </div>

        <div className="">
          <button onClick={onMinimize} className="text-white text-xs px-2">
            —
          </button>
          <button onClick={onMaximize} className="text-white text-xs px-2">
            {isMaximized ? "🗗" : "🗖"}
          </button>
          <button onClick={onClose} className="text-white text-xs px-2">
            x
          </button>
        </div>
      </div>
      <div className="p-1 pb-8 overflow-auto h-full">{children}</div>
    </div>
  );
};

export default Window;
