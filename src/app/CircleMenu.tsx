'use client';

import { useState } from "react";

export default function CircleMenu({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle the menu state
  };

  return (
    <div className="fixed bottom-10 right-10">
      {/* Circle that will be visible */}
      <div
        onClick={toggleMenu} // Toggle menu on click
        className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
      >
        <div className="text-white font-semibold">+</div>
      </div>
      {/* Render children when the menu is open */}
      {isMenuOpen && (
        <div className="font-sans text-[0.5rem] absolute bottom-20 right-0 flex flex-col items-center space-y-2 transition-opacity duration-300">
          {children}
        </div>
      )}
    </div>
  );
}