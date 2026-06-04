import type { ReactNode } from 'react';

export type ButtonComponentProps = {
  buttonText: string;
  buttonHandleClickFunc: () => void;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export type HeaderProps = {
  onOpenModal: () => void;
};

export type FormType = 'uncontrolled' | 'rhf' | undefined;

export type Profile = {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  avatarUrl: string;
};

export type ProfileState = {
  profiles: Profile[];
  countries: string[];
};
