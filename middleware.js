import { NextResponse } from 'next/server';

export async function middleware(request) {
  const sessionCookie = request.cookies.get('session');
  let session = null;

  if (sessionCookie) {
    try {
      session = JSON.parse(sessionCookie.value);
    } catch (e) {
      console.error("Error parsing session cookie in middleware:", e);
    }
  }

  const { pathname } = request.nextUrl;

  if ((pathname.startsWith('/dashboard') || pathname.startsWith('/acerca')) && !session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/acerca/:path*'],
};
