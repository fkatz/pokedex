import { Pokemon } from './Pokemon';

export interface PokemonsResponse {
  count: number;
  next: string;
  previous?: any;
  results: Pokemon[];
}
