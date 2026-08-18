import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminStats } from '../../store/slices/adminSlice';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const STAT_CARDS = [
  { key: 'totalUsers', label: 'Total Users', icon: '👥' },
  { key: 'totalGoals', label: 'Goals Created', icon: '🎯' },
  { key: 'totalJournalEntries', label: 'Journal Entries', icon: '📔' },
  { key: 'totalAssessments', label: 'Assessments Taken', icon: '🧠' },
];

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  if (loading && !stats) {
    return <LoadingSpinner label="Loading admin stats..." />;
  }

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1>Admin Overview</h1>
        <p>Monitor platform activity and manage your app.</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-stats-grid">
        {STAT_CARDS.map((card) => (
          <div key={card.key} className="admin-stat-card">
            <span className="admin-stat-icon">{card.icon}</span>
            <div>
              <span className="admin-stat-value">{stats?.[card.key] ?? 0}</span>
              <span className="admin-stat-label">{card.label}</span>
            </div>
          </div>
        ))}
      </div>

      <section className="card admin-recent-card">
        <h2>Recent Users</h2>
        {stats?.recentUsers?.length === 0 ? (
          <p className="empty-state">No users yet.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentUsers?.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'badge-admin' : ''}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
