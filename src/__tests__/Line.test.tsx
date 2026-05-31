import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { Line } from '../components/line/Line';

const mockItem = {
  hp: 50,
  attack: 70,
  defense: 40,
  speed: 90,
  img: 'test.png',
  title: 'pikachu',
};

describe('Line component', () => {
  test('renders pokemon data', () => {
    render(
      <Line item={mockItem} isChecked={false} handleCheckboxChange={vi.fn()} />
    );

    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/Speed:/i)).toBeInTheDocument();
    expect(screen.getByText(/Defense:/i)).toBeInTheDocument();
    expect(screen.getByText(/Attack:/i)).toBeInTheDocument();
    expect(screen.getByText(/Hp:/i)).toBeInTheDocument();
  });

  test('calls handleCheckboxChange when checkbox changes', async () => {
    const user = userEvent.setup();
    const handleCheckboxChange = vi.fn();

    render(
      <Line
        item={mockItem}
        isChecked={false}
        handleCheckboxChange={handleCheckboxChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleCheckboxChange).toHaveBeenCalled();
  });

  test('make onClick when article clicked test', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Line
        item={mockItem}
        isChecked={false}
        handleCheckboxChange={vi.fn()}
        onClick={onClick}
      />
    );

    const article = screen.getByText(/Pikachu/i).closest('article')!;
    await user.click(article);

    expect(onClick).toHaveBeenCalled();
  });

  test('check event stop propagation working when clicked on checkbox test', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const handleCheckboxChange = vi.fn();

    render(
      <Line
        item={mockItem}
        isChecked={false}
        handleCheckboxChange={handleCheckboxChange}
        onClick={onClick}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleCheckboxChange).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  test('when title renders unknown pokemon test', () => {
    render(
      <Line
        item={{ ...mockItem, title: '' }}
        isChecked={false}
        handleCheckboxChange={vi.fn()}
      />
    );

    expect(screen.getByText(/Unknown Pokemon/i)).toBeInTheDocument();
  });
});
