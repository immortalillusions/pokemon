"use client"; // This is a client component, lets me use useState
import Image from "next/image";
import { useState } from "react";

function handleFlip(isFlipped: boolean, setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>) {
  setIsFlipped(!isFlipped); // Toggle the state
  console.log("isFlipped", isFlipped); // Log the current state
}

export default function Home() {
  // flip that pokemon!
  // hook to add state to isFlipped which means i dont have to create a class
  // [var, settervar]
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    /*
      * grid: enables CSS grid layout
      * grid-rows-[20px_1fr_40px]: spacing/header, main, footer
      * min-h-screen: sets minimum height to 100 vertical height
      * p-8 pb-20: padding of 8 units and bottom padding of 20 units
      * gap-16: gap of 16 units between grid items
      * sm:p-20: padding of 20 units on screens larger than 'sm' breakpoint, else it's the padding on the left of sm:
      */
    <div className="grid grid-rows-[20px_1fr_40px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col gap-[32px] row-start-1 font-sans text-4xl">
        Pokemon Game
      </div>
      {/* flex flex-col: Uses Flexbox with a vertical column layout.
      gap-[32px]: Adds 32px spacing between child elements. 
      row-start-2: Places <main> in Grid row 2 (the middle row).
      items-center: Centers items horizontally 
      */}
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <div className = "flex flex-col gap-2">
          Let's catch this pokemon!
        </div>
        <Image
            src="/pikachu_tie.jpg"
            alt="Pikachu with Tie"
            width={160}
            height={160}
            className={isFlipped ? "transform scale-x-[-1]" : ""}
          />
        <button
          onClick={() => handleFlip(isFlipped, setIsFlipped)}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Flip your pokemon!
        </button>
        <div className = "flex flex-col gap-2 font-sans text-sm text-red-500">
          sm: test font size with font-sans/arcade theme
        </div>
        <div className = "flex flex-col gap-2 font-sans text-xs">
          test-xs: test font size with font-sans/arcade theme
        </div>
        <div className = "flex flex-col gap-2 font-sans text-xs font-bold">
          font-bold: test-xs: doesnt seem to have thinner fonts tho
        </div>
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.\nthis
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
        
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className=" flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
