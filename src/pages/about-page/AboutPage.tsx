import './AboutPage.css';
import { useTheme } from '../../context';

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
        <a
          href="https://github.com/bssier"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Profile
        </a>

        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          RS React course
        </a>
      </div>
    </article>
  );
};
