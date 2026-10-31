"use client";

import React from "react";

export function PaperNoise() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {/* SVG Turbulence paper grain overlay */}
      <svg
        className="h-full w-full opacity-[0.065] mix-blend-multiply dark:mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="journalPaperGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.85 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#journalPaperGrain)" />
      </svg>

      {/* Subtle vintage vignette gradient at outer edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(27,26,23,0.08)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(0,0,0,0.35)_100%)]" />
    </div>
  );
}

