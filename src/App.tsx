import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { HomePage } from './pages/home-page/HomePage';
import { NotFoundPage } from './pages/not-found/NotFoundPage';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary.tsx';
import { AboutPage } from './pages/about-page/AboutPage.tsx';
import { ElementDetail } from './components/pokemon-detail/ElementDetail.tsx';
import { MainLayout } from './components/main-layout/MainLayout.tsx';

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

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route
            element={
              <MainLayout
                handleSearch={handleSearch}
                searchQuery={searchQuery}
              />
            }
          >
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
