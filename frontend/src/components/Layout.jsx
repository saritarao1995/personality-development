import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import PageTransition from './PageTransition';

const Layout = () => (
  <div className="app-layout">
    <Navbar />
    <main className="app-main">
      <PageTransition>
        <Outlet />
      </PageTransition>
    </main>
  </div>
);

export default Layout;
