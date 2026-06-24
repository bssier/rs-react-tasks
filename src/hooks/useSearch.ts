import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useSnackBar } from './useSnackBar';
import { useLocalStorage } from './useLocalStorage';
import type { HeaderTypes } from '@/types/headerTypes';
import { MIN_LENGTH } from '../pages/home-page/homePageConstaints';

export const useSearch = (): HeaderTypes => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { message: snackBarMessage, showMessage: showSnackBar } = useSnackBar();
  const [, setThrowError] = useState<(() => void) | null>(null);

  const [inputValue, setInputValue] = useLocalStorage(
    'input-value',
    searchParams.get('query') ?? '',
  );

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
      setSearchParams({ query: valueWithoutSpace });
    } else {
      showSnackBar('your query must be longer than three characters!');
    }
  };

  const handleToPokemonListClick = (): void => {
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
    generateError: (): void => {
      setThrowError(() => {
        throw new Error('Special error');
      });
    },
  };
};
