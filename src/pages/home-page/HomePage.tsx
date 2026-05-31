import { type FC, useEffect } from 'react';
import { Line } from '../../components/line/Line';
import './HomePage.css';
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
import { Pagination } from '../../components/pagination/Pagination.tsx';
import {
  useGetPokemonQuery,
  useGetPokemonListQuery,
  pokemonApi,
} from '../../redux/pokemonApi.ts';

export interface Item {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  img: string;
  title: string;
}

interface PokemonAbilityItem {
  name: string;
  url: string;
}

export interface PokemonResponse {
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbilityItem[];
  sprites: {
    front_default: string | null;
  };
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
}

export interface PokemonListResponse {
  results: Array<{
    name: string;
    url: string;
  }>;
}

interface HomePageProps {
  query: string;
}

export const HomePage: FC<HomePageProps> = ({ query }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate: NavigateFunction = useNavigate();
  const page: number = Number(searchParams.get('page')) || 1;
  const [localStorageValue] = useLocalStorage<string>('input-value', '');
  const { theme } = useTheme();

  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.pokemons.selectedItems
  );

  const handleCardClick = (name: string) => {
    navigate(`/pokemon/${name}${window.location.search}`);
  };

  const offset: number = (page - 1) * 12;
  const cleanQuery: string = localStorageValue || query;
  const isSearchMode: boolean = cleanQuery.length >= 3;

  useEffect(() => {
    if (isSearchMode && page !== 1) {
      setSearchParams({ page: '1' });
    }
  }, [isSearchMode, page, setSearchParams]);

  const {
    data: listData,
    isFetching: isListFetching,
    error: listError,
  } = useGetPokemonListQuery({ limit: 12, offset }, { skip: isSearchMode });

  const {
    data: searchData,
    isFetching: isSearchFetching,
    error: searchError,
  } = useGetPokemonQuery(cleanQuery, { skip: !isSearchMode });

  const items: Item[] | null = isSearchMode
    ? searchData
      ? [searchData]
      : null
    : listData || null;

  const isLoading = isSearchMode ? isSearchFetching : isListFetching;

  const currentError = isSearchMode ? searchError : listError;
  let errorMessage = '';

  if (currentError) {
    if ('status' in currentError) {
      if (currentError.status === 404) {
        errorMessage = 'Pokemon not found. Please write another name';
      } else if (
        typeof currentError.status === 'number' &&
        currentError.status >= 500
      ) {
        errorMessage = 'Server error';
      } else {
        errorMessage = 'Error when we fetching data';
      }
    } else {
      errorMessage = 'Network error';
    }
  }

  const handleRefresh = () => {
    dispatch(pokemonApi.util.invalidateTags(['PokemonList', 'PokemonDetail']));
  };

  return (
    <main className={`${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className="controls-panel" style={{ margin: '15px 0' }}>
        <button
          type="button"
          className="refresh-button"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          refresh data
        </button>
      </div>

      {isLoading && <div className={'loader'}>loading...</div>}

      {errorMessage && !isLoading && (
        <div className={'error-showing-container'}>
          <p>{errorMessage}</p>
        </div>
      )}

      <div className={'list-wrapper'}>
        <section className={'list'}>
          {!isLoading &&
            items?.map((item: Item) => {
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
        <Pagination
          page={page}
          onChangePage={(newPage) => setSearchParams({ page: String(newPage) })}
        />
      )}
    </main>
  );
};
