import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import PersonalityTraits from '../components/landing/PersonalityTraits';
import ImageGallery from '../components/landing/ImageGallery';
import Testimonials from '../components/landing/Testimonials';
import FAQ from '../components/landing/FAQ';
import CTASection from '../components/landing/CTASection';

const Home = () => (
  <main className="home-page">
    <Hero />
    <Features />
    <HowItWorks />
    <PersonalityTraits />
    <ImageGallery />
    <Testimonials />
    <FAQ />
    <CTASection />
  </main>
);

export default Home;
