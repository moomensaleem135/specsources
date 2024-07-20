// app/api/login/route.ts

import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request: Request) {
    // Dummy user data
    const user = {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        website: 'johndoe.com',
    };

    // Dummy token
    const token = 'dummy-jwt-token';

    const headers = new Headers();
    headers.append('Set-Cookie', serialize('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    }));

    return NextResponse.json({ user, token }, { headers });
}
