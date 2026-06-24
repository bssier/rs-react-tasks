import { render, screen } from '@testing-library/react';
import { Header } from '../components/header/Header';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary';

describe('header tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('render search input', () => {
    render(<Header />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('save item in local storage', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const input = screen.getByPlaceholderText(/Search pokemons/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'pikachu');
    await user.click(button);

    expect(localStorage.getItem('input-value')).toBe('pikachu');
  });

  test('works error boudary test', async () => {
    const user = userEvent.setup();

    render(
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

    render(<Header />);

    const value = screen.getByDisplayValue('pikachu');

    expect(value).toBeInTheDocument();
  });
});
