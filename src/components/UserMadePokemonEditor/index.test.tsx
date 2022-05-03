import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { PokemonDetails } from '../../types/PokemonDetails';
import UserMadePokemonEditor from '.';

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

jest.mock('../../hooks/useRetrievePokemonNames', () => ({
  useRetrievePokemonNames: () => ({ userMadePokemonNames: ['bulbasaur'] }),
}));

// Callbacks
const onClose = jest.fn();
const mockDeletePokemon = jest.fn();
const mockCreatePokemon = jest.fn();
const mockModifyPokemon = jest.fn();

jest.mock('../../hooks/useUserMadePokemon', () => ({
  useUserMadePokemon: () => ({
    deletePokemon: mockDeletePokemon,
    createPokemon: mockCreatePokemon,
    modifyPokemon: mockModifyPokemon,
  }),
}));

describe('UserMadePokemonEditor with currentPokemon prop set', () => {
  beforeEach(() => {
    render(<UserMadePokemonEditor open={true} onClose={onClose} currentPokemon={mockDetails} />);
  });

  it('should load pokemon data into fields when currentPokemon is passed as prop', () => {
    // Testing only one value as an example
    const nameInput = screen.getByText('Name').nextElementSibling as HTMLInputElement;
    expect(nameInput.value).toEqual(mockDetails.name);
  });

  it('should update pokemon data on save and close the modal', async () => {
    const saveButton = screen.getByText<HTMLButtonElement>('Save and close');
    expect(saveButton).toBeInTheDocument();
    fireEvent.submit(saveButton);
    await waitFor(() => {
      expect(mockModifyPokemon).toHaveBeenCalledWith(mockDetails, mockDetails.name);
    });
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
