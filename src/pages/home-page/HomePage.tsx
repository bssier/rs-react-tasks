import {
  Outlet,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePokemonData } from '../../hooks/usePokemonData';
import { Line } from '../../components/line/Line';
import { Pagination } from '../../components/pagination-line/Pagination';
import './HomePage.css';
import type { Item } from '../../types/homePageTypes';
import { useEffect } from 'react';

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const page = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query');
  const [localStorageValue] = useLocalStorage('input-value', '');

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
    <main className="main">
      {isLoading && <div className="loader">loading...</div>}

      {errorMessage && (
        <div className="error-showing-container">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="list-wrapper">
        <section className="list">
          {items?.map((item) => (
            <Line
              key={item.title}
              onClick={() => handleCardClick(item)}
              item={item}
              isChecked={false}
              handleCheckboxChange={() => {
                throw new Error('Function not implemented.');
              }}
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
