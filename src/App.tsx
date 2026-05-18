import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Outlet, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/home-page/HomePage';
import { Footer } from './components/Footer/Footer';
import { NotFoundPage } from './pages/not-found/NotFoundPage';
import { ErrorBoundary } from './components/ErrorBoudary/ErrorBoundary.tsx';
import { AboutPage } from './pages/AboutPage/AboutPage.tsx';
import { ElementDetail } from './components/PokemonDetail/ElementDetail.tsx';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return localStorage.getItem('input-value') || '';
  });

  useEffect(() => {
    localStorage.setItem('input-value', searchQuery);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const MainLayout = () => {
    return (
      <>
        <Header handleSearch={handleSearch} searchQuery={searchQuery} />
        <Outlet />
        <Footer />
      </>
    );
  };

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={'/'} element={<HomePage query={searchQuery} />}>
              <Route path="pokemon/:name" element={<ElementDetail />} />
            </Route>
            <Route path={'/about'} element={<AboutPage />}></Route>
          </Route>

          <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
