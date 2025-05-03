//"use client"; // This is a client component, lets me use useState
import Image from "next/image";

import Welcome from "./welcome";
import FlipPikachu from "./flipPikachu";

export default function Home() {
  return (
    /*
      * grid: enables CSS grid layout
      * grid-rows-[20px_1fr_40px]: spacing/header, main, footer
      * min-h-screen: sets minimum height to 100 vertical height
      * p-8 pb-20: padding of 8 units and bottom padding of 20 units
      * gap-16: gap of 16 units between grid items
      * sm:p-20: padding of 20 units on screens larger than 'sm' breakpoint, else it's the padding on the left of sm:
      */
     // need to explicitly specify text-black so that it doesn't become white in dark mode
    <div className="grid grid-rows-[20px_1fr_40px] text-black items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-[url('/forest.gif')] bg-cover bg-center">
      <Welcome />
    </div>
  );
}
