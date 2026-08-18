import DummyImage from '../ui/DummyImage';
import { IMAGES } from '../../data/images';

const ImageGallery = () => (
  <section className="landing-section gallery-section">
    <div className="section-header">
      <span className="section-tag">Growth in action</span>
      <h2>Your journey, visually inspired</h2>
      <p>From mindful mornings to focused goals — build a life aligned with who you are.</p>
    </div>

    <div className="gallery-grid">
      {IMAGES.gallery.map((item) => (
        <figure key={item.caption} className="gallery-item">
          <DummyImage src={item.src} alt={item.alt} className="gallery-image" />
          <figcaption>{item.caption}</figcaption>
        </figure>
      ))}
    </div>
  </section>
);

export default ImageGallery;
