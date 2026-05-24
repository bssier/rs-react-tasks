import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header/Header';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../components/ErrorBoudary/ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContext } from '../context.ts';

const renderHeader = (ui: React.ReactElement) => {
  return render(
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: vi.fn() }}>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeContext.Provider>
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

  test('works error boudary test', async () => {
    const user = userEvent.setup();

    renderHeader(
      <ErrorBoundary>
        <Header handleSearch={vi.fn()} searchQuery={''} />
      </ErrorBoundary>
    );

    const errButton = screen.getByRole('button', { name: 'Generate Error' });

    await user.click(errButton);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  test('localstorage load value test', () => {
    localStorage.setItem('input-value', 'pikachu');

    renderHeader(<Header handleSearch={vi.fn()} searchQuery={'pikachu'} />);

    const value = screen.getByDisplayValue('pikachu');

    expect(value).toBeInTheDocument();
  });
});
