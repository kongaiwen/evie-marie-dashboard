import { auth } from "@/auth"
import { NextResponse } from "next/server"
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  // Detect locale from hostname
  localeDetection: false
});

// Custom middleware that combines auth and locale detection
export default auth((req) => {
  const { pathname, hostname } = req.nextUrl
  const isAuthenticated = !!req.auth

  // Detect locale based on hostname
  let detectedLocale = defaultLocale
  if (hostname.includes('kongaiwen.dev')) {
    detectedLocale = 'zh'
  } else if (hostname.includes('eviemariekolb.com')) {
    detectedLocale = 'en'
  }

  // Modify request to use detected locale
  const url = req.nextUrl.clone()
  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}`))

  // Add locale to pathname if not present
  if (!pathnameHasLocale && detectedLocale !== defaultLocale) {
    url.pathname = `/${detectedLocale}${pathname}`
    return NextResponse.rewrite(url)
  }

  // Store detected locale in headers for the app to use
  const response = intlMiddleware(req)
  response.headers.set('x-detected-locale', detectedLocale)

  // Protect /private routes (needs to account for locale prefix)
  const localePrefixPattern = `^/(${locales.join('|')})/`
  const pathWithoutLocale = pathname.replace(new RegExp(localePrefixPattern), '/')

  if (pathWithoutLocale.startsWith("/private") && !isAuthenticated) {
    const signInUrl = new URL(`/${detectedLocale}/auth/signin`, req.url)
    return NextResponse.redirect(signInUrl)
  }

  return response
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
