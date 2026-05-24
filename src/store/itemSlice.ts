import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '../components/Line/Line';

export interface ItemState {
  selectedItems: Item[];
}

const initialState: ItemState = {
  selectedItems: [],
};

const itemSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Item>) => {
      const isSelected = state.selectedItems.some(
        (item) => item.title === action.payload.title
      );
      if (isSelected) {
        state.selectedItems = state.selectedItems.filter(
          (item) => item.title !== action.payload.title
        );
      } else {
        state.selectedItems.push(action.payload);
      }
    },
    clearAll: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { toggleItem, clearAll } = itemSlice.actions;
export default itemSlice.reducer;
