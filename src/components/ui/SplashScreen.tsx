"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/sound";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [fadingOut, setFadingOut] = useState(false);
  const [hasStartedDrawing, setHasStartedDrawing] = useState(false);

  useEffect(() => {
    // Start drawing shortly after mount
    const timer1 = setTimeout(() => {
      setHasStartedDrawing(true);
      // Try playing a faint pen scratch if audio context is permitted
      soundEngine.playPenScratch();
    }, 200);

    // Auto-complete after 2.3 seconds
    const timer2 = setTimeout(() => {
      handleComplete();
    }, 2300);

    // Allow Escape key to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleComplete = () => {
    if (fadingOut) return;
    setFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 550);
  };

  return (
    <aside
      aria-label="Loading Journal"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F2EBDD] text-[#1B1A17] transition-all duration-500 dark:bg-[#181512] dark:text-[#EBE3D3] ${
        fadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background paper texture simulation */}
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-40" />

      {/* Center Sketch Signature & Pen Nib */}
      <div className="relative flex flex-col items-center">
        {/* Animated Fountain Pen Nib Graphic */}
        <div
          className={`mb-4 transition-transform duration-1000 ${
            hasStartedDrawing ? "translate-x-12 rotate-12" : "-translate-x-12 -rotate-12"
          }`}
        >
          <svg
            className="h-10 w-10 text-[#D9432B]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="M2 2l7.586 7.586" />
            <circle cx="11" cy="11" r="2" fill="currentColor" />
          </svg>
        </div>

        {/* Self-drawing Cursive Calligraphic Text "Srajan" */}
        <div className="relative">
          <svg
            width="280"
            height="110"
            viewBox="0 0 280 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            <path
              d="M 25 75 C 20 50, 45 20, 65 30 C 85 40, 50 85, 80 85 C 95 85, 105 55, 115 65 C 125 75, 130 85, 145 80 C 160 75, 155 50, 170 55 C 185 60, 180 85, 195 85 C 210 85, 215 60, 230 65 C 245 70, 255 85, 270 80"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="600"
              strokeDashoffset={hasStartedDrawing ? "0" : "600"}
              style={{
                transition: "stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </svg>

          {/* Styled Cursive Overlay using Caveat handwriting font */}
          <div
            className={`absolute inset-0 flex items-center justify-center font-hand text-6xl font-bold tracking-wide transition-opacity duration-700 ${
              hasStartedDrawing ? "opacity-100" : "opacity-0"
            }`}
          >
            Srajan Srivastava
          </div>
        </div>

        {/* Subtitle / Volume Indicator */}
        <div className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#837B6D] dark:text-[#7E7565]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D9432B] animate-pulse" />
          <span>Opening Field Journal // Volume I</span>
        </div>

        {/* Progress ink bar */}
        <div className="mt-5 h-1 w-48 overflow-hidden rounded-full bg-[#D3C4A5]/40 dark:bg-[#3A3328]">
          <div
            className={`h-full bg-[#D9432B] transition-all duration-[2000ms] ease-out ${
              hasStartedDrawing ? "w-full" : "w-0"
            }`}
          />
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleComplete}
        className="absolute bottom-8 right-8 rounded border border-dashed border-[#837B6D]/50 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#837B6D] hover:border-[#1B1A17] hover:text-[#1B1A17] transition-colors dark:text-[#7E7565] dark:hover:border-[#EBE3D3] dark:hover:text-[#EBE3D3]"
      >
        Skip [Esc] &rarr;
      </button>
    </aside>
  );
}

