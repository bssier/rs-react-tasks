import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { HomePage } from '../pages/home-page/HomePage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../store/itemSlice.ts';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContext } from '../context.ts';

const renderWithProviders = (ui: React.ReactElement) => {
    const testStore = configureStore({
        reducer: {
            pokemons: pokemonReducer,
        },
    });
    return render(
        <ThemeContext.Provider value={{ theme: 'light', toggleTheme: vi.fn() }}>
            <Provider store={testStore}>
                <BrowserRouter>{ui}</BrowserRouter>
            </Provider>
        </ThemeContext.Provider>
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
            vi.fn().mockResolvedValue({
                ok: false,
                status: 404,
            } as Response)
        );

        renderWithProviders(<HomePage />);

        const errSpan = await screen.findByText('Not found');
        expect(errSpan).toBeInTheDocument();
    });

    test('test loading state', () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() => new Promise(() => {}))
        );

        renderWithProviders(<HomePage />);

        const loading = screen.getByText(/loading/i);
        expect(loading).toBeInTheDocument();
    });

    test('server error', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: false,
                status: 500,
            } as Response)
        );

        renderWithProviders(<HomePage />);

        const errServer = await screen.findByText(
            /Server error. We try fix problem, please wait/i
        );
        expect(errServer).toBeInTheDocument();
    });

    test('render pokemon test', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({
                    name: 'pikachu',
                    sprites: {
                        front_default: '',
                    },
                    stats: [
                        { base_stat: 35 },
                        { base_stat: 55 },
                        { base_stat: 40 },
                        {},
                        {},
                        { base_stat: 90 },
                    ],
                }),
            } as Response)
        );

        renderWithProviders(<HomePage />);

        const pikachu = screen.findByText(/pikachu/i);
        expect(await pikachu).toBeInTheDocument();
    });

    test('not make request if query less three symbols test', () => {
        vi.stubGlobal('fetch', vi.fn());

        renderWithProviders(<HomePage />);

        expect(vi.fn()).not.toHaveBeenCalled();
    });
});