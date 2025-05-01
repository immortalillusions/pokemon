'use client'
import {signup} from '../../../auth'
import { useEffect, useState } from 'react'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon, UserIcon, ArrowRightIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { Button } from '../login/button';
import Loading from '../loading'; // Import the Loading component
import Image from 'next/image'; // Import Image from next/image
import RevealText from '../animations/reveal-text';
// i do not want to show login option if it is a guest account 
async function checkGuest(){
  try {
    const response = await fetch("/api/queryUser", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    // no one is logged in
    if (Object.keys(data).length === 0) {
      return null; // Handle empty JSON case
    }
    console.log("User data:", data);
    console.log("Guest created:", data.guest_created);
    return data.guest_created; // Return the guest_created value
  } catch (error) {
    console.error("Error:", error);
  }
}

export function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined)
    const router = useRouter();
    const [isNotGuest, setIsNotGuest] = useState<boolean | null>(null); // State to store guest status
    const [loading, setLoading] = useState(true); // State to manage loading status
    useEffect(() => {
      async function fetchGuestStatus() {
        const guestCreated = await checkGuest();
        setIsNotGuest(guestCreated === null || guestCreated === undefined); // Update state based on guest status
        setLoading(false);
      }
  
      fetchGuestStatus();
    }, []); // Run only once when the component mounts
  
    // Redirect to home page if signup is successful
    // form is only triggered when one of its dependencies changes (state, pending, router)
    // when signup form first renders, state object is undefined so if statement is false

    const gotoLogin = () => {
      router.push('/login'); // Redirect to login page
    };  
    if (loading) {
      // Show a loading spinner or placeholder while the form is loading
      return (

              <div className="flex justify-center items-center h-screen">
              <Loading/>
            </div>
      );
    }
    return (
        // no validate ensures that we don't have that pop up message as error
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 mt-4">
          <div className="flex h-30 w-full items-center justify-center rounded-lg bg-yellow-400 p-3">
              <div className="flex w-full h-full items-center justify-center text-white space-x-5">
                  <Image
                      src="/pokeball.webp" 
                        alt="Pokeball"
                          width={48}
                          height={48}
                  />
                  <p className="text-2xl md:text-[2rem] font-sans text-center leading-none">
                  PokiGuess
                  </p>
                  </div>
        </div>
        <form action={action} noValidate className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-100 px-6 pb-4 pt-8">
            <h1 className="font-sans mb-3 text-2xl text-center"><RevealText texts = "Create an account"/></h1>
            <div className="w-full">
              {/* Name Field */}
              <div>
                <label
                  className="mb-3 mt-5 block text-s font-medium text-gray-900"
                  htmlFor="name"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-3 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                  <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                {state?.errors?.name && (
                  <div className="flex items-center space-x-1 mt-1 text-red-500">
                    <ExclamationCircleIcon className="h-5 w-5" />
                    <p className="text-sm">{state.errors.name}</p>
                  </div>
                )}
              </div>
    
              {/* Email Field */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-s font-medium text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-3 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                {state?.errors?.email && (
                  <div className="flex items-center space-x-1 mt-1 text-red-500">
                    <ExclamationCircleIcon className="h-5 w-5" />
                    <p className="text-sm">{state.errors.email}</p>
                  </div>
                )}
              </div>
    
              {/* Password Field */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-s font-medium text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-3 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    minLength={5}
                  />
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                {state?.errors?.password && (
                  <div className="flex items-center space-x-1 mt-1 text-red-500">
                    <ExclamationCircleIcon className="h-5 w-5" />
                    <p className="text-sm">{state.errors.password}</p>
                  </div>
                )}
              </div>
            </div>
    
            {/* Submit Button */}
            <Button className="mt-4 w-full" aria-disabled={pending}>
              Sign Up {!isNotGuest && "& Save Progress"}<UserPlusIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
            {/* Go to login only if it is not a guest*/}
            {isNotGuest && (<Button
              type="button" // Prevents form submission
              onClick={gotoLogin}
              className="mt-3 w-full bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Go to Login<ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>)}
            {/* If it is guest, warn that guest account will be lost*/}
            {!isNotGuest && (<Button
              type="button" // Prevents form submission
              onClick={gotoLogin}
              className="mt-3 w-full bg-gray-200 text-gray-700 hover:bg-gray-300 text-left"
            >
              <span>
                Go to Login
                <br />
                <span className="text-red-500 font-bold">Changing Accounts Will Delete Guest</span>
              </span>
              <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>)}
          </div>
        </form>
        </div>
      );
    // return (
    //     <form action={action}>
    //     <div>
    //         <label htmlFor="name">Name</label>
    //         <input id="name" name="name" placeholder="Name" />
    //     </div>
    //     {state?.errors?.name && <p>{state.errors.name}</p>}
    //     <div>
    //         <label htmlFor="email">Email</label>
    //         <input id="email" name="email" type="email" placeholder="Email" />
    //     </div>
    //     {state?.errors?.email && <p>{state.errors.email}</p>}
    //     <div>
    //         <label htmlFor="password">Password</label>
    //         <input id="password" name="password" type="password" />
    //     </div>
    //     {state?.errors?.password && (
    //     <div>
    //       <p>Password must:</p>
    //       <ul>
    //         {state.errors.password.map((error) => (
    //           <li key={error}>- {error}</li>
    //         ))}
    //       </ul>
    //     </div>
    //     )}
    //     <button disabled = {pending} type="submit">Sign Up</button>
    //     </form>
    // )
}