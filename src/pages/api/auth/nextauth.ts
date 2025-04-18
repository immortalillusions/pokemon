// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcryptjs';
// import { getUser } from '../../../../auth'; // Ensure this path is correct
// import { serialize } from 'cookie'; // For setting cookies

// export  const { auth, signIn, signOut } =  NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text', placeholder: 'example@example.com' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials, req) {
//         if (!credentials) {
//           throw new Error('Missing credentials');
//         }

//         const { email, password } = credentials;

//         // Fetch the user from the database
//         const user = await getUser(email as string);
//         if (!user) {
//           throw new Error('Invalid email or password');
//         }

//         // Compare the provided password with the hashed password in the database
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//           throw new Error('Invalid email or password');
//         }

//         // Set a custom cookie with the user ID
//         req.res?.setHeader(
//           'Set-Cookie',
//           serialize('userId', user.id, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: 'strict',
//             path: '/',
//           })
//         );

//         return user; // Return the user object
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/login', // Redirect to the login page
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.userId = user.id; // Add userId to the token
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.userId = token.userId as string; // Add userId to the session
//       return session;
//     },
//   },
// });