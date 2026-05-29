import { Header } from '../Header/Header.tsx';
import { Outlet } from 'react-router-dom';
import { Flyout } from '../Flyout/Flyout.tsx';
import { Footer } from '../Footer/Footer.tsx';

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
