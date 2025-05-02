'use client';
import { Pokemon } from "../lib/definitions";
import Image from "next/image";
import { useState } from "react"; // Import useState from React
import WavyText from "../animations/wavy-text";

function showPokemon(pokemon: Pokemon, setShowDetails: React.Dispatch<React.SetStateAction<boolean>>, setCurPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>
) {
  // Function to show the Pokémon details (e.g., in a modal or alert)
  setShowDetails(true);
  setCurPokemon(pokemon); // Set the current Pokémon to show its details
}

function closePokemon(setShowDetails: React.Dispatch<React.SetStateAction<boolean>>) {
  // Function to close the Pokémon details view
  setShowDetails(false);
}

export default function Inventory({inventory}:{inventory: Pokemon[]}) {
  const [showDetails, setShowDetails] = useState(false);
  const [curPokemon, setCurPokemon] = useState<Pokemon | null>(null); // State to hold the current Pokémon details
  const [searchQuery, setSearchQuery] = useState(""); // State to track the search query
  const [showOnlyShinies, setShowOnlyShinies] = useState(false); // State to toggle shiny Pokémon


   // Filter the inventory based on the search query
   const filteredInventory = inventory.filter((pokemon) => {
    if (!pokemon.name) {
      return false; // Skip null or undefined names
    }
    const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesShiny = !showOnlyShinies || pokemon.shiny > 0; // Include only shinies if toggle is active
    return matchesSearch && matchesShiny;
  });

    return (
      <div className="flex flex-col justify-center items-center h-screen w-full bg-[url('/school.gif')] bg-cover bg-center"
      style={{
        backgroundPosition: "center bottom", // Shift the background image upwards
      }}>
        <div className = "font-sans w-[26.5rem] text-sm sm:text-base rounded-lg p-4 bg-yellow-200"><WavyText text1 = "Say " wave = "hi~" text2=" to your Pokemon!"  /></div>
        <div className="w-[26.5rem] flex items-center justify-around bg-yellow-200 rounded-lg mt-1 mb-1 p-2 gap-2">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Pokemon Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            // focus-outline-none: removes default browser outline when input field is focused
            // focus:ring-2 and focus:ring-yellow-500: adds yellow 2px ring when focused
            className="w-[80%] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* Shiny Button */}
          <button
            onClick={() => setShowOnlyShinies((prev) => !prev)} // Toggle shiny mode
            className={`px-4 py-2 rounded-lg ${
              showOnlyShinies ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Shinies
          </button>
      </div>
        {/* Show inventory */}
        {!showDetails && (
        /* Inventory Box */
        <div className="w-[26.5rem] h-[26.5rem] grid grid-cols-2 gap-x-4 gap-y-4 overflow-y-scroll scrollbar bg-[#D30A40] p-4"
        style={{
          gridTemplateRows: `repeat(2, 1fr)`, // Divide the grid height into 2 equal rows
        }}
        >
          {filteredInventory.map((pokemon) => (
            <button
              key={pokemon.id}
              type = "button"
              onClick = {() => showPokemon(pokemon, setShowDetails, setCurPokemon)} // Handle click event
              className="aspect-square flex justify-center bg-yellow-200 hover:bg-yellow-300 rounded-md p-2"
            >
              <Image
                src={pokemon.sprite || "/pokeball.webp"} // Use the sprite URL for the image or a placeholder
                alt={pokemon.name || "Pokeball"} // Use the Pokémon's name as the alt text
                width={100} // Set the width of the image
                height={100} // Set the height of the image
                className="w-full h-full object-contain" // Ensure the image fits within the box
              />
            </button>
          ))}
        </div>
        )}
        {/* Show Pokemon description */}
        {showDetails && (
          <div className="flex w-[26.5rem] h-[26.5rem] aspect-square bg-[#D30A40] scrollbar overflow-y-scroll items-center justify-center">
            <div className="w-[90%] h-[90%] grid grid-rows-2 justify-center items-center bg-yellow-200 rounded-md p-2">
            <div className="flex flex-row items-center justify-center h-full">
              <div className="flex flex-col justify-center w-[60%]">
                <h2 className="text-center text-l font-bold font-sans">{curPokemon?.name}</h2> {/* Pokémon name */}
                <p className="text-center text-sm">{curPokemon?.type} Type</p> {/* Pokémon type */}
                <p className="text-center text-sm">Pokedex ID: {curPokemon?.id}</p> {/* Pokémon ID */}
                <p className="text-center text-sm">Discovered: {curPokemon?.date ? new Date(curPokemon?.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",}): ""}</p> {/* Date discovered*/}
                <p className="text-center text-sm">Normal Caught: {curPokemon?.normal}</p> {/* Number of normal */}
                <p className="text-center text-sm">Shiny Caught: {curPokemon?.shiny}</p> {/* Number of shinies */}
              </div>
              <Image
                  src={curPokemon?.sprite || "/pokeball.webp"} // Use the sprite URL for the image or a placeholder
                  alt={curPokemon?.name || "Pokeball"} // Use the Pokémon's name as the alt text
                  width={100} // Set the width of the image
                  height={100} // Set the height of the image
                  className="w-full h-full object-contain" // Ensure the image fits within the box
                />
            </div>
              {/* Second Row: Large Box and Button */}
              <div className="flex flex-col items-end justify-between h-full">
                {/* Large Box */}
                <div className="w-[100%] h-[90%] bg-yellow-300 rounded-md p-4">
                  {/* Add content for the large box here */}
                  <p className="text-center text-sm">{curPokemon?.description}</p> {/* Pokémon description */}
                </div>
                <div className = "flex flex-row mt-2 w-full justify-between items-center">
                  <audio controls className="w-[80%] h-[80%]">
                    <source src={curPokemon?.sound} type="audio/ogg" /> {/* Pokémon sound: not possible on IOS */}
                    Your browser does not support the audio element.
                  </audio>
                    {/* Back Button */}
                    <button
                      type="button"
                      onClick={() => closePokemon(setShowDetails)} // Handle click event
                      className="w-[3rem] h-[3rem] flex justify-center items-center bg-yellow-400 hover:bg-yellow-500 rounded-md"
                    >
                      Back
                    </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }