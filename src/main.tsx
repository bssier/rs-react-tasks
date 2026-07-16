import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { AppProvider } from './сomponents/app-provider/AppProvider';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('No root element found');
}

createRoot(rootElement).render(<AppProvider />);
