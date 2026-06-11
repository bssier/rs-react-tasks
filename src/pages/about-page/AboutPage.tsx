import './AboutPage.css';

export const AboutPage = () => {
  return (
    <article>
      <div className="greeting-menu">
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
