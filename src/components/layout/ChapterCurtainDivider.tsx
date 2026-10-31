"use client";

import React from "react";

interface ChapterCurtainDividerProps {
  numeral: string;
  label?: string;
  className?: string;
}

export function ChapterCurtainDivider({
  numeral,
  label,
  className = "",
}: ChapterCurtainDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative my-12 flex items-center justify-center px-8 sm:px-16 ${className}`}
    >
      {/* Left Hairline Rule */}
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#6F665A]/25 to-[#B08D57]/40" />

      {/* Center Archival Emblem */}
      <div className="mx-6 flex items-center gap-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#6F665A]/70">
          CH.
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B08D57]/40 bg-[#EDE5D3]/60 font-display font-semibold italic text-xs text-[#8C6B3A]">
          {numeral}
        </div>
        {label && (
          <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.25em] text-[#6F665A]/70">
            {label}
          </span>
        )}
      </div>

      {/* Right Hairline Rule */}
      <div className="h-[1px] flex-1 bg-gradient-to-r from-[#B08D57]/40 via-[#6F665A]/25 to-transparent" />
    </div>
  );
}
