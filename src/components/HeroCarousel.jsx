"use client";

import { useState, useEffect } from "react";

export default function HeroCarousel({ slides }) {
  const [current, setCurrent] = useState(0);

  // Rotate slides every 6 seconds
  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  // Fallback if no images are uploaded yet
  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-[24rem] md:h-[32rem] bg-astral-900 border-2 border-slate-800 rounded-xl flex items-center justify-center shadow-xl">
        <span className="text-slate-500 font-serif italic text-xl">
          The weave is quiet today...
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[24rem] md:h-[32rem] rounded-xl overflow-hidden shadow-2xl border-2 border-brass-600/30 group">
      {slides.map((slide, index) => (
        <div
          key={slide.slug}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="object-cover w-full h-full"
          />

          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-astral-950 via-astral-950/60 to-transparent" />

          {/* Text Content */}
          <div className="absolute bottom-0 left-0 p-8 w-full md:w-3/4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3 drop-shadow-md">
              {slide.title}
            </h2>
            {slide.caption && (
              <p className="text-white text-lg md:text-xl font-medium italic border-l-2 border-arcane-400 pl-4 bg-astral-950/40 py-1 pr-4 rounded-r-md backdrop-blur-sm inline-block">
                {slide.caption}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 right-6 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === current
                  ? "bg-brass-500 w-6"
                  : "bg-slate-500 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
