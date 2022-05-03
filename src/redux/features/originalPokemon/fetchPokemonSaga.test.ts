import sagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';
import { handleFetchPokemons, requestFetchPokemons } from './fetchPokemonSaga';
import { setErrorFetch, setLoadingFetch, updatePokemons } from './originalPokemonSlice';

const mockResponse = { data: { results: [{ name: 'bulbasaur' }] } };

describe('handleFetchPokemons success', () => {
  const it = sagaHelper(handleFetchPokemons());

  it('should set loading to true', (putLoading) => {
    expect(putLoading).toStrictEqual(put(setLoadingFetch(true)));
  });

  it('should reset error state', (putError) => {
    expect(putError).toStrictEqual(put(setErrorFetch(null)));
  });

  it('should call the API', (apiCall) => {
    expect(apiCall).toEqual(call(requestFetchPokemons));
    return mockResponse;
  });

  it('should set data', (putData) => {
    expect(putData).toStrictEqual(put(updatePokemons(mockResponse.data.results)));
  });

  it('should set loading to false', (putLoading) => {
    expect(putLoading).toStrictEqual(put(setLoadingFetch(false)));
  });
});

describe('handleFetchPokemons error', () => {
  const it = sagaHelper<any>(handleFetchPokemons());

  it('should set loading to true', (putLoading) => {
    expect(putLoading).toStrictEqual(put(setLoadingFetch(true)));
  });

  it('should reset error state', (putError) => {
    expect(putError).toStrictEqual(put(setErrorFetch(null)));
  });

  it('should call the API', (apiCall) => {
    expect(apiCall).toEqual(call(requestFetchPokemons));
    return new Error();
  });

  it('should set error', (putData) => {
    expect(putData).toStrictEqual(put(setErrorFetch('ServerError')));
  });

  it('should set loading to false', (putLoading) => {
    expect(putLoading).toStrictEqual(put(setLoadingFetch(false)));
  });
});
