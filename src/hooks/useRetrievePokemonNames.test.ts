import { renderHook } from '@testing-library/react';
import { fetchPokemons } from '../redux/features/originalPokemon/originalPokemonSlice';
import { RootState } from '../redux/store';
import { useRetrievePokemonNames } from './useRetrievePokemonNames';

const initialState = {
  originalPokemons: {
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
  },
  userMadePokemons: {
    byName: {},
    allNames: [],
  },
};

// External hooks
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: (selector: (state: any) => any) => selector(initialState),
  useDispatch: () => mockDispatch,
}));

describe('Pokemon names initial fetching', () => {
  it('should dispatch fetch action when not loading, no errors and list is empty', () => {
    renderHook(() => useRetrievePokemonNames());
    expect(mockDispatch).toHaveBeenCalledWith(fetchPokemons());
  });
});
