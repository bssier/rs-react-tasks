import { type RefObject, useEffect } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLDivElement | undefined>,
  callback: () => void,
): void => {
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (
        event.target instanceof Node &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return (): void => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
};
