import DummyImage from '../ui/DummyImage';
import { IMAGES } from '../../data/images';

const TRAITS = [
  { name: 'Openness', emoji: '🎨', desc: 'Creative. Curious. Open to new experiences.' },
  { name: 'Conscientiousness', emoji: '📋', desc: 'Organized. Disciplined. Goal-oriented.' },
  { name: 'Extraversion', emoji: '⚡', desc: 'Outgoing. Energetic. Socially confident.' },
  { name: 'Agreeableness', emoji: '💚', desc: 'Empathetic. Cooperative. Trusting.' },
  { name: 'Emotional Balance', emoji: '🧘', desc: 'Calm. Resilient. Emotionally stable.' },
];

const PersonalityTraits = () => (
  <section id="traits" className="landing-section">
    <div className="section-header">
      <span className="section-tag">Big Five Model</span>
      <h2>Five core traits that define how you grow</h2>
      <p>Science-backed personality dimensions used by psychologists worldwide.</p>
    </div>

    <div className="traits-grid">
      {TRAITS.map((trait, index) => (
        <div key={trait.name} className="trait-card">
          <div className="trait-image-wrap">
            <DummyImage
              src={IMAGES.traits[index].src}
              alt={IMAGES.traits[index].alt}
              className="trait-image"
            />
          </div>
          <span className="trait-emoji">{trait.emoji}</span>
          <h3>{trait.name}</h3>
          <p>{trait.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default PersonalityTraits;
