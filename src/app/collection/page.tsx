"use client"; // This component is a client component
import { useEffect, useState } from "react";
// typescript must specify it's string
async function getPokemonData(pokemonIdOrName: number) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}/`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return {
        name: data.name,
        sprite: data.sprites.front_default,
        type: data.types[0].type.name,
      };
    } else {
      console.error("Failed to fetch data:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null;
  }
}
async function loadPokemon(id: number) {
  // Fetch pikachu: 25
  const data = await getPokemonData(id);
  if (data) {
    // Get the elements by their IDs (as specified in the return() function)
    // and then edit those elements (eg. setting their texts, images)
    const nameElement = document.getElementById("pokemonName");
    const imageElement = document.getElementById("pokemonImage") as HTMLImageElement | null;
    const typeElement = document.getElementById("pokemonType");

    if (nameElement) nameElement.innerText = data.name;
    if (imageElement) imageElement.src = data.sprite;
    if (typeElement) typeElement.innerText = data.type;
  }
}
export default function Collection() {
  // State to store the random Pokémon ID
  const [random_id, setRandomId] = useState(1); // Default to 1 (Bulbasaur)
  useEffect(() => {
    loadPokemon(1);
  }, []);
    return (
      <div className="flex flex-col gap-8 justify-center items-center h-screen">
        <h1 className="text-3xl font-bold font-sans">Collect</h1>
        <p className="text-lg">This is the gacha page</p>
        <div className = "flex flex-col gap-2 font-sans items-center">
          {/* Each element has a specified id */}
          <h1 id="pokemonName">Pokémon Name</h1>
          <img id="pokemonImage" alt="Pokemon" />
          <p id="pokemonType">Type</p>
        </div>
        <button
          onClick={() => {
            setRandomId(Math.floor(Math.random() * 500)); // Random number between 1 and 500
            loadPokemon(random_id);
          }}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Choose your pokemon!
        </button>
      </div>
    );
  }