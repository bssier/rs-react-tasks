import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Input } from '../components/input/Input';

describe('Input Component', () => {
  const defaultProps = {
    label: 'Username',
    name: 'username',
  };

  it('renders with label and correct type', () => {
    render(<Input {...defaultProps} type="email" />);

    const input = screen.getByLabelText(/username/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
  });

  it('handles user typing', async () => {
    const user = userEvent.setup();
    render(<Input {...defaultProps} />);

    const input = screen.getByLabelText(/username/i) as HTMLInputElement;
    await user.type(input, 'IvanIvanov');

    expect(input.value).toBe('IvanIvanov');
  });

  it('displays error message and style when error is provided', () => {
    render(<Input {...defaultProps} error="Field is required" />);

    expect(screen.getByText(/field is required/i)).toBeInTheDocument();

    const input = screen.getByLabelText(/username/i);
    expect(input.className).toMatch(/input-error/);
  });
});
