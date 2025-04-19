import postgres from 'postgres';
import { User } from './definitions'; // Import the User type definition

// Create a single PostgreSQL connection instance
// bad to repeatedly create db connection
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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