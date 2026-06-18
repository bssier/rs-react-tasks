import {
  Outlet,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePokemonData } from '../../hooks/usePokemonData';
import { Line } from '../../components/line/Line';
import { Pagination } from '../../components/pagination-line/Pagination';
import './HomePage.css';
import type { Item } from '../../types/homePageTypes';
import { useEffect } from 'react';
import { PAGE_LIMIT } from '../../pages/home-page/homePageConstaints';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const page = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query');
  const [localStorageValue] = useLocalStorage('input-value', '');
  const currentPage = Number(searchParams.get('page')) || 1;

  const { isLoading, errorMessage, items } = usePokemonData({
    localStorageValue,
    query,
    page,
  });

  useEffect(() => {
    if (currentPage > PAGE_LIMIT || currentPage < 1) {
      void navigate('/not-found', { replace: true });
    }
  }, [currentPage, navigate]);

  const handleCardClick = (item: Item): void => {
    void navigate(`/pokemon/${item.title}${location.search}`, {
      state: { item },
    });
  };

  const handlePageChange = (newPage: number): void => {
    setSearchParams((prevParams) => {
      prevParams.set('page', String(newPage));
      return prevParams;
    });
  };

  return (
    <main>
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
        <Pagination page={page} onChangePage={handlePageChange} />
      )}
    </main>
  );
};
