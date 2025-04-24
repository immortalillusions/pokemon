
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface OptionsButtonProps {
    guess: string | undefined;
    answer: string  | undefined;
    randomId: number | undefined;
    randomShiny: boolean | undefined;
    guessing: boolean;
    setGuessing: React.Dispatch<React.SetStateAction<boolean>>;
    correct: boolean;
    setCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  export default function OptionsButton({
    guess,
    answer,
    randomId,
    randomShiny,
    guessing,
    setGuessing,
    correct,
    setCorrect,
  }: OptionsButtonProps) {   
    const verify = async () => {
        // Check if the guess is correct
        if (guess?.toLowerCase() === answer?.toLowerCase()) {
            setCorrect(true); // Set correct state to true
            // add pokemon to db
            // add new pokemon
            try{
                const response = await fetch("/api/addPokemon", {
                method: "POST", // modifying data
                body: JSON.stringify({
                // Send data in the body
                // user id will be extracted from the session in the api route
                    pokeId: randomId,
                    shiny: randomShiny,
                }),
                headers: {
                    "Content-Type": "application/json", // json type
                },
                });

                if (!response.ok) {
                throw new Error("Failed to add Pokemon");
                }

            //   const data = await response.json();
            // console.log("New pokemon: ", data);
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            setCorrect(false); // Set correct state to false
        }
        setGuessing(false); // End the guessing phase
      };
      return(
            <button
            onClick={verify}
            disabled={!guessing}
            className={`h-[50%] w-[100%] items-center font-sans rounded-lg text-[0.5rem] font-medium text-white transition-colors 
            ${guessing ? "bg-[#D30A40] hover:bg-red-500" : (guess?.toLowerCase() === answer?.toLowerCase()?"bg-green-500":"bg-red-950")}`}
                
        >  
            <span className="flex items-center justify-center gap-2">
                {guessing ? guess : (guess?.toLowerCase() === answer?.toLowerCase() ? guess : "")} 
                {guess?.toLowerCase() === answer?.toLowerCase() && correct ? <CheckCircleIcon className="h-5 w-5" /> : ""}
            </span>
        </button>
      );
}