import DummyImage from '../ui/DummyImage';
import { IMAGES } from '../../data/images';

const TESTIMONIALS = [
  {
    quote: 'The assessment helped me understand why I struggle with consistency. Now my goals actually fit my personality.',
    name: 'Priya Sharma',
    role: 'Software Engineer',
  },
  {
    quote: 'I love the journal feature. Tracking my mood alongside reflections made me see patterns I never noticed before.',
    name: 'Rahul Mehta',
    role: 'Team Lead',
  },
  {
    quote: 'Finally a personal growth app that feels personal. The dashboard shows real progress, not just motivational quotes.',
    name: 'Ananya Patel',
    role: 'Life Coach',
  },
];

const Testimonials = () => (
  <section className="landing-section landing-section-alt">
    <div className="section-header">
      <span className="section-tag">Real stories</span>
      <h2>Join thousands on their growth journey</h2>
    </div>

    <div className="testimonials-grid">
      {TESTIMONIALS.map((item, index) => (
        <div key={item.name} className="testimonial-card">
          <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
          <div className="testimonial-author">
            <DummyImage
              src={IMAGES.testimonials[index].src}
              alt={IMAGES.testimonials[index].alt}
              className="testimonial-avatar-img"
            />
            <div>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
