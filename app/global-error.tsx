'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import '../components/error-boundary/ErrorBoudary.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global Error caught:', error?.message || error);
  }, [error]);

  return (
    <html>
      <body>
        <main className="error-boudary-container">
          <h1> Something went wrong. </h1>
          <p className="not-found-text">
            back to{' '}
            <Link href="/ru" onClick={() => reset()}>
              main page
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
