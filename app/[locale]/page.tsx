'use client';

import { type FC, useEffect, useState, ReactNode } from 'react';
import { Line } from '../../components/line/Line';
import '../../styles/HomePage.css';
import { useRouter, usePathname } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '../../context';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store.ts';
import { toggleItem } from '../../store/itemSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Pagination } from '../../components/pagination/Pagination';
import { ElementDetail } from '../../components/element-detail/ElementDetail';
import {
  useGetPokemonQuery,
  useGetPokemonListQuery,
  pokemonApi,
} from '../../redux/pokemonApi';
import { useTranslations } from 'next-intl';

export interface Item {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  img: string;
  title: string;
}

export interface PokemonAbilityItem {
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

interface HomePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  children?: ReactNode;
}

const Page: FC<HomePageProps> = ({
  searchParams: searchParamsPromise,
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const nextSearchParams = useSearchParams();
  const t = useTranslations('HomePage');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [localStorageValue] = useLocalStorage<string>('input-value', '');
  const { theme } = useTheme();

  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.pokemons.selectedItems
  );

  useEffect(() => {
    searchParamsPromise.then((resolvedParams) => {
      const pageFromUrl = Number(resolvedParams?.page) || 1;
      const queryFromUrl =
        typeof resolvedParams?.query === 'string' ? resolvedParams.query : '';
      setCurrentPage(pageFromUrl);
      setSearchQuery(queryFromUrl);
    });
  }, [searchParamsPromise, nextSearchParams]);

  const handleCardClick = (pokemonName: string) => {
    const updatedParams = new URLSearchParams(nextSearchParams.toString());
    updatedParams.set('pokemon', pokemonName);
    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  const offsetValue: number = (currentPage - 1) * 12;
  const activeQuery: string = localStorageValue || searchQuery;
  const isSearchMode: boolean = activeQuery.length >= 3;

  useEffect(() => {
    if (isSearchMode && currentPage !== 1) {
      const updatedParams = new URLSearchParams(nextSearchParams.toString());
      updatedParams.set('page', '1');
      router.push(`${pathname}?${updatedParams.toString()}`);
    }
  }, [isSearchMode, currentPage, pathname, router, nextSearchParams]);

  const {
    data: listData,
    isFetching: isListFetching,
    error: listError,
  } = useGetPokemonListQuery(
    { limit: 12, offset: offsetValue },
    { skip: isSearchMode }
  );

  const {
    data: searchData,
    isFetching: isSearchFetching,
    error: searchError,
  } = useGetPokemonQuery(activeQuery, { skip: !isSearchMode });

  const pokemonItems: Item[] | null = isSearchMode
    ? searchData
      ? [searchData]
      : null
    : listData || null;

  const isLoadingData = isSearchMode ? isSearchFetching : isListFetching;

  const currentFetchError = isSearchMode ? searchError : listError;
  let errorMessage = '';

  if (currentFetchError) {
    if ('status' in currentFetchError) {
      if (currentFetchError.status === 404) {
        errorMessage = 'Pokemon not found. Please write another name';
      } else if (
        typeof currentFetchError.status === 'number' &&
        currentFetchError.status >= 500
      ) {
        errorMessage = 'Server error';
      } else {
        errorMessage = 'GlobalError when we fetching data';
      }
    } else {
      errorMessage = 'Network error';
    }
  }

  const handleRefresh = () => {
    dispatch(pokemonApi.util.invalidateTags(['PokemonList', 'PokemonDetail']));
  };

  const handlePageChange = (newPageNumber: number) => {
    const updatedParams = new URLSearchParams(nextSearchParams.toString());
    updatedParams.set('page', String(newPageNumber));
    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  const activePokemonName = nextSearchParams.get('pokemon');

  return (
    <main className={`${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className="controls-panel">
        <button
          type="button"
          className="refresh-button"
          onClick={handleRefresh}
          disabled={isLoadingData}
        >
          {t('refresh-data')}
        </button>
      </div>

      {isLoadingData && <div className={'loader'}>loading...</div>}

      {errorMessage && !isLoadingData && (
        <div className={'error-showing-container'}>
          <p>{errorMessage}</p>
        </div>
      )}

      <div className={'list-wrapper'}>
        <section className={'list'}>
          {!isLoadingData &&
            pokemonItems?.map((pokemonItem: Item) => {
              const isChecked = selectedItems.some(
                (selected: { title: string }) =>
                  selected.title === pokemonItem.title
              );
              return (
                <Line
                  key={pokemonItem.title}
                  onClick={() => handleCardClick(pokemonItem.title)}
                  item={pokemonItem}
                  isChecked={isChecked}
                  handleCheckboxChange={() => {
                    dispatch(toggleItem(pokemonItem));
                  }}
                />
              );
            })}
        </section>
      </div>

      {children}

      {activePokemonName && <ElementDetail name={activePokemonName} />}

      {!isLoadingData && pokemonItems && pokemonItems.length > 0 && (
        <Pagination page={currentPage} onChangePage={handlePageChange} />
      )}
    </main>
  );
};

export default Page;
