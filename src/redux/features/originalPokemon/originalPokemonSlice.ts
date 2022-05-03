import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorType } from '../../../types/ErrorType';
import { Pokemon } from '../../../types/Pokemon';
import { PokemonDetails } from '../../../types/PokemonDetails';

export interface OriginalPokemonState {
  byName: { [key: string]: Pokemon };
  allNames: string[];
  loading: {
    fetch: boolean;
    byName: { [key: string]: boolean };
  };
  error: {
    fetch: ErrorType;
    byName: { [key: string]: ErrorType };
  };
}

const initialState: OriginalPokemonState = {
  byName: {},
  allNames: [],
  loading: {
    fetch: false,
    byName: {},
  },
  error: {
    fetch: null,
    byName: {},
  },
};

export const originalPokemonsSlice = createSlice({
  name: 'originalPokemons',
  initialState,
  reducers: {
    fetchPokemons: () => {}, // Watched by saga
    getPokemonDetails: (_, action: PayloadAction<string>) => {}, // Watched by saga
    updatePokemons: (state, { payload: pokemons }: PayloadAction<Pokemon[]>) => {
      let byName: { [key: string]: Pokemon } = {};
      pokemons.forEach((pokemon) => {
        byName[pokemon.name] = { ...pokemon, isUserMade: false };
      });
      return {
        ...initialState,
        byName,
        allNames: Object.keys(byName),
      };
    },
    updatePokemon: (state, { payload: pokemonDetails }: PayloadAction<PokemonDetails>) => {
      state.byName[pokemonDetails.name] = {
        ...state.byName[pokemonDetails.name],
        details: pokemonDetails,
      };
    },
    setLoadingPokemon: (
      state,
      { payload: { name, loading } }: PayloadAction<{ name: string; loading: boolean }>,
    ) => {
      state.loading.byName[name] = loading;
      return state;
    },
    setLoadingFetch: (state, { payload: loading }: PayloadAction<boolean>) => {
      state.loading.fetch = loading;
      return state;
    },
    setErrorPokemon: (
      state,
      { payload: { name, error } }: PayloadAction<{ name: string; error: ErrorType }>,
    ) => {
      state.error.byName[name] = error;
      return state;
    },
    setErrorFetch: (state, { payload: error }: PayloadAction<ErrorType>) => {
      state.error.fetch = error;
      return state;
    },
  },
});

export const {
  fetchPokemons,
  getPokemonDetails,
  updatePokemons,
  updatePokemon,
  setLoadingPokemon,
  setLoadingFetch,
  setErrorPokemon,
  setErrorFetch,
} = originalPokemonsSlice.actions;

export default originalPokemonsSlice.reducer;
