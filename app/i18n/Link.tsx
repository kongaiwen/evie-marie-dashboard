'use client';

import { useLocale } from 'next-intl';
import NextLink from 'next/link';
import { getLocalizedPath } from './pathMappings';
import { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof NextLink>;

export function Link({ href, ...props }: LinkProps) {
  const locale = useLocale() as 'en' | 'zh';

  // Convert href to string for processing
  const hrefString = typeof href === 'string' ? href : href.pathname || '/';

  // Get localized path
  const localizedHref = getLocalizedPath(hrefString, locale);

  return <NextLink {...props} href={localizedHref} />;
}
