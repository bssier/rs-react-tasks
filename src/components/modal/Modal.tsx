import { type JSX, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

import type { ModalProps } from '@/types.ts';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps): JSX.Element | undefined => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement>(undefined);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (document.activeElement instanceof HTMLElement) {
      previousFocusRef.current = document.activeElement;
    }
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') {
        return;
      }

      const elements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!elements || elements.length === 0) {
        return;
      }

      const first = elements[0];
      const last = elements.at(-1);

      if (
        event.shiftKey &&
        document.activeElement === first &&
        last instanceof HTMLElement
      ) {
        last.focus();
        event.preventDefault();
      } else if (
        !event.shiftKey &&
        document.activeElement === last &&
        first instanceof HTMLElement
      ) {
        first.focus();
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const initial = modalRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (initial instanceof HTMLElement) {
      initial.focus();
    }

    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return undefined;
  }
  const modalRoot = document.querySelector('#modal-root');
  if (!modalRoot) {
    return undefined;
  }

  const handleOverlayClick = (
    event_: React.MouseEvent<HTMLDivElement>,
  ): void => {
    if (event_.target === event_.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className={styles['close-button']}
            aria-label="close modal"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    modalRoot,
  );
};
