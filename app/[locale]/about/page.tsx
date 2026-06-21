import '../../../styles/AboutPage.css';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

const Page = async ({ params }: Props) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  return (
    <article className="about-page">
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
