'use client';

import { useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Line } from '../../сomponents/line/Line';
import './HomePage.css';
import { useTheme } from '../../../context';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store/store';
import { toggleItem } from '../../../store/itemSlice';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Pagination } from '../../сomponents/pagination-line/Pagination';
import { usePokemonData } from '../../../hooks/usePokemonData';
import type { Item } from '@/types/homePageTypes';
import {
  MIN_LENGTH,
  MIN_PAGE_LENGTH,
} from '../../constants/homePageConstains.ts';

export const HomePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const [localStorageValue] = useLocalStorage('input-value', '');
  const page = Number(searchParams.get('page') ?? '1') || 1;
  const query = searchParams.get('query') ?? '';

  const updatePage = useCallback(
    (newPage: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage);
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );

  const { items, isLoading, errorMessage, hasMore, handleRefresh } =
    usePokemonData({
      localStorageValue,
      query,
      page,
    });

  const selectedItems: Item[] = useSelector(
    (state: RootState): Item[] => state.pokemons.selectedItems,
  );

  const isSearchMode = (localStorageValue || query).length >= MIN_LENGTH;

  useEffect(() => {
    if (isSearchMode && page !== MIN_PAGE_LENGTH) {
      updatePage('1');
    }
  }, [isSearchMode, page, updatePage]);

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
                item={item}
                isChecked={selectedItems.some(
                  (s: Item) => s.title === item.title,
                )}
                handleCheckboxChange={() => dispatch(toggleItem(item))}
              />
            ))}
        </section>
      </div>

      {!isLoading && items && items.length > 0 && (
        <Pagination hasMore={hasMore} />
      )}
    </main>
  );
};
