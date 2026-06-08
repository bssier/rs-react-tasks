import { type JSX, useId } from 'react';

import styles from './Select.module.css';

import type { SelectProps } from '@/types.ts';

export const Select = ({
  label,
  name,
  options,
  required = false,
  defaultValue = '',
  error,
  register,
}: SelectProps): JSX.Element => {
  const id = useId();

  return (
    <div className={styles['select-wrapper']}>
      <label htmlFor={id} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>

      <select
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className={`${styles.select} ${error ? styles['select-error'] : ''}`}
        {...register}
      >
        <option value="" disabled>
          Select gender...
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className={styles['error-text']}>{error}</span>}
    </div>
  );
};
