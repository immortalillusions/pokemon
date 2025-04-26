'use client';
import { useState, useEffect } from "react";

export default function Spinner() {
  const [isSpinning, setIsSpinning] = useState(true); // State to control spinning
  const [rotation, setRotation] = useState(0); // Current rotation of the wheel
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Selected option

  const handleStop = () => {
    setIsSpinning(false); // Stop the spinning

    // Normalize rotation to a 0-360 degree range
    const normalizedRotation = (rotation % 360 + 360) % 360;

    // Determine the selected option based on the arrow's position
    // Section B: 0-144 degrees (40% of the circle)
    // Section A: 144-360 degrees (60% of the circle)
    if (normalizedRotation >= 0 && normalizedRotation < 144) {
      setSelectedOption("B");
    } else {
      setSelectedOption("A");
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

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Spinner Wheel */}
      <div className="relative">
        <div
          className="w-40 h-40 rounded-full"
          style={{
            background: `conic-gradient(
              #ff0000 0deg 216deg,  /* Red for A (60%) */
              #0000ff 216deg 360deg /* Blue for B (40%) */
            )`,
            transform: `rotate(${rotation}deg)`, // Apply rotation
          }}
        ></div>

        {/* Arrow Indicator */}
        <div className="absolute top-[-10px] left-[50%] transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-black"></div>
        </div>
      </div>

      {/* Stop Button */}
      <button
        onClick={handleStop}
        className="mt-8 px-4 py-2 bg-yellow-500 text-white rounded-lg font-bold"
        disabled={!isSpinning} // Disable button if already stopped
      >
        Stop
      </button>

      {/* Display Selected Option */}
      {selectedOption && (
        <div className="mt-4 text-xl font-bold">
          Selected Option: {selectedOption}
        </div>
      )}
    </div>
  );
}