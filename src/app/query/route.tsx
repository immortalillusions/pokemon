import postgres from 'postgres';
// api route
// ensures the postgresql connection is created only once bc not in any function/conponent
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listUser(user_id: number) {
	const data = await sql`
        SELECT 
        users.id AS user_id,
        users.name AS user_name,
        users.password AS user_password,
        users.email AS user_email,
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
    // Extract user_id from the query parameters
    const { searchParams } = new URL(request.url);
    const user_id = parseInt(searchParams.get('user_id') || '', 10);

    if (isNaN(user_id)) {
      return Response.json({ error: 'Invalid or missing user_id' }, { status: 400 });
    }

    // Fetch user data
    const user = await listUser(user_id);

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}