"use server"; // This component is a server component
import Inventory from "./inventory"; // Import the Inventory component
import { cookies } from "next/headers";

export default async function Collection() {
  try {
      console.log("Fetching user data...");
      // Construct the absolute URL for the API call
      // NOTE NEED TO UPDATE THE URLS FOR PRODUCTION
      const baseUrl = process.env.NODE_ENV === "production"? process.env.PUBLIC_BASE_URL: "http://localhost:3000"; // Use environment variable or fallback to localhost
      const response = await fetch(`${baseUrl}/api/queryUser`, {
        method: "GET",
        headers: { Cookie: cookies().toString() }, // include cookies in request (bc this is server side)
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      console.log("User data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
  return (
    <Inventory/>
  );
}