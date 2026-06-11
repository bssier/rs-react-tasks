import { useState, useEffect } from 'react';
import type { Item } from '../types/homePageTypes';
import {
  isPokemonResponse,
  isPokemonListResponse,
  mapPokemonItem,
} from '../utils/dataMappers';
import {
  MIN_LENGTH,
  NOT_FOUND,
  OFFSET,
  SERVER_ERROR,
} from '../pages/home-page/homePageConstaints';
import type {
  ReturnUsePokemon,
  PokemonDataTypes,
} from '../types/pokemonDataTypes.ts';

export const usePokemonData = ({
  localStorageValue,
  query,
  page,
}: PokemonDataTypes): ReturnUsePokemon => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [items, setItems] = useState<Item[] | null>(null);

  const offset: number = (page - 1) * OFFSET;

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      setItems(null);
      setErrorMessage('');
      setLoading(true);

      const cleanQuery: string = localStorageValue || query || '';
      const isSearchMode: boolean = cleanQuery.length >= MIN_LENGTH;

      const url: string = isSearchMode
        ? `https://pokeapi.co/api/v2/pokemon/${cleanQuery}`
        : `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${String(offset)}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === NOT_FOUND) {
            throw new Error('Not found');
          }
          if (response.status >= SERVER_ERROR) {
            throw new Error('Server error. We try fix problem, please wait');
          }
          throw new Error('Error data loading');
        }

        const jsonRaw: unknown = await response.json();

        if (isSearchMode && isPokemonResponse(jsonRaw)) {
          const mappedItem: Item = mapPokemonItem(jsonRaw);
          setItems([mappedItem]);
        } else if (!isSearchMode && isPokemonListResponse(jsonRaw)) {
          const detailedData: Item[] = await Promise.all(
            jsonRaw.results.map(
              async (pokemon: { url: string }): Promise<Item> => {
                const res: Response = await fetch(pokemon.url);
                const detailsRaw: unknown = await res.json();

                if (isPokemonResponse(detailsRaw)) {
                  return mapPokemonItem(detailsRaw);
                }
                throw new Error('Invalid pokemon details structure');
              },
            ),
          );

          setItems(detailedData);
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (error) {
        let errorMsg = '';
        if (error instanceof Error) {
          errorMsg = error.message;
        }
        setErrorMessage(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [query, page, localStorageValue, offset]);

  return { isLoading, errorMessage, items };
};
