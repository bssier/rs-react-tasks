'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../components/error-boundary/ErrorBoudary.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const pathname = usePathname();

  useEffect(() => {
    console.error('Global Error caught:', error?.message || error);
  }, [error]);

  const currentLocale = pathname?.split('/')[1] || 'en';

  const homeUrl = ['en', 'ru'].includes(currentLocale)
    ? `/${currentLocale}`
    : '/';

  return (
    <html>
      <body>
        <main className="error-boudary-container">
          <h1> Something went wrong. </h1>
          <p className="not-found-text">
            back to{' '}
            <Link href={homeUrl} onClick={() => reset()}>
              main page
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
