import { useEffect } from 'react';
import { Line } from '../../сomponents/line/Line';
import './HomePage.css';
import { Outlet, useSearchParams, useNavigate } from 'react-router';
import { useTheme } from '../../context';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { toggleItem } from '../../store/itemSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Pagination } from '../../сomponents/pagination-line/Pagination';
import { usePokemonData } from '../../hooks/usePokemonData';
import type { Item } from '../../types/homePageTypes';
import { MIN_LENGTH, MIN_PAGE_LENGTH } from './homePageConstaints';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const [localStorageValue] = useLocalStorage('input-value', '');
  const page = Number(searchParams.get('page') ?? '1') || 1;
  const query = searchParams.get('query') ?? '';

  const { items, isLoading, errorMessage, hasMore, handleRefresh } =
    usePokemonData({
      localStorageValue,
      query,
      page,
    });

  const selectedItems = useSelector(
    (state: RootState) => state.pokemons.selectedItems,
  );

  const isSearchMode = (localStorageValue || query).length >= MIN_LENGTH;

  useEffect(() => {
    if (isSearchMode && page !== MIN_PAGE_LENGTH) {
      setSearchParams({ page: '1' });
    }
  }, [isSearchMode, page, setSearchParams]);

  return (
    <main className={theme === 'dark' ? 'dark-mode' : ''}>
      <div className="controls-panel">
        <button
          type="button"
          className="refresh-button"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          refresh data
        </button>
      </div>

      {isLoading && <div className="loader">loading...</div>}

      {errorMessage && !isLoading && (
        <div className="error-showing-container">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="list-wrapper">
        <section className="list">
          {!isLoading &&
            items?.map((item: Item) => (
              <Line
                key={item.title}
                onClick={() => {
                  void navigate(`/pokemon/${item.title}${location.search}`);
                }}
                item={item}
                isChecked={selectedItems.some((s) => s.title === item.title)}
                handleCheckboxChange={() => dispatch(toggleItem(item))}
              />
            ))}
        </section>
      </div>
      <Outlet />

      {!isLoading && items && items.length > 0 && (
        <Pagination hasMore={hasMore} />
      )}
    </main>
  );
};
