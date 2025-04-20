import { Suspense } from "react";
import LoginForm from "./login-form";
import Image from "next/image";
// maybe later ill add a loading spinner for suspense
export default function LoginPage(){
    return (
    <main className="flex justify-center w-full h-screen bg-[url('/background_water.jpeg')] bg-cover bg-center">        
        <Suspense>
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 mt-4">
                <div className="flex h-30 w-full items-center justify-center rounded-lg bg-yellow-400 p-3">
                    <div className="flex w-full h-full items-center justify-center text-white space-x-5">
                        {/* <CommandLineIcon className="w-50 h-50" /> */}
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
                <LoginForm />
            </div>
        </Suspense>
    </main>
      );
}