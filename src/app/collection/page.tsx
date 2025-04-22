"use server"; // This component is a server component
import Inventory from "./inventory"; // Import the Inventory component
import { cookies } from "next/headers";
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
  inventory = inventory.map((pokemon: Pokemon) => {
    let getShiny = false;
    if (pokemon.shiny > 0){
        getShiny = true;
    }
    return{
      ...pokemon,
      sprite: getShiny ? pokemon.sprite_shiny : pokemon.sprite_normal, // Use normal sprite by default
    }
  }).reverse(); // Reverse the order of the inventory array to have more recent at top
  // inventory has an object with all null (edge case)
  if (inventory.length === 1 && inventory[0] && Object.values(inventory[0]).every((value) => value === null)) {
    inventory = [];
  }
  console.log("Inventory:", inventory); // Log the inventory to see the fetched data
  return (
    <Inventory inventory = {inventory} />
  );
}