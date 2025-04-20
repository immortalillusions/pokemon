"use client";
import { useState } from "react";
import Image from "next/image"; // Ensure you import Image from next/image
import {addPokemon} from "./lib/db";

async function handleFlip(isFlipped: boolean, setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>,   setUserName: React.Dispatch<React.SetStateAction<string>>
) {
    setIsFlipped(!isFlipped); // Toggle the state
    // get user data (everything)
    try {
      const response = await fetch("/api/queryUser?user_id=8d6036e6-e13d-4505-a037-e22d20d20ef9", {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
  
      const data = await response.json();
      if (data.name) {
        setUserName(data.name);
      }
      console.log("User data:", data);
    } catch (error) {
      console.error("Error:", error);
    }

    // add new pokemon
    try{
      const response = await fetch("/api/addPokemon", {
        method: "POST", // modifying data
        body: JSON.stringify({
          userId: "8d6036e6-e13d-4505-a037-e22d20d20ef9", // Send data in the body
          pokeId: 3,
          shiny: true,
        }),
        headers: {
          "Content-Type": "application/json", // json type
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to add Pokemon");
      }
  
      const data = await response.json();
      console.log("New pokemon: ", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

export default function FlipPikachu() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userName, setUserName] = useState("Flip your Pokémon!"); // Default button text
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
          onClick={() => handleFlip(isFlipped, setIsFlipped, setUserName)}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          {userName}{isFlipped ? " (Flipped)" : ""}
        </button>
    </>
  );
}