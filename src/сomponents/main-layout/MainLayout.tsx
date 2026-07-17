import { Header } from '../header/Header';
import { Outlet } from 'react-router';
import { Footer } from '../footer/Footer';
import { Flyout } from '../flyout/Flyout';

export const MainLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <Outlet />
      <Flyout />
      <Footer />
    </div>
  );
};
