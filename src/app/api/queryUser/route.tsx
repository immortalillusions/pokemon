import postgres from 'postgres';
import { getSession } from '../../lib/actions'; // Adjust the import path as necessary
// api route
// ensures the postgresql connection is created only once bc not in any function/conponent
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listUser(user_id: string) {
	const data = await sql`
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
        ) AS pokemon,
        users.guest_created AS guest_created
        FROM users
        LEFT JOIN pokemon ON users.id = pokemon.user_id
        WHERE users.id = ${user_id}
        GROUP BY users.id;
  `;

	return data[0] || null; // Return the first user or null if not found
}
// browser willautomateically make a GET() request when i visit this URL http://localhost:3000/query
// so even tho i'm not calling this anywhere, it will still run if i visit the link
// API route to handle GET requests
export async function GET(request: Request) {
  try {
    const session = await getSession();
    const isLoggedIn = session.isLoggedIn; 
    const user_id = session.userId;
    // no user id means not logged in
    if (!(user_id)) {
      return Response.json({});
    }

    // Fetch user data
    const user = await listUser(user_id);

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    return Response.json( {...user, isLoggedIn});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}