"use client";

import React from "react";
import { useCollector } from "@/context/CollectorContext";
import { CHAPTER_ROMANS } from "./VerticalChapterIndex";
import { BookOpen, EyeOff, Sparkles, SlidersHorizontal } from "lucide-react";

export function CollectorTopBar() {
  const {
    activeChapter,
    setActiveChapter,
    sealsEarned,
    rank,
    cabinetOpen,
    setCabinetOpen,
    readerMode,
    toggleReaderMode,
    reduceMotion,
    toggleReduceMotion,
  } = useCollector();

  const currentInfo = CHAPTER_ROMANS[activeChapter] || CHAPTER_ROMANS[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#6F665A]/15 bg-[#F6F1E7]/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Left: Monogram & Identity */}
        <div className="flex items-center gap-3">
          <a
            href="#chapter-0"
            onClick={(e) => {
              e.preventDefault();
              setActiveChapter(0);
              document.getElementById("chapter-0")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-2.5"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded border border-[#6F665A]/30 bg-[#EDE5D3] font-display text-sm font-semibold text-[#14110F]">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-medium tracking-tight text-[#14110F] group-hover:text-[#6B1E1E] transition-colors">
                Srajan Srivastava
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
                The Collector&apos;s Edition
              </span>
            </div>
          </a>
        </div>

        {/* Center: Active Chapter Display */}
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-[#6F665A]">
          <span className="font-display text-xs text-[#B08D57] font-semibold">
            {currentInfo.roman !== "·" ? `CH. ${currentInfo.roman}` : "PROLOGUE"}
          </span>
          <span className="text-[#6F665A]/40">&bull;</span>
          <span className="text-[#14110F] font-medium">
            {currentInfo.title}
          </span>
        </div>

        {/* Right: Seals, Rank & The Cabinet */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Seals Counter & Cabinet Trigger */}
          <button
            onClick={() => setCabinetOpen(!cabinetOpen)}
            title="Open the Cabinet of Seals"
            className="flex items-center gap-2 rounded border border-[#6F665A]/25 bg-[#EDE5D3]/60 px-2.5 py-1 transition-all hover:border-[#B08D57] hover:bg-[#EDE5D3]"
          >
            <span className="h-2 w-2 rounded-full bg-[#B08D57] ring-2 ring-[#B08D57]/20" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] font-semibold text-[#14110F]">
              Seals {sealsEarned.length}/12
            </span>
          </button>

          {/* Rank Badge */}
          <div className="hidden sm:flex items-center rounded border border-[#B08D57]/40 bg-[#EDE5D3]/40 px-2 py-0.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold text-[#8C6B3A]">
              {rank}
            </span>
          </div>

          {/* Controls: Reader Mode & Reduced Motion */}
          <div className="flex items-center gap-1 border-l border-[#6F665A]/20 pl-2">
            <button
              onClick={toggleReaderMode}
              title={readerMode ? "Switch to Editorial Layout" : "Switch to Reading Mode"}
              aria-label="Toggle Reader Mode"
              className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
                readerMode
                  ? "border border-[#6B1E1E] text-[#6B1E1E] bg-[#6B1E1E]/5"
                  : "text-[#6F665A] hover:text-[#14110F]"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={toggleReduceMotion}
              title={reduceMotion ? "Enable Motion" : "Reduce Motion"}
              aria-label="Toggle Reduced Motion"
              className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
                reduceMotion
                  ? "border border-[#6B1E1E] text-[#6B1E1E] bg-[#6B1E1E]/5"
                  : "text-[#6F665A] hover:text-[#14110F]"
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
