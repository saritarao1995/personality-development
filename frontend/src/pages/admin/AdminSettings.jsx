import { useDispatch, useSelector } from 'react-redux';
import { THEME_LIST } from '../../config/themes';
import { setTheme } from '../../store/slices/themeSlice';

const AdminSettings = () => {
  const dispatch = useDispatch();
  const activeThemeId = useSelector((state) => state.theme.activeThemeId);
  const activeTheme = THEME_LIST.find((t) => t.id === activeThemeId);

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1>Admin Settings</h1>
        <p>Customize the app appearance and platform preferences.</p>
      </header>

      <section className="card admin-settings-card">
        <h2>Color Theme</h2>
        <p className="admin-settings-desc">
          Choose the color theme for the entire application. Only admins can change this.
        </p>

        <div className="admin-current-theme">
          <span className="theme-option-swatch" style={{ background: activeTheme?.swatch }} />
          <span>
            Current theme: <strong>{activeTheme?.name}</strong>
          </span>
        </div>

        <div className="admin-theme-grid">
          {THEME_LIST.map((theme) => (
            <button
              key={theme.id}
              type="button"
              className={`admin-theme-card ${activeThemeId === theme.id ? 'active' : ''}`}
              onClick={() => dispatch(setTheme(theme.id))}
            >
              <span className="admin-theme-swatch" style={{ background: theme.swatch }} />
              <span>{theme.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card admin-settings-card">
        <h2>Platform Info</h2>
        <ul className="admin-info-list">
          <li><span>App</span><strong>Personality Development</strong></li>
          <li><span>Database</span><strong>Embedded MongoDB</strong></li>
          <li><span>Admin Email</span><strong>admin@personality.dev</strong></li>
        </ul>
      </section>
    </div>
  );
};

export default AdminSettings;
