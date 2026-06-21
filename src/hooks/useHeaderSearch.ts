import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useSnackBar } from './useSnackBar';
import type { HeaderTypes } from '@/types/headerTypes';
import { MIN_LENGTH } from '../pages/home-page/homePageConstaints';

export const useHeaderSearch = (): HeaderTypes => {
  const [error, setError] = useState<Error | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { message: snackBarMessage, showMessage: showSnackBar } = useSnackBar();

  const [inputValue, setInputValue] = useState(
    () => searchParams.get('query') ?? '',
  );

  if (error) {
    throw error;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (/^[a-zA-Z\s-]*$/.test(value)) {
      setInputValue(value);
    } else {
      showSnackBar('use only english letter!');
    }
  };

  const handleSearchClick = (): void => {
    const valueWithoutSpace = inputValue.trim();

    if (valueWithoutSpace === searchParams.get('query')) {
      return;
    }

    if (valueWithoutSpace.length >= MIN_LENGTH) {
      setInputValue(valueWithoutSpace);
      localStorage.setItem('input-value', valueWithoutSpace);
      setSearchParams({ query: valueWithoutSpace });
    } else {
      showSnackBar('your query must be longer than three characters!');
    }
  };

  const handleToPokemonListClick = (): void => {
    localStorage.removeItem('input-value');
    setInputValue('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  return {
    inputValue,
    snackBarMessage,
    handleInputChange,
    handleSearchClick,
    handleToPokemonListClick,
    handleEnterClick: (e: React.KeyboardEvent): void => {
      if (e.key === 'Enter') {
        handleSearchClick();
      }
    },
    generateError: (): void => setError(new Error('Special error')),
  };
};
