import type { useSearchParams } from 'react-router-dom';
import type { Item } from '../types/homePageTypes';

export type UsePokemonData = {
  localStorageValue: string;
  query: string | null;
  page: number;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
};

export type ReturnUsePokemon = {
  isLoading: boolean;
  errorMessage: string;
  items: Item[] | null;
};
