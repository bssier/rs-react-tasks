import type { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { HomePage } from '../pages/home-page/HomePage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../store/itemSlice.ts';
import { pokemonApi } from '../redux/pokemonApi.ts';
import { MemoryRouter } from 'react-router';
import { ThemeContext } from '../context.ts';

const renderWithProviders = (
  ui: ReactElement,
  { initialEntries = ['/'] } = {},
) => {
  const testStore = configureStore({
    reducer: {
      pokemons: pokemonReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });

  return render(
    <ThemeContext.Provider
      value={{
        theme: 'light',
        toggleTheme: vi.fn(),
      }}
    >
      <Provider store={testStore}>
        <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
      </Provider>
    </ThemeContext.Provider>,
  );
};

describe('home page test', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('not found test', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            detail: 'Not Found',
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      ),
    );

    renderWithProviders(<HomePage />, {
      initialEntries: ['/?query=notpokemon'],
    });

    const errSpan = await screen.findByText(
      /Pokemon not found\. Please write another name/i,
    );

    expect(errSpan).toBeInTheDocument();
  });

  test('test loading state', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {})),
    );

    renderWithProviders(<HomePage />, { initialEntries: ['/?query=pikachu'] });

    const loading = screen.getByText(/loading.../i);

    expect(loading).toBeInTheDocument();
  });

  test('server error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            error: 'Internal Server Error',
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      ),
    );

    renderWithProviders(<HomePage />, { initialEntries: ['/?query=pikachu'] });

    const errServer = await screen.findByText(/Server error/i);

    expect(errServer).toBeInTheDocument();
  });

  test('renders pokemon list successfully', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({
              results: [
                { name: 'pikachu', url: 'url' },
                { name: 'bulbasaur', url: 'url' },
              ],
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          ),
        )
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({
              name: 'pikachu',
              sprites: { front_default: '' },
              stats: [{ base_stat: 10, stat: { name: 'hp' } }],
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          ),
        )
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({
              name: 'bulbasaur',
              sprites: { front_default: '' },
              stats: [{ base_stat: 10, stat: { name: 'hp' } }],
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          ),
        ),
    );

    renderWithProviders(<HomePage />, { initialEntries: ['/'] });

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
  });

  test('search mode renders single pokemon', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            name: 'pikachu',
            sprites: { front_default: '' },
            stats: [{ base_stat: 10, stat: { name: 'hp' } }],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        ),
      ),
    );

    renderWithProviders(<HomePage />, { initialEntries: ['/?query=pikachu'] });

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
  });

  test('refresh button', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ results: [] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    renderWithProviders(<HomePage />, { initialEntries: ['/'] });

    const btn = screen.getByRole('button', { name: /refresh data/i });

    expect(btn).toBeInTheDocument();
  });

  test('home page renders list', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({
              results: [{ name: 'pikachu', url: 'url' }],
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          ),
        )
        .mockResolvedValue(
          new Response(
            JSON.stringify({
              name: 'pikachu',
              sprites: { front_default: '' },
              stats: [{ base_stat: 10, stat: { name: 'hp' } }],
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          ),
        ),
    );

    renderWithProviders(<HomePage />, { initialEntries: ['/'] });
    const item = await screen.findByText(/pikachu/i);
    expect(item).toBeInTheDocument();
  });
});
