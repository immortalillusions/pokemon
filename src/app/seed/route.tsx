import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import {users} from '../lib/data';
import {Pokemon, User} from '../lib/definitions';
// if alr seeded, will return {"error":"Cannot read properties of undefined (reading 'id')"}

// This file is used to seed the database with initial data
// because i never make a GET request for this, it will never run/populate the database UNLESS i visit http://localhost:3000/seed
// this populates the postgres database

// sql is an instance of postgres which allows us to execute sql queries
// this line connects it with the db
// sql'' executes a single SQL query  while sql.begin() executes multiple SQL queries in a transaction (so if one fails the entire transaction is rolled back to original state)
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers(sql: postgres.TransactionSql<{}>) {
  // creates users table with the following columns
  // we're gonna have each email be tied to one account
  // enables uuid-ossp extension to generate universally unique identifiers (UUIDs) such as uuid_generate_v4()
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;
  // inserts the data from the data.ts file into the users table
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      // if i omit the id column in insert into users, uuid_generate_v4() will generate a new UUID
      const [insertedUser] = await sql`
        INSERT INTO users (name, email, password)
        VALUES (${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING
        RETURNING id;
      `;
      return { ...user, id: insertedUser.id }; // Attach the generated ID to the user object
    }),
  );

  return insertedUsers;
}

async function seedPokemon(sql: postgres.TransactionSql<{}>, usersList: User[]) {
    // UNIQUE() ensure no user has duplicate rows of pokemon
    await sql`
      CREATE TABLE IF NOT EXISTS pokemon (
        id INTEGER NOT NULL CHECK (id >= 0),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        shiny INTEGER NOT NULL CHECK (shiny >= 0),
        normal INTEGER NOT NULL CHECK (normal >= 0),
        UNIQUE(id, user_id)
      );
    `;
  
    const insertedPokemon = await Promise.all(
      usersList.flatMap((user) =>
        user.pokemon.map((poke) =>
        // inserts the pokemon data into each user
          sql`
            INSERT INTO pokemon (id, user_id, date, shiny, normal)
            VALUES (${poke.id}, ${user.id}, ${poke.date}, ${poke.shiny}, ${poke.normal})
            ON CONFLICT (id, user_id) DO NOTHING;
          `,
        ),
      ),
    );
  
    return insertedPokemon;
  }

export async function GET() {
  try {
    await sql.begin(async (sql) => {
        // Seed users and get their IDs
        const usersWithIds = await seedUsers(sql);
  
        // Seed Pokémon using the generated user IDs
        await seedPokemon(sql, usersWithIds);
    });

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
