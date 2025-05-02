import NavComponent from "./nav-element";
import Logout from './login/logout'; // To sign out the user
import RedirectToSignup from "./signup/guest-signup";
import { getSession } from "@/app/lib/actions"; // To get the session
import CircleMenu from "./CircleMenu"; // To show the circle menu when logged in
import { Bars3Icon } from "@heroicons/react/24/outline";

export default async function Navbar() {
  const session = await getSession(); // Get the session to check if the user is logged in
  return (
    <div>
      {/* Only show navbar when logged in */}
      {/* mobile */}
      {session.isLoggedIn && (
        <div className="relative">
          <div className="block lg:hidden fixed bottom-2 left-2">
          <CircleMenu>
            {/* Pass menu content as children bc logout does serverside stuff and can't be within 
            client component - work around is to pass it in navbar (server) as a prop to circle menu (client) */}
            <NavComponent path="/" text="Home" />
            <NavComponent path="/collection" text="Collection" />
            <NavComponent path="/play" text="Play" />
            {session.guest_created === null ? <Logout /> : <RedirectToSignup />}
          </CircleMenu>
        </div>
        {/* desktop */}
        <div className="hidden lg:block fixed bottom-10 left-10 group">
        {/* Circle that will be visible */}
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300">
          <div className="text-white font-semibold"><Bars3Icon className="w-10"/></div>
        </div>
        {/* Hidden navbar content (shows when hover over the circle) using GROUP-HOVER */}
        <div className="font-sans text-[0.5rem] absolute bottom-20 left-0 flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <NavComponent path = "/" text = "Home"/>
          <NavComponent path = "/collection" text = "Collection"/>
          <NavComponent path = "/play" text = "Play"/>
          {session.guest_created === null ? <Logout /> : <RedirectToSignup />}
        </div>
      </div>
    </div>
  )}
  </div>
  );
}