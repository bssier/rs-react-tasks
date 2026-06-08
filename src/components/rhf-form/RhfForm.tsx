import { type JSX } from 'react';
import {
  useForm,
  Controller,
  type SubmitHandler,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import styles from './RhfForm.module.css';
import { addProfile } from '../../store/profileSlice';
import { Autocomplete } from '../autocomplete/Autocomplete';
import { FileInput } from '../file-input/FileInput';
import { Input } from '../input/Input';
import { Select } from '../select/Select';

import type { RootState } from '../../store/store';

const MIN_AGE = 18;
const MAX_AGE = 100;
const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export type RhfFormProps = { onSuccess: () => void };

type FormValues = {
  name: string;
  age: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  avatar: FileList;
  agreement: boolean;
};

const validateName = (value: string): boolean | string =>
  value.trim().startsWith(value.trim().charAt(0).toUpperCase()) ||
  'Name must start with a capital letter';

const validateAge = (value: string): boolean | string =>
  (Number(value) >= MIN_AGE && Number(value) <= MAX_AGE) ||
  `Age must be between ${MIN_AGE} and ${MAX_AGE}`;

const validateAvatar = (value: FileList): boolean | string => {
  const file = value.item(0);
  if (!file) {
    return 'Avatar image is required';
  }
  return (
    ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
      file.type,
    ) || 'Allowed formats: JPEG, PNG, GIF, WEBP'
  );
};

type ActionFieldsProps = {
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
};

const ActionFields = ({ errors, register }: ActionFieldsProps): JSX.Element => (
  <>
    <div className={styles['checkbox-wrapper']}>
      <label className={styles['checkbox-label']}>
        <input
          type="checkbox"
          className={styles.checkbox}
          {...register('agreement', { required: 'You must accept the terms' })}
        />
        <span>I agree to the terms and conditions *</span>
      </label>
      {errors.agreement?.message && (
        <span className={styles['error-text']}>{errors.agreement.message}</span>
      )}
    </div>
    <button type="submit" className={styles['submit-button']}>
      Submit Profile (RHF)
    </button>
  </>
);

export const RhfForm = ({ onSuccess }: RhfFormProps): JSX.Element => {
  const dispatch = useDispatch();
  const countries = useSelector(
    (state: RootState) => state.profilesData.countries,
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      age: '',
      email: '',
      country: '',
      agreement: false,
    },
  });

  const createSubmitHandler: SubmitHandler<FormValues> = (data): void => {
    const file = data.avatar.item(0);
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = (): void => {
      if (typeof reader.result !== 'string') {
        return;
      }
      dispatch(
        addProfile({
          name: data.name.trim(),
          age: Number(data.age),
          email: data.email.trim(),
          gender: data.gender,
          country: data.country.trim(),
          avatarUrl: reader.result,
        }),
      );
      reset();
      onSuccess();
    };
    reader.readAsDataURL(file);
  };

  return (
    <form
      onSubmit={handleSubmit(createSubmitHandler)}
      className={styles.form}
      noValidate
    >
      <Input
        label="Name"
        name="name"
        required
        error={errors.name?.message}
        register={register('name', {
          required: 'Name is required',
          validate: validateName,
        })}
      />
      <Input
        label="Age"
        name="age"
        type="number"
        required
        error={errors.age?.message}
        register={register('age', {
          required: 'Age is required',
          validate: validateAge,
        })}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        required
        error={errors.email?.message}
        register={register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
          },
        })}
      />
      <Select
        label="Gender"
        name="gender"
        options={GENDER_OPTIONS}
        required
        error={errors.gender?.message}
        register={register('gender', { required: 'Gender is required' })}
      />
      <Controller
        control={control}
        name="country"
        rules={{
          required: 'Country is required',
          validate: (value: string): boolean | string =>
            countries.includes(value.trim()) || 'Please select a valid country',
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <Autocomplete
            label="Country"
            name="country"
            required
            error={errors.country?.message}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <FileInput
        label="Avatar"
        name="avatar"
        required
        error={errors.avatar?.message}
        register={register('avatar', {
          required: 'Avatar image is required',
          validate: validateAvatar,
        })}
      />
      <ActionFields errors={errors} register={register} />
    </form>
  );
};
