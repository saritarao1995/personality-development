import { useState } from 'react';

const FALLBACK = '/images/feature-clarity.jpg';

const DummyImage = ({ src, alt, className = '', fallback = FALLBACK, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
      setLoaded(false);
    }
  };

  return (
    <span className={`image-wrap ${loaded ? 'is-loaded' : ''}`}>
      {!loaded && <span className="image-skeleton" aria-hidden="true" />}
      <img
        src={imgSrc}
        alt={alt}
        className={`dummy-image ${className}`.trim()}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        {...props}
      />
    </span>
  );
};

export default DummyImage;
