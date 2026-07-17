'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useSnackBar } from './useSnackBar';
import { useLocalStorage } from './useLocalStorage';
import type { HeaderTypes } from '../src/types/headerTypes';
import { MIN_LENGTH } from '../src/constants/homePageConstains';

export const useSearch = (): HeaderTypes => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { message: snackBarMessage, showMessage: showSnackBar } = useSnackBar();

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

      const params = new URLSearchParams(searchParams.toString());
      params.set('query', valueWithoutSpace);

      router.push(`${pathname}?${params.toString()}`);
    } else {
      showSnackBar('your query must be longer than three characters!');
    }
  };

  const handleToPokemonListClick = (): void => {
    setInputValue('');

    const params = new URLSearchParams(searchParams.toString());
    params.delete('query');

    router.push(`${pathname}?${params.toString()}`);
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
  };
};
