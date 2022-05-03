import { all } from 'redux-saga/effects';
import { watchFetchPokemons } from './features/originalPokemon/fetchPokemonSaga';
import { watchGetPokemonDetails } from './features/originalPokemon/getPokemonDetailsSaga';

export default function* rootSaga() {
  yield all([watchFetchPokemons(), watchGetPokemonDetails()]);
}
