import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../store/itemSlice.ts';
import { Flyout } from '../components/flyout/Flyout';
import type { ItemState } from '../store/itemSlice.ts';

const createTestStore = (preloadedState?: { pokemons: ItemState }) => {
  return configureStore({
    reducer: {
      pokemons: pokemonReducer,
    },
    preloadedState,
  });
};

describe('flyout component tests', () => {
  test('should not render when no items are selected', () => {
    const store = createTestStore({
      pokemons: { selectedItems: [] },
    });

    const { container } = render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  test('should render info and actions when items are selected', () => {
    const mockItem = {
      title: 'charmander',
      hp: 39,
      attack: 52,
      defense: 43,
      speed: 65,
      img: '',
    };
    const store = createTestStore({
      pokemons: { selectedItems: [mockItem] },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText(/1 item selected/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download csv/i })
    ).toBeInTheDocument();
  });

  test('should clear selection when Unselect all is clicked', () => {
    const mockItem = {
      title: 'squirtle',
      hp: 44,
      attack: 48,
      defense: 65,
      speed: 43,
      img: '',
    };
    const store = createTestStore({
      pokemons: { selectedItems: [mockItem] },
    });

    const { container } = render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const unselectButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    fireEvent.click(unselectButton);
    expect(container.firstChild).toBeNull();
  });
});
