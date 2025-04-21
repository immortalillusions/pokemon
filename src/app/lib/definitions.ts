// Define the structure of a Pokémon
export type Pokemon = {
    id: number;
    date: Date;
    shiny: number;
    normal: number;
  };
  
  // Define the structure of a user
  export type User = {
    id: string; // UUID
    name: string;
    email: string;
    password: string;
    pokemon: Pokemon[];
    guest_created?: Date;
  };