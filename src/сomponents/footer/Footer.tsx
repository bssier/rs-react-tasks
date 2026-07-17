'use client';

import './Footer.css';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className="footer">
      <nav className="links-container">
        <a
          href={'https://github.com/bssier'}
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('gh')}
        </a>
        <a
          href={
            'https://github.com/rolling-scopes-school/bssier-REACT2026Q2/tree/class-components'
          }
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('proj')}
        </a>
        <a
          href={'https://rs.school/'}
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('course')}
        </a>
        <a
          href={
            'https://www.linkedin.com/in/michael-tavyrin-9b84833bb/?skipRedirect=true'
          }
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('dev-link')}
        </a>
      </nav>
    </footer>
  );
};
