import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./next-intl.ts');

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./styles'],
  },
};

export default withNextIntl(nextConfig);
