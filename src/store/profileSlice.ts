import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Profile, ProfileState } from '@/types.ts';

const initialState: ProfileState = {
  profiles: [],
  countries: [],
};

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<Omit<Profile, 'id'>>) => {
      const newProfile: Profile = {
        ...action.payload,
        id: crypto.randomUUID(),
      };
      state.profiles.push(newProfile);
    },
  },
});

export const { addProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
