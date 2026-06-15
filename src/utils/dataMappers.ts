import type {
  Item,
  PokemonListResponse,
  PokemonResponse,
} from '../types/homePageTypes';

export const isPokemonResponse = (data: unknown): data is PokemonResponse => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  return (
    'name' in data &&
    'sprites' in data &&
    'stats' in data &&
    'height' in data &&
    'weight' in data &&
    'abilities' in data
  );
};

export const isPokemonListResponse = (
  data: unknown,
): data is PokemonListResponse => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  return 'results' in data && Array.isArray(data.results);
};

export const mapPokemonItem = (apiData: PokemonResponse): Item => {
  const statsMap: Record<string, number> = {};

  for (const stat of apiData.stats) {
    if (stat.stat.name) {
      statsMap[stat.stat.name] = stat.base_stat;
    }
  }

  return {
    title: apiData.name,
    img: apiData.sprites.front_default ?? '',
    hp: statsMap.hp || 0,
    attack: statsMap.attack || 0,
    defense: statsMap.defense || 0,
    speed: statsMap.speed || 0,
    height: apiData.height,
    weight: apiData.weight,
    abilities: apiData.abilities.map((a): string => a.ability.name),
  };
};
