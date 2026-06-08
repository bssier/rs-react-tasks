import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import { Autocomplete } from '../components/autocomplete/Autocomplete';
import { profileReducer } from '../store/profileSlice';

const createMockStore = (countries: string[]) =>
  configureStore({
    reducer: { profilesData: profileReducer },
    preloadedState: {
      profilesData: {
        countries,
        profiles: [],
      },
    },
  });

describe('Autocomplete Component', () => {
  const defaultProps = {
    label: 'Country',
    name: 'country',
    required: true,
  };

  it('renders correctly with label and input', () => {
    const store = createMockStore(['Russia', 'USA']);
    render(
      <Provider store={store}>
        <Autocomplete {...defaultProps} />
      </Provider>,
    );
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
  });

  it('calls onChange when a suggestion is selected', async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    const store = createMockStore(['Germany']);
    render(
      <Provider store={store}>
        <Autocomplete {...defaultProps} onChange={onChangeMock} />
      </Provider>,
    );

    await user.type(screen.getByRole('textbox'), 'Ger');
    const suggestion = await screen.findByText('Germany');
    await user.click(suggestion);

    expect(onChangeMock).toHaveBeenCalledWith('Germany');
  });

  it('displays error message when error prop is passed', () => {
    const store = createMockStore([]);
    render(
      <Provider store={store}>
        <Autocomplete {...defaultProps} error="Invalid country" />
      </Provider>,
    );

    expect(screen.getByText('Invalid country')).toBeInTheDocument();
  });
});
