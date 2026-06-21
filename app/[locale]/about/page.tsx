'use client';

import '../../../styles/AboutPage.css';
import { useTheme } from '../../../context';
import { useTranslations } from 'next-intl';

const Page = () => {
  const { theme } = useTheme();
  const t = useTranslations('About');

  return (
    <article className={`about-page ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className={'greeting-menu'}>
        <p>{t('description')}</p>
        <a
          href="https://github.com/bssier"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('github')}
        </a>

        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('course')}
        </a>
      </div>
    </article>
  );
};

export default Page;
