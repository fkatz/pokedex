import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import originalPokemonReducer from './features/originalPokemon/originalPokemonSlice';
import userMadePokemonReducer from './features/userMadePokemon/userMadePokemonSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  originalPokemons: originalPokemonReducer,
  userMadePokemons: userMadePokemonReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // Persist store to local storage

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
    sagaMiddleware,
  ],
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
