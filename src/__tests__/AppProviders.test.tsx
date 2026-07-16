import { render, screen, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { useContext } from 'react';
import { AppProviders } from '../components/app-providers/AppProviders';
import { ThemeContext } from '../context.ts';

describe('AppProviders tests', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    vi.restoreAllMocks();
  });

  const TestComponent = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)!;

    return (
      <div>
        <span data-testid="theme">{theme}</span>
        <button onClick={toggleTheme}>toggle</button>
      </div>
    );
  };

  test('use defaul light theme', () => {
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>,
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  test('load dark theme from ls test', () => {
    localStorage.setItem('theme', 'dark');

    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>,
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  test('toggle theme theme', () => {
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>,
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');

    act(() => {
      screen.getByText('toggle').click();
    });

    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });
});
