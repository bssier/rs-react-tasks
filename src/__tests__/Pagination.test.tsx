import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { Pagination } from '../components/pagination/Pagination';

describe('Pagination tests', () => {
  test('renders current page', () => {
    render(<Pagination page={2} onChangePage={vi.fn()} />);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('next button up page', async () => {
    const user = userEvent.setup();
    const onChangePage = vi.fn();

    render(<Pagination page={2} onChangePage={onChangePage} />);

    const next = screen.getByText('next');
    await user.click(next);

    expect(onChangePage).toHaveBeenCalledWith(3);
  });

  test('prev button down page', async () => {
    const user = userEvent.setup();
    const onChangePage = vi.fn();

    render(<Pagination page={3} onChangePage={onChangePage} />);

    const prev = screen.getByText('prev');
    await user.click(prev);

    expect(onChangePage).toHaveBeenCalledWith(2);
  });

  test('prev button do not nothing when 1', async () => {
    const user = userEvent.setup();
    const onChangePage = vi.fn();

    render(<Pagination page={1} onChangePage={onChangePage} />);

    const prev = screen.getByText('prev');
    await user.click(prev);

    expect(onChangePage).not.toHaveBeenCalled();
  });
});
