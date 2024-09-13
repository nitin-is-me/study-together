import { NextResponse } from 'next/server';
import axios from 'axios';

export async function middleware(request) {
  const token = request.cookies.get('Token')?.value || '';

  try {
    const res = await axios.post('http://localhost:8000/auth/verifyToken', {}, {
      headers: {
        Cookie: `Token=${token}`
      }
    });

    if (res.status === 200 && res.data === 'User is authorized') {
      console.log("Token is verified");
      return NextResponse.next();
    } else {
      console.log("Token verification failed, redirecting to login");
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  } catch (error) {
    console.error('Error verifying token:', error.response?.data || error.message);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard'],
};
