import { type FC } from 'react';
import './Pagination.css';
import { MIN_PAGE_LENGTH } from '../../pages/home-page/homePageConstaints';
import { useNavigate, useSearchParams } from 'react-router';

type PaginationProps = {
  hasMore: boolean;
};

export const Pagination: FC<PaginationProps> = ({ hasMore }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const isGoBack: boolean = MIN_PAGE_LENGTH < page;
  const isGoForward: boolean = hasMore;

  const closeElementDetails = (newPage: number): void => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    void navigate(`/?${newParams.toString()}`);
  };

  const handlePrevClick = (): void => {
    if (!isGoBack) {
      return;
    }

    const newPage = page - 1;
    setSearchParams((prev) => {
      prev.set('page', String(newPage));
      return prev;
    });
    closeElementDetails(newPage);
  };

  const handleNextClick = (): void => {
    if (!isGoForward) {
      return;
    }

    const newPage = page + 1;
    setSearchParams((prev) => {
      prev.set('page', String(newPage));
      return prev;
    });
    closeElementDetails(newPage);
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
