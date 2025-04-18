import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
// zod to validate email/password before checking if user exists in db
import {z} from 'zod';
// query user
import type { User } from "@/app/lib/definitions";
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

import { serialize } from 'cookie'; // Import cookie utility
import type { NextApiResponse } from 'next'; // Add this import at the top of the file


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}


// bcryptjs uses Node.js APIs which isn't in Next.js middleware
// so we need to export the auth property from NextAuth and not the default export 
export const { auth, signIn, signOut } = NextAuth({
    // spread or expand the elements of authConfig into NextAuth by matching the keys
    ...authConfig,
    // can also add other options like Google later
    providers: [Credentials({
        async authorize(credentials){
            const parsedCredentials = z.object({
                email: z.string().email(),
                password: z.string().min(5),
            }).safeParse(credentials);
            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null; // user not found in db
                const passwordMatch = await bcrypt.compare(password, user.password);
                // matched password
                if (passwordMatch) {
                    // console.log("valid credentials");
                    // // Save user ID in a cookie
                    // const cookie = serialize('userId', user.id, {
                    //   httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
                    //   secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                    //   sameSite: 'strict', // Prevent CSRF attacks
                    //   path: '/', // Cookie is accessible across the entire site
                    // });
        
                    // // Set the cookie in the response headers
                    // if (typeof window === 'undefined') {
                    //   // Server-side: Set the cookie in the response
                    //   const res = credentials?.res as NextApiResponse; // Explicitly type res as NextApiResponse
                    //   res.setHeader('Set-Cookie', cookie);
                    // }
        
                    return user; // Return the user object
                  }
              }
              console.log("invalid credentials");
              return null;
        }
    })]
});