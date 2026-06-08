import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { Provider } from 'react-redux';

import { App } from './App.tsx';
import { store } from './store/store.ts';

const rootElement: HTMLElement | null = document.querySelector('#root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
