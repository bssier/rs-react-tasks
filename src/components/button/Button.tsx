import styles from './Button.module.css';

import type { ButtonComponentProps } from '@/types.ts';
import type { JSX } from 'react';

export const Button = ({
  buttonText,
  buttonHandleClickFunc,
}: ButtonComponentProps): JSX.Element => {
  return (
    <button onClick={buttonHandleClickFunc} className={styles['custom-button']}>
      {buttonText}
    </button>
  );
};
