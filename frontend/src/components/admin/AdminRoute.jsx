import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../../store/selectors/authSelectors';
import AdminSidebar from './AdminSidebar';

const AdminRoute = () => {
  const isAdmin = useSelector(selectIsAdmin);
  const { token } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoute;
