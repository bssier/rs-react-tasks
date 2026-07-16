import { useDispatch } from 'react-redux';
import {
  useGetPokemonQuery,
  useGetPokemonListQuery,
  pokemonApi,
} from '../redux/pokemonApi';
import {
  OFFSET,
  MIN_LENGTH,
  NOT_FOUND,
} from '../pages/home-page/homePageConstaints';
import type { Item } from '../types/homePageTypes';
import type {
  ReturnUsePokemon,
  PokemonDataTypes,
} from '../types/pokemonDataTypes';

export const usePokemonData = ({
  query,
  page,
}: PokemonDataTypes): ReturnUsePokemon => {
  const dispatch = useDispatch();
  const cleanQuery: string = query ?? '';
  const isSearchMode: boolean = cleanQuery.length >= MIN_LENGTH;
  const offset: number = (page - 1) * OFFSET;

  const {
    data: listData,
    isFetching: isListFetching,
    error: listError,
  } = useGetPokemonListQuery({ limit: OFFSET, offset }, { skip: isSearchMode });

  const {
    data: searchData,
    isFetching: isSearchFetching,
    error: searchError,
  } = useGetPokemonQuery(cleanQuery, { skip: !isSearchMode });

  const items: Item[] | null = isSearchMode
    ? searchData
      ? [searchData]
      : null
    : (listData ?? null);

  const isLoading = isSearchMode ? isSearchFetching : isListFetching;

  let errorMessage = '';
  const currentError = isSearchMode ? searchError : listError;

  if (currentError) {
    errorMessage =
      'status' in currentError && currentError.status === NOT_FOUND
        ? 'Pokemon not found. Please write another name'
        : 'Error data loading';
  }

  const hasMore =
    !isSearchMode && (listData ? listData.length === OFFSET : false);

  const handleRefresh = (): void => {
    dispatch(pokemonApi.util.invalidateTags(['PokemonList', 'PokemonDetail']));
  };

  return { isLoading, errorMessage, items, hasMore, handleRefresh };
};
