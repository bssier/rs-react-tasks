import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { App } from './App.tsx';
import { AppProviders } from './components/app-providers/AppProviders.tsx';

createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
  </AppProviders>
);
