"use client"; // This component is a client component
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // To get the current path

// must put curly brackets bc react only takes one argument: props
export default function NavComponent({path, text}:{path: string; text: string}) {
  const pathname = usePathname(); // Get the current path
  // using Link instead of a tag to enable client-side navigation so we don't have a full page refresh
    return (<Link href={path} passHref>
          {/* {``} for template literal which allows us to embed dynamic values into string
            * eg. ${pathname === "/"}: if pathname is /, then add bg-yellow-600 class to the button
          */}
            <button className={`h-7 text-white py-2 rounded-md w-32 hover:bg-yellow-600 transition flex items-center 
              ${pathname === path ? "bg-yellow-400 px-2" : "bg-yellow-500 px-4"}`}>
              {/* If pathname is /, show the image; && is conditional rendering not merely an and */}
              {pathname === path && (
                  <Image
                    src="/pokeball.webp" 
                    alt="Pokeball"
                    width={16}
                    height={16}
                    className="mr-2" // Add margin to the right of the image
                  />
              )}
              {text}
            </button>
    </Link>);

}