import { RefObject, useEffect, useRef, useState } from "react";

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    isMobile: false,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      const handleResize = () => {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          isMobile: window.innerWidth < 768,
        });
      };

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export function useEventListener<T extends HTMLElement = HTMLDivElement>(
  eventName: keyof WindowEventMap | string, // string to allow custom event

  handler: (event: Event) => void,

  element?: RefObject<T>
) {
  // Create a ref that stores handler

  const savedHandler = useRef<(event: Event) => void>();

  useEffect(() => {
    // Define the listening target

    const targetElement: T | Window = element?.current || window;

    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    // Update saved handler if necessary

    if (savedHandler.current !== handler) {
      savedHandler.current = handler;
    }

    // Create event listener that calls handler function stored in ref

    const eventListener = (event: Event) => {
      // eslint-disable-next-line no-extra-boolean-cast

      if (!!savedHandler?.current) {
        savedHandler.current(event);
      }
    };

    targetElement.addEventListener(eventName, eventListener);

    // Remove event listener on cleanup

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, handler]);
}

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,

  handler: Handler,

  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  useEventListener(mouseEvent, (event) => {
    const el = ref?.current;

    // Do nothing if clicking ref's element or descendent elements

    if (!el || el.contains(event.target as Node)) {
      return;
    }

    // Explicit type for "mousedown" event.

    handler(event as unknown as MouseEvent);
  });
}
