import { SessionOptions } from "iron-session";
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