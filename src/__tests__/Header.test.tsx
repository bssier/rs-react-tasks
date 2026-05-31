import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/header/Header';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../components/error-boundary/ErrorBoundary.tsx';
import { MemoryRouter } from 'react-router-dom';
import { ThemeContext } from '../context.ts';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';

const renderHeader = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: vi.fn() }}>
        <MemoryRouter>{ui}</MemoryRouter>
      </ThemeContext.Provider>
    </Provider>
  );
};

describe('header tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('render search input', () => {
    renderHeader(<Header handleSearch={vi.fn()} searchQuery={''} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('save item in local storage', async () => {
    const user = userEvent.setup();
    renderHeader(<Header handleSearch={vi.fn()} searchQuery={''} />);

    const input = screen.getByPlaceholderText(/Search pokemons/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'pikachu');
    await user.click(button);

    expect(localStorage.getItem('input-value')).toBe('pikachu');
  });

  test('calls handleSearch on submit', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();

    renderHeader(<Header handleSearch={handleSearch} searchQuery={''} />);

    const input = screen.getByPlaceholderText(/Search pokemons/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'pikachu');
    await user.click(button);

    expect(handleSearch).toHaveBeenCalledWith('pikachu');
  });

  test('does not call handleSearch on empty input', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();

    renderHeader(<Header handleSearch={handleSearch} searchQuery={''} />);

    const button = screen.getByRole('button', { name: /search/i });

    await user.click(button);

    expect(handleSearch).not.toHaveBeenCalled();
  });

  test('localstorage load value test', () => {
    localStorage.setItem('input-value', 'pikachu');
    renderHeader(<Header handleSearch={vi.fn()} searchQuery={''} />);

    const value = screen.getByDisplayValue('pikachu');
    expect(value).toBeInTheDocument();
  });

  test('works error boundary test', async () => {
    const user = userEvent.setup();

    const ProblemComponent = () => {
      throw new Error('Test Crash');
    };

    const TestApp = () => {
      const [shouldCrash, setShouldCrash] = React.useState(false);
      if (shouldCrash) return <ProblemComponent />;
      return (
        <button onClick={() => setShouldCrash(true)}>Generate Error</button>
      );
    };

    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <TestApp />
        </ErrorBoundary>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: 'Generate Error' }));

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();

    spy.mockRestore();
  });

  test('localstorage load value test', () => {
    localStorage.setItem('input-value', 'pikachu');
    renderHeader(<Header handleSearch={vi.fn()} searchQuery={''} />);

    const value = screen.getByDisplayValue('pikachu');
    expect(value).toBeInTheDocument();
  });
});
