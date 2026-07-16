import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
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
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should not render when no items are selected', () => {
    const store = createTestStore({
      pokemons: { selectedItems: [] },
    });

    const { container } = render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
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
      </Provider>,
    );

    expect(screen.getByText(/1 item selected/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /unselect all/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download csv/i }),
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
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /unselect all/i }));

    expect(container.firstChild).toBeNull();
  });

  test('should generate CSV and trigger download', () => {
    const mockItem = {
      title: 'pikachu',
      hp: 35,
      attack: 55,
      defense: 40,
      speed: 90,
      img: '',
    };

    const store = createTestStore({
      pokemons: { selectedItems: [mockItem] },
    });

    const clickMock = vi.fn();

    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:url'),
      revokeObjectURL: vi.fn(),
    } as unknown as typeof URL);

    const createElement = document.createElement.bind(document);

    vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      const el = createElement(tag);

      if (tag === 'a') {
        el.click = clickMock;
      }

      return el;
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /download csv/i }));

    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
  });
});
