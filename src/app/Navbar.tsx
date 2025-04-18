"use client"; // This component is a client component
import NavComponent from "./nav-element";
import { usePathname } from "next/navigation"; // To get the current path
import {signOut} from '../../auth'; // To sign out the user
import { PowerIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const pathname = usePathname(); // Get the current path
  return (
    <div className="relative">
      {/* group: groups the circle and hidden navbar content together so they can be hovered together
      */}
      <div className="fixed bottom-10 right-10 group">
        {/* Circle that will be visible */}
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300">
          <div className="text-white font-semibold">+</div>
        </div>
        {/* Hidden navbar content (shows when hover over the circle) using GROUP-HOVER */}
        <div className="font-sans text-[0.5rem] absolute bottom-20 right-0 flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <NavComponent pathname = {pathname} path = "/" text = "Home"/>
          <NavComponent pathname = {pathname} path = "/collection" text = "Collection"/>
          <NavComponent pathname = {pathname} path = "/profile" text = "Profile"/>
        </div>
      </div>
      {/* <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form> */}
    </div>
  );
}