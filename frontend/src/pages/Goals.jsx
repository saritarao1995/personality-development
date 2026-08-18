import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals, createGoal, updateGoal, deleteGoal } from '../store/slices/goalsSlice';
import GuestBanner from '../components/GuestBanner';
import PageBanner from '../components/ui/PageBanner';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { DEMO_GOALS } from '../data/demoData';
import { IMAGES } from '../data/images';

const CATEGORIES = [
  'communication',
  'confidence',
  'leadership',
  'emotional-intelligence',
  'habits',
  'other',
];

const Goals = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { items: goals, loading } = useSelector((state) => state.goals);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'other',
    targetDate: '',
  });

  const isGuest = !token;
  const displayGoals = isGuest ? DEMO_GOALS : goals;

  useEffect(() => {
    if (token) {
      dispatch(fetchGoals());
    }
  }, [dispatch, token]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal(form));
    setForm({ title: '', description: '', category: 'other', targetDate: '' });
    setShowForm(false);
  };

  const handleStatusChange = (goal, status) => {
    dispatch(updateGoal({ id: goal._id, status }));
  };

  const handleProgressChange = (goal, progress) => {
    dispatch(updateGoal({ id: goal._id, progress: Number(progress) }));
  };

  const handleDelete = (id) => {
    dispatch(deleteGoal(id));
  };

  return (
    <div className="page goals-page">
      <PageBanner
        src={IMAGES.pages.goals}
        alt="Development goals planning"
        title="Development Goals"
        subtitle="Set and track your personal growth goals."
      />

      {isGuest && <GuestBanner />}

      <div className="page-toolbar flex-between">
        <span className="section-tag">Your targets</span>
        {token ? (
          <button type="button" className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Goal'}
          </button>
        ) : (
          <Link to="/register" className="btn btn-primary">Sign up to add goals</Link>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card form-card">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Goal Title</label>
              <input id="title" name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="form-group">
            <label htmlFor="targetDate">Target Date</label>
            <input
              id="targetDate"
              name="targetDate"
              type="date"
              value={form.targetDate}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Goal</button>
        </form>
      )}

      {!isGuest && loading ? (
        <LoadingSpinner label="Loading goals..." />
      ) : displayGoals.length === 0 ? (
        <div className="empty-state card">No goals yet. Create your first development goal!</div>
      ) : (
        <div className="goals-list">
          {displayGoals.map((goal) => (
            <div key={goal._id} className="card goal-card">
              <div className="goal-header">
                <h3>{goal.title}</h3>
                <span className={`badge badge-${goal.status}`}>{goal.status}</span>
              </div>
              <p className="goal-desc">{goal.description}</p>
              <div className="goal-meta">
                <span className="badge">{goal.category.replace('-', ' ')}</span>
                {goal.targetDate && (
                  <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor={`progress-${goal._id}`}>Progress: {goal.progress}%</label>
                <input
                  id={`progress-${goal._id}`}
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => handleProgressChange(goal, e.target.value)}
                  disabled={isGuest}
                />
              </div>
              {!isGuest && (
                <div className="goal-actions">
                  <select
                    value={goal.status}
                    onChange={(e) => handleStatusChange(goal, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(goal._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Goals;
