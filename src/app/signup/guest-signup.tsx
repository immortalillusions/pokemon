
"use client"; // This component is a client component
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { UserPlusIcon } from "@heroicons/react/24/outline"; // Import the UserPlusIcon from Heroicons
const RedirectToSignup = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/signup")} // Redirect to /signup on click
      className="h-7 bg-yellow-500 text-white px-2 py-2 rounded-md w-32 hover:bg-yellow-600 transition flex items-center"
    >
      <UserPlusIcon className="w-3.5 mr-1" />
      Sign Up
    </button>
  );
};

export default RedirectToSignup;