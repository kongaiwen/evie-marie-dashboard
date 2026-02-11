import { auth } from "@/auth"
import { NextResponse, type NextRequest } from "next/server"

// Main middleware function
function mainMiddleware(req: NextRequest) {
  const { pathname, hostname } = req.nextUrl

  // Detect locale based on hostname
  const locale = hostname.includes('kongaiwen.dev') ? 'zh' : 'en';

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = pathname.startsWith('/en/') ||
                            pathname.startsWith('/zh/') ||
                            pathname === '/en' ||
                            pathname === '/zh'

  // If no locale in pathname, rewrite to add it internally (not redirect!)
  if (!pathnameHasLocale) {
    const url = req.nextUrl.clone()

    // Build the new pathname with locale
    if (pathname === '/') {
      url.pathname = `/${locale}`
    } else {
      url.pathname = `/${locale}${pathname}`
    }

    // Rewrite to the locale-prefixed path (user doesn't see it)
    return NextResponse.rewrite(url)
  }

  // If locale prefix exists in URL, just pass through
  return NextResponse.next()
}

// Export wrapped with auth for protected routes
export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAuthenticated = !!req.auth

  // Check for authentication on /private routes
  if (pathname.includes('/private') && !isAuthenticated) {
    const signInUrl = new URL('/auth/signin', req.url)
    return NextResponse.redirect(signInUrl)
  }

  // Pass to main middleware
  return mainMiddleware(req as NextRequest)
}) as any

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
