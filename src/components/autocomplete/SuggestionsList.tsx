import { type JSX } from 'react';

import styles from './Autocomplete.module.css';

type Props = {
  isOpen: boolean;
  items: string[];
  onSelect: (value: string) => void;
};

export const SuggestionsList = ({
  isOpen,
  items,
  onSelect,
}: Props): JSX.Element => {
  if (!isOpen || items.length === 0) {
    return <></>;
  }

  return (
    <ul className={styles.suggestions}>
      {items.map((country: string) => (
        <li
          key={country}
          className={styles.item}
          onClick={(): void => {
            onSelect(country);
          }}
        >
          {country}
        </li>
      ))}
    </ul>
  );
};
