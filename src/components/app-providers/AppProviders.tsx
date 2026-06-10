import { StrictMode, type ReactNode } from 'react';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return <StrictMode>{children}</StrictMode>;
};
