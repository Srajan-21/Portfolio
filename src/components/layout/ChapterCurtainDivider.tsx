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
      className={`relative my-14 flex items-center justify-center px-6 sm:px-12 select-none ${className}`}
    >
      {/* Dashed line */}
      <div className="h-[3px] flex-1 border-t-2 border-dashed border-[#14121A]/30" />

      {/* Colorful Sticker Badge */}
      <div className="mx-4 flex items-center gap-2 rounded-xl border-ink-2 bg-[#FFC93C] px-3.5 py-1.5 shadow-hard-sm rotate-[-1deg]">
        <span className="font-mono text-xs font-black uppercase text-[#14121A]">
          CH. {numeral}
        </span>
        {label && (
          <span className="hidden sm:inline font-mono text-[10px] font-bold uppercase text-[#14121A]/80">
            &bull; {label}
          </span>
        )}
      </div>

      <div className="h-[3px] flex-1 border-t-2 border-dashed border-[#14121A]/30" />
    </div>
  );
}
