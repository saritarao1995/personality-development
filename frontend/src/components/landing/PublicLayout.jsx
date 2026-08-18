import { Outlet } from 'react-router-dom';
import MarketingNavbar from './MarketingNavbar';
import Footer from './Footer';
import PageTransition from '../PageTransition';

const PublicLayout = () => (
  <div className="public-layout">
    <MarketingNavbar />
    <PageTransition>
      <Outlet />
    </PageTransition>
    <Footer />
  </div>
);

export default PublicLayout;
