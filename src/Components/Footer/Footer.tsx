import './footer.css';

export const Footer = () => {
  return (
    <footer>
      <nav className={'links-container'}>
        <a href={'https://github.com/bssier'} target="_blank" rel="noreferrer">Developer GitHub</a>
        <a
          href={
            'https://github.com/rolling-scopes-school/bssier-REACT2026Q2/tree/class-components'
          } target="_blank" rel="noreferrer"
        >
          Project GitHub
        </a>
        <a href={'https://rs.school/'} target="_blank" rel="noreferrer">RS School courses</a>
        <a
          href={
            'https://www.linkedin.com/in/michael-tavyrin-9b84833bb/?skipRedirect=true'
          } target="_blank" rel="noreferrer"
        >
          Developer LinkedIn
        </a>
      </nav>
    </footer>
  );
};
