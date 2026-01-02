import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAuthenticated = !!req.auth

  // Protect /private routes
  if (pathname.startsWith("/private") && !isAuthenticated) {
    const signInUrl = new URL("/auth/signin", req.url)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
