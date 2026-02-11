import { auth } from "@/auth"
import { NextResponse } from "next/server"

// Custom middleware that combines auth and domain-based locale detection
export default auth((req) => {
  const { pathname, hostname } = req.nextUrl
  const isAuthenticated = !!req.auth

  // Detect locale based on hostname
  const locale = hostname.includes('kongaiwen.dev') ? 'zh' : 'en';

  // Check for authentication on /private routes
  if (pathname.includes('/private') && !isAuthenticated) {
    const signInUrl = new URL('/auth/signin', req.url)
    return NextResponse.redirect(signInUrl)
  }

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = pathname.startsWith('/en/') ||
                            pathname.startsWith('/zh/') ||
                            pathname === '/en' ||
                            pathname === '/zh'

  // If no locale in pathname, redirect to add it
  if (!pathnameHasLocale) {
    const url = req.nextUrl.clone()

    // Build the new pathname with locale
    if (pathname === '/') {
      url.pathname = `/${locale}`
    } else {
      url.pathname = `/${locale}${pathname}`
    }

    // Redirect to the locale-prefixed path
    return NextResponse.redirect(url)
  }

  // If locale prefix exists in URL, just pass through
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Match all paths except:
    // - api routes
    // - _next files
    // - static assets (images, videos, fonts)
    // - files with extensions (to allow direct file access)
    '/((?!api|_next|images|videos|fonts|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp|ico|mp4|webm|woff|woff2|ttf|otf)).*)'
  ],
}
