import { Link } from 'react-router-dom';
import DummyImage from '../ui/DummyImage';
import { IMAGES } from '../../data/images';

const CTASection = () => (
  <section className="cta-section">
    <div className="cta-layout">
      <div className="cta-image-wrap">
        <DummyImage src={IMAGES.cta.src} alt={IMAGES.cta.alt} className="cta-image" />
      </div>
      <div className="cta-inner">
        <span className="cta-badge">Join 10K+ people building real consistency</span>
        <h2>Ready to understand yourself?</h2>
        <p>Discover your personality profile and get daily actions designed for who you actually are.</p>
        <div className="cta-buttons">
          <Link to="/assessment" className="btn btn-hero-primary">Take Free Assessment</Link>
          <Link to="/register" className="btn btn-hero-outline">Create Free Account</Link>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
