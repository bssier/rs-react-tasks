import { Link } from 'react-router';
import Logo from '../../assets/pokemon-logo.svg';
import { useSearch } from '../../hooks/useSearch.ts';
import { SnackBar } from '../snack-bar/SnackBar';
import { SearchBar } from '../search-bar/SearchBar';
import './Header.css';

export const Header = () => {
  const { snackBarMessage, handleToPokemonListClick, generateError } =
    useSearch();

  return (
    <>
      {snackBarMessage && <SnackBar message={snackBarMessage} />}
      <header className="header">
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

        <SearchBar />

        <nav className="about-page-link">
          <p>
            <Link to="/about">About</Link>
          </p>
        </nav>

        <div className="error-generate-container">
          <button type="button" onClick={generateError}>
            Generate Error
          </button>
        </div>
      </header>
    </>
  );
};
