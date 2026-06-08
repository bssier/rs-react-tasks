import { type JSX } from 'react';

import styles from './ProfileCard.module.css';

import type { Profile } from '@/types.ts';

type ProfileCardProps = {
  profile: Profile;
};

export const ProfileCard = ({ profile }: ProfileCardProps): JSX.Element => {
  const { name, age, email, gender, country, avatarUrl } = profile;

  return (
    <div className={styles.card}>
      <div className={styles['avatar-wrapper']}>
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className={styles.avatar}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.item}>
          <strong>Age:</strong> {age}
        </p>
        <p className={styles.item}>
          <strong>Gender:</strong>{' '}
          <span className={styles.capitalize}>{gender}</span>
        </p>
        <p className={styles.item}>
          <strong>Country:</strong> {country}
        </p>
        <p className={styles.email} title={email}>
          {email}
        </p>
      </div>
    </div>
  );
};
