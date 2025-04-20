'use client'
import {signup} from '../../../auth'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon, UserIcon, ArrowRightIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { Button } from '../login/button';
 
export function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined)
    const router = useRouter();
    // Redirect to home page if signup is successful
    // only triggered when one of its dependencies changes (state, pending, router)
    // when signup form first renders, state object is undefined so if statement is false

    const gotoLogin = () => {
      router.push('/login'); // Redirect to login page

    };  
    return (
        // no validate ensures that we don't have that pop up message as error
        <form action={action} noValidate className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-100 px-6 pb-4 pt-8">
            <h1 className="font-sans mb-3 text-2xl text-center">Create an account</h1>
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
              Sign Up <UserPlusIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
            {/* Go to login */}
            <Button
              type="button" // Prevents form submission
              onClick={gotoLogin}
              className="mt-3 w-full bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Go to Login<ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
          </div>
        </form>
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