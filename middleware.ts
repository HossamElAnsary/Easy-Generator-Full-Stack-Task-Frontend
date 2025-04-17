// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = [
  '/signin',
  '/signup',
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

  // let public routes and static files through
  if (isPublic(pathname)) {
    return NextResponse.next()
  }

  // look for your auth cookie (set on login)
  const token = req.cookies.get('accessToken')?.value
  if (!token) {
    // redirect to sign-in, preserving the return URL
    const signInUrl = req.nextUrl.clone()
    signInUrl.pathname = '/signin'
    signInUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // allow the request
  return NextResponse.next()
}

// run on every path
export const config = { matcher: '/:path*' }
// export const config = {}

