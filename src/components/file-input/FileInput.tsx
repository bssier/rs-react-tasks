import { type JSX, useId } from 'react';

import styles from './FileInput.module.css';

import type { FileInputProps } from '@/types.ts';

export const FileInput = (props: FileInputProps): JSX.Element => {
  const {
    label,
    name,
    accept = 'image/*',
    required = false,
    error,
    register,
  } = props;
  const id = useId();

  return (
    <div className={styles['file-wrapper']}>
      <label htmlFor={id} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>

      <input
        id={id}
        type="file"
        name={name}
        accept={accept}
        required={required}
        className={`${styles.input} ${error ? styles['input-error'] : ''}`}
        {...register}
      />

      {error && <span className={styles['error-text']}>{error}</span>}
    </div>
  );
};
