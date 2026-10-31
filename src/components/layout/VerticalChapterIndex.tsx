"use client";

import React from "react";
import { useCollector } from "@/context/CollectorContext";

export const CHAPTER_ROMANS: Record<number, { roman: string; title: string; hash: string }> = {
  0: { roman: "·", title: "Frontispiece", hash: "chapter-0" },
  1: { roman: "I", title: "Origins", hash: "chapter-1" },
  2: { roman: "II", title: "The Grind", hash: "chapter-2" },
  3: { roman: "III", title: "First Build", hash: "chapter-3" },
  4: { roman: "IV", title: "The Podium", hash: "chapter-4" },
  5: { roman: "V", title: "CLAVIS", hash: "chapter-5" },
  6: { roman: "VI", title: "The Real World", hash: "chapter-6" },
  7: { roman: "VII", title: "The Toolkit", hash: "chapter-7" },
  8: { roman: "VIII", title: "The Last Page", hash: "chapter-8" },
};

export function VerticalChapterIndex() {
  const { activeChapter, setActiveChapter, setCursorLabel } = useCollector();

  const scrollToChapter = (chapterNum: number) => {
    setActiveChapter(chapterNum);
    const targetHash = CHAPTER_ROMANS[chapterNum]?.hash;
    if (targetHash) {
      const el = document.getElementById(targetHash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      aria-label="Chapter Index"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center select-none"
    >
      {/* Background Gold Hairline Track */}
      <div className="absolute top-2 bottom-2 w-[1px] bg-[#6F665A]/20" />

      {/* Chapters list */}
      <div className="relative z-10 flex flex-col items-center gap-5 py-2">
        {Object.entries(CHAPTER_ROMANS).map(([numStr, info]) => {
          const num = Number(numStr);
          const isActive = activeChapter === num;

          return (
            <button
              key={num}
              onClick={() => scrollToChapter(num)}
              onMouseEnter={() => setCursorLabel(info.roman)}
              onMouseLeave={() => setCursorLabel(null)}
              title={`Chapter ${info.roman}: ${info.title}`}
              className="group relative flex items-center justify-center p-1 transition-transform duration-300"
            >
              {/* Active Marker Dot */}
              {isActive && (
                <span className="absolute -left-3 h-1 w-1 rounded-full bg-[#B08D57]" />
              )}

              {/* Roman Numeral */}
              <span
                className={`font-display text-xs tracking-widest transition-all duration-300 ${
                  isActive
                    ? "font-semibold text-[#B08D57] scale-125"
                    : "text-[#6F665A]/60 hover:text-[#14110F]"
                }`}
              >
                {info.roman}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
