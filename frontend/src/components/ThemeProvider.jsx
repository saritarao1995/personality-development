import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { applyTheme } from '../utils/applyTheme';

const ThemeProvider = ({ children }) => {
  const activeThemeId = useSelector((state) => state.theme.activeThemeId);

  useEffect(() => {
    applyTheme(activeThemeId);
  }, [activeThemeId]);

  return children;
};

export default ThemeProvider;
