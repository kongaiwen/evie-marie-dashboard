import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../i18n/routing';
import "../globals.scss";
import styles from '../layout.module.scss';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const titles: Record<string, string> = {
    en: "Evie Marie Kolb | Full-Stack Software Engineer",
    zh: "龚爱文 | 全栈软件工程师"
  };

  const descriptions: Record<string, string> = {
    en: "Full-Stack Software Engineer specializing in React, React Native, and Node.js. Building accessible, performant applications.",
    zh: "全栈软件工程师，专注于 React、React Native 和 Node.js。构建可访问、高性能的应用程序。"
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    icons: {
      icon: '/icon.svg',
    },
    alternates: {
      canonical: `https://${locale === 'en' ? 'eviemariekolb.com' : 'kongaiwen.dev'}`,
      languages: {
        'en': 'https://eviemariekolb.com',
        'zh': 'https://kongaiwen.dev',
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${styles.body}`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
