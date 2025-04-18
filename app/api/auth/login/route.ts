import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { RouteHandler } from '@/utils/RouteHandler';
import axios from 'axios';

async function handlePOST(req: NextRequest) {
  const { email, password } = await req.json();

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
    { email, password },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  const { accessToken } = response.data;

  (await cookies()).set({
    name: 'accessToken',
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',                // make it valid for all routes
    maxAge: 7 * 24 * 60 * 60, // one week
  });

  return NextResponse.json({ accessToken }, { status: 201 });
  
}

export const POST = RouteHandler(handlePOST);
