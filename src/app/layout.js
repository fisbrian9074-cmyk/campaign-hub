import Navbar from "../components/Navbar";
import Script from "next/script";
import { Inter, Crimson_Text } from "next/font/google";
import "./globals.css";

// 1. Load the custom fonts from your Tailwind config
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const crimson = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-crimson",
});

// 2. Site Metadata
export const metadata = {
  title: "D&D Campaign Hub",
  description: "A digital hub for our ongoing adventures.",
};

// 3. The Root Layout
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${crimson.variable}`}>
      <head>
        {/* Netlify Identity Widget to catch email invites on the homepage */}
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="beforeInteractive"
        />
      </head>
      {/* We apply the font-sans class here so Inter is the default text everywhere */}
      <body className="bg-astral-950 text-slate-200 min-h-screen font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
