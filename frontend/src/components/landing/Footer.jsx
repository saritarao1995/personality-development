import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <span className="brand-icon">🌱</span>
        <div>
          <strong>Personality Development</strong>
          <p>Understand yourself. Grow daily. Become your best version.</p>
        </div>
      </div>

      <div className="footer-links">
        <div>
          <h4>Product</h4>
          <Link to="/assessment">Free Assessment</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/goals">Goals</Link>
          <Link to="/journal">Journal</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Create account</Link>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 Personality Development. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;
