'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '.././src/сomponents/error-boundary/ErrorBoundary.css';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const pathname = usePathname();

  useEffect(() => {
    console.error('Global Error caught:', error.message || error);
  }, [error]);

  const [, currentLocale = 'en'] = pathname.split('/', 2);

  const homeUrl =
    currentLocale === 'en' || currentLocale === 'ru'
      ? `/${currentLocale}`
      : '/';

  return (
    <html>
      <body>
        <main className="error-boudary-container">
          <h1>Something went wrong.</h1>
          <p className="not-found-text">
            Back to{' '}
            <Link href={homeUrl} onClick={reset}>
              main page
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
