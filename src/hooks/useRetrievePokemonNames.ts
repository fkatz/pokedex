import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '../redux/features/originalPokemon/originalPokemonSlice';
import { RootState } from '../redux/store';

export const useRetrievePokemonNames = () => {
  const originalPokemonNames = useSelector((state: RootState) => state.originalPokemons.allNames);
  const userMadePokemonNames = useSelector((state: RootState) => state.userMadePokemons.allNames);
  const loading = useSelector((state: RootState) => state.originalPokemons.loading.fetch);
  const error = useSelector((state: RootState) => state.originalPokemons.error.fetch);
  const dispatch = useDispatch();

  useEffect(() => {
    if (originalPokemonNames.length === 0 && !loading && !error) dispatch(fetchPokemons());
  }, [dispatch, loading, error, originalPokemonNames.length]);

  const forceRefresh = useCallback(() => dispatch(fetchPokemons()), [dispatch]);

  return { originalPokemonNames, loading, error, userMadePokemonNames, forceRefresh };
};
