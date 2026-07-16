import reducer, { toggleItem, clearAll } from '../store/itemSlice';
import type { ItemState } from '../store/itemSlice';

describe('itemSlice tests', () => {
  const mockItem = {
    title: 'pikachu',
    hp: 35,
    attack: 55,
    defense: 40,
    speed: 90,
    img: '',
  };

  test('return initial state test', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      selectedItems: [],
    });
  });

  test('add item when not selected test', () => {
    const state = reducer(undefined, toggleItem(mockItem));

    expect(state.selectedItems).toHaveLength(1);
    expect(state.selectedItems[0].title).toBe('pikachu');
  });

  test('remove item when already selected test', () => {
    const startState: ItemState = {
      selectedItems: [mockItem],
    };

    const state = reducer(startState, toggleItem(mockItem));

    expect(state.selectedItems).toHaveLength(0);
  });

  test('clear all items test', () => {
    const startState: ItemState = {
      selectedItems: [mockItem],
    };

    const state = reducer(startState, clearAll());

    expect(state.selectedItems).toEqual([]);
  });
});
