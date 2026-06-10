import { Link } from 'react-router-dom';
import Logo from '../../assets/pokemon-logo.svg';
import { useHeaderSearch } from '../../hooks/useHeaderSearch';
import { SnackBar } from '../snack-bar/SnackBar';
import { SearchBar } from '../search-bar/SearchBar';
import './Header.css';

export const Header = () => {
  const {
    inputValue,
    snackBarMessage,
    handleInputChange,
    handleSearchClick,
    handleToPokemonListClick,
    handleEnterClick,
    generateError,
  } = useHeaderSearch();

  return (
    <>
      {snackBarMessage && <SnackBar message={snackBarMessage} />}
      <header>
        <div className="logo">
          <div className="logo-container">
            <img src={Logo} alt="logo" className="logo" />
          </div>
        </div>

        <nav className="to-pokemon-list-container">
          <Link onClick={handleToPokemonListClick} to="/">
            Pokemon list
          </Link>
        </nav>

        <SearchBar
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleEnterClick}
          onSearch={handleSearchClick}
        />

        <nav className="about-page-link">
          <p>
            <Link to="/about">About</Link>
          </p>
        </nav>

        <div className="error-generate-container">
          <button onClick={generateError}>Generate Error</button>
        </div>
      </header>
    </>
  );
};
