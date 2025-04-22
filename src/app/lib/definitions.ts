// Define the structure of a Pokémon
export type Pokemon = {
    id: number;
    date: Date;
    shiny: number;
    normal: number;
    sprite?: string;
    name?: string;
    type?: string;
    sound?: string; // .ogg
    description?: string; // Description of the Pokemon
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