export type ViewMode = "os" | "website";

const DESIGN_MODE_KEY = "design-mode";

export const isViewMode = (value: unknown): value is ViewMode => {
  return value === "os" || value === "website";
};

export const getSavedMode = (): ViewMode => {
  const savedMode = window.localStorage.getItem(DESIGN_MODE_KEY);

  return isViewMode(savedMode) ? savedMode : "os";
};

export const persistViewMode = (mode: ViewMode): void => {
  document.documentElement.dataset.mode = mode;
  window.localStorage.setItem(DESIGN_MODE_KEY, mode);
};
