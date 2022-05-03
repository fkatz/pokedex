import axios, { AxiosResponse } from 'axios';
import { put, call, takeLeading } from 'redux-saga/effects';
import { PokemonsResponse } from '../../../types/PokemonsResponse';
import {
  fetchPokemons,
  setErrorFetch,
  setLoadingFetch,
  updatePokemons,
} from './originalPokemonSlice';

export function requestFetchPokemons() {
  return axios.request({
    method: 'get',
    url: 'https://pokeapi.co/api/v2/pokemon-species?limit=10000&offset=0',
  });
}

export function* handleFetchPokemons(): any {
  yield put(setLoadingFetch(true));
  yield put(setErrorFetch(null));
  try {
    const response: AxiosResponse<PokemonsResponse> = yield call(requestFetchPokemons);
    const { data } = response;
    yield put(updatePokemons(data.results));
  } catch (error) {
    yield put(setErrorFetch('ServerError'));
  }
  yield put(setLoadingFetch(false));
}

export function* watchFetchPokemons() {
  yield takeLeading(fetchPokemons.type, handleFetchPokemons);
}
