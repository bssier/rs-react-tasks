import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './itemSlice';
import { pokemonApi } from '../redux/pokemonApi';

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
