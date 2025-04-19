import NextAuth from 'next-auth';
import { authConfig } from '../auth.config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// MIDDLEWARE NEEDS TO BE IN THE SAME LEVEL AS APP (so in root or under src)
// initialize NextAuth with authConfig object and exporting the auth property
export default NextAuth(authConfig).auth;
// apply authentication/protection to everything except api routes, static files, images, and signup page
// ensures users cannot  go to / etc (by typing in the url) without being logged in
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: specify it should run on specific paths
  // auth logic is applied to all routes except api, static, image, .png files, signup
  // protects all routes except^
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|signup).*)'],
};