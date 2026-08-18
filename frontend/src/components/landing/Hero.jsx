import { Link } from 'react-router-dom';
import DummyImage from '../ui/DummyImage';
import { IMAGES } from '../../data/images';

const STATS = [
  { value: '10K+', label: 'People growing daily' },
  { value: '94%', label: 'Report higher self-awareness' },
  { value: '2.5x', label: 'More consistent habits' },
  { value: '5 min', label: 'To discover your profile' },
];

const Hero = () => (
  <section className="hero">
    <div className="hero-bg" />
    <div className="hero-layout">
      <div className="hero-content">
        <span className="hero-badge">Built for who you actually are</span>
        <h1>
          Understand yourself.
          <br />
          <span className="hero-gradient-text">Grow with purpose.</span>
        </h1>
        <p className="hero-subtitle">
          Discover your personality profile, set meaningful goals, and build daily habits
          designed for your unique traits — not generic advice.
        </p>
        <div className="hero-cta">
          <Link to="/assessment" className="btn btn-hero-primary">
            Start Free Assessment
          </Link>
          <Link to="/dashboard" className="btn btn-hero-outline">
            Explore Dashboard
          </Link>
        </div>
        <p className="hero-note">Takes 5 minutes · No sign-in required · 100% free</p>
      </div>

      <div className="hero-visual">
        <div className="hero-image-wrap">
          <DummyImage
            src={IMAGES.hero.main}
            alt={IMAGES.hero.alt}
            className="hero-image-main"
          />
          <DummyImage
            src={IMAGES.hero.floating}
            alt="Journaling and reflection"
            className="hero-image-float"
          />
        </div>
      </div>
    </div>

    <div className="hero-stats">
      {STATS.map((stat) => (
        <div key={stat.label} className="hero-stat">
          <span className="hero-stat-value">{stat.value}</span>
          <span className="hero-stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Hero;
