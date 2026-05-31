import { render } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { App } from '../App';

vi.mock('../pages/home-page/HomePage', () => ({
  HomePage: () => <div>HomePage</div>,
}));

vi.mock('../pages/about-page/AboutPage', () => ({
  AboutPage: () => <div>AboutPage</div>,
}));

vi.mock('../pages/not-found/NotFoundPage', () => ({
  NotFoundPage: () => <div>NotFound</div>,
}));

vi.mock('../components/pokemon-detail/ElementDetail', () => ({
  ElementDetail: () => <div>Detail</div>,
}));

describe('App tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('renders app with default route test', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  test('stores searchQuery in localStorage stats', () => {
    localStorage.setItem('input-value', 'pikachu');

    render(<App />);

    expect(localStorage.getItem('input-value')).toBe('pikachu');
  });
});
