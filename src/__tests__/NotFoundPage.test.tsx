import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, test, expect } from 'vitest';
import { NotFoundPage } from '../pages/not-found/NotFoundPage';

describe('NotFoundPage', () => {
  const renderPage = () =>
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

  test('render 404 header test', () => {
    renderPage();

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  test('render page not found text test', () => {
    renderPage();

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });

  test('renders link back to home test', () => {
    renderPage();

    const link = screen.getByRole('link', { name: /main page/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
