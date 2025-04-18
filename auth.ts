import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
// zod to validate email/password before checking if user exists in db
import {z} from 'zod';
// query user
import type { User } from "@/app/lib/definitions";
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

import { getSession } from './src/app/lib/actions'; // Import getSession function

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
                    // Save user ID in a session
                    const session = await getSession(); // Get the session object
                    session.userId = user.id; // Set the user ID in the session
                    session.email = user.email; // Set the email in the session
                    session.isLoggedIn = true; // Set the logged-in status in the session
                    await session.save(); // Save the session to persist the user ID in a cookie
                    return user; // Return the user object
                  }
              }
              console.log("invalid credentials");
              return null;
        }
    })]
});