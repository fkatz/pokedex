import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  addPokemon,
  removePokemon,
  updatePokemon,
} from '../redux/features/userMadePokemon/userMadePokemonSlice';
import { PokemonDetails } from '../types/PokemonDetails';

export const useUserMadePokemon = () => {
  const dispatch = useDispatch();
  const createPokemon = useCallback(
    (pokemonDetails: PokemonDetails) => {
      return dispatch(addPokemon(pokemonDetails));
    },
    [dispatch],
  );
  const modifyPokemon = useCallback(
    (pokemonDetails: PokemonDetails, currentName: string) => {
      return dispatch(updatePokemon({ pokemonDetails, currentName }));
    },
    [dispatch],
  );
  const deletePokemon = useCallback(
    (pokemonDetails: PokemonDetails) => {
      return dispatch(removePokemon(pokemonDetails));
    },
    [dispatch],
  );
  return {
    createPokemon,
    modifyPokemon,
    deletePokemon,
  };
};
