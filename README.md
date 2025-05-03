# PokiGuess 🎮
Guess the Pokemon correctly for the chance to catch it!

This was inspired by all my friends who are obsessed with TCG packs :)

## 🧭 Catching Pokemon
1. 🔍 Your journey begins with a search. While you wait for a Pokemon to appear, why don't you read a fun fact about a random Pokemon? 
2. 🕵️ Guess the Pokemon based on its outline!
3. ✅ If you guess correctly, choose between Pokeball (30% success) and Great Ball (60% success)
4. 🎯 Catch the Pokemon! (✨ 10% shiny chance)

## ⚙️ Features
🔐 **Authentication**: Create an account to save your progress or play as a Guest. Implemented with middleware, Iron Session, bcrypt, zod, and NextAuth.js. 

🧑‍🤝‍🧑 **Pokemon Collection**: Say hi to all your new Pokemon friends! Data is saved with NeonDB (PostgreSQL) and updated through custom API routes (GET, POST). Each Pokemon's fun fact & ingame sound is courtesy of PokeAPI.

🎵 **Misc**: Music/sound effects are implemented with use-sound (React hook). GUI is created with Tailwind CSS, HTML, React.js. Animations use framer-motion & CSS animations.

📱 **Mobile Compatible**: Adjustable items scale with screen size. However, Pokemon sounds are not compatible on iOS (.ogg format).