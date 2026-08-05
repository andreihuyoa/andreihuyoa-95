export type WebsiteTheme = "system" | "light" | "dark";

const WEBSITE_THEME_KEY = "website-theme";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

const isWebsiteTheme = (value: unknown): value is WebsiteTheme => {
  return value === "system" || value === "light" || value === "dark";
};

export const getSavedWebsiteTheme = (): WebsiteTheme => {
  const savedTheme = window.localStorage.getItem(WEBSITE_THEME_KEY);

  return isWebsiteTheme(savedTheme) ? savedTheme : "system";
};

export const applyWebsiteTheme = (theme: WebsiteTheme): void => {
  const resolvedTheme =
    theme === "system"
      ? window.matchMedia(DARK_MODE_QUERY).matches
        ? "dark"
        : "light"
      : theme;

  document.documentElement.dataset.theme = resolvedTheme;
};

export const persistWebsiteTheme = (theme: WebsiteTheme): void => {
  window.localStorage.setItem(WEBSITE_THEME_KEY, theme);
  applyWebsiteTheme(theme);
};

export const watchSystemTheme = (onChange: () => void): (() => void) => {
  const colorScheme = window.matchMedia(DARK_MODE_QUERY);
  colorScheme.addEventListener("change", onChange);

  return () => colorScheme.removeEventListener("change", onChange);
};
