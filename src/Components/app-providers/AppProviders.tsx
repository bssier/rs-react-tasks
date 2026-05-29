import { StrictMode, useEffect, useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import { ThemeContext } from '../../context.ts';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
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
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <StrictMode>
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      </Provider>
    </StrictMode>
  );
};
