import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listUser() {
    // test querying with sample email
    const email = "user@gmail.com"
	const data = await sql`
        SELECT 
        users.id AS user_id,
        users.name AS user_name,
        users.password AS user_password,
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
        WHERE users.email = ${email}
        GROUP BY users.id;
  `;

	return data;
}
// browser willautomateically make a GET() request when i visit this URL http://localhost:3000/query
// so even tho i'm not calling this anywhere, it will still run if i visit the link
export async function GET() {
  try {
    return Response.json(await listUser());
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}