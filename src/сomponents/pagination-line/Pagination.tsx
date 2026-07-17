'use client';

import { type FC } from 'react';
import './Pagination.css';
import { MIN_PAGE_LENGTH } from '../../constants/homePageConstains.ts';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

type PaginationProps = {
  hasMore: boolean;
};

export const Pagination: FC<PaginationProps> = ({ hasMore }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? '1') || 1;

  const isGoBack: boolean = MIN_PAGE_LENGTH < page;
  const isGoForward: boolean = hasMore;

  const updatePage = (newPage: number): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));

    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePrevClick = (): void => {
    if (isGoBack) {
      updatePage(page - 1);
    }
  };

  const handleNextClick = (): void => {
    if (isGoForward) {
      updatePage(page + 1);
    }
  };

  return (
    <nav className="pagination">
      <p
        className={`switch-page ${isGoBack ? '' : 'disabled'}`}
        onClick={handlePrevClick}
      >
        prev
      </p>
      <p className="page-number">{page}</p>
      <p
        className={`switch-page ${isGoForward ? '' : 'disabled'}`}
        onClick={handleNextClick}
      >
        next
      </p>
    </nav>
  );
};
