import { getThemeById, DEFAULT_THEME_ID } from '../config/themes';

const CSS_VAR_MAP = {
  primary: '--primary',
  primaryDark: '--primary-dark',
  primaryLight: '--primary-light',
  success: '--success',
  warning: '--warning',
  danger: '--danger',
  bg: '--bg',
  surface: '--surface',
  text: '--text',
  textMuted: '--text-muted',
  border: '--border',
};

export const applyTheme = (themeId) => {
  const theme = getThemeById(themeId);
  const root = document.documentElement;

  Object.entries(CSS_VAR_MAP).forEach(([key, cssVar]) => {
    root.style.setProperty(cssVar, theme.colors[key]);
  });
};

export const initTheme = () => {
  const storedTheme = localStorage.getItem('app-theme') || DEFAULT_THEME_ID;
  applyTheme(storedTheme);
};
