import type { ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

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

export type InputProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
  error?: string;
  register?: UseFormRegisterReturn;
};

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  label: string;
  name: string;
  options: SelectOption[];
  required?: boolean;
  defaultValue?: string;
  error?: string;
  register?: UseFormRegisterReturn;
};

export type AutocompleteProps = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

export type FileInputProps = {
  label: string;
  name: string;
  accept?: string;
  required?: boolean;
  error?: string;
  register?: UseFormRegisterReturn;
};

export type UncontrolledFormProps = {
  onSuccess: () => void;
};
