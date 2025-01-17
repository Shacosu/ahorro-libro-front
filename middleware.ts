import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function middleware(req: NextRequest) {
  const session = await auth();
  if (!session && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
}