"use client"; // This component is a client component
import Image from "next/image";
import FlipPikachu from "../flipPikachu";
import { useState } from "react";
import { getPokemonData } from "../lib/actions"; // Import the function to fetch Pokémon data
import OptionsButton from "./options-button";
async function generatePokemon(setPoke_Id: React.Dispatch<React.SetStateAction<number | undefined>>, 
setShiny: React.Dispatch<React.SetStateAction<boolean>>,
  setSrc: React.Dispatch<React.SetStateAction<string>>,
  setName: React.Dispatch<React.SetStateAction<string | undefined>>,
  setType: React.Dispatch<React.SetStateAction<string | undefined>>,
  setSound: React.Dispatch<React.SetStateAction<string | undefined>>): Promise<string | undefined>  {
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
    return pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
  } else {
    console.error("Failed to fetch Pokémon data.");
    return "not found";
  }
  // // add new pokemon
  // try{
  //   const response = await fetch("/api/addPokemon", {
  //     method: "POST", // modifying data
  //     body: JSON.stringify({
  //      // Send data in the body
  //      // user id will be extracted from the session in the api route
  //       pokeId: randomId,
  //       shiny: randomShiny,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json", // json type
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to add Pokemon");
  //   }

  //   const data = await response.json();
  //  // console.log("New pokemon: ", data);
  // } catch (error) {
  //   console.error("Error:", error);
  // }

}

async function generateOptions(name: string) {
  const options = new Set<string>(); // Use a set to ensure unique options
  options.add(name); // Add the correct answer to the set
  while (options.size < 4) {
    const randomId = Math.floor(Math.random() * 500) + 1; 
    const pokemonData = await getPokemonData(randomId, false); 
    const option = pokemonData?.name.charAt(0).toUpperCase() + pokemonData?.name.slice(1); 
    options.add(option); 
  }

  return Array.from(options).sort(() => Math.random() - 0.5); // random order
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
  const [options, setOptions] = useState<string[]>([]); // State to hold the options for the buttons
  // button cooldown
 //  const [isCooldown, setIsCooldown] = useState(false); 
  // guesing phase
  const [guessing, setGuessing] = useState(false); // State to track if the guessing phase is active
  const [correct, setCorrect] = useState(false); // State to track if the guess is correct  
  const handleClick = async () => {
    // need to set guessing BEFORE await (so answers aren't revealed)
    setGuessing(true); // Start the guessing phase
    setCorrect(false); // Reset the correct state
    const genName = await generatePokemon(setPoke_Id, setShiny, setSrc, setName, setType, setSound);
    const generatedOptions = await generateOptions(genName ||"not found");
    setOptions(generatedOptions); 

    // setIsCooldown(true); // Disable the button
    // setTimeout(() => {
    //   setIsCooldown(false); // Re-enable the button after 5 seconds
    // }, 5000);
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
              disabled={guessing}
              className={`h-[10%] w-[50%] absolute top-[52%] left-[36%] font-sans items-center rounded-lg px-4 text-[0.8rem] md:text-lg font-medium text-white transition-colors 
                ${guessing ? "bg-red-950" : "bg-[#D30A40] hover:bg-red-500"}`}
              
            >
              Find Pokemon
        </button>
        {/* Text box positioned at 133px right and 344px down */}
        <div
          className="flex absolute font-sans top-[65%] left-[32%] w-[58%] h-[15%] 
           justify-center items-center gap-1
          rounded-lg"
        >
          <div className = "flex flex-col w-full h-full gap-1">
            <OptionsButton guess={options[0]} answer={name} randomId = {poke_Id} randomShiny = {shiny} guessing={guessing} setGuessing={setGuessing} correct={correct} setCorrect={setCorrect}/>
            <OptionsButton guess={options[1]} answer={name} randomId = {poke_Id} randomShiny = {shiny} guessing={guessing} setGuessing={setGuessing} correct={correct} setCorrect={setCorrect}/>
          </div>
          <div className = "flex flex-col w-full h-full gap-1">
            <OptionsButton guess={options[2]} answer={name} randomId = {poke_Id} randomShiny = {shiny} guessing={guessing} setGuessing={setGuessing} correct={correct} setCorrect={setCorrect}/>
            <OptionsButton guess={options[3]} answer={name} randomId = {poke_Id} randomShiny = {shiny} guessing={guessing} setGuessing={setGuessing} correct={correct} setCorrect={setCorrect}/>
          </div>
          
        </div>
        <div
          className="absolute font-sans top-[82%] left-[32%] w-[58%] h-[12%] 
          border-2 border-red-500 text-white flex justify-center items-center text-[0.5rem] md:text-[0.85rem]
          text-center rounded-lg break-words"
        >
          {/* {poke_Id} {type} {shiny ? "Shiny" : ""} {name} */}
            Who&apos;s that Pokemon?
        </div>
        

      </div>
    </div>
  );
}
