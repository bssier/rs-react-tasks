import { render, screen } from '@testing-library/react';
import { Header } from '../сomponents/header/Header';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

vi.mock('../hooks/useSearch', () => ({
  useSearch: () => ({
    snackBarMessage: null,
    handleToPokemonListClick: vi.fn(),
  }),
}));

vi.mock('../hooks/useThrowError', () => ({
  useThrowError: () => vi.fn(),
}));

vi.mock('../сomponents/search-bar/SearchBar', () => ({
  SearchBar: () => (
    <div>
      <input placeholder="Search pokemons..." />
      <button>Search</button>
    </div>
  ),
}));

const renderHeader = () => {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
};

describe('header tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('render Header elements', () => {
    renderHeader();
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByText(/Pokemon list/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search pokemons/i)).toBeInTheDocument();
  });

  test('toggle theme button renders', () => {
    renderHeader();
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggleButton).toBeInTheDocument();
  });

  test('generate error button calls useThrowError', async () => {
    const user = userEvent.setup();
    renderHeader();
    const errorBtn = screen.getByRole('button', { name: /Generate Error/i });
    await user.click(errorBtn);
    expect(errorBtn).toBeInTheDocument();
  });
});
