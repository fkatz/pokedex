import sagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';
import { PokemonDetails } from '../../../types/PokemonDetails';
import {
  getPokemonDetailsByName,
  requestGetPokemonDetails,
  requestGetPokemonSpecies,
} from './getPokemonDetailsSaga';
import { setErrorPokemon, setLoadingPokemon, updatePokemon } from './originalPokemonSlice';

const mockSpeciesName = 'bulbasaur-species';
const mockPokemonName = 'bulbasaur-pokemon';
const speciesMockResponse = {
  data: {
    name: mockSpeciesName,
    is_legendary: false,
    evolves_from_species: null,
    flavor_text_entries: [
      {
        flavor_text:
          'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.',
        language: {
          name: 'en',
        },
      },
    ],
    varieties: [
      {
        pokemon: {
          name: mockPokemonName,
        },
      },
    ],
  },
};
const pokemonMockResponse = {
  data: {
    height: 7,
    moves: [
      {
        move: {
          name: 'razor-wind',
        },
      },
      {
        move: {
          name: 'grassy-glide',
        },
      },
    ],
    name: mockPokemonName,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/front/1.png',
    },
    types: [
      {
        type: {
          name: 'grass',
        },
      },
      {
        type: {
          name: 'poison',
        },
      },
    ],
    weight: 69,
  },
};

const mockDetails: PokemonDetails = {
  name: 'bulbasaur-species',
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

describe('getPokemonDetailsByName success', () => {
  const it = sagaHelper(getPokemonDetailsByName(mockSpeciesName));

  it('should set loading to true', (putLoading) => {
    expect(putLoading).toStrictEqual(
      put(setLoadingPokemon({ name: mockSpeciesName, loading: true })),
    );
  });

  it('should reset error state', (putError) => {
    expect(putError).toStrictEqual(put(setErrorPokemon({ name: mockSpeciesName, error: null })));
  });

  it('should call the species API', (apiCall) => {
    expect(apiCall).toEqual(call(requestGetPokemonSpecies, mockSpeciesName));
    return speciesMockResponse;
  });

  it('should call the pokemon API', (apiCall) => {
    expect(apiCall).toEqual(call(requestGetPokemonDetails, mockPokemonName));
    return pokemonMockResponse;
  });

  it('should set data', (putData) => {
    expect(putData).toStrictEqual(put(updatePokemon(mockDetails)));
  });

  it('should set loading to false', (putLoading) => {
    expect(putLoading).toStrictEqual(
      put(setLoadingPokemon({ name: mockSpeciesName, loading: false })),
    );
  });
});

describe('getPokemonDetailsByName error', () => {
  const it = sagaHelper(getPokemonDetailsByName(mockSpeciesName));

  it('should set loading to true', (putLoading) => {
    expect(putLoading).toStrictEqual(
      put(setLoadingPokemon({ name: mockSpeciesName, loading: true })),
    );
  });

  it('should reset error state', (putError) => {
    expect(putError).toStrictEqual(put(setErrorPokemon({ name: mockSpeciesName, error: null })));
  });

  it('should call the species API', (apiCall) => {
    expect(apiCall).toEqual(call(requestGetPokemonSpecies, mockSpeciesName));
    return new Error('Network Error');
  });

  it('should set error', (putData) => {
    expect(putData).toStrictEqual(
      put(setErrorPokemon({ name: mockSpeciesName, error: 'ServerError' })),
    );
  });

  it('should set loading to false', (putLoading) => {
    expect(putLoading).toStrictEqual(
      put(setLoadingPokemon({ name: mockSpeciesName, loading: false })),
    );
  });
});
