"use client"; // This component is a client component
import { useState } from "react";

export default function Collection() {
  // Mock inventory data (replace with your actual data)
  const inventory = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Inventory Box */}
      <div className="w-[26.5rem] h-[26.5rem] grid grid-cols-3 gap-4 overflow-y-scroll bg-[#D30A40] border border-gray-300 rounded-lg p-4">
        {inventory.map((item, index) => (
          <div
            key={index}
            className="w-[7.5rem] h-[7.5rem] flex items-center justify-center bg-yellow-200 border border-yellow-300 rounded-md p-2"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}