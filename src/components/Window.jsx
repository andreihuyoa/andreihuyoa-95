import React, { useEffect, useRef, useState } from "react";
import interact from "interactjs";

import min from "../assets/Buttons/min.svg";
import max from "../assets/Buttons/max.svg";
import close from "../assets/Buttons/x.svg";

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
  initialPos = { x: window.innerWidth * 0.2, y: window.innerHeight * 0.1 },
}) => {
  const windowRef = useRef(null);
  const label = useRef(null);
  const position = useRef(initialPos || { x: 128, y: 60 }); // initial window position

  const [size, setSize] = useState({
    width: Math.min(500, window.innerWidth * 0.6),
    height: Math.min(800, window.innerHeight * 0.8),
  });

  const [isMaximized, setIsMaximized] = useState(false);
  const prevSize = useRef(size);

  const onMaximize = () => {
    const screenRect = document
      .getElementById("screen")
      .getBoundingClientRect();
    if (isMaximized) {
      setSize(prevSize.current);
      position.current = initialPos || {
        x: Math.min(position.current.x, window.innerWidth - size.width),
        y: Math.min(position.current.y, window.innerHeight - size.height),
      };
      // windowRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;

      // setTimeout(() => {
      // }, 500);

      //this set time out adds yung pag return ng max to min ng transition, wo this it snaps back, may bug rin na pag masyado ka mabilis mag minmax nababaliw siya

      // change this to where last dragged instead of default na babalik sa default position
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

    interact(label.current).draggable({
      listeners: {
        start(event) {
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
        end() {
          //bounds
          const screenRect = document
            .getElementById("screen")
            .getBoundingClientRect();
          const minX = 0;
          const maxX = screenRect.width - size.width;
          const minY = 0;
          const maxY = screenRect.height - size.height;

          //clamp pos within bounds
          position.current.x = Math.max(
            minX,
            Math.min(maxX, position.current.x),
          );
          position.current.y = Math.max(
            minY,
            Math.min(maxY, position.current.y),
          );

          windowElement.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
        },
      },
      modifiers: [
        interact.modifiers.restrict({
          restriction: "parent", //allows drag but restrict final position on mouseup
          endOnly: true,
        }),
      ],
    });

    // Resize ng window
    interact(windowElement).resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        move(event) {
          setSize({
            width: event.rect.width,
            height: event.rect.width,
          });

          // Update position based on resizing movement
          position.current.x += event.deltaRect.left;
          position.current.y += event.deltaRect.top;

          windowElement.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
        },
      },
      modifiers: [
        interact.modifiers.restrictSize({
          min: { width: 600, height: 700 },
          max: {
            width: window.innerWidth,
            height: window.innerHeight,
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
    transition: isMaximized
      ? "width 0.3s ease, height 0.3s ease, transform 0.3s ease"
      : "none", // ! when added transform 0.3s all may delay yung drag ng window fix this
  };

  return (
    <div
      ref={windowRef}
      id={windowId}
      style={windowStyle}
      className="absolute overflow-hidden border-2 border-95-white border-b-95-black border-r-95-black bg-95-gray shadow-lg"
      onClick={onClick} // bringToFront onClick func
      onDoubleClick={onMaximize}
    >
      <div
        ref={label}
        className="flex cursor-default items-center justify-between border-b-2 border-95-white border-b-95-black bg-95-navy p-1"
      >
        {/* Header */}
        <div className="flex items-center gap-2">
          <img src={icon} alt={title} className="h-6 w-6 bg-transparent" />
          <span className="text-xs text-white">{title}</span>
        </div>

        <div className="flex *:w-5 *:items-center *:border-2 *:border-95-white *:border-b-95-black *:border-r-95-black *:bg-95-gray *:focus:outline-none">
          <button
            onClick={onMinimize}
            className="mr-1 active:border-95-black active:border-b-95-white active:border-r-95-white"
          >
            <img src={min} alt="min" />
          </button>
          <button
            onClick={onMaximize}
            className="mr-1 active:border-95-black active:border-b-95-white active:border-r-95-white"
          >
            <img src={max} alt="max" />
          </button>
          <button
            onClick={onClose}
            className="active:border-95-black active:border-b-95-white active:border-r-95-white"
          >
            <img src={close} alt="close" />
          </button>
        </div>
      </div>
      <div className="h-full overflow-auto p-1 pb-8">{children}</div>
    </div>
  );
};

export default Window;
