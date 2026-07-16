import './NotFoundPage.css';
import { Link } from 'react-router';
import { NOT_FOUND } from '../../pages/home-page/homePageConstaints';

export const NotFoundPage = () => {
  return (
    <main className="not-found-info">
      <h1 className="not-found-header">{NOT_FOUND}</h1>
      <p className="not-found-text">Page not found</p>
      <nav className="not-found-text">
        back to <Link to={'/'}>main page</Link>
      </nav>
    </main>
  );
};
