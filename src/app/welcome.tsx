'use server';
import RevealText from "./animations/reveal-text"; 
import { cookies } from "next/headers";

// i separated this from the main page so that main page could be client side (if desired) bc i cannot pass the session to the main page (client)
// so i just pass it to this page (server) and then include this as a component within main page
// "Only plain objects can be passed to Client Components from Server Components. Classes or other objects with methods are not supported"
export default async function Welcome(){

  // get user data (everything)
  try {
    const baseUrl = process.env.NODE_ENV === "production"? process.env.PUBLIC_BASE_URL: "http://localhost:3000"; // Use environment variable or fallback to localhost
    const response = await fetch(`${baseUrl}/api/queryUser`, {
        method: "GET",
        headers: { Cookie: cookies().toString() }, // include cookies in request (bc this is server side)
   });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const user = await response.json();
    return (
      // p-4 = padding, mt = margin top
      <>
            <div className="flex flex-col items-center gap-1 bg-yellow-100 p-2 mt-70 sm:mt-10 rounded-lg">
              <div className="font-sans text-3xl sm:text-2xl text-center">
              PokiGuess
              </div>
              <div className="font-sans text-l sm:text-l text-center">
              <RevealText texts = {"Welcome "+ user?.name}></RevealText>
              </div>
              <div className="text-base text-center">
              <p className = "mb-2">Your username is: <span className="font-sans text-[0.6rem] ml-1">{user.email}</span></p>
              <p>Your user ID is: <span className="font-sans text-[0.6rem] ml-1">{user.id}</span></p>
              <div className="font-sans text-l sm:text-l text-center mt-3 p-2">
              <RevealText texts = "Navigate to PLAY to catch some Pokemon!"></RevealText>
              </div>
              </div>
          </div>
      </>
      
  );
  } catch (error) {
    console.error("Error:", error);
  }
}

