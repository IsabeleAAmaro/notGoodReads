import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  // Protected routes
  const protectedPaths = ["/dashboard", "/books", "/settings"]
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Auth routes
  const authPaths = ["/signin", "/signup"]
  const isAuthPath = authPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Redirect logic
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/books/:path*", "/settings/:path*", "/signin", "/signup"],
}

