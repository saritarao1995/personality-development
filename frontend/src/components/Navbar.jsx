import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { selectIsAdmin } from '../store/selectors/authSelectors';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const isAdmin = useSelector(selectIsAdmin);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="app-navbar">
      <div className="app-navbar-inner">
        <Link to="/" className="marketing-brand">
          <span className="brand-icon">🌱</span>
          <span>Personality Development</span>
        </Link>

        <div className="app-nav-links">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/goals">Goals</NavLink>
          <NavLink to="/journal">Journal</NavLink>
          <NavLink to="/assessment">Assessment</NavLink>
          {isAdmin && <NavLink to="/admin">Admin</NavLink>}
        </div>

        <div className="navbar-user">
          {token ? (
            <>
              {isAdmin && <span className="badge badge-admin">Admin</span>}
              <span className="nav-user-name">{user?.name}</span>
              <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Sign in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
