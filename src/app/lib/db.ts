import postgres from 'postgres';
import { User, Pokemon } from './definitions'; // Import the User type definition

// note these backend/postgres functions cannot be called to frontend (else "can't resolve net")
// so either call it on server "use server" or API route

// Create a single PostgreSQL connection instance
// bad to repeatedly create db connection
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// returns true if a new pokemon was found by player
export async function addPokemon(pokeId: number, userId: string, shiny: boolean): Promise<boolean> {
    // returns a 1 for each matching row (this will either be empty or 1)
    const matches = await sql`SELECT 1 FROM pokemon WHERE (user_id = ${userId} AND id = ${pokeId})`;
    const date = new Date(); // get current date
    // new pokemon found
    if (matches.length === 0) {
        // if no matches, insert new pokemon along with the date it was discovered for first time
        if (shiny){
            await sql`INSERT INTO pokemon (user_id, id, shiny, normal, date) VALUES (${userId}, ${pokeId}, 1, 0, ${date})`;
        } else {
            await sql`INSERT INTO pokemon (user_id, id, shiny, normal, date) VALUES (${userId}, ${pokeId}, 0, 1, ${date})`;
        }
        return true
    }  
    if (shiny){
        await sql`UPDATE pokemon SET shiny = shiny + 1 WHERE (user_id = ${userId} AND id = ${pokeId})`;
    } else {
        await sql`UPDATE pokemon SET normal = normal + 1 WHERE (user_id = ${userId} AND id = ${pokeId})`;
    }
    return false
}

export async function getUserPokemonInfo(id: number, userId: string): Promise<Pokemon> {
    const poke = await sql<Pokemon[]>`
        SELECT 
            id,
            date,
            shiny,
            normal
        FROM pokemon
        WHERE user_id = ${userId} AND id = ${id};
    `;
    return poke[0]; // Return the pokemon
}

// Function to fetch user data by user ID
export async function getUser(userId: string | undefined): Promise<User | null> {
    if (!userId) {
        throw new Error('User ID is not defined in the session.');
    }
    try{
        const data = await sql<User[]>`
            SELECT 
                users.id AS id,
                users.name AS name,
                users.password AS password,
                users.email AS email,
                json_agg(
                json_build_object(
                    'id', pokemon.id,
                    'date', pokemon.date,
                    'shiny', pokemon.shiny,
                    'normal', pokemon.normal
                )
                ) AS pokemon
            FROM users
            LEFT JOIN pokemon ON users.id = pokemon.user_id
            WHERE users.id = ${userId}
            GROUP BY users.id;
            `;
            if (!data || data.length === 0) {
                throw new Error('User not found.');
            }
        
            return data[0] || null; // Return the first user or null if not found
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Failed to fetch user data.');
        }
    
  }

export default sql;