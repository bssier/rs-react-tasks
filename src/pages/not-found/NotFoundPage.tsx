import './NotFoundPage.css';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <main className={'not-found-info'}>
      <h1 className={'not-found-header'}>404</h1>
      <p className={'not-found-text'}>Page not found</p>
      <nav className={'not-found-text'}>
        back to <Link to={'/'}>main page</Link>
      </nav>
    </main>
  );
};
