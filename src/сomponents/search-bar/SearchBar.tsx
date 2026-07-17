'use client';

import Image from 'next/image';
import Search from '../../../assets/search.svg';
import { useSearch } from '../../../hooks/useSearch';

export const SearchBar = () => {
  const { handleEnterClick, handleInputChange, handleSearchClick, inputValue } =
    useSearch();

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
          <Image src={Search} alt="search" width={24} height={24} />
        </div>
      </button>
    </div>
  );
};
