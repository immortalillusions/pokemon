
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";
// anything in layout is shared among all UI within the same folder
// need to import here for optimization: hosts font files with other static assets so that there are no additional network requests.
import { Press_Start_2P } from "next/font/google";
// also need to keep this bc Next.js auto injects the font when i declare it
//have to put this in layout.tsx bc this is SERVER SIDE vs page.tsx is client side (loses the automatic font injection)
const arcade = Press_Start_2P({ 
  subsets: ["latin"], 
  weight: "400",
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "PokiGuess",
  description: "A Pokemon guessing game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${arcade.variable} antialiased`}
      >
        {children}
        {/* include navbar */}
        <Navbar/>
      </body>
    </html>
  );
}
