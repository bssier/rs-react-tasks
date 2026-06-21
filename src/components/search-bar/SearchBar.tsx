import Search from '../../assets/search.svg';
import { useHeaderSearch } from '../../hooks/useHeaderSearch';

export const SearchBar = () => {
  const { handleEnterClick, handleInputChange, handleSearchClick, inputValue } =
    useHeaderSearch();

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search pokemons..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterClick}
        aria-label="Search pokemons"
      />
      <button
        className="search-button"
        onClick={handleSearchClick}
        aria-label="search"
        type="button"
      >
        <div className="search-icon-container">
          <img src={Search} alt="search" />
        </div>
      </button>
    </div>
  );
};
