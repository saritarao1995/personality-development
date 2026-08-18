import { Link } from 'react-router-dom';
import DummyImage from '../ui/DummyImage';
import { IMAGES } from '../../data/images';

const STEPS = [
  {
    step: '01',
    time: '5 minutes',
    title: 'Take the Assessment',
    description: 'Answer honest questions about how you think, feel, and approach life. No right or wrong answers.',
  },
  {
    step: '02',
    time: 'Instant results',
    title: 'Discover Your Profile',
    description: 'See your Big Five personality traits visualized — openness, discipline, social energy, empathy, and emotional balance.',
  },
  {
    step: '03',
    time: 'Daily growth',
    title: 'Grow Every Day',
    description: 'Set goals, write reflections, and track your progress with a personalized dashboard built for your journey.',
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="landing-section landing-section-alt">
    <div className="section-header">
      <span className="section-tag">Your path to self-mastery</span>
      <h2>Three steps to discover yourself and start growing</h2>
    </div>

    <div className="steps-grid">
      {STEPS.map((item, index) => (
        <div key={item.step} className="step-card">
          <div className="step-image-wrap">
            <DummyImage
              src={IMAGES.steps[index].src}
              alt={IMAGES.steps[index].alt}
              className="step-image"
            />
          </div>
          <div className="step-number">{item.step}</div>
          <span className="step-time">{item.time}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>

    <div className="section-cta">
      <Link to="/assessment" className="btn btn-primary btn-lg">
        Start My Journey
      </Link>
    </div>
  </section>
);

export default HowItWorks;
