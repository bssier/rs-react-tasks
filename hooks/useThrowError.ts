'use client';

import { useState } from 'react';

export const useThrowError = (): ((error: unknown) => void) => {
  const [, setError] = useState<null>(null);

  return (error: unknown) => {
    setError(() => {
      throw error;
    });
  };
};
