// app/api/logout/route.ts

import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
    // Clear the authToken cookie
    const headers = new Headers();
    headers.append('Set-Cookie', serialize('authToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: -1, // Set maxAge to -1 to delete the cookie
        path: '/',
    }));

    return NextResponse.json({ message: 'Logout successful' }, { headers });
}
