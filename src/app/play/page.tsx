"use client"; // This component is a client component
import Image from "next/image";
import FlipPikachu from "../flipPikachu";
import { useState } from "react";
import { getPokemonData } from "../lib/actions"; // Import the function to fetch Pokémon data

async function generatePokemon(setPoke_Id: React.Dispatch<React.SetStateAction<number | undefined>>, 
setShiny: React.Dispatch<React.SetStateAction<boolean>>,
  setSrc: React.Dispatch<React.SetStateAction<string>>,
  setName: React.Dispatch<React.SetStateAction<string | undefined>>,
  setType: React.Dispatch<React.SetStateAction<string | undefined>>,
  setSound: React.Dispatch<React.SetStateAction<string | undefined>>) {
  // Generate a random Pokémon ID between 1 and 500
  const randomId = Math.floor(Math.random() * 500) + 1; // Random number between 1 and 500
  setPoke_Id(randomId); // Update the state with the new Pokémon ID

  const randomShiny = Math.random() < 0.1; // 10% chance to be shiny
  setShiny(randomShiny); // Update the state with the shiny status
  // Fetch Pokémon data
  const pokemonData = await getPokemonData(randomId, randomShiny); // Pass the random ID to the function
  if (pokemonData) {
    setSrc(pokemonData.sprite); // Update the sprite URL
    setName(pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)); 
    setType(pokemonData.type.charAt(0).toUpperCase() + pokemonData.type.slice(1));
    setSound(pokemonData.sound); // Update the Pokémon sound
  } else {
    console.error("Failed to fetch Pokémon data.");
  }
  // add new pokemon
  try{
    const response = await fetch("/api/addPokemon", {
      method: "POST", // modifying data
      body: JSON.stringify({
       // Send data in the body
       // user id will be extracted from the session in the api route
        pokeId: randomId,
        shiny: randomShiny,
      }),
      headers: {
        "Content-Type": "application/json", // json type
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add Pokemon");
    }

    const data = await response.json();
   // console.log("New pokemon: ", data);
  } catch (error) {
    console.error("Error:", error);
  }

}

// potential solution to make this mobile compatible
//  button/text screen on right as separate image (this is good size for mobile) (crop pokedex.png)
// then separate big image on left (prob custom made) for the pokemon pictures/animations on desktop
// on mobile, shrink the text size and button size to fit in the bottom screen and have the pokemon pic on top
export default function Play() {
  const [poke_Id, setPoke_Id] = useState<number | undefined>(undefined);  
  const [shiny, setShiny] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>(); 
  const [src, setSrc] = useState("/pokeball.webp"); // Default sprite URL
  const [sound, setSound] = useState<string | undefined>(); 
  // button cooldown
  const [isCooldown, setIsCooldown] = useState(false); 
  const handleClick = () => {
    generatePokemon(setPoke_Id, setShiny, setSrc, setName, setType, setSound);

    setIsCooldown(true); // Disable the button
    setTimeout(() => {
      setIsCooldown(false); // Re-enable the button after 5 seconds
    }, 5000);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="relative border-4 border-yellow-500 rounded-lg aspect-[429/670] w-[90%] max-w-[429px]"
        style={{
          backgroundImage: "url('/pokedex_col.png')", // Set the background image
          backgroundSize: "contain", // Ensure the image fits within the container
          backgroundRepeat: "no-repeat", // Prevent the image from repeating
          backgroundPosition: "center", // Center the image within the container
        }} 
      >
        <div>
          
        </div>
        <Image 
          src={src}
          width = {500}
          height = {500}
          alt="pokemon"
          className = "absolute top-[8%] left-[35%] w-[45%] h-auto"
          />
        {/* <FlipPikachu/> */}
        <button
              onClick={handleClick}
              disabled={isCooldown}
              className={`h-[10%] w-[50%] absolute top-[52%] left-[36%] font-sans items-center rounded-lg px-4 text-[0.8rem] md:text-lg font-medium text-white transition-colors 
                ${isCooldown ? "bg-red-950" : "bg-[#D30A40] hover:bg-red-500"}`}
              
            >
              Find Pokemon
        </button>
        {/* Text box positioned at 133px right and 344px down */}
        <div
          className="absolute font-sans top-[65%] left-[32%] w-[58%] h-[15%] 
          border-2 border-yellow-500 text-white flex justify-center items-center text-[0.5rem] md:text-[0.85rem]
          text-center rounded-lg break-words"
        >
          {poke_Id} {shiny ? "Shiny" : "Not Shiny"} {type} {name}
        </div>
        

      </div>
    </div>
  );
}
