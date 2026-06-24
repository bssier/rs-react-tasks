import type { Item } from '../types/homePageTypes';

export type PokemonDataTypes = {
  localStorageValue: string | null;
  query: string | null;
  page: number;
};

export type ReturnUsePokemon = {
  isLoading: boolean;
  errorMessage: string;
  items: Item[] | null;
  hasMore: boolean;
};
