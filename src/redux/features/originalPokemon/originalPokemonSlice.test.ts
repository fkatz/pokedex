import { Pokemon } from '../../../types/Pokemon';
import { PokemonDetails } from '../../../types/PokemonDetails';
import originalPokemonReducer, {
  OriginalPokemonState,
  updatePokemon,
  updatePokemons,
} from './originalPokemonSlice';

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

const mockPokemon: Pokemon = {
  name: 'bulbasaur',
  isUserMade: false,
};

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

let currentState = initialState;

describe('originalPokemonSlice reducer', () => {
  it('should set Pokemon data correctly on updatePokemons', () => {
    currentState.allNames = ['bulbasaur'];
    currentState.byName = { bulbasaur: mockPokemon };
    expect(originalPokemonReducer(initialState, updatePokemons([mockPokemon]))).toEqual(
      currentState,
    );
  });

  it('should set Pokemon data correctly on updatePokemon', () => {
    currentState.byName['bulbasaur'].details = mockDetails;
    expect(originalPokemonReducer(initialState, updatePokemon(mockDetails))).toEqual(currentState);
  });
});
