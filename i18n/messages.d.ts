import type { AbstractIntlMessages } from 'next-intl';

declare module '*.json' {
  const content: { default: AbstractIntlMessages };
  export default content;
}
