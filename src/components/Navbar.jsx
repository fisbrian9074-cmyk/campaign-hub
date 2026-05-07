"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-200 bg-white transition-colors duration-300 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="text-xl font-bold font-serif text-sky-700">
          Campaign Hub
        </Link>

        <div className="flex items-center gap-6">
          {/* Navigation Links */}
          <Link
            href="/characters"
            className="text-slate-700 hover:text-sky-600 transition-colors"
          >
            Characters
          </Link>
          <Link
            href="/locations"
            className="text-slate-700 hover:text-sky-600 transition-colors"
          >
            Locations
          </Link>
          <Link
            href="/sessions"
            className="text-slate-700 hover:text-sky-600 transition-colors"
          >
            Sessions
          </Link>
        </div>
      </div>
    </nav>
  );
}
