'use client'
import {signup} from '../../../auth'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
 
export function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined)
    const router = useRouter();
    // Redirect to home page if signup is successful
    // only triggered when one of its dependencies changes (state, pending, router)
    // when signup form first renders, state object is undefined so if statement is false
    useEffect(() => {
        if (state?.redirectTo && !pending) {
            console.log('Redirecting to:', state.redirectTo);
            router.push(state.redirectTo); // Perform navigation
        }
    }, [state, pending, router]);
    return (
        <form action={action}>
        <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Name" />
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}
        <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Email" />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}
        <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
        </div>
        {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
        )}
        <button disabled = {pending} type="submit">Sign Up</button>
        </form>
    )
}