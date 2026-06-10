import { Header } from '../header/Header.tsx';
import { Outlet } from 'react-router-dom';
import { Flyout } from '../flyout/Flyout.tsx';
import { Footer } from '../footer/Footer.tsx';

interface MainLayoutProps {
  handleSearch: (query: string) => void;
  searchQuery: string;
}

export const MainLayout = ({ handleSearch, searchQuery }: MainLayoutProps) => {
  return (
    <div className={'app-layout'}>
      <Header handleSearch={handleSearch} searchQuery={searchQuery} />
      <Outlet />
      <Flyout />
      <Footer />
    </div>
  );
};
