'use client';

import { type FC } from 'react';
import './Pagination.css';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  page: number;
  onChangePage: (newPage: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ page, onChangePage }) => {
  const t = useTranslations('Pagination');

  const handlePrevClick = () => {
    if (page > 1) {
      onChangePage(page - 1);
    }
  };

  const handleNextClick = () => {
    onChangePage(page + 1);
  };

  return (
    <nav className={'pagination'}>
      <p className={'switch-page'} onClick={handlePrevClick}>
        {t('next')}
      </p>
      <p className={'page-number'}>{page}</p>
      <p className={'switch-page'} onClick={handleNextClick}>
        {t('prev')}
      </p>
    </nav>
  );
};
