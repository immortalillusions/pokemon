'use server';
import {getUser} from './lib/db';
import {getSession} from './lib/actions'; // To get the session
// i separated this from the main page so that main page could be client side (if desired) bc i cannot pass the session to the main page (client)
// so i just pass it to this page (server) and then include this as a component within main page
// "Only plain objects can be passed to Client Components from Server Components. Classes or other objects with methods are not supported"
const Welcome = async () => {
    const session = await getSession(); // Get the session to check if the user is logged in
    const userId = session.userId;

  try {
    // Fetch the user data using the getUser function
    const user = await getUser(userId);
    console.log(user);

    return (
        // p-4 = padding, mt = margin top
        <>
              <div className="flex flex-col items-center gap-1 bg-yellow-100 p-2 rounded-lg shadow-md">
                <div className="font-sans text-3xl sm:text-2xl text-center">
                PokiGuess
                </div>
                <div className="font-sans text-l sm:text-l text-center">
                Welcome {user?.name}
                </div>
                <div className="text-base text-center">
                <p className = "mb-2">Your username is: <span className="font-sans text-[0.6rem] ml-1">{session.email}</span></p>
                <p>Your user ID is: <span className="font-sans text-[0.6rem] ml-1">{session.userId}</span></p>
                </div>
            </div>
        </>
        
    );
} catch (error) {
    if (error instanceof Error) {
        return <div>Error: {error.message}</div>;
    }
    return <div>An unknown error occurred.</div>;
  }
};

export default Welcome;