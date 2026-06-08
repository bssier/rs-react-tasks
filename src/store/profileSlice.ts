import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Profile, ProfileState } from '@/types.ts';

const COUNTRIES_LIST: string[] = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Poland',
  'Japan',
  'China',
  'Brazil',
  'Australia',
  'Argentina',
  'Austria',
  'Armenia',
  'Azerbaijan',
  'Belgium',
  'Bulgaria',
  'Belarus',
  'Chile',
  'Colombia',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Egypt',
  'Estonia',
  'Finland',
  'Georgia',
  'Greece',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Ireland',
  'Israel',
  'Kazakhstan',
  'Kyrgyzstan',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malaysia',
  'Mexico',
  'Moldova',
  'Montenegro',
  'Morocco',
  'Netherlands',
  'New Zealand',
  'Norway',
  'Peru',
  'Philippines',
  'Portugal',
  'Romania',
  'Russia',
  'Saudi Arabia',
  'Serbia',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'South Africa',
  'South Korea',
  'Sweden',
  'Switzerland',
  'Tajikistan',
  'Thailand',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Ukraine',
  'United Arab Emirates',
  'Uzbekistan',
  'Vietnam',
];

const initialState: ProfileState = {
  profiles: [],
  countries: COUNTRIES_LIST,
};

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<Omit<Profile, 'id'>>): void => {
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
