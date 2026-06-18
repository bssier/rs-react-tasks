import { render, screen } from '@testing-library/react';
import { Header } from '../components/header/Header';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContext } from '../context.ts';

const renderHeader = (ui: React.ReactElement) => {
  return render(
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: vi.fn() }}>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeContext.Provider>,
  );
};

describe('header tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('render search input', () => {
    renderHeader(<Header />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('save item in local storage', async () => {
    const user = userEvent.setup();
    renderHeader(<Header />);

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
        <Header />
      </ErrorBoundary>,
    );

    const errButton = screen.getByRole('button', { name: 'Generate Error' });

    await user.click(errButton);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  test('localstorage load value test', () => {
    localStorage.setItem('input-value', 'pikachu');

    renderHeader(<Header />);

    const value = screen.getByDisplayValue('pikachu');

    expect(value).toBeInTheDocument();
  });
});
