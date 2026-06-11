import { type FC } from 'react';
import './Pagination.css';

type PaginationProps = {
  page: number;
  onChangePage: (newPage: number) => void;
};

export const Pagination: FC<PaginationProps> = ({ page, onChangePage }) => {
  const handlePrevClick = () => {
    if (page > 1) {
      onChangePage(page - 1);
    }
  };

  const handleNextClick = () => {
    onChangePage(page + 1);
  };

  return (
    <nav className="pagination">
      <p className="switch-page" onClick={handlePrevClick}>
        prev
      </p>
      <p className="page-number">{page}</p>
      <p className="switch-page" onClick={handleNextClick}>
        next
      </p>
    </nav>
  );
};
