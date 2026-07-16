import { StrictMode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeContext } from '../../context';
import { App } from '../app/App';

export const AppProvider = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : 'light';
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <StrictMode>
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <App />
        </ThemeContext.Provider>
      </Provider>
    </StrictMode>
  );
};
