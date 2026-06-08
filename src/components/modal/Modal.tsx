import { type JSX, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

import type { ModalProps } from '@/types.ts';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const getFocusableElements = (
  container: HTMLDivElement | null,
): HTMLElement[] => {
  if (!container) {
    return [];
  }

  const nodes = container.querySelectorAll(FOCUSABLE_SELECTOR);

  return [...nodes].filter(
    (node): node is HTMLElement => node instanceof HTMLElement,
  );
};

const handleModalKeyDown = (
  event: KeyboardEvent,
  container: HTMLDivElement | null,
  onClose: () => void,
): void => {
  if (event.key === 'Escape') {
    onClose();
    return;
  }

  if (event.key !== 'Tab') {
    return;
  }

  const elements = getFocusableElements(container);

  if (elements.length === 0) {
    return;
  }

  const first = elements[0];
  const last = elements.at(-1);
  if (!last) {
    return;
  }

  if (event.shiftKey && document.activeElement === first) {
    last.focus();
    event.preventDefault();
  } else if (!event.shiftKey && document.activeElement === last) {
    first.focus();
    event.preventDefault();
  }
};

type ModalHeaderProps = { title: string; onClose: () => void };

const ModalHeader = ({ title, onClose }: ModalHeaderProps): JSX.Element => (
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
);

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps): JSX.Element | undefined => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (document.activeElement instanceof HTMLElement) {
      previousFocusRef.current = document.activeElement;
    }

    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent): void => {
      handleModalKeyDown(event, modalRef.current, onClose);
    };

    document.addEventListener('keydown', onKeyDown);

    const elements = getFocusableElements(modalRef.current);

    if (elements[0]) {
      elements[0].focus();
    }

    return (): void => {
      document.removeEventListener('keydown', onKeyDown);
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

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(event: React.MouseEvent<HTMLDivElement>): void => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div ref={modalRef} className={styles.modal}>
        <ModalHeader title={title} onClose={onClose} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    modalRoot,
  );
};
