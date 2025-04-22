'use server';
import { signIn } from '../../../auth';
//import { signIn } from '../../pages/api/auth/nextauth';
import { AuthError } from 'next-auth';
// session
import {sessionOptions, sessionData} from './lib'; // Import session options and session data types
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { defaultSession } from './lib'; // Import default session data

// access pokemon API (maybe move to an api route/backend instead?)
export async function getPokemonData(pokemonId: number, shiny: boolean) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
  // get species description
  const url2 = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
  try {
    const response = await fetch(url);
    const response2 = await fetch(url2);
    if (response.ok && response2.ok) {
      const data = await response.json();
      const data2 = await response2.json();
      // get the english flavour text
      let i = 0;
      let language = data2.flavor_text_entries[i].language.name;
      while (language !== "en" && i < data2.flavor_text_entries.length) {
        i++;
        language = data2.flavor_text_entries[i].language.name;
      }
      return { 
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        sprite: shiny ? data.sprites.front_shiny : data.sprites.front_default,
        sprite_shiny: data.sprites.front_shiny,
        sprite_normal: data.sprites.front_default,
        type: data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1),
        sound: data.cries.latest, // .ogg
        description: data2.flavor_text_entries[i].flavor_text
          .replace(/\s+/g, " ") // Remove non ASCII and get the first flavor text entry
          .replace(/POKéMON/g, "Pokémon")
          .replace(/\b[A-Z]+\b/g, (word: string) => word.charAt(0) + word.slice(1).toLowerCase()) // Convert remaining all-uppercase words to Title Case
          .replace(/\b[A-Z]{2,}[a-z][A-Z]*\b/g, (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Convert words with 2+ capital letters and exactly one lowercase letter to Title Case
          .replace(/-\s+/g, "-"), // Remove spaces after hyphens
      };
    } else {
      console.error("Failed to fetch data:", response.status && response2.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null;
  }
}

export const getSession = async ()=>{
  "use server";
  // decrypt cookies with sessionOptions definition
  // goat tutorial: https://www.youtube.com/watch?v=p_FiVGxyksI
  const session = await getIronSession<sessionData>(await cookies(), sessionOptions); 
  // ensures that the session is not undefined (by setting it to false)
  if(!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn; // Set default session if not logged in
  }
  return session;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}