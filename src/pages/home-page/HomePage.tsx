import { type FC, useEffect, useState } from 'react';
import { Line } from '../../components/Line/Line';
import './home-page.css';
import {
  Outlet,
  useSearchParams,
  useNavigate,
  type NavigateFunction,
} from 'react-router-dom';
import { useTheme } from '../../context.ts';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import { toggleItem } from '../../store/itemSlice.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';

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

interface PokemonResponse {
  name: string;
  sprites: {
    front_default: string | null;
  };
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
}

interface PokemonListResponse {
  results: Array<{
    name: string;
    url: string;
  }>;
}

const mapPokemonItem = (apiData: PokemonResponse): Item => {
  const statsMap: Record<string, number> = {};

  apiData.stats.forEach((stat) => {
    if (stat.stat?.name) {
      statsMap[stat.stat.name] = stat.base_stat;
    }
  });

  return {
    title: apiData.name,
    img: apiData.sprites.front_default || '',
    hp: statsMap['hp'] || 0,
    attack: statsMap['attack'] || 0,
    defense: statsMap['defense'] || 0,
    speed: statsMap['speed'] || 0,
  };
};

export const HomePage: FC<HomePageProps> = ({ query }) => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [items, setItems] = useState<Item[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate: NavigateFunction = useNavigate();
  const page: number = Number(searchParams.get('page')) || 1;
  const [localStorageValue] = useLocalStorage<string>('input-value', '');
  const { theme } = useTheme();

  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.pokemons.selectedItems
  );

  const handlePrevPageClick = () => {
    if (page === 1) {
      return;
    }

    setSearchParams({ page: String(page - 1) });
  };

  const handleNextPageClick = () => {
    setSearchParams({ page: String(page + 1) });
  };

  const handleCardClick = (name: string) => {
    navigate(`/pokemon/${name}${window.location.search}`);
  };

  useEffect(() => {
    if (localStorageValue.length >= 3 && page !== 1) {
      setSearchParams({ page: '1' });
      return;
    }

    const fetchData = async () => {
      setItems(null);
      setErrorMessage('');
      setLoading(true);
      const offset: number = (page - 1) * 12;
      const cleanQuery: string = localStorageValue || query;
      const isSearchMode: boolean = cleanQuery.length >= 3;

      const url: string = isSearchMode
        ? `https://pokeapi.co/api/v2/pokemon/${cleanQuery}`
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

        const gettingData = await response.json();

        if (isSearchMode && gettingData) {
          const data = gettingData as PokemonResponse;

          const mappedItem = mapPokemonItem(data);

          setItems([mappedItem]);
          setLoading(false);
        } else if (!isSearchMode && gettingData.results) {
          const data = gettingData as PokemonListResponse;

          const detailedData = await Promise.all(
            data.results.map(async (pokemon: { url: string }) => {
              const data = await fetch(pokemon.url);
              const details = await data.json();
              return mapPokemonItem(details);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page, setSearchParams, localStorageValue]);

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
              <Line
                key={item.title}
                onClick={() => handleCardClick(item.title)}
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
