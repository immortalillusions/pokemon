"use server"; // This component is a server component
import Inventory from "./inventory"; // Import the Inventory component
import { cookies } from "next/headers";
import { getPokemonData } from "../lib/actions";
import { Pokemon } from "../lib/definitions"; // Import the Pokemon type

export default async function Collection() {
  let inventory = []; // Initialize an empty inventory array
  try {
      // Construct the absolute URL for the API call
      // NOTE NEED TO UPDATE THE URLS FOR PRODUCTION
      const baseUrl = process.env.NODE_ENV === "production"? process.env.PUBLIC_BASE_URL: "http://localhost:3000"; // Use environment variable or fallback to localhost
      const response = await fetch(`${baseUrl}/api/queryUser`, {
        method: "GET",
        headers: { Cookie: cookies().toString() }, // include cookies in request (bc this is server side)
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      inventory = data.pokemon;
  } catch (error) {
    console.error("Error:", error);
  }
  inventory = await Promise.all(
    inventory.map(async (pokemon: Pokemon)=>{
      // Fetch Pokémon data for each item in the inventory
      // If they have both shiny + normal, show shiny pokemon
      let getShiny = false;
      if (pokemon.shiny > 0){
        getShiny = true;
      }
      // avoid unnecessary api calls if we already have the data
      if (pokemon.sprite && pokemon.name && pokemon.type && pokemon.sound) {
        return pokemon; // Return the original Pokémon if data is already available
      }
      // api call
      const pokemonData = await getPokemonData(pokemon.id, getShiny);

      if (pokemonData) {
        return {
          ...pokemon,
          sprite: pokemonData.sprite, // Update the sprite URL
          name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
          type: pokemonData.type.charAt(0).toUpperCase() + pokemonData.type.slice(1),
          sound: pokemonData.sound, // Update the Pokémon sound (if needed)
          description: pokemonData.description, // Get the first flavor text entry
        };
      } else {
        console.error("Failed to fetch Pokémon data.");
        return pokemon; // Return the original Pokémon if data fetch fails
      }
    })
  );
  console.log("Inventory:", inventory); // Log the inventory to see the fetched data
  return (
    <Inventory inventory = {inventory} />
  );
}