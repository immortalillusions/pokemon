'use client';
import { useState } from 'react'; 
import clsx from 'clsx';
import useSound from 'use-sound'; // Import useSound for sound effects
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function MusicButton({className, ...rest }: ButtonProps) {

   const songs = ["Petalburg City.mp3","Oldale Town.mp3","Surf.mp3","Slateport City.mp3"]
   const [song, setSong] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false); // State to track if the music is playing
   const [playMusic, {pause: pauseMusic}] = useSound(songs[song], { volume: 0.5, 
    onend: () => {
        setSong((song+1)%songs.length); // play next song on next start
        setIsPlaying(false); // no longer playing
    }
    });

    const toggleMusic = () => {
    if (isPlaying) {
        pauseMusic(); // Pause the music
    } else {
      playMusic(); // Play the music
    }

    setIsPlaying(!isPlaying); // Toggle the playing state
  };

  return (
    <button
      {...rest}
      onClick={toggleMusic}
      className={clsx(
        'flex h-10 items-center fixed top-10 right-10 rounded-lg bg-yellow-400 px-4 text-sm font-bold text-white transition-colors hover:bg-yellow-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-yellow-500 active:bg-yellow-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {isPlaying ? "Pause" : "Play"}
    </button>
  );
}
