import { NextResponse } from 'next/server';
import axios from 'axios';

export async function middleware(request) {
  const token = request.cookies.get('Token')?.value || '';
  
  // Define the URLs
  const loginUrl = new URL('/auth/login', request.url);
  const dashboardUrl = new URL('/dashboard', request.url);

  try {
    // Verify token by making a request to the backend
    const res = await axios.post('http://localhost:8000/auth/verifyToken', {}, {
      headers: {
        Cookie: `Token=${token}`,
        // Optional: Add credentials if necessary
        // withCredentials: true
      }
    });

    if (res.status === 200 && res.data === 'User is authorized') {
      // Token is verified, redirect to dashboard if accessing root URL
      if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(dashboardUrl);
      }
      return NextResponse.next();
    } else {
      // Token verification failed, redirect to login
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    console.error('Error verifying token:', error.response?.data || error.message);
    return NextResponse.redirect(loginUrl);
  }
}

// Apply the middleware to all paths
export const config = {
  matcher: ['/', '/dashboard'],
};
