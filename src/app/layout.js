import "./globals.css";
import { Inter, Crimson_Text } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-crimson",
});

export const metadata = {
  title: "D&D Campaign Hub",
  description: "A digital hub for our ongoing adventures.",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning is required by next-themes
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-scholar-50 dark:bg-astral-950 text-astral-900 dark:text-scholar-50 min-h-screen transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
