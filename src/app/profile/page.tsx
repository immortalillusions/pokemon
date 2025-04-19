"use client"; // This component is a client component
export default function Profile() {
    return (
      <div className="flex flex-col gap-16 justify-center items-center h-screen">
        <h1 className="text-3xl font-bold font-sans">Profile Page</h1>
        <p className="text-lg">This is the pppp page</p>
        <img
            src="/pokeball.webp" 
            alt="Pokeball"
            className="w-12"
        />
      </div>
    );
  }