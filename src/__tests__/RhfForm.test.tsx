/**
 * @vitest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { describe, it, expect, vi } from 'vitest';
import { RhfForm } from '../components/rhf-form/RhfForm';
import { profileReducer } from '../store/profileSlice';

const renderWithRedux = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: { profilesData: profileReducer },
    preloadedState: { profilesData: { countries: ['Russia'], profiles: [] } },
  });
  return { ...render(<Provider store={store}>{ui}</Provider>), store };
};

describe('RhfForm', () => {
  it('submits form with valid data', async () => {
    const onSuccess = vi.fn();
    const user = userEvent.setup();
    renderWithRedux(<RhfForm onSuccess={onSuccess} />);
    await user.type(screen.getByLabelText(/name/i), 'Ivan');
    await user.type(screen.getByLabelText(/age/i), '25');
    await user.type(screen.getByLabelText(/email/i), 'test@test.com');
    await user.selectOptions(screen.getByLabelText(/gender/i), 'male');
    const countryInput = screen.getByRole('textbox', { name: /country/i });
    await user.type(countryInput, 'Russia');
    await user.tab();
    const file = new File(['image'], 'avatar.png', { type: 'image/png' });
    await user.upload(screen.getByLabelText(/avatar/i), file);
    await user.click(screen.getByLabelText(/i agree/i));
    await user.click(screen.getByRole('button', { name: /submit profile/i }));
    await waitFor(
      () => {
        expect(onSuccess).toHaveBeenCalledTimes(1);
      },
      { timeout: 3000 },
    );
  });

  it('shows validation errors for empty fields', async () => {
    renderWithRedux(<RhfForm onSuccess={vi.fn()} />);

    const submitBtn = screen.getByRole('button', { name: /submit profile/i });
    await userEvent.click(submitBtn);

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
  });
});
