import '../../../styles/NotFoundPage.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFoundView() {
  const t = useTranslations('NotFoundView');

  return (
    <main className={'not-found-info'}>
      <h1 className={'not-found-header'}>404</h1>
      <p className={'not-found-text'}>{t('not-found-page')}</p>
      <nav className={'not-found-text'}>
        {t('back-to')}{' '}
        <Link href={'/bssier-REACT2026Q2/public'}>{t('to-main')}</Link>
      </nav>
    </main>
  );
}
