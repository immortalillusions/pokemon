import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
// initialize NextAuth with authConfig object and exporting the auth property
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: specify it should run on specific paths
  // auth logic is applied to all routes except api, static, image, .png files
  // protects all routes except^
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};