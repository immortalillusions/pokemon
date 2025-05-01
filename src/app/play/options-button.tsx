import useSound from 'use-sound';

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
    catchPhase: boolean;
    setCatchPhase: React.Dispatch<React.SetStateAction<boolean>>;
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
    catchPhase,
    setCatchPhase,
  }: OptionsButtonProps) {   
    const [play] = useSound("/correct.mp3", {volume: 0.5});
    const [play2] = useSound("/wrong.mp3", {volume: 0.5});
    const verify = async () => {
        // Check if the guess is correct
        if (guess?.toLowerCase() === answer?.toLowerCase()) {
            setCorrect(true); // Set correct state to true
            setCatchPhase(true); // Set catch phase to true
            play();
        } else {
            setCorrect(false); // Set correct state to false
            play2();
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