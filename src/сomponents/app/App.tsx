import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { HomePage } from '../../pages/home-page/HomePage';
import { NotFoundPage } from '../../pages/not-found/NotFoundPage';
import { ErrorBoundary } from '../error-boundary/ErrorBoundary';
import { AboutPage } from '../../pages/about-page/AboutPage';
import { ElementDetail } from '../pokemon-detail/ElementDetail';
import { MainLayout } from '../main-layout/MainLayout';

export const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />}>
              <Route path="pokemon/:name" element={<ElementDetail />} />
            </Route>
            <Route path="/about" element={<AboutPage />}></Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
