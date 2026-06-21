import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Item } from '../components/line/Line';
import type {
  ApiPokemonListResponse,
  PokemonResponse,
} from '../app/[locale]/page';

const CACHE_TTL: number = Number(process.env.NEXT_PUBLIC_CACHE_TTL) || 60;

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

    getPokemonDetail: build.query<PokemonResponse, string>({
      query: (name: string): string => `/pokemon/${name.toLowerCase()}`,
      providesTags: ['PokemonDetail'],
    }),

    getPokemonList: build.query<Item[], { limit: number; offset: number }>({
      providesTags: ['PokemonList'],
      async queryFn(arg, _queryApi, _extraOptions, baseQuery) {
        const listResult = await baseQuery(
          `pokemon?limit=${arg.limit}&offset=${arg.offset}`
        );

        if (listResult.error) return { error: listResult.error };

        const data = listResult.data as ApiPokemonListResponse;

        try {
          const detailedData = await Promise.all(
            data.results.map(async (pokemon: { name: string; url: string }) => {
              const res = await baseQuery(`/pokemon/${pokemon.name}`);
              if (res.error) throw res.error;
              return mapPokemonItem(res.data as PokemonResponse);
            })
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
