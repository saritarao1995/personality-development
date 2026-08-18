import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJournalEntries, createJournalEntry, deleteJournalEntry } from '../store/slices/journalSlice';
import GuestBanner from '../components/GuestBanner';
import PageBanner from '../components/ui/PageBanner';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { DEMO_JOURNAL_ENTRIES } from '../data/demoData';
import { IMAGES } from '../data/images';

const MOODS = ['great', 'good', 'neutral', 'low', 'bad'];

const Journal = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { items: entries, loading } = useSelector((state) => state.journal);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', mood: 'neutral', tags: '' });

  const isGuest = !token;
  const displayEntries = isGuest ? DEMO_JOURNAL_ENTRIES : entries;

  useEffect(() => {
    if (token) {
      dispatch(fetchJournalEntries());
    }
  }, [dispatch, token]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    dispatch(createJournalEntry({ title: form.title, content: form.content, mood: form.mood, tags }));
    setForm({ title: '', content: '', mood: 'neutral', tags: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteJournalEntry(id));
  };

  return (
    <div className="page journal-page">
      <PageBanner
        src={IMAGES.pages.journal}
        alt="Reflection journal writing"
        title="Reflection Journal"
        subtitle="Document your thoughts, feelings, and daily reflections."
      />

      {isGuest && <GuestBanner />}

      <div className="page-toolbar flex-between">
        <span className="section-tag">Daily reflections</span>
        {token ? (
          <button type="button" className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Entry'}
          </button>
        ) : (
          <Link to="/register" className="btn btn-primary">Sign up to write entries</Link>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card form-card">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="mood">Mood</label>
            <select id="mood" name="mood" value={form.mood} onChange={handleChange}>
              {MOODS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="content">Reflection</label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              required
              placeholder="What did you learn today? How did you grow?"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags (comma separated)</label>
            <input id="tags" name="tags" value={form.tags} onChange={handleChange} placeholder="growth, gratitude" />
          </div>
          <button type="submit" className="btn btn-primary">Save Entry</button>
        </form>
      )}

      {!isGuest && loading ? (
        <LoadingSpinner label="Loading journal entries..." />
      ) : displayEntries.length === 0 ? (
        <div className="empty-state card">No journal entries yet. Start reflecting today!</div>
      ) : (
        <div className="journal-list">
          {displayEntries.map((entry) => (
            <div key={entry._id} className="card journal-card">
              <div className="journal-header">
                <h3>{entry.title}</h3>
                <span className={`mood-badge mood-${entry.mood}`}>{entry.mood}</span>
              </div>
              <p className="journal-content">{entry.content}</p>
              <div className="journal-footer">
                <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                {entry.tags?.length > 0 && (
                  <div className="tags">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
                {!isGuest && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(entry._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;
