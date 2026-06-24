import { useState } from 'react';
import type { SnackBar } from '@/types/headerTypes';
const TIMEOUT_DELAY = 2000;

export const useSnackBar = (timeoutInterval = TIMEOUT_DELAY): SnackBar => {
  const [message, setMessage] = useState('');

  const showMessage = (msg: string): void => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, timeoutInterval);
  };

  return { message, showMessage };
};
