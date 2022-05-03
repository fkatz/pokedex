import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonTile from '.';
import { PokemonDetails } from '../../types/PokemonDetails';

const mockDetails: PokemonDetails = {
  name: 'bulbasaur',
  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/front/1.png',
  height: 0.7,
  weight: 6.9,
  isLegendary: false,
  evolvesFrom: undefined,
  types: ['grass', 'poison'],
  moves: ['razor-wind', 'grassy-glide'],
  description:
    'A strange seed was\n' +
    'planted on its\n' +
    'back at birth.\fThe plant sprouts\n' +
    'and grows with\n' +
    'this POKéMON.',
};

jest.mock('../PokemonDetailsModal', () => () => null);

describe('PokemonTile', () => {
  it("should add a (U) if it's user made", () => {
    render(<PokemonTile name="bulbasaur" userMade={true} pokemonDetails={mockDetails} />);
    const nameElement = screen.getByText('bulbasaur (U)');
    expect(nameElement).toBeInTheDocument();
  });
});
