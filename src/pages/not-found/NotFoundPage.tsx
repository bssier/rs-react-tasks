import { Component } from 'react';
import './not-found-page.css';

export class NotFoundPage extends Component {
  render() {
    return (
      <div className={'not-found-info'}>
        <span className={'not-found-header'}>404</span>
        <span className={'not-found-text'}>Page not found</span>
        <span className={'not-found-text'}>
          back to <a href={'/'}>main page</a>
        </span>
      </div>
    );
  }
}
