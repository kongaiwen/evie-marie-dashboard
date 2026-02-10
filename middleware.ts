import { auth } from "@/auth"
import { NextResponse } from "next/server"

// Custom middleware that combines auth and domain-based locale detection
export default auth((req) => {
  const { pathname, hostname } = req.nextUrl
  const isAuthenticated = !!req.auth

  // Detect locale based on hostname
  let locale = 'en' // default
  if (hostname.includes('kongaiwen.dev')) {
    locale = 'zh'
  } else if (hostname.includes('eviemariekolb.com') || hostname.includes('localhost')) {
    locale = 'en'
  }

  // Check if pathname already has a locale prefix
  const hasLocalePrefix = pathname.startsWith('/en/') ||
                          pathname.startsWith('/zh/') ||
                          pathname === '/en' ||
                          pathname === '/zh'

  // If no locale in pathname, rewrite to add it internally
  if (!hasLocalePrefix) {
    const url = req.nextUrl.clone()
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
    if (pathname === '/') {
      url.pathname = `/${locale}`
    }

    // Add locale header for next-intl
    const response = NextResponse.rewrite(url)
    response.headers.set('x-next-intl-locale', locale)

    // Check for authentication on /private routes
    if (pathname.includes('/private') && !isAuthenticated) {
      const signInUrl = new URL('/auth/signin', req.url)
      return NextResponse.redirect(signInUrl)
    }

    return response
  }

  // If locale prefix exists in URL, just pass through
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
