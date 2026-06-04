import { type JSX, useState } from 'react';

import styles from './App.module.css';
import { Header } from './components/header/Header';
import { Modal } from './components/modal/Modal';

import type { FormType } from '@/types.ts';

export const App = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<FormType>();

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setFormType(undefined);
  };

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  const selectUncontrolled = (): void => {
    setFormType('uncontrolled');
  };
  const selectRhf = (): void => {
    setFormType('rhf');
  };

  const modalTitle =
    formType === 'uncontrolled'
      ? 'Add Profile (Uncontrolled)'
      : formType === 'rhf'
        ? 'Add Profile (React Hook Form)'
        : 'Select Form Type';

  return (
    <>
      <Header onOpenModal={handleOpenModal} />

      <main className={styles['main-content']}>
        <h2>Submitted Profiles</h2>
      </main>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalTitle}>
        {!formType && (
          <div className={styles['menu-container']}>
            <p className={styles['menu-text']}>
              Choose how you want to fill out the form:
            </p>
            <button
              onClick={selectUncontrolled}
              className={styles['menu-button']}
            >
              Uncontrolled Form (Pure React)
            </button>
            <button onClick={selectRhf} className={styles['menu-button']}>
              React Hook Form (Library)
            </button>
          </div>
        )}

        {formType === 'uncontrolled' && (
          <div>
            <p>Modal 1</p>
          </div>
        )}

        {formType === 'rhf' && (
          <div>
            <p>Modal 2</p>
          </div>
        )}
      </Modal>
    </>
  );
};
