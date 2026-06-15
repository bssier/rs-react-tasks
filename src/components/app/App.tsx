import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from '../../pages/home-page/HomePage.tsx';
import { NotFoundPage } from '../../pages/not-found/NotFoundPage.tsx';
import { ErrorBoundary } from '../error-boundary/ErrorBoundary.tsx';
import { AboutPage } from '../../pages/about-page/AboutPage.tsx';
import { ElementDetail } from '../pokemon-detail/ElementDetail.tsx';
import { MainLayout } from '../main-layout/MainLayout.tsx';
import { AppProviders } from '../app-providers/AppProviders.tsx';

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppProviders>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path={'/'} element={<HomePage />}>
                <Route path="pokemon/:name" element={<ElementDetail />} />
              </Route>
              <Route path={'/about'} element={<AboutPage />}></Route>
            </Route>

            <Route path={'*'} element={<NotFoundPage />} />
          </Routes>
        </AppProviders>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
