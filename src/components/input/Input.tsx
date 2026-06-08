import { type JSX, useId } from 'react';

import styles from './Input.module.css';

import type { InputProps } from '@/types.ts';

export const Input = (props: InputProps): JSX.Element => {
  const {
    label,
    name,
    type = 'text',
    required = false,
    defaultValue,
    error,
    register,
  } = props;

  const id = useId();

  return (
    <div className={styles['input-wrapper']}>
      <label htmlFor={id} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className={`${styles.input} ${error ? styles['input-error'] : ''}`}
        {...register}
      />
      {error && <span className={styles['error-text']}>{error}</span>}
    </div>
  );
};
