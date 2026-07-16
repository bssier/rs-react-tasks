import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Footer } from '../components/footer/Footer';

describe('Footer component', () => {
  test('renders all links test', () => {
    render(<Footer />);

    expect(screen.getByText(/Developer GitHub/i)).toBeInTheDocument();
    expect(screen.getByText(/Project GitHub/i)).toBeInTheDocument();
    expect(screen.getByText(/RS School courses/i)).toBeInTheDocument();
    expect(screen.getByText(/Developer LinkedIn/i)).toBeInTheDocument();
  });

  test('links have correct href attributes test', () => {
    render(<Footer />);

    expect(screen.getByText(/Developer GitHub/i)).toHaveAttribute(
      'href',
      'https://github.com/bssier',
    );

    expect(screen.getByText(/Project GitHub/i)).toHaveAttribute(
      'href',
      'https://github.com/rolling-scopes-school/bssier-REACT2026Q2/tree/class-components',
    );

    expect(screen.getByText(/RS School courses/i)).toHaveAttribute(
      'href',
      'https://rs.school/',
    );

    expect(screen.getByText(/Developer LinkedIn/i)).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/michael-tavyrin-9b84833bb/?skipRedirect=true',
    );
  });

  test('links open in new tab test', () => {
    render(<Footer />);

    const links = screen.getAllByRole('link');

    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });
  });
});
