import Search from '../../assets/search.svg';

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSearch: () => void;
};

export const SearchBar = ({
  value,
  onChange,
  onKeyDown,
  onSearch,
}: SearchBarProps) => (
  <div className="search-container">
    <input
      type="text"
      className="search-input"
      placeholder="Search pokemons..."
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      aria-label="Search pokemons"
    />
    <button
      className="search-button"
      onClick={onSearch}
      aria-label="search"
      type="button"
    >
      <div className="search-icon-container">
        <img src={Search} alt="search" />
      </div>
    </button>
  </div>
);
