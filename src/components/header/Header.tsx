import styles from './Header.module.css';
import { Button } from '../../components/button/Button';

import type { HeaderProps } from '@/types.ts';
import type { JSX } from 'react';

export const Header = ({ onOpenModal }: HeaderProps): JSX.Element => {
  return (
    <header className={styles.header}>
      <Button buttonText={'add profile'} buttonHandleClickFunc={onOpenModal} />
    </header>
  );
};
