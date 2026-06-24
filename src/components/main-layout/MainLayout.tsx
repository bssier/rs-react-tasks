import { Header } from '../header/Header';
import { Outlet } from 'react-router';
import { Footer } from '../footer/Footer';

export const MainLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
