import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Item } from '../src/types/homePageTypes';

const DEFAULT_CACHE_TTL = 60;
const rawTtl: unknown = process.env.NEXT_PUBLIC_CACHE_TTL;
const ttlValue = typeof rawTtl === 'string' ? Number(rawTtl) : NaN;
const CACHE_TTL: number = Number.isNaN(ttlValue) ? DEFAULT_CACHE_TTL : ttlValue;

export type DetailedItem = Item & {
  height: number;
  weight: number;
  abilities: string[];
};

export type PokemonResponse = {
  name: string;
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string | null;
  };
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
};

export type PokemonListResponse = {
  results: {
    name: string;
    url: string;
  }[];
};

function isPokemonListResponse(value: unknown): value is PokemonListResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  return 'results' in value && Array.isArray(value.results);
}

function isPokemonResponse(value: unknown): value is PokemonResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  return (
    'name' in value &&
    'height' in value &&
    'weight' in value &&
    'abilities' in value &&
    'sprites' in value &&
    'stats' in value
  );
}

const mapPokemonItem = (apiData: PokemonResponse): Item => {
  const statsMap: Record<string, number | undefined> = {};

  for (const stat of apiData.stats) {
    if (stat.stat.name) {
      statsMap[stat.stat.name] = stat.base_stat;
    }
  }

  return {
    title: apiData.name,
    img: apiData.sprites.front_default ?? '',
    hp: statsMap.hp ?? 0,
    attack: statsMap.attack ?? 0,
    defense: statsMap.defense ?? 0,
    speed: statsMap.speed ?? 0,
  };
};

const mapDetailedPokemonItem = (apiData: PokemonResponse): DetailedItem => {
  const base = mapPokemonItem(apiData);
  return {
    ...base,
    height: apiData.height,
    weight: apiData.weight,
    abilities: apiData.abilities.map((item) => item.ability.name),
  };
};

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  keepUnusedDataFor: CACHE_TTL,
  tagTypes: ['PokemonDetail', 'PokemonList'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    getPokemon: build.query<Item, string>({
      query: (name: string): string => `/pokemon/${name.toLowerCase()}`,
      providesTags: ['PokemonDetail'],
      transformResponse: (response: PokemonResponse) =>
        mapPokemonItem(response),
    }),

    getPokemonDetail: build.query<DetailedItem, string>({
      query: (name: string): string => `/pokemon/${name.toLowerCase()}`,
      providesTags: ['PokemonDetail'],
      transformResponse: (response: PokemonResponse): DetailedItem =>
        mapDetailedPokemonItem(response),
    }),

    getPokemonList: build.query<Item[], { limit: number; offset: number }>({
      providesTags: ['PokemonList'],
      async queryFn(arg, _queryApi, _extraOptions, baseQuery) {
        const listResult = await baseQuery(
          `pokemon?limit=${String(arg.limit)}&offset=${String(arg.offset)}`,
        );

        if (listResult.error) {
          return { error: listResult.error };
        }

        if (!isPokemonListResponse(listResult.data)) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: 'Invalid Pokemon list response structure',
            },
          };
        }

        const { data } = listResult;

        try {
          const detailedData = await Promise.all(
            data.results.map(async (pokemon: { name: string; url: string }) => {
              const res = await baseQuery(`/pokemon/${pokemon.name}`);
              if (res.error) {
                throw new Error(JSON.stringify(res.error));
              }
              if (!isPokemonResponse(res.data)) {
                throw new Error('Invalid Pokemon detail response structure');
              }
              return mapPokemonItem(res.data);
            }),
          );

          return { data: detailedData };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: String(error) } };
        }
      },
    }),
  }),
});

export const {
  useGetPokemonQuery,
  useGetPokemonListQuery,
  useGetPokemonDetailQuery,
} = pokemonApi;
