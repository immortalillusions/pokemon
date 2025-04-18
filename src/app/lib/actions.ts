'use server';
import { signIn } from '../../../auth';
//import { signIn } from '../../pages/api/auth/nextauth';
import { AuthError } from 'next-auth';
// session
import {sessionOptions, sessionData} from './lib'; // Import session options and session data types
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { defaultSession } from './lib'; // Import default session data

export const getSession = async ()=>{
  "use server";
  // decrypt cookies with sessionOptions definition
  // goat tutorial: https://www.youtube.com/watch?v=p_FiVGxyksI
  const session = await getIronSession<sessionData>(await cookies(), sessionOptions); 
  // when not loggedin, it is equivalent to the default which is not logged in
  if(!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn; // Set default session if not logged in
  }
  return session;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}