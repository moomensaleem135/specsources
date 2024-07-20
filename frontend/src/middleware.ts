// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';

export function middleware(request: NextRequest) {
    const cookies = parse(request.headers.get('cookie') || '');
    const token = cookies.authToken;
    const isAuthenticated = Boolean(token);

    if (isAuthenticated) {
        return NextResponse.next();
    } else {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/employees/:path*', '/'], // Apply middleware to these routes
};
