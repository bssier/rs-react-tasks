import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../components/button/Button';

describe('Button Component', () => {
  it('renders with the correct text', () => {
    const text = 'Click Me';
    render(<Button buttonText={text} buttonHandleClickFunc={vi.fn()} />);

    expect(screen.getByRole('button', { name: text })).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button buttonText="Submit" buttonHandleClickFunc={handleClick} />);

    const button = screen.getByRole('button', { name: /submit/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
