export interface PokemonDetails {
  name: string;
  sprite: string;
  height: number;
  weight: number;
  isLegendary: boolean;
  evolvesFrom?: string;
  types: string[];
  moves: string[];
  description: string;
}
