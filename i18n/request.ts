import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const resolvedLocale = await requestLocale;
  const currentLocale = resolvedLocale ?? 'en';

  const messageModule = await import(`../messages/${currentLocale}.json`);

  return {
    locale: currentLocale,
    messages: messageModule.default,
  };
});
