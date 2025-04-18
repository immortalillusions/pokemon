import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  // auto called by next-auth when user signs in
  callbacks: {
    // middleware ensures protected routes will not even render until middleware verifies authentication
    // next.js middleware: run code before a request is completed
    // then based on incoming request, it modifies the response by rewriting/redirecting/modifying the request/response
    // authorized callback: receives object with auth and reqeust properties before request is completed
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith('/');
      if (isOnHome) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Providers are alr defined in auth.ts
} satisfies NextAuthConfig;