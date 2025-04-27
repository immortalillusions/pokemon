'use client';
import { useState, useEffect } from "react";
import Image from "next/image";

interface SpinnerProps {
  ball: number;
  setBall: React.Dispatch<React.SetStateAction<number>>; // default is -1, 0 is pokeball, 1 is greatball
}

export default function Spinner({ball, setBall}: SpinnerProps) {
  const [isSpinning, setIsSpinning] = useState(true); // State to control spinning
  const [rotation, setRotation] = useState(0); // Current rotation of the wheel
  
  const handleStop = () => {
    setIsSpinning(false); // Stop the spinning

    // Normalize rotation to a 0-360 degree range
    const normalizedRotation = (rotation % 360 + 360) % 360;

    // Determine the selected option based on the arrow's position
    // great ball: 0-144 degrees (40% of the circle)
    // pokeball: 144-360 degrees (60% of the circle)
    if (normalizedRotation >= 0 && normalizedRotation < 144) {
      setBall(1); // Set to Great Ball
    } else {
      setBall(0); // Pokeball
    }
  };

  // Simulate spinning
  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        setRotation((prev) => prev + 10); // Decrement rotation by 10 degrees
      }, 50); // Update every 50ms
      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [isSpinning]);

  const spinnerBackground =
    ball === 0
      ? `conic-gradient(
          #00ff00 0deg 216deg,  /* Green for A (60%) */
          #0000ff 216deg 360deg /* Blue for B (40%) */
        )`
      : ball === 1
      ? `conic-gradient(
          #ff0000 0deg 216deg,  /* Red for A (60%) */
          #00ff00 216deg 360deg /* Green for B (40%) */
        )`
      : `conic-gradient(
          #ff0000 0deg 216deg,  /* Red for A (60%) */
          #0000ff 216deg 360deg /* Blue for B (40%) */
        )`;

  return (
    <div className="absolute top-[9%] left-[38%] w-[140px] h-[140px] sm:w-[190px] sm:h-[190px] sm:top-[8%] sm:left-[36%]">
      {/* This container is so that the arrows/pictures can be positioned more precisely against the wheel
      since "absolute" keyword positions the stuff precisely against its closest ancestor */}
      <div className="relative flex justify-center items-center h-full w-full"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: spinnerBackground,
            transform: `rotate(${rotation}deg)`, // Apply rotation
          }}
        >
          {/* Picture for pokeball */}
        <Image
          src="/pokeball.webp" 
          alt="Pokeball"
          width = {100}
          height = {100}
          className="absolute bottom-[25%] left-[84%] transform -translate-x-1/2 w-[20%] h-auto"
          style={{
            transform: `rotate(-${rotation}deg)`, // image spins with circle bc it's within the parent div but to prevent itself from rotating we do this
          }}
        />

        {/* Picture for great ball */}
        <Image
          src="/great-ball.png" 
          alt="Greatball"
          width = {100}
          height = {100}
          className="absolute top-[29%] left-[16%] transform -translate-x-1/2 w-[25%] h-auto"
          style={{
            transform: `rotate(-${rotation}deg)`, 
          }}
        />
        </div>
        

        {/* Arrow Indicator */}
        <div className="absolute top-0 left-[50%] transform -translate-x-1/2 -translate-y-[50%]">
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-black"></div>
        </div>
        {/* Stop Button */}
      <button
        onClick={handleStop}
        className="font-sans absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white rounded-lg
        px-1 py-1 text-[0.53rem] sm:px-2 sm:py-2 sm:text-[0.7rem]" // Smaller font and button for extra small screens
        disabled={!isSpinning} // Disable button if already stopped
      >
        Stop
      </button>
      </div>
  </div>
  );
}