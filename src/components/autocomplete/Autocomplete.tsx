import { type JSX, type ChangeEvent, useState, useId, useRef } from 'react';
import { useSelector } from 'react-redux';

import styles from './Autocomplete.module.css';
import { SuggestionsList } from './SuggestionsList';
import { useClickOutside } from '../../hooks/useClickOutside';

import type { RootState } from '../../store/store.ts';
import type { AutocompleteProps } from '@/types.ts';

const filterCountries = (countries: string[], value: string): string[] => {
  if (!value.trim()) {
    return [];
  }
  return countries.filter((c) => c.toLowerCase().includes(value.toLowerCase()));
};

export const Autocomplete = (props: AutocompleteProps): JSX.Element => {
  const {
    label,
    name,
    required,
    error,
    value: extensionValue,
    onChange,
    onBlur,
  } = props;
  const id = useId();
  const countries = useSelector(
    (state: RootState) => state.profilesData.countries,
  );
  const [intValue, setIntValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(undefined);

  useClickOutside(wrapperRef, (): void => {
    setIsOpen(false);
    if (onBlur) {
      onBlur();
    }
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    if (onChange) {
      onChange(value);
    } else {
      setIntValue(value);
    }
    setSuggestions(filterCountries(countries, value));
    setIsOpen(true);
  };

  const handleSelect = (value: string): void => {
    if (onChange) {
      onChange(value);
    } else {
      setIntValue(value);
    }
    setIsOpen(false);
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div
      ref={(element): void => {
        if (element) {
          wrapperRef.current = element;
        }
      }}
      className={styles['autocomplete-wrapper']}
    >
      <label htmlFor={id} className={styles.label}>
        {label} {required ? <span className={styles.required}>*</span> : <></>}
      </label>
      <input
        id={id}
        type="text"
        value={extensionValue ?? intValue}
        onBlur={onBlur}
        onChange={handleChange}
        className={`${styles.input} ${error ? styles['input-error'] : ''}`}
        autoComplete="off"
      />
      <input type="hidden" name={name} value={extensionValue ?? intValue} />
      <SuggestionsList
        isOpen={isOpen}
        items={suggestions}
        onSelect={handleSelect}
      />
      {error ? <span className={styles['error-text']}>{error}</span> : <></>}
    </div>
  );
};
