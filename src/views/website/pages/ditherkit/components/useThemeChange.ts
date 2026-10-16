import { useEffect } from "react";

/**
 * Calls `onChange` whenever the site theme flips (the `data-theme` attribute
 * or the system color scheme), so canvases can re-read their CSS colors.
 */
export const useThemeChange = (onChange: () => void): void => {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    media.addEventListener("change", onChange);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", onChange);
    };
  }, [onChange]);
};
