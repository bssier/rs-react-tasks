export type Item = {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  img: string;
  title: string;
};

export type PokemonResponse = {
  name: string;
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
