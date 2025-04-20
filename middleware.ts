// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = [
  '/auth/signin',
  '/auth/signup',
  '/api/auth',      // if you have custom auth APIs
  '/favicon.ico',
  '/_next/',        // static assets
  '/robots.txt',
]

function isPublic(pathname: string) {
  return PUBLIC_PATHS.some(p => pathname.startsWith(p))
    || /\.(.*)$/.test(pathname)     // allow files: .js, .css, images, etc.
}

export function middleware(req: NextRequest) {
  
  const { pathname } = req.nextUrl

  if (isPublic(pathname)) {
    return NextResponse.next()
  }

  const token = req.cookies.get('accessToken')?.value ?? null;

  if (!token) {
    const signInUrl = req.nextUrl.clone()
    signInUrl.pathname = '/auth/signin'
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

// run on every path
export const config = { matcher: '/:path*' }
// export const config = {}

