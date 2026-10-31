"use client";

import React from "react";

export function PaperNoise() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {/* Archival micro-texture grain (opacity <= 3.5%) */}
      <svg
        className="h-full w-full opacity-[0.032] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="collectorPaperGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#collectorPaperGrain)" />
      </svg>
    </div>
  );
}
