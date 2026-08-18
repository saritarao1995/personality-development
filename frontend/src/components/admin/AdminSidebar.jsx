import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const LINKS = [
  { to: '/admin', label: 'Overview', icon: '📊', end: true },
  { to: '/admin/users', label: 'Users', icon: '👥' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <span className="brand-icon">🛡️</span>
        <div>
          <strong>Admin Panel</strong>
          <span>{user?.name}</span>
        </div>
      </div>

      <nav className="admin-nav">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <Link to="/dashboard" className="admin-nav-link">
          <span>🏠</span>
          Back to App
        </Link>
        <button type="button" className="admin-nav-link admin-logout" onClick={() => dispatch(logout())}>
          <span>🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
