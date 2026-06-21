import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html|css|js|json|jpe?g|webp|png|gif|svg|ico|woff2?)).*)',
    '/(api|trpc)(.*)',
  ],
};
