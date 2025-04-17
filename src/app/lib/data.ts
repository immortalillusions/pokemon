
// sample data for now
const users = [
    {
     // to allow it to generate unique UUID  id: "1",
        name: "John Doe",
        email: "user@gmail.com",
        password: "password",
        pokemon: [
            {
               id: 1,
               date: "2024-10-01", 
               shiny: 0,
               normal: 1
            },
            {
                id: 2,
                date: "2024-10-02",
                shiny: 1,
                normal: 3
            },
        ]       
    },
    {
      //  id: "2",
        name: "Jane Smith",
        email: "hello@gmail.com",
        password: "pokemon",
        pokemon: [
            {
                id: 1,
                date: "2025-10-01",
                shiny: 2,
                normal: 3
            },
            {
                id: 53,
                date: "2025-10-02",
                shiny: 5,
                normal: 0
            }
        ]
    },
]

export {users};