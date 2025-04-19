import { SessionOptions } from "iron-session";
import { z } from 'zod';
// type
export interface sessionData {
    userId?: string;
    email?: string;
    isLoggedIn: boolean;
}

export const defaultSession: sessionData = {
    isLoggedIn: false
}

export const sessionOptions: SessionOptions={
    password: process.env.SESSION_SECRET as string,
    cookieName: "pokemon-session",
    cookieOptions: {
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // false in local host and true in production
        maxAge: 60 * 60 * 24 * 7, // 1 week
    }
}

// for signup
export const SignupFormSchema = z.object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long.' })
      .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(5, { message: 'Be at least 5 characters long' })
      .trim(),
  })
   
  export type FormState =
    | {
        errors?: {
          name?: string[]
          email?: string[]
          password?: string[]
        }
        message?: string
      }
    | undefined