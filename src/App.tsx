import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/home-page/HomePage';
import { NotFoundPage } from './pages/not-found/NotFoundPage';
import { ErrorBoudary } from './components/error-boudary/ErrorBoudary.tsx';
import { AboutPage } from './pages/about-page/AboutPage.tsx';
import { ElementDetail } from './components/pokemon-detail/ElementDetail.tsx';
import { MainLayout } from './components/main-layout/MainLayout.tsx';
import { AppProviders } from './components/app-providers/AppProviders';

export const App = () => {
  return (
    <ErrorBoudary>
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
    </ErrorBoudary>
  );
};
