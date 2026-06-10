import { Header } from '../header/Header.tsx';
import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/Footer.tsx';

export const MainLayout = () => {
  return (
    <div className={'app-layout'}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
