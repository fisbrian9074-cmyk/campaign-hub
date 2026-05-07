"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevents a hydration mismatch error on load
  useEffect(() => setMounted(true), []);

  return (
    <nav className="w-full border-b border-slate-200 dark:border-slate-800 bg-scholar-50 dark:bg-astral-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link
          href="/"
          className="text-xl font-bold font-serif text-arcane-600 dark:text-arcane-400"
        >
          Campaign Hub
        </Link>

        <div className="flex items-center gap-6">
          {/* Navigation Links */}
          <Link
            href="/characters"
            className="text-astral-900 hover:text-arcane-600 dark:text-scholar-50 dark:hover:text-arcane-400 transition-colors"
          >
            Characters
          </Link>
          <Link
            href="/locations"
            className="text-astral-900 hover:text-arcane-600 dark:text-scholar-50 dark:hover:text-arcane-400 transition-colors"
          >
            Locations
          </Link>
          <Link
            href="/sessions"
            className="text-astral-900 hover:text-arcane-600 dark:text-scholar-50 dark:hover:text-arcane-400 transition-colors"
          >
            Sessions
          </Link>

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-astral-900 dark:text-scholar-50"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
