import {addPokemon} from "../../lib/db";
import {getSession, getPokemonData} from "../../lib/actions"; // To get the session
// data is sent in the request body for POST vs query params for GET
export async function POST(request: Request) {
  try {
    const session = await getSession(); // Get the user id
    const user_id = session.userId;
    // Extract info from the request body parameters
    const body = await request.json();

    const pokeId = body.pokeId;
    const shiny = body.shiny;

    const pokemonData = await getPokemonData(pokeId, shiny);

    if (!(user_id) || !(pokeId)) {
      return Response.json({ error: 'Invalid or missing userId, pokeId' }, { status: 400 });
    }

    // Fetch user data
    const newPokemon = await addPokemon(pokeId, user_id, shiny, pokemonData?.name, pokemonData?.sprite_shiny, pokemonData?.sprite_normal, pokemonData?.type, pokemonData?.sound, pokemonData?.description);

    return Response.json(newPokemon, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}