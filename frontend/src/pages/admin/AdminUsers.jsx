import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAdminUsers,
  updateUserRole,
  deleteAdminUser,
  clearAdminError,
} from '../../store/slices/adminSlice';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { users, usersLoading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminUsers());
    return () => dispatch(clearAdminError());
  }, [dispatch]);

  const handleRoleChange = (userId, role) => {
    dispatch(updateUserRole({ id: userId, role }));
  };

  const handleDelete = (userId, userName) => {
    if (window.confirm(`Delete user "${userName}" and all their data?`)) {
      dispatch(deleteAdminUser(userId));
    }
  };

  if (usersLoading && users.length === 0) {
    return <LoadingSpinner label="Loading users..." />;
  }

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1>User Management</h1>
        <p>View, update roles, or remove users from the platform.</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <section className="card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isSelf = user._id === currentUser?._id;
                return (
                  <tr key={user._id}>
                    <td>
                      {user.name}
                      {isSelf && <span className="badge badge-admin" style={{ marginLeft: 6 }}>You</span>}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        disabled={isSelf}
                        className="admin-select"
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        disabled={isSelf}
                        onClick={() => handleDelete(user._id, user.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminUsers;
