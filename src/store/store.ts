import { configureStore } from '@reduxjs/toolkit';

import { profileReducer } from './profileSlice';

export const store = configureStore({
  reducer: {
    profilesData: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
