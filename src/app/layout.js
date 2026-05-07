import Navbar from "../components/Navbar";
import Script from "next/script";
import { Inter, Crimson_Text } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const crimson = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-crimson",
});

export const metadata = {
  title: "D&D Campaign Hub",
  description: "A digital hub for our ongoing adventures.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${crimson.variable}`}>
      <body className="bg-slate-50 text-slate-900 min-h-screen font-sans">
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
