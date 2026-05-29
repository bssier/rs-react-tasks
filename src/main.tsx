import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { App } from './App.tsx';
import { AppProviders } from './components/AppProviders/AppProviders.tsx';

createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
  </AppProviders>
);
