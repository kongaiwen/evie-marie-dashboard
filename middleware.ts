import { auth } from "@/auth"
import { NextResponse, type NextRequest } from "next/server"
import { getEnglishPath } from "./app/i18n/pathMappings"

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

  // If no locale in pathname, rewrite to add it internally
  if (!pathnameHasLocale) {
    const url = req.nextUrl.clone()

    // For Chinese locale, check if path needs to be mapped from pinyin to English
    let targetPath = pathname
    if (locale === 'zh') {
      // Check if this is a Chinese pinyin path that needs mapping
      const englishPath = getEnglishPath(pathname)
      if (englishPath !== pathname) {
        targetPath = englishPath
      }

      // Also check for dynamic routes (e.g., /xiangmu/some-id)
      const pathSegments = pathname.split('/').filter(Boolean)
      if (pathSegments.length > 0) {
        const firstSegment = `/${pathSegments[0]}`
        const mappedFirst = getEnglishPath(firstSegment)
        if (mappedFirst !== firstSegment) {
          targetPath = pathname.replace(firstSegment, mappedFirst)
        }
      }
    }

    // Build the new pathname with locale
    if (targetPath === '/') {
      url.pathname = `/${locale}`
    } else {
      url.pathname = `/${locale}${targetPath}`
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
