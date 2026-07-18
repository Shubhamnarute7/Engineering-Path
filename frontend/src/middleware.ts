import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeJwtEdge(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Buffer/atob are standard in edge runtimes
    const jsonPayload = atob(base64);
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Protect /predictor, /apply, /admin, /client, and /employee routes
  if (
    pathname.startsWith('/predictor') || 
    pathname.startsWith('/apply') || 
    pathname.startsWith('/admin') ||
    pathname.startsWith('/client') ||
    pathname.startsWith('/employee')
  ) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }

    const decoded = decodeJwtEdge(token);
    const now = Date.now() / 1000;

    // Check expiration
    if (!decoded || decoded.exp < now) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }

    // Role Guard for Admin panel
    if (pathname.startsWith('/admin') && decoded.role !== 'Admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Role Guard for Client panel
    if (pathname.startsWith('/client') && decoded.role !== 'Client' && decoded.role !== 'Admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Role Guard for Employee panel
    if (pathname.startsWith('/employee') && decoded.role !== 'Employee' && decoded.role !== 'Admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/predictor/:path*', '/apply/:path*', '/admin/:path*', '/client/:path*', '/employee/:path*'],
};
