import { useState, useEffect } from 'react';

export function useLocalStorage(
  key: string,
  initialValue: string,
): [string, (value: string | ((prevValue: string) => string)) => void] {
  const [storedValue, setStoredValue] = useState<string>((): string => {
    try {
      const item = localStorage.getItem(key);
      return item ?? initialValue;
    } catch (error) {
      console.error(`can't read ls key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect((): void => {
    try {
      localStorage.setItem(key, storedValue);
    } catch (error) {
      console.error(`error with setting ls key "${key}":`, error);
    }
  }, [key, storedValue]);

  const setValue = (value: string | ((prevValue: string) => string)): void => {
    setStoredValue(value);
  };

  return [storedValue, setValue];
}
