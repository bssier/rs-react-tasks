import { type JSX, type SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './UncontrolledForm.module.css';
import { addProfile } from '../../store/profileSlice';
import { Autocomplete } from '../autocomplete/Autocomplete';
import { FileInput } from '../file-input/FileInput';
import { Input } from '../input/Input';
import { Select } from '../select/Select';

const MIN_AGE = 18;
const MAX_AGE = 100;
const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

type ErrorsState = Record<string, string>;
export type UncontrolledFormProps = { onSuccess: () => void };

type ExtractedValues = {
  name: string;
  ageStr: string;
  email: string;
  gender: string;
  country: string;
  agreement: boolean;
  avatarFile: File | undefined;
};

const getStringValue = (formData: FormData, key: string): string => {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
};

const getFormValues = (formData: FormData): ExtractedValues => {
  const avatarValue = formData.get('avatar');
  return {
    name: getStringValue(formData, 'name'),
    ageStr: getStringValue(formData, 'age'),
    email: getStringValue(formData, 'email'),
    gender: getStringValue(formData, 'gender'),
    country: getStringValue(formData, 'country'),
    agreement: formData.get('agreement') !== null,
    avatarFile: avatarValue instanceof File ? avatarValue : undefined,
  };
};

function isGenderValid(value: string): value is 'male' | 'female' | 'other' {
  return ['male', 'female', 'other'].includes(value);
}

const validate = (values: ExtractedValues): ErrorsState => {
  const validationErrors: ErrorsState = {};
  if (!values.name.trim()) {
    validationErrors.name = 'Name is required';
  } else if (
    !values.name.trim().startsWith(values.name.trim().charAt(0).toUpperCase())
  ) {
    validationErrors.name = 'Name must start with capital letter';
  }
  const age = Number(values.ageStr);
  if (!values.ageStr) {
    validationErrors.age = 'Age is required';
  } else if (age < MIN_AGE || age > MAX_AGE) {
    validationErrors.age = `Age must be ${MIN_AGE}-${MAX_AGE}`;
  }
  if (!values.email.trim()) {
    validationErrors.email = 'Email is required';
  }
  if (!values.gender) {
    validationErrors.gender = 'Gender is required';
  }
  if (!values.country.trim()) {
    validationErrors.country = 'Country is required';
  }
  if (!values.agreement) {
    validationErrors.agreement = 'You must accept terms';
  }
  if (!values.avatarFile || values.avatarFile.size === 0) {
    validationErrors.avatar = 'Avatar image is required';
  }
  return validationErrors;
};

export const UncontrolledForm = ({
  onSuccess,
}: UncontrolledFormProps): JSX.Element => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<ErrorsState>({});

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const values = getFormValues(new FormData(event.currentTarget));
    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    if (values.avatarFile && isGenderValid(values.gender)) {
      const reader = new FileReader();
      const currentGender = values.gender;
      reader.onloadend = (): void => {
        if (typeof reader.result !== 'string') {
          return;
        }
        dispatch(
          addProfile({
            name: values.name.trim(),
            age: Number(values.ageStr),
            email: values.email.trim(),
            gender: currentGender,
            country: values.country.trim(),
            avatarUrl: reader.result,
          }),
        );
        onSuccess();
      };
      reader.readAsDataURL(values.avatarFile);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <Input label="Name" name="name" required error={errors.name} />
      <Input label="Age" name="age" type="number" required error={errors.age} />
      <Input
        label="Email"
        name="email"
        type="email"
        required
        error={errors.email}
      />
      <Select
        label="Gender"
        name="gender"
        options={GENDER_OPTIONS}
        required
        error={errors.gender}
      />
      <Autocomplete
        label="Country"
        name="country"
        required
        error={errors.country}
      />
      <FileInput label="Avatar" name="avatar" required error={errors.avatar} />
      <div className={styles['checkbox-wrapper']}>
        <label className={styles['checkbox-label']}>
          <input type="checkbox" name="agreement" className={styles.checkbox} />
          <span>I agree to the terms and conditions *</span>
        </label>
        {errors.agreement && (
          <span className={styles['error-text']}>{errors.agreement}</span>
        )}
      </div>
      <button type="submit" className={styles['submit-button']}>
        Submit Profile
      </button>
    </form>
  );
};
