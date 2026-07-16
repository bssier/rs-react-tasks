import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { HomePage } from './pages/home-page/HomePage';
import { NotFoundPage } from './pages/not-found/NotFoundPage';
import { ErrorBoundary } from './сomponents/error-boundary/ErrorBoundary';
import { AboutPage } from './pages/about-page/AboutPage';
import { ElementDetail } from './сomponents/pokemon-detail/ElementDetail';
import { MainLayout } from './сomponents/main-layout/MainLayout';

export const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />}>
              <Route path="pokemon/:name" element={<ElementDetail />} />
            </Route>
            <Route path="/about" element={<AboutPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
