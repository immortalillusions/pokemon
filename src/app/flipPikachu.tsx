"use client";
import { useState } from "react";
import Image from "next/image"; // Ensure you import Image from next/image

function handleFlip(isFlipped: boolean, setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsFlipped(!isFlipped); // Toggle the state
    console.log("isFlipped", isFlipped); // Log the current state
  }  

export default function FlipPikachu() {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <>
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
    </>
  );
}