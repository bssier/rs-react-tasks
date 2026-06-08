import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { FileInput } from '../components/file-input/FileInput';

describe('FileInput Component', () => {
  const defaultProps = {
    label: 'Upload Avatar',
    name: 'avatar',
  };

  it('renders correctly with label', () => {
    render(<FileInput {...defaultProps} />);
    expect(screen.getByLabelText(/upload avatar/i)).toBeInTheDocument();
  });

  it('handles file selection', async () => {
    const user = userEvent.setup();
    render(<FileInput {...defaultProps} />);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = screen.getByLabelText(/upload avatar/i) as HTMLInputElement;

    await user.upload(input, file);

    expect(input.files![0]).toBe(file);
    expect(input.files!.item(0)).toBe(file);
    expect(input.files).toHaveLength(1);
  });

  it('shows error message when provided', () => {
    render(<FileInput {...defaultProps} error="File size is too big" />);
    expect(screen.getByText(/file size is too big/i)).toBeInTheDocument();
    const input = screen.getByLabelText(/upload avatar/i);
    expect(input.className).toMatch(/input-error/);
  });
});
