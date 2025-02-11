'use server'

import { NextRequest, NextResponse } from 'next/server'

/**
 * * Check if the pathname matches any guest page pattern
 * @param pathname
 * @returns
 */
function isAuthPage(pathname: string): boolean {
  if (pathname.startsWith('/auth')) return true

  return false
}

/**
 * * Middleware
 * @param request
 * @returns
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get('fb-principal-iris-token')

  if (!token && !isAuthPage(pathname))
    return NextResponse.redirect(new URL('/auth/login', request.url))

  if (token && isAuthPage(pathname))
    return NextResponse.redirect(new URL('/home', request.url))

  if (token && pathname === '/home/user')
    return NextResponse.redirect(new URL('/home', request.url))

  return NextResponse.next()
}

/**
 * * Config
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
