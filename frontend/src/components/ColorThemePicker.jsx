import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { THEME_LIST } from '../config/themes';
import { setTheme } from '../store/slices/themeSlice';

const ColorThemePicker = () => {
  const dispatch = useDispatch();
  const activeThemeId = useSelector((state) => state.theme.activeThemeId);
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (themeId) => {
    dispatch(setTheme(themeId));
    setIsOpen(false);
  };

  const activeTheme = THEME_LIST.find((t) => t.id === activeThemeId);

  return (
    <div className="color-theme-picker" ref={panelRef}>
      <button
        type="button"
        className="theme-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Change color theme"
        title="Change colors"
      >
        <span className="theme-swatch" style={{ background: activeTheme?.swatch }} />
        <span className="theme-toggle-label">Colors</span>
      </button>

      {isOpen && (
        <div className="theme-panel">
          <p className="theme-panel-title">Choose Theme</p>
          <div className="theme-options">
            {THEME_LIST.map((theme) => (
              <button
                key={theme.id}
                type="button"
                className={`theme-option ${activeThemeId === theme.id ? 'active' : ''}`}
                onClick={() => handleSelect(theme.id)}
              >
                <span className="theme-option-swatch" style={{ background: theme.swatch }} />
                <span className="theme-option-name">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorThemePicker;
