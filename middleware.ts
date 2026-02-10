import { auth } from "@/auth"
import { NextResponse } from "next/server"
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

// Create the next-intl middleware with domain-based routing
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never', // Never show locale in URL for domain-based routing
  localeDetection: false, // We handle detection manually
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

  // Create a modified request with the detected locale
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-next-intl-locale', detectedLocale)

  // Check for authentication on /private routes
  if (pathname.startsWith("/private") && !isAuthenticated) {
    const signInUrl = new URL('/auth/signin', req.url)
    return NextResponse.redirect(signInUrl)
  }

  // Let next-intl middleware handle the rest with our locale header
  const response = intlMiddleware(req)
  response.headers.set('x-detected-locale', detectedLocale)

  return response
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
