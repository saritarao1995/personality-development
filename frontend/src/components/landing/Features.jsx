import DummyImage from '../ui/DummyImage';
import { IMAGES } from '../../data/images';

const FEATURES = [
  {
    key: 'clarity',
    icon: '🪞',
    title: 'Radical Clarity',
    description:
      'Get a mirror into your deepest motivations, patterns, and behavioral tendencies. See exactly why you do what you do.',
    highlight: 'Big Five Assessment',
    items: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Emotional Balance'],
  },
  {
    key: 'goals',
    icon: '🎯',
    title: 'Aligned Actions',
    description:
      'No more generic advice. Set development goals and track progress across communication, confidence, leadership, and more.',
    highlight: 'Smart Goal Tracking',
    items: ['Custom categories', 'Progress bars', 'Target dates', 'Status tracking'],
  },
  {
    key: 'journal',
    icon: '📈',
    title: 'Sustainable Growth',
    description:
      'Build consistency without burnout through daily reflections, mood tracking, and journal insights that adapt to you.',
    highlight: 'Reflection Journal',
    items: ['Daily entries', 'Mood tracking', 'Growth tags', 'Progress history'],
  },
];

const Features = () => (
  <section id="features" className="landing-section">
    <div className="section-header">
      <span className="section-tag">What you get</span>
      <h2>Personality Development helps you understand yourself</h2>
      <p>A complete system to discover your traits and turn insight into daily progress.</p>
    </div>

    <div className="features-grid">
      {FEATURES.map((feature) => (
        <div key={feature.title} className="feature-card">
          <div className="feature-image-wrap">
            <DummyImage
              src={IMAGES.features[feature.key].src}
              alt={IMAGES.features[feature.key].alt}
              className="feature-image"
            />
          </div>
          <span className="feature-icon">{feature.icon}</span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
          <div className="feature-highlight">
            <span className="feature-highlight-label">{feature.highlight}</span>
            <ul>
              {feature.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Features;
