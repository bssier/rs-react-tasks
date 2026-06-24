import {
  Outlet,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePokemonData } from '../../hooks/usePokemonData';
import { Line } from '../../сomponents/line/Line';
import { Pagination } from '../../сomponents/pagination-line/Pagination';
import './HomePage.css';
import type { Item } from '../../types/homePageTypes';
import { useEffect } from 'react';
import { useTheme } from '../../context';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { toggleItem } from '../../store/itemSlice';

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const page = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query');
  const [localStorageValue] = useLocalStorage('input-value', '');

  const { theme } = useTheme();
  const dispatch = useDispatch();

  const selectedItems = useSelector<RootState, Item[]>(
    (state) => state.pokemons.selectedItems,
  );

  const { isLoading, errorMessage, items, hasMore } = usePokemonData({
    localStorageValue,
    query,
    page,
  });

  useEffect(() => {
    if (page < 1) {
      void navigate('/not-found', { replace: true });
    }
  }, [page, navigate]);

  const handleCardClick = (item: Item): void => {
    void navigate(`/pokemon/${item.title}${location.search}`, {
      state: { item },
    });
  };

  return (
    <main className={theme === 'dark' ? 'dark-mode' : ''}>
      {isLoading && <div className="loader">loading...</div>}

      {errorMessage && (
        <div className="error-showing-container">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="list-wrapper">
        <section className="list">
          {items?.map((item) => {
            const isChecked = selectedItems.some(
              (selected: Item) => selected.title === item.title,
            );
            return (
              <Line
                key={item.title}
                onClick={() => handleCardClick(item)}
                item={item}
                isChecked={isChecked}
                handleCheckboxChange={() => {
                  dispatch(toggleItem(item));
                }}
              />
            );
          })}
        </section>
      </div>

      <Outlet />

      {!isLoading && items && items.length > 0 && (
        <Pagination hasMore={hasMore} />
      )}
    </main>
  );
};
