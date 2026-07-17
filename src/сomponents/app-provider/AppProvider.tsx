'use client';

import { StrictMode, useEffect, useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import { store } from '../../../store/store';
import { ThemeContext } from '../../../context';

type AppProviderProps = {
  children?: ReactNode;
  initialTheme: 'light' | 'dark';
};

export const AppProvider = ({ children, initialTheme }: AppProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);

    Cookies.set('theme', theme, {
      path: '/',
      expires: 365,
      sameSite: 'lax',
    });
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
