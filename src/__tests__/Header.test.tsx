import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../components/header/Header';

describe('Header Component', () => {
  it('renders the "add profile" button', () => {
    render(<Header onOpenModal={vi.fn()} />);
    expect(
      screen.getByRole('button', { name: /add profile/i }),
    ).toBeInTheDocument();
  });

  it('calls onOpenModal when the button is clicked', async () => {
    const user = userEvent.setup();
    const handleOpenModal = vi.fn();

    render(<Header onOpenModal={handleOpenModal} />);

    const button = screen.getByRole('button', { name: /add profile/i });
    await user.click(button);
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });
});
