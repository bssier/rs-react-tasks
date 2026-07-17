export type Item = {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  img: string;
  title: string;
  height?: number;
  weight?: number;
  abilities?: string[];
};

export type PokemonResponse = {
  height: number;
  weight: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
};

export type PokemonListResponse = {
  results: {
    name: string;
    url: string;
  }[];
};
