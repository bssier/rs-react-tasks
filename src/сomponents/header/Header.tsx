'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '../../../navigation';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Logo from '../../../assets/pokemon-logo.svg';
import DarkMode from '../../../assets/dark-mode.svg';
import LightMode from '../../../assets/light-mode.svg';

import { useSearch } from '../../../hooks/useSearch';
import { useTheme } from '../../../context';
import { useThrowError } from '../../../hooks/useThrowError';
import { SnackBar } from '../snack-bar/SnackBar';
import { SearchBar } from '../search-bar/SearchBar';
import './Header.css';

export const Header = () => {
  const t = useTranslations('Header');
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { snackBarMessage, handleToPokemonListClick } = useSearch();
  const { theme, toggleTheme } = useTheme();
  const createError = useThrowError();

  const toggleLanguage = () => {
    const nextLocale = currentLocale === 'ru' ? 'en' : 'ru';
    const params = new URLSearchParams(searchParams.toString());
    const routerReplace = router.replace.bind(router);
    routerReplace(`${pathname}?${params.toString()}`, {
      locale: nextLocale,
    });
  };

  return (
    <>
      {snackBarMessage && <SnackBar message={snackBarMessage} />}
      <header className="header">
        <div className="logo">
          <div className="logo-container">
            <Image src={Logo} alt="logo" className="logo" />
          </div>
        </div>

        <nav className="to-pokemon-list-container">
          <Link href="/" onClick={handleToPokemonListClick}>
            {t('pokemon-list')}
          </Link>
        </nav>

        <button
          className="lang-switcher"
          onClick={toggleLanguage}
          type="button"
        >
          {currentLocale.toUpperCase()}
        </button>

        <SearchBar />

        <button
          type="button"
          className={`theme-switcher ${theme}-mode`}
          onClick={toggleTheme}
          aria-label="toggle theme"
        >
          {theme === 'light' ? (
            <Image src={DarkMode} alt="dark mode" />
          ) : (
            <Image src={LightMode} alt="light mode" />
          )}
        </button>

        <nav className="about-page-link">
          <p>
            <Link href="/about">{t('about')}</Link>
          </p>
        </nav>

        <div className="error-generate-container">
          <button type="button" onClick={createError}>
            {t('generate-error')}
          </button>
        </div>
      </header>
    </>
  );
};
