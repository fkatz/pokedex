export interface PokemonDetailsResponse {
  height: number;
  moves: Array<{
    move: {
      name: string;
    };
  }>;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  weight: number;
  is_legendary: boolean;
  evolves_from_species: {
    name: string;
  } | null;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
  varieties: Array<{
    pokemon: {
      name: string;
    };
  }>;
}
