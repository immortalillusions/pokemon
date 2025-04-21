import { Suspense } from "react";
import { SignupForm } from "../signup/signup-form";
import Image from "next/image";
// maybe later ill add a loading spinner for suspense
export default function LoginPage(){
    return (
    <main className="flex justify-center w-full h-screen bg-[url('/background_water.jpeg')] bg-cover bg-center">        
        <Suspense>
            <SignupForm />
        </Suspense>
    </main>
      );
}