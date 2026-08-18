import DummyImage from './DummyImage';

const PageBanner = ({ src, alt, title, subtitle, children }) => (
  <div className="page-banner">
    <DummyImage src={src} alt={alt} className="page-banner-bg" />
    <div className="page-banner-overlay" />
    <div className="page-banner-content">
      {children || (
        <>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </>
      )}
    </div>
  </div>
);

export default PageBanner;
