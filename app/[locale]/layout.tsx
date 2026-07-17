import '../../styles/index.css';
import { Header } from '../../src/сomponents/header/Header';
import { Footer } from '../../src/сomponents/footer/Footer';
import { Flyout } from '../../src/сomponents/flyout/Flyout';
import { NextIntlClientProvider } from 'next-intl';
import { AppProvider } from '../../src/сomponents/app-provider/AppProvider';
import { cookies } from 'next/headers';
import type { AbstractIntlMessages } from 'next-intl';

import enMessages from '../../messages/en.json';
import ruMessages from '../../messages/ru.json';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const messages: Record<string, AbstractIntlMessages> = {
  en: enMessages,
  ru: ruMessages,
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  const cookieStore = await cookies();
  const themeValue = cookieStore.get('theme')?.value ?? 'light';
  const theme: 'light' | 'dark' = themeValue === 'dark' ? 'dark' : 'light';

  const localeMessages = messages[locale] ?? {};

  return (
    <html lang={locale} className={theme}>
      <body>
        <NextIntlClientProvider locale={locale} messages={localeMessages}>
          <AppProvider initialTheme={theme}>
            <div className="app-layout">
              <Header />
              <main>{children}</main>
              <Flyout />
              <Footer />
            </div>
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
