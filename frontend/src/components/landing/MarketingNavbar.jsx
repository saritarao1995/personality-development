import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const handleNavClick = (e, hash) => {
  e.preventDefault();
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', hash);
  }
};

const MarketingNavbar = () => {
  const { token } = useSelector((state) => state.auth);

  const navLinks = [
    { hash: '#features', label: 'Features' },
    { hash: '#how-it-works', label: 'How It Works' },
    { hash: '#traits', label: 'Traits' },
    { hash: '#faq', label: 'FAQ' },
  ];

  return (
    <header className="marketing-nav">
      <div className="marketing-nav-inner">
        <Link to="/" className="marketing-brand">
          <span className="brand-icon">🌱</span>
          <span>Personality Development</span>
        </Link>

        <nav className="marketing-links">
          {navLinks.map((link) => (
            <a
              key={link.hash}
              href={link.hash}
              onClick={(e) => handleNavClick(e, link.hash)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="marketing-actions">
          {token ? (
            <Link to="/dashboard" className="btn btn-primary btn-sm">My Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Sign in</Link>
              <Link to="/assessment" className="btn btn-primary btn-sm">Free Assessment</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default MarketingNavbar;
