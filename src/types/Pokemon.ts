import { PokemonDetails } from './PokemonDetails';

export interface Pokemon {
  name: string;
  isUserMade?: boolean;
  details?: PokemonDetails;
}
