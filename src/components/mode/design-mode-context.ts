import { createContext } from "react";
import type { DesignMode } from "./design-mode";

export interface DesignModeContextValue {
  mode: DesignMode;
  setMode: (mode: DesignMode) => void;
}

export const DesignModeContext = createContext<DesignModeContextValue | null>(
  null,
);
