import { Link } from 'react-router-dom';

const GuestBanner = () => (
  <div className="guest-banner">
    <span>You are browsing in guest mode. Sample data is shown.</span>
    <Link to="/register" className="btn btn-primary btn-sm">Sign up free</Link>
    <Link to="/login" className="btn btn-outline btn-sm">Sign in</Link>
  </div>
);

export default GuestBanner;
