'use client';

import { ReactNode } from 'react';
import { useTheme } from '../../context';
import { useRouter, usePathname } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import { Pagination } from '../pagination/Pagination';

interface HomeClientWrapperProps {
  children: ReactNode;
  refreshText: string;
  currentPage: number;
  hasItems: boolean;
}

export const HomeClientWrapper = ({
  children,
  refreshText,
  currentPage,
  hasItems,
}: HomeClientWrapperProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPageNumber: number) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set('page', String(newPageNumber));
    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  return (
    <main className={theme === 'dark' ? 'dark-mode' : ''}>
      <div className="controls-panel">
        <button
          type="button"
          className="refresh-button"
          onClick={() => router.refresh()}
        >
          {refreshText}
        </button>
      </div>

      {children}

      {hasItems && (
        <Pagination page={currentPage} onChangePage={handlePageChange} />
      )}
    </main>
  );
};
