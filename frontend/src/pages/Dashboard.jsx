import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../store/slices/authSlice';
import { fetchGoals } from '../store/slices/goalsSlice';
import { fetchJournalEntries } from '../store/slices/journalSlice';
import PersonalityChart from '../components/PersonalityChart';
import GuestBanner from '../components/GuestBanner';
import PageBanner from '../components/ui/PageBanner';
import DummyImage from '../components/ui/DummyImage';
import { DEMO_GOALS, DEMO_JOURNAL_ENTRIES, DEMO_PERSONALITY_TRAITS } from '../data/demoData';
import { IMAGES } from '../data/images';

const QUICK_ACTIONS = [
  { to: '/assessment', image: IMAGES.pages.assessment, label: 'Take Assessment', desc: 'Discover your traits' },
  { to: '/goals', image: IMAGES.pages.goals, label: 'Set Goals', desc: 'Track your growth' },
  { to: '/journal', image: IMAGES.pages.journal, label: 'Write Journal', desc: 'Reflect daily' },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { items: goals } = useSelector((state) => state.goals);
  const { items: journalEntries } = useSelector((state) => state.journal);

  const isGuest = !token;
  const displayGoals = isGuest ? DEMO_GOALS : goals;
  const displayJournal = isGuest ? DEMO_JOURNAL_ENTRIES : journalEntries;
  const traits = isGuest ? DEMO_PERSONALITY_TRAITS : user?.personalityTraits;

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
      dispatch(fetchGoals());
      dispatch(fetchJournalEntries());
    }
  }, [dispatch, token]);

  const completedGoals = displayGoals.filter((g) => g.status === 'completed').length;
  const inProgressGoals = displayGoals.filter((g) => g.status === 'in-progress').length;
  const hasTraits = traits && Object.values(traits).some((v) => v > 0);

  return (
    <div className="page dashboard-page">
      <PageBanner
        src={IMAGES.dashboard.banner}
        alt={IMAGES.dashboard.alt}
        title={isGuest ? 'Welcome, Explorer' : `Welcome back, ${user?.name?.split(' ')[0]}`}
        subtitle="Track your progress, understand your traits, and grow every day."
      />

      {isGuest && <GuestBanner />}

      <div className="quick-actions">
        {QUICK_ACTIONS.map((action) => (
          <Link key={action.to} to={action.to} className="quick-action-card">
            <DummyImage src={action.image} alt={action.label} className="quick-action-image" />
            <div>
              <strong>{action.label}</strong>
              <span>{action.desc}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card-highlight">
          <span className="stat-value">{displayGoals.length}</span>
          <span className="stat-label">Total Goals</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{inProgressGoals}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{completedGoals}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{displayJournal.length}</span>
          <span className="stat-label">Journal Entries</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="card dashboard-profile-card">
          <div className="card-header-row">
            <h2>{isGuest ? 'Sample Personality Profile' : 'Your Personality Profile'}</h2>
            <Link to="/assessment" className="link-sm">Retake →</Link>
          </div>
          {hasTraits ? (
            <PersonalityChart traits={traits} />
          ) : (
            <div className="empty-state-box">
              <p>Take the personality assessment to unlock your profile.</p>
              <Link to="/assessment" className="btn btn-primary btn-sm">Start Assessment</Link>
            </div>
          )}
        </section>

        <section className="card">
          <div className="card-header-row">
            <h2>Recent Goals</h2>
            <Link to="/goals" className="link-sm">View all →</Link>
          </div>
          <div className="mini-list">
            {displayGoals.slice(0, 3).map((goal) => (
              <div key={goal._id} className="mini-list-item">
                <div>
                  <strong>{goal.title}</strong>
                  <span className={`badge badge-${goal.status}`}>{goal.status}</span>
                </div>
                <div className="mini-progress">
                  <div className="mini-progress-fill" style={{ width: `${goal.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
