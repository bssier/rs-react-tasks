import './about-page.css';
import { Link } from 'react-router';
import { useTheme } from '../../context.ts';

export const AboutPage = () => {
  const { theme } = useTheme();

  return (
    <article className={`about-page ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className={'greeting-menu'}>
        <p>
          Hi, dear user! As you might have guessed, this is an app for searching
          pokemons. If you want to find something, enter the pokemon name but it
          must be strictly in English.
        </p>
        <p>
          Author Git Hub: <Link to={'https://github.com/bssier'}>Link</Link>
        </p>
        <p>
          RS React course:{' '}
          <Link to={'https://rs.school/courses/reactjs'}>Link</Link>
        </p>
      </div>
    </article>
  );
};
