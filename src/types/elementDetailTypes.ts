export type PokemonDetailedInfo = {
  height: number;
  weight: number;
  abilities: string[];
};

export type PokemonApiAbilityItem = {
  ability: {
    name: string;
    url: string;
  };
  isHidden: boolean;
  slot: number;
};

export type MappedData = {
  height: number;
  weight: number;
  abilities: string[];
};
