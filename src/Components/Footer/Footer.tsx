import { Component } from 'react';
import './Footer.css';

export class Footer extends Component {
  render() {
    return (
      <footer>
        <div className={'links-container'}>
          <a href={'https://github.com/bssier'}>Developer GitHub</a>
          <a
            href={
              'https://github.com/rolling-scopes-school/bssier-REACT2026Q2/tree/class-components'
            }
          >
            Project GitHub
          </a>
          <a href={'https://rs.school/'}>RS School courses</a>
          <a
            href={
              'https://www.linkedin.com/in/michael-tavyrin-9b84833bb/?skipRedirect=true'
            }
          >
            Developer LinkedIn
          </a>
        </div>
      </footer>
    );
  }
}
