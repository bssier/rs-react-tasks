'use client';

import { type FC, useState, useEffect } from 'react';
import './Header.css';
import Search from '../../assets/search.svg';
import Logo from '../../assets/pokemon-logo.svg';
import { Link, useRouter, usePathname } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import DarkMode from '../../assets/dark-mode.svg';
import LightMode from '../../assets/light-mode.svg';
import { useTheme } from '../../context';
import { useTranslations } from 'next-intl';

export const Header: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('Header');

  const currentQueryInUrl = searchParams.get('query') || '';

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (currentQueryInUrl) {
      setInputValue(currentQueryInUrl);
    }
  }, [currentQueryInUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExpOnlyEngSym = /^[a-zA-Z\s-]*$/;
    const value = e.target.value;

    if (regExpOnlyEngSym.test(value)) {
      setInputValue(value);
    } else {
      setSnackBarMessage(t('error-only-english'));
      setTimeout(() => setSnackBarMessage(''), 2000);
    }
  };

  const updateSearchInUrl = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchClick = () => {
    const valueWithoutspace = inputValue.trim();

    if (valueWithoutspace === currentQueryInUrl) {
      setInputValue(valueWithoutspace);
      return;
    }

    if (valueWithoutspace.length >= 3 || valueWithoutspace.length === 0) {
      updateSearchInUrl(valueWithoutspace);
      setInputValue(valueWithoutspace);
      if (valueWithoutspace) {
        localStorage.setItem('input-value', valueWithoutspace);
      } else {
        localStorage.removeItem('input-value');
      }
    } else {
      setSnackBarMessage(t('error-min-length'));
      setTimeout(() => setSnackBarMessage(''), 2000);
    }
  };

  const handleToPokemonListClick = () => {
    localStorage.removeItem('input-value');
    setInputValue('');
    updateSearchInUrl('');
  };

  const handleEnterClick = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  if (error) {
    throw error;
  }

  const generateError = () => {
    setError(new Error('Special error'));
  };

  return (
    <>
      {snackBarMessage && (
        <div className={'snack-bar'}>
          <div className={'message-container'}>
            <p>{snackBarMessage}</p>
          </div>
        </div>
      )}
      <header>
        <div className={'logo'}>
          <div className={'logo-container'}>
            <img src={Logo.src || Logo} alt={'logo'} className={'logo'} />
          </div>
        </div>
        <nav className={'to-pokemon-list-container'}>
          <Link onClick={handleToPokemonListClick} href={'/'}>
            {t('pokemon-list')}
          </Link>
        </nav>
        <div className={'search-container'}>
          <input
            type="text"
            className={'search-input'}
            placeholder={t('placeholder')}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleEnterClick}
            aria-label="Search pokemons"
          />
          <button
            className={'search-button'}
            onClick={handleSearchClick}
            aria-label={'search'}
            type="button"
          >
            <div className={'search-icon-container'}>
              <img src={Search.src || Search} alt={'search'} />
            </div>
          </button>
        </div>
        <button
          className={`theme-switcher ${theme}-mode`}
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <img src={DarkMode.src || DarkMode} alt={'dark mode'} />
          ) : (
            <img src={LightMode.src || LightMode} alt={'light mode'} />
          )}
        </button>
        <nav className={'about-page-link'}>
          <p>
            <Link href={'/about'}>{t('about')}</Link>
          </p>
        </nav>
        <div className={'error-generate-container'}>
          <button onClick={generateError}>{t('generate-error')}</button>
        </div>
      </header>
    </>
  );
};
