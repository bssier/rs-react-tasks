import { type JSX, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './App.module.css';
import { Header } from './components/header/Header';
import { Modal } from './components/modal/Modal';
import { ProfileCard } from './components/profile-card/ProfileCard';
import { RhfForm } from './components/rhf-form/RhfForm';
import { UncontrolledForm } from './components/uncontrolled-form/UncontrolledForm';

import type { RootState } from '@/store/store.ts';
import type { FormType } from '@/types.ts';

type MenuProps = {
  onSelectUncontrolled: () => void;
  onSelectRhf: () => void;
};

const FormSelectionMenu = ({
  onSelectUncontrolled,
  onSelectRhf,
}: MenuProps): JSX.Element => (
  <div className={styles['menu-container']}>
    <p className={styles['menu-text']}>
      Choose how you want to fill out the form:
    </p>
    <button onClick={onSelectUncontrolled} className={styles['menu-button']}>
      Uncontrolled Form (Pure React)
    </button>
    <button onClick={onSelectRhf} className={styles['menu-button']}>
      React Hook Form (Library)
    </button>
  </div>
);

export const App = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<FormType>();
  const profiles = useSelector(
    (state: RootState) => state.profilesData.profiles,
  );

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setFormType(undefined);
  };

  const modalTitle =
    formType === 'uncontrolled'
      ? 'Add Profile (Uncontrolled)'
      : formType === 'rhf'
        ? 'Add Profile (React Hook Form)'
        : 'Select Form Type';

  return (
    <>
      <Header
        onOpenModal={(): void => {
          setIsModalOpen(true);
        }}
      />

      <main className={styles['main-content']}>
        <h2 className={styles['section-title']}>Submitted Profiles</h2>
        {profiles.length === 0 ? (
          <div className={styles['empty-state']}>
            <p>No profiles submitted yet. Click "Add Profile" to add one!</p>
          </div>
        ) : (
          <div className={styles['cards-grid']}>
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}
      </main>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalTitle}>
        {!formType && (
          <FormSelectionMenu
            onSelectUncontrolled={(): void => {
              setFormType('uncontrolled');
            }}
            onSelectRhf={(): void => {
              setFormType('rhf');
            }}
          />
        )}
        {formType === 'uncontrolled' && (
          <UncontrolledForm onSuccess={handleCloseModal} />
        )}
        {formType === 'rhf' && <RhfForm onSuccess={handleCloseModal} />}
      </Modal>
    </>
  );
};
