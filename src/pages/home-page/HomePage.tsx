import { type FC, useEffect, useState } from 'react';
import { Line } from '../../components/Line/Line';
import './home-page.css';
import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context.ts';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import { toggleItem } from '../../store/itemSlice.ts';

interface HomePageProps {
  query: string;
}

interface Item {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  img: string;
  title: string;
}

export const HomePage: FC<HomePageProps> = ({ query }) => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [items, setItems] = useState<Item[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = Number(searchParams.get('page')) || 1;
  const { theme } = useTheme();

  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.pokemons.selectedItems
  );

  const fetchData = async (searchQuery: string) => {
    setItems(null);
    setErrorMessage('');

    setLoading(true);
    const offset = (page - 1) * 12;

    const savedValue = localStorage.getItem('input-value') || '';
    const isSearchMode = savedValue.trim().length >= 3;

    const url = localStorage.getItem('input-value')
      ? `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`
      : `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Not found');
        }
        if (response.status >= 500) {
          throw new Error('Server error. We try fix problem, please wait');
        }
        throw new Error('Error data loading');
      }
      const data = await response.json();

      if (isSearchMode) {
        const mappedItem: Item = {
          title: data.name,
          img: data.sprites.front_default || '',
          hp: data.stats[0]?.base_stat || 0,
          attack: data.stats[1]?.base_stat || 0,
          defense: data.stats[2]?.base_stat || 0,
          speed: data.stats[5]?.base_stat || 0,
        };

        setItems([mappedItem]);
        setLoading(false);
      } else {
        const detailedData = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const data = await fetch(pokemon.url);
            const details = await data.json();
            return {
              title: details.name,
              img: details.sprites.front_default || '',
              hp: details.stats[0].base_stat,
              attack: details.stats[1].base_stat,
              defense: details.stats[2].base_stat,
              speed: details.stats[5].base_stat,
            };
          })
        );

        setItems(detailedData);
        setLoading(false);
      }
    } catch (err) {
      let errorMessage: string = '';

      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  };

  const handlePrevPageClick = () => {
    if (page === 1) {
      return;
    }

    const nextPage = page - 1;
    setSearchParams({ page: String(nextPage) });
  };

  const handleNextPageClick = () => {
    const nextPage = page + 1;
    setSearchParams({ page: String(nextPage) });
  };

  const handleCardClick = (name: string) => {
    navigate(`/pokemon/${name}${window.location.search}`);
  };

  useEffect(() => {
    const localStorageValue = localStorage.getItem('input-value') || '';
    if (localStorageValue.trim().length >= 3 && page !== 1) {
      setSearchParams({ page: '1' });
    }

    fetchData(query);
  }, [query, page]);

  return (
    <main className={`${theme === 'dark' ? 'dark-mode' : ''}`}>
      {isLoading && <div className={'loader'}>loading...</div>}
      {errorMessage && (
        <div className={'error-showing-container'}>
          <p>{errorMessage}</p>
        </div>
      )}
      <div className={'list-wrapper'}>
        <section className={'list'}>
          {items?.map((item: Item) => {
            const isChecked = selectedItems.some(
              (selected: { title: string }) => selected.title === item.title
            );
            return (
              <div
                key={item.title}
                className={'card-container'}
                onClick={() => handleCardClick(item.title)}
              >
                <Line
                  item={item}
                  isChecked={isChecked}
                  handleCheckboxChange={() => {
                    dispatch(toggleItem(item));
                  }}
                ></Line>
              </div>
            );
          })}
        </section>
      </div>
      <Outlet />
      {!isLoading && items && items.length > 0 && (
        <nav className={'pagination'}>
          <p className={'switch-page'} onClick={handlePrevPageClick}>
            prev
          </p>
          <p>{page}</p>
          <p className={'switch-page'} onClick={handleNextPageClick}>
            next
          </p>
        </nav>
      )}
    </main>
  );
};
