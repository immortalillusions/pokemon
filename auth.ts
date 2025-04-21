'use server';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
// zod to validate email/password before checking if user exists in db
import {z} from 'zod';
// query user
import type { User } from "@/app/lib/definitions";
import bcrypt from 'bcryptjs';

import { v4 as uuidv4 } from 'uuid';

import { SignupFormSchema, FormState } from '@/app/lib/lib';

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

export async function noAccount(){
  
  let success = false;
  let uniqueEmail;
  // save sign up date for guest
  const guest_date= Date.now();
  const password = uuidv4(); // Generate a random password
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  // ensure a unique email is generated
  while (!success) {
    try {
      uniqueEmail = `guest_${uuidv4()}@gmail.com`;
      // if not unique, will throw error
      await sql`
        INSERT INTO users (id, name, email, password, guest_created)
        VALUES (uuid_generate_v4(), 'Guest', ${uniqueEmail}, ${hashedPassword}, ${guest_date})
      `;
      success = true;
    } catch (error) {
      const typedError = error as { code?: string };
      // Check if the error is due to a duplicate email
      if (typedError.code === '23505') {
        // 23505 is the PostgreSQL error code for unique constraint violations
        console.warn(`Duplicate email generated: ${uniqueEmail}. Retrying...`);
      } else {
        throw new Error('Failed to create guest account.');
      }
    }
  }

  const successLogin = await signIn('credentials', {
    email: uniqueEmail,
    password: password,
    redirect: true,
    redirectTo: "/"
  });
  if (!successLogin) {
    return {
      errors: { email: ['Failed to sign in'] },
    }
  }

}

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
  
  // check if this is guest account
  const session = await getSession();
  const guest_created = session.guest_created; // Get the guest creation date from the session
  let insertedEmail;
  let insertedId;
  if (guest_created === null) {
      [insertedEmail, insertedId] = await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (uuid_generate_v4(), ${validatedFields.data.name}, ${validatedFields.data.email}, ${hashedPassword})
      ON CONFLICT (email) DO NOTHING
      RETURNING email, id;
    `;
  } else {
    if (session.userId === undefined) {
      return {
        errors: { email: ['Session has no user id'] },
      }
    }
    // new guest
    [insertedEmail, insertedId] = await sql`
      UPDATE users
      SET 
        name = ${validatedFields.data.name},
        email = ${validatedFields.data.email},
        password = ${hashedPassword},
        guest_created = null
      WHERE id = ${session.userId}
      RETURNING email, id;
    `;
  }
  
  if (insertedEmail === undefined) {
    return {
      errors: { email: ['Email already exists'] },
    }
  }
  // start session and redirect user to home page
  // success returns http://localhost:3000/login
  const success = await signIn('credentials', {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    redirect: true,
    redirectTo: "/"
  });
  if (!success) {
    return {
      errors: { email: ['Failed to sign in'] },
    }
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

                    // delete the guest account if we're switching accounts
                    if (session.userId !== user.id && session.guest_created !== null && session.guest_created !== undefined && session.userId !== undefined) {
                      await sql`DELETE FROM users WHERE id = ${session.userId}`;
                      await sql`DELETE FROM pokemon WHERE user_id = ${session.userId}`;
                      
                    }
                    session.userId = user.id; // Set the user ID in the session
                    session.email = user.email; // Set the email in the session
                    session.isLoggedIn = true; // Set the logged-in status in the session
                    session.guest_created = user.guest_created; // Set the guest creation date in the session
                    await session.save(); // Save the session to persist the user ID in a cookie
                    return user; // Return the user object
                  }
              }
              console.log("invalid credentials");
              return null;
        },
    })],
});