import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { App } from './components/app/App';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('No root element found');
}

createRoot(rootElement).render(<App />);
