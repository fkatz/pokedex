import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../../../types/Pokemon';
import { PokemonDetails } from '../../../types/PokemonDetails';

export interface UserMadePokemonState {
  byName: { [key: string]: Pokemon };
  allNames: string[];
}

const initialState: UserMadePokemonState = {
  byName: {},
  allNames: [],
};

export const userMadePokemonsSlice = createSlice({
  name: 'userMadePokemons',
  initialState,
  reducers: {
    addPokemon: (state, { payload: pokemonDetails }: PayloadAction<PokemonDetails>) => {
      state.byName[pokemonDetails.name] = {
        ...state.byName[pokemonDetails.name],
        details: pokemonDetails,
      };
      state.allNames.push(pokemonDetails.name);
    },
    updatePokemon: (
      state,
      {
        payload: { pokemonDetails, currentName },
      }: PayloadAction<{ pokemonDetails: PokemonDetails; currentName: string }>,
    ) => {
      if (pokemonDetails.name !== currentName) {
        delete state.byName[currentName];
        state.allNames = state.allNames.filter((name) => name !== currentName);
        state.allNames = [pokemonDetails.name, ...state.allNames];
      }
      state.byName[pokemonDetails.name] = {
        ...state.byName[pokemonDetails.name],
        details: pokemonDetails,
      };
    },
    removePokemon: (state, { payload: pokemonDetails }: PayloadAction<PokemonDetails>) => {
      delete state.byName[pokemonDetails.name];
      state.allNames = state.allNames.filter((name) => name !== pokemonDetails.name);
    },
  },
});

export const { addPokemon, updatePokemon, removePokemon } = userMadePokemonsSlice.actions;

export default userMadePokemonsSlice.reducer;
