import { auth } from "@/auth"
import { NextResponse } from "next/server"
import createMiddleware from 'next-intl/middleware';
import { routing } from './app/i18n/routing';

// Create the next-intl middleware with domain configuration
const intlMiddleware = createMiddleware(routing);

// Custom middleware that combines auth and next-intl
export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAuthenticated = !!req.auth

  // Check for authentication on /private routes (check both with and without locale prefix)
  const isPrivateRoute = pathname.startsWith("/private") ||
                        pathname.startsWith("/en/private") ||
                        pathname.startsWith("/zh/private")

  if (isPrivateRoute && !isAuthenticated) {
    const signInUrl = new URL('/auth/signin', req.url)
    return NextResponse.redirect(signInUrl)
  }

  // Let next-intl middleware handle locale routing
  return intlMiddleware(req)
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
