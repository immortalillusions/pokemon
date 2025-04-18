import { Suspense } from "react";
import { CommandLineIcon } from '@heroicons/react/24/outline';
import LoginForm from "./login-form";

export default function LoginPage(){
    return (
    <main className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
            <div className="flex h-20 w-full items-center justify-center rounded-lg bg-yellow-400 p-3 md:h-36">
                <div className="flex w-full h-full items-center justify-center text-white space-x-5">
                    <CommandLineIcon className="w-50 h-50" />
                    <p className="text-[2.5rem] font-sans text-center leading-none">
                    LOGIN!
                    </p>
                </div>
            </div>
            <Suspense>
                <LoginForm />
            </Suspense>
        </div>
    </main>
      );
}