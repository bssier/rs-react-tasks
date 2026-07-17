'use client';

import { useState } from 'react';

export function useLocalStorage(
  key: string,
  initialValue: string,
): [string, (value: string | ((prevValue: string) => string)) => void] {
  const [storedValue, setStoredValue] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: string | ((prevValue: string) => string)): void => {
    const valueToStore =
      typeof value === 'function' ? value(storedValue) : value;

    setStoredValue(valueToStore);

    try {
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(`error with setting ls key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
