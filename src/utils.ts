import { PokemonDetails } from './types/PokemonDetails';
import { PokemonDetailsResponse } from './types/PokemonDetailsResponse';

// Partitions array by size
export function partition<Type>(array: Type[], size: number): Type[][] {
  return array.length ? [array.splice(0, size)].concat(partition(array, size)) : [];
}

// Adapts DTO responses to UI specific type
export function pokemonDetailsResponseToPokemonDetails(
  response: PokemonDetailsResponse,
): PokemonDetails {
  return {
    name: response.name,
    sprite: response.sprites.front_default,
    height: response.height / 10, // to m
    weight: response.weight / 10, // to kg
    isLegendary: response.is_legendary,
    evolvesFrom: response.evolves_from_species?.name,
    types: response.types.map((type) => type.type.name),
    moves: response.moves.map((move) => move.move.name),
    description:
      response.flavor_text_entries.find((text) => text.language.name === 'en')?.flavor_text || '', // Save only english description
  };
}
