import { type FC, useState } from 'react';
import './header.css';
import Search from '../../assets/search.svg';
import Logo from '../../assets/pokemon-logo.svg';
import { Link } from 'react-router-dom';
import DarkMode from '../../assets/dark-mode.svg';
import LightMode from '../../assets/light-mode.svg';
import { useTheme } from '../../context.ts';

interface PropsHeader {
  handleSearch: (query: string) => void;
  searchQuery: string;
}

export const Header: FC<PropsHeader> = ({ handleSearch, searchQuery }) => {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('input-value') || ''
  );
  const [error, setError] = useState<Error | null>(null);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const { theme, toggleTheme } = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExpOnlyEngSym = /^[a-zA-Z\s]*$/;
    const value = e.target.value;

    if (regExpOnlyEngSym.test(value)) {
      setInputValue(value);
    } else {
      setSnackBarMessage('use only english letter!');

      setTimeout(() => {
        setSnackBarMessage('');
      }, 2000);
    }
  };

  const handleSearchClick = () => {
    const valueWithoutspace = inputValue.trim().trimStart();

    if (valueWithoutspace === searchQuery) {
      setInputValue(valueWithoutspace);
      return;
    }

    if (valueWithoutspace.length >= 3) {
      handleSearch(valueWithoutspace);
      setInputValue(valueWithoutspace);
      localStorage.setItem('input-value', valueWithoutspace);
    } else {
      setSnackBarMessage('your query must be longer than three characters!');

      setTimeout(() => {
        setSnackBarMessage('');
      }, 2000);
    }
  };

  const handleToPokemonListClick = () => {
    localStorage.removeItem('input-value');
    setInputValue('');
    handleSearch('');
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
            <img src={Logo} alt={'logo'} className={'logo'} />
          </div>
        </div>
        <nav className={'to-pokemon-list-container'}>
          <Link onClick={handleToPokemonListClick} to={'/'}>Pokemon list</Link>
        </nav>
        <div className={'search-container'}>
          <input
            type={'text'}
            className={'search-input'}
            placeholder={'Search pokemons...'}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleEnterClick}
          />
          <button
            className={'search-button'}
            onClick={handleSearchClick}
            aria-label={'search'}
          >
            <div className={'search-icon-container'}>
              <img src={Search} alt={'search'} />
            </div>
          </button>
        </div>
        <button
          className={`theme-switcher ${theme}-mode`}
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <img src={DarkMode} alt={'dark mode'} />
          ) : (
            <img src={LightMode} alt={'light mode'} />
          )}
        </button>
        <nav className={'about-page-link'}>
          <p>
            <Link to={'/about'}>About</Link>
          </p>
        </nav>
        <div className={'error-generate-container'}>
          <button onClick={generateError}>Generate Error</button>
        </div>
      </header>
    </>
  );
};
