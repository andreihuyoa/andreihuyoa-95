import { useContext } from "react";
import { DesignModeContext } from "./design-mode-context";
import type { DesignModeContextValue } from "./design-mode-context";

export const useDesignMode = (): DesignModeContextValue => {
  const context = useContext(DesignModeContext);

  if (!context) {
    throw new Error("useDesignMode must be used within DesignModeProvider");
  }

  return context;
};
