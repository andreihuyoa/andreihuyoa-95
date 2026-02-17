import { useEffect, useRef, useState } from "react";
import interact from "interactjs";

const min = "/assets/Buttons/min.svg";
const max = "/assets/Buttons/max.svg";
const close = "/assets/Buttons/x.svg";

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
  initialPos = { x: window.innerWidth * 0.1, y: window.innerHeight * 0.1 },
}) => {
  const windowRef = useRef(null);
  const label = useRef(null);
  const position = useRef(initialPos); // initial window position
  const tempPosition = useRef({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sizeRef = useRef({
    width: Math.min(500, window.innerWidth * 0.9),
    height: Math.min(800, window.innerHeight * 0.8),
  });
  const onClickRef = useRef(onClick);
  const isTransitioningRef = useRef(isTransitioning);

  const [size, setSize] = useState({
    width: Math.min(500, window.innerWidth * 0.9),
    height: Math.min(800, window.innerHeight * 0.8),
  });
  const prevSize = useRef(size);

  // Prevent document scrolling while dragging
  useEffect(() => {
    const headerEl = label.current;

    const handleTouchStart = (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    if (headerEl) {
      headerEl.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }
    return () => {
      if (headerEl) {
        headerEl.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [isDragging]);

  useEffect(() => {
    sizeRef.current = size;
  }, [size]);

  useEffect(() => {
    onClickRef.current = onClick;
  }, [onClick]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  const onMaximize = () => {
    setIsTransitioning(true);
    const screenRect = document
      .getElementById("screen")
      .getBoundingClientRect();
    if (isMaximized) {
      setSize(prevSize.current);
      position.current = {
        x: tempPosition.current.x,
        y: tempPosition.current.y,
      };
    } else {
      tempPosition.current = {
        x: position.current.x,
        y: position.current.y,
      };
      setSize({
        width: screenRect.width,
        height: screenRect.height,
      });
      position.current = { x: 0, y: 0 };
    }
    setIsMaximized(!isMaximized);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const windowElement = windowRef.current;
    const headerElement = label.current;

    if (!windowElement || !headerElement) return undefined;

    const headerInteractable = interact(headerElement);
    headerInteractable.styleCursor(false).draggable({
      cursorChecker: () => "default",
      listeners: {
        start() {
          if (!isTransitioningRef.current) {
            setIsDragging(true);
            document.body.style.userSelect = "none"; //prevent text/object selection when dragging
            onClickRef.current(); // Set as active window
          }
        },
        move(event) {
          if (!isTransitioningRef.current) {
            position.current.x += event.dx;
            position.current.y += event.dy;
            //apply new pos to the window
            windowElement.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
          }
        },
        end() {
          setIsDragging(false);
          document.body.style.userSelect = "";

          const screenRect = document
            .getElementById("screen")
            .getBoundingClientRect();

          //Clamp pos within bounds
          const minX = 0;
          const maxX = screenRect.width - sizeRef.current.width;
          const minY = 0;
          const maxY = screenRect.height - sizeRef.current.height;

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

    // Resize window
    const windowInteractable = interact(windowElement);
    windowInteractable.styleCursor(false).resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      cursorChecker: () => "default",
      listeners: {
        start() {
          if (!isTransitioningRef.current) {
            setIsDragging(true);
          }
        },
        move(event) {
          if (!isTransitioningRef.current) {
            setSize({
              width: event.rect.width,
              height: event.rect.height,
            });
            // Update position based on resizing movement
            position.current.x += event.deltaRect.left;
            position.current.y += event.deltaRect.top;
            windowElement.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
          }
        },
        end() {
          setIsDragging(false);
        },
      },
      modifiers: [
        interact.modifiers.restrictSize({
          min: { width: 500, height: 700 },
          max: {
            width:
              document.getElementById("screen").clientWidth -
              position.current.x,
            height:
              document.getElementById("screen").clientHeight -
              position.current.y,
          },
        }),
      ],
    });

    return () => {
      headerInteractable.unset();
      windowInteractable.unset();
    };
  }, []);

  const windowStyle = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    transform: `translate(${position.current.x}px, ${position.current.y}px)`,
    zIndex: zIndex,
    display: isMinimized ? "none" : "block",
    transition: isTransitioning
      ? "width 0.3s ease-in-out, height 0.3s ease-in-out, transform 0.3s ease-in-out"
      : "none",
  };

  return (
    <div
      ref={windowRef}
      id={windowId}
      style={windowStyle}
      className={`border-95-white border-b-95-black border-r-95-black bg-95-gray absolute overflow-hidden border-2 shadow-lg ${isMaximized ? "fullscreen" : ""}`}
      onClick={onClick}
    >
      <div
        ref={label}
        className="border-95-white border-b-95-black bg-95-navy flex cursor-default items-center justify-between border-b-2 p-1"
        onDoubleClick={onMaximize}
      >
        {/* Header */}
        <div className="flex cursor-default items-center gap-2">
          <img src={icon} alt={title} className="h-6 w-6 bg-transparent" />
          <span className="text-xs text-white">{title}</span>
        </div>

        <div className="*:border-95-white *:border-b-95-black *:border-r-95-black *:bg-95-gray flex *:w-5 *:cursor-pointer *:items-center *:border-2 *:focus:outline-none">
          <button
            onClick={onMinimize}
            className="active:border-95-black active:border-b-95-white active:border-r-95-white mr-1"
          >
            <img src={min} alt="min" />
          </button>
          <button
            onClick={onMaximize}
            className="active:border-95-black active:border-b-95-white active:border-r-95-white mr-1"
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
