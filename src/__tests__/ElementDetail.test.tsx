import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import { ElementDetail } from '../сomponents/pokemon-detail/ElementDetail';

describe('ElementDetail', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const renderWithRouter = (route: string) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/pokemon/:name" element={<ElementDetail />} />
        </Routes>
      </MemoryRouter>,
    );
  };

  test('renders loading state test', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {})) as unknown as typeof fetch,
    );

    renderWithRouter('/pokemon/pikachu');

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('handles 404 error test', async () => {
    const mockResponse: Partial<Response> = {
      ok: false,
      status: 404,
      json: async () => ({}),
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(mockResponse) as unknown as typeof fetch,
    );

    renderWithRouter('/pokemon/not-exist');

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
