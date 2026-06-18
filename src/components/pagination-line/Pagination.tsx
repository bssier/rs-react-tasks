import { type FC } from 'react';
import './Pagination.css';
import {
  MIN_PAGE_LENGTH,
  PAGE_LIMIT,
} from '../../pages/home-page/homePageConstaints';
import { useNavigate } from 'react-router-dom';

type PaginationProps = {
  page: number;
  onChangePage: (newPage: number) => void;
};

export const Pagination: FC<PaginationProps> = ({ page, onChangePage }) => {
  const navigate = useNavigate();
  const isGoBack: boolean = MIN_PAGE_LENGTH < page;
  const isGoForward: boolean = PAGE_LIMIT > page;

  const closeElementDetails = (): void => {
    void navigate(`/${location.search}`);
  };

  const handlePrevClick = (): void => {
    if (!isGoBack) {
      return;
    }

    onChangePage(page - 1);
    closeElementDetails();
  };

  const handleNextClick = (): void => {
    if (!isGoForward) {
      return;
    }

    onChangePage(page + 1);
    closeElementDetails();
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
