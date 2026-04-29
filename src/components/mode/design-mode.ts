export type DesignMode = "os" | "website";

export const DESIGN_MODE_KEY = "design-mode";

export const isDesignMode = (value: string | null): value is DesignMode => {
  return value === "os" || value === "website";
};
