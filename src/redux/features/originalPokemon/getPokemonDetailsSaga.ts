import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { put, call, takeEvery, fork } from 'redux-saga/effects';
import { PokemonDetails } from '../../../types/PokemonDetails';
import { PokemonDetailsResponse } from '../../../types/PokemonDetailsResponse';
import { pokemonDetailsResponseToPokemonDetails } from '../../../utils';
import {
  fetchPokemons,
  getPokemonDetails,
  setErrorPokemon,
  setLoadingPokemon,
  updatePokemon,
} from './originalPokemonSlice';

export function requestGetPokemonSpecies(name: string) {
  return axios.request({
    method: 'get',
    url: `https://pokeapi.co/api/v2/pokemon-species/${name}`,
  });
}

export function requestGetPokemonDetails(name: string) {
  return axios.request({
    method: 'get',
    url: `https://pokeapi.co/api/v2/pokemon/${name}`,
  });
}

const pendingTasks: { [key: string]: Task } = {};

export function* getPokemonDetailsByName(name: string): any {
  yield put(setLoadingPokemon({ name, loading: true }));
  yield put(setErrorPokemon({ name, error: null }));
  try {
    const speciesResponse: AxiosResponse<PokemonDetailsResponse> = yield call(
      requestGetPokemonSpecies,
      name,
    );
    const detailsResponse: AxiosResponse<PokemonDetailsResponse> = yield call(
      requestGetPokemonDetails,
      speciesResponse.data.varieties[0].pokemon.name,
    );
    // Adapt DTO to UI object
    const details: PokemonDetails = pokemonDetailsResponseToPokemonDetails({
      ...detailsResponse.data,
      ...speciesResponse.data,
    });
    yield put(updatePokemon(details));
  } catch (error) {
    yield put(setErrorPokemon({ name, error: 'ServerError' }));
  }
  yield put(setLoadingPokemon({ name, loading: false }));
  delete pendingTasks[name];
}

export function* handleGetLeadingPokemonDetailsByName({ payload: name }: PayloadAction<string>) {
  if (!(name in pendingTasks)) {
    pendingTasks[name] = yield fork(getPokemonDetailsByName, name);
  }
}

export function* watchGetPokemonDetails() {
  yield takeEvery(getPokemonDetails.type, handleGetLeadingPokemonDetailsByName);
}
