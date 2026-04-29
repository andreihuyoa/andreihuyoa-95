import { useEffect, useMemo, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { DESIGN_MODE_KEY, isDesignMode, type DesignMode } from "./design-mode";
import { DesignModeContext } from "./design-mode-context";

const getInitialMode = (): DesignMode => {
  const savedMode = window.localStorage.getItem(DESIGN_MODE_KEY);

  return isDesignMode(savedMode) ? savedMode : "os";
};

interface DesignModeProviderProps {
  children: ReactNode;
}

export const DesignModeProvider = ({
  children,
}: DesignModeProviderProps): ReactElement => {
  const [mode, setMode] = useState<DesignMode>(getInitialMode);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    window.localStorage.setItem(DESIGN_MODE_KEY, mode);
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <DesignModeContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="sr-only">
        {mode === "os" ? "OS Mode activated" : "Website Mode activated"}
      </div>
    </DesignModeContext.Provider>
  );
};
