import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AboutPage } from '../pages/about-page/AboutPage';
import { ThemeContext } from '../context.ts';

const renderAbout = (theme: 'light' | 'dark') => {
  return render(
    <ThemeContext.Provider value={{ theme, toggleTheme: vi.fn() }}>
      <AboutPage />
    </ThemeContext.Provider>,
  );
};

describe('AboutPage', () => {
  test('renders text content test', () => {
    renderAbout('light');

    expect(
      screen.getByText(/this is an app for searching pokemons/i),
    ).toBeInTheDocument();
  });

  test('renders github link test', () => {
    renderAbout('light');

    const link = screen.getByText(/GitHub Profile/i);

    expect(link).toHaveAttribute('href', 'https://github.com/bssier');
  });

  test('renders RS course link test', () => {
    renderAbout('light');

    const link = screen.getByText(/RS React course/i);

    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });

  test('applies dark mode when theme is dark theme test', () => {
    const { container } = renderAbout('dark');

    expect(container.firstChild).toHaveClass('dark-mode');
  });

  test('not apply dark when theme is light test', () => {
    const { container } = renderAbout('light');

    expect(container.firstChild).not.toHaveClass('dark-mode');
  });
});
