import NavComponent from "./nav-element";
import Logout from './login/logout'; // To sign out the user
import { getSession } from "@/app/lib/actions"; // To get the session

export default async function Navbar() {
  const session = await getSession(); // Get the session to check if the user is logged in
  return (
    <div>
    {/* only show navbar when logged in */}
    {session.isLoggedIn && <div className="relative">
      {/* group: groups the circle and hidden navbar content together so they can be hovered together
      */}
      <div className="fixed bottom-10 right-10 group">
        {/* Circle that will be visible */}
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300">
          <div className="text-white font-semibold">+</div>
        </div>
        {/* Hidden navbar content (shows when hover over the circle) using GROUP-HOVER */}
        <div className="font-sans text-[0.5rem] absolute bottom-20 right-0 flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <NavComponent path = "/" text = "Home"/>
          <NavComponent path = "/collection" text = "Collection"/>
          <NavComponent path = "/profile" text = "Profile"/>
          <Logout/>
        </div>
      </div>
    </div>}
    </div>
  );
}