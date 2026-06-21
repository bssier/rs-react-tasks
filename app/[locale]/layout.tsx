import '../../styles/index.css';

import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { Flyout } from '../../components/flyout/Flyout';
import { NextIntlClientProvider } from 'next-intl';
import { AppProviders } from '../../components/app-providers/AppProviders';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = {};
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProviders>
            <div className="app-layout">
              <Header />
              <main>{children}</main>
              <Flyout />
              <Footer />
            </div>
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
