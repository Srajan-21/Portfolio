"use client";

import React from "react";

interface GoldMedallionProps {
  numeral: string;
  title: string;
  isUnlocked?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
  showTitle?: boolean;
}

export function GoldMedallion({
  title,
  isUnlocked = false,
}: GoldMedallionProps) {
  return (
    <div className={`flex items-center gap-2 rounded-xl border-ink-2 px-3.5 py-1.5 shadow-hard-sm ${
      isUnlocked ? "bg-[#3DDC97] text-[#14121A]" : "bg-white text-[#14121A]/60"
    }`}>
      <span className="font-black text-xs sm:text-sm">⭐</span>
      <span className="font-mono text-[11px] font-bold uppercase tracking-wider">{title}</span>
    </div>
  );
}
