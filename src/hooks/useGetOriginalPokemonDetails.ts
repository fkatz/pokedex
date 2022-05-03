import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetails } from '../redux/features/originalPokemon/originalPokemonSlice';
import { RootState } from '../redux/store';

export const useGetOriginalPokemonDetails = (name: string) => {
  const pokemonDetails = useSelector(
    (state: RootState) => state.originalPokemons.byName[name]?.details,
  );
  const loading = useSelector((state: RootState) => state.originalPokemons.loading.byName[name]);
  const error = useSelector((state: RootState) => state.originalPokemons.error.byName[name]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && !pokemonDetails && !error && name) {
      dispatch(getPokemonDetails(name));
    }
  }, [dispatch, loading, error, pokemonDetails, name]);

  return { pokemonDetails, loading, error };
};
