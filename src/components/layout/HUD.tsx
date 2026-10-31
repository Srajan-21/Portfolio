"use client";

import React, { useState } from "react";
import { useJournal } from "@/context/JournalContext";
import { Volume2, VolumeX, BookOpen, Sun, Moon, MapPin } from "lucide-react";

export const LEVEL_NAMES: Record<number, { title: string; subtitle: string; hash: string }> = {
  0: { title: "Title Screen", subtitle: "Press Start", hash: "level-0" },
  1: { title: "Origins", subtitle: "2022 • BPIT Delhi", hash: "level-1" },
  2: { title: "The Grind", subtitle: "DSA & LeetCode", hash: "level-2" },
  3: { title: "First Build", subtitle: "Tourphin Booking", hash: "level-3" },
  4: { title: "Boss Fight", subtitle: "Hackathon Battle", hash: "level-4" },
  5: { title: "Magnum Opus", subtitle: "CLAVIS ATS Suite", hash: "level-5" },
  6: { title: "Real World", subtitle: "Hudle Production", hash: "level-6" },
  7: { title: "Inventory", subtitle: "Skills & Artifacts", hash: "level-7" },
  8: { title: "Player 2", subtitle: "Guestbook & Contact", hash: "level-8" },
};

export function HUD() {
  const {
    currentLevel,
    setLevel,
    inkXP,
    soundMuted,
    toggleSound,
    readerMode,
    toggleReaderMode,
    nightMode,
    toggleNightMode,
    isCoverTorn,
    xpToast,
  } = useJournal();

  const [mapOpen, setMapOpen] = useState(false);

  // Compute ink level percentage (capped at 100%)
  const inkPercentage = Math.min(100, Math.round((inkXP / 1000) * 100));

  const scrollToLevel = (levelIndex: number) => {
    setLevel(levelIndex);
    const targetHash = LEVEL_NAMES[levelIndex]?.hash;
    if (targetHash) {
      const el = document.getElementById(targetHash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMapOpen(false);
  };

  return (
    <>
      {/* XP Toast Notification */}
      {xpToast && (
        <div className="fixed top-16 left-1/2 z-50 -translate-x-1/2 animate-bounce">
          <div className="flex items-center gap-2 rounded border-2 border-[#D9432B] bg-[#F2EBDD] px-4 py-1.5 shadow-lg dark:bg-[#24201A]">
            <span className="h-2 w-2 rounded-full bg-[#D9432B] animate-ping" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D9432B]">
              {xpToast}
            </span>
          </div>
        </div>
      )}

      {/* Persistent Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-dashed border-[#D3C4A5] bg-[#F2EBDD]/90 backdrop-blur-md transition-colors duration-200 dark:border-[#3A3328] dark:bg-[#181512]/90">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:px-6">
          {/* Left: Journal Title & Active Level */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="#level-0"
              onClick={(e) => {
                e.preventDefault();
                scrollToLevel(0);
              }}
              className="group flex items-center gap-2"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded border border-[#1B1A17] bg-[#E4D7C2] font-mono text-xs font-bold text-[#1B1A17] shadow-sm dark:border-[#EBE3D3] dark:bg-[#24201A] dark:text-[#EBE3D3]">
                01
              </div>
              <div className="hidden flex-col sm:flex">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#837B6D] dark:text-[#7E7565]">
                  Field Journal
                </span>
                <span className="font-display text-sm font-bold tracking-tight text-[#1B1A17] group-hover:text-[#D9432B] dark:text-[#EBE3D3] dark:group-hover:text-[#E55840]">
                  Srajan Srivastava
                </span>
              </div>
            </a>

            {/* Level Badge Pill */}
            <div className="flex items-center gap-1.5 rounded border border-[#D3C4A5] bg-[#E4D7C2]/50 px-2 py-0.5 text-xs font-mono dark:border-[#3A3328] dark:bg-[#24201A]/50">
              <span className="font-bold text-[#D9432B] dark:text-[#E55840]">
                LVL {currentLevel}
              </span>
              <span className="text-[#837B6D] dark:text-[#7E7565]">•</span>
              <span className="hidden max-w-[120px] truncate text-[#4B463E] sm:inline dark:text-[#B2A896]">
                {LEVEL_NAMES[currentLevel]?.title || "Field Log"}
              </span>
            </div>
          </div>

          {/* Center: Journal Mini-Map Trail */}
          <nav
            aria-label="Journal Route Map"
            className="hidden items-center gap-1.5 md:flex"
          >
            {Object.entries(LEVEL_NAMES).map(([lvlStr, info]) => {
              const lvl = Number(lvlStr);
              const isActive = currentLevel === lvl;
              const isPast = currentLevel > lvl || (lvl === 0 && isCoverTorn);
              return (
                <button
                  key={lvl}
                  onClick={() => scrollToLevel(lvl)}
                  title={`Level ${lvl}: ${info.title} (${info.subtitle})`}
                  className="group relative flex flex-col items-center p-1 transition-transform hover:scale-110"
                >
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-mono transition-colors ${
                      isActive
                        ? "border-2 border-[#D9432B] bg-[#D9432B] text-white font-bold"
                        : isPast
                        ? "border border-[#1B1A17] bg-[#1B1A17] text-white dark:border-[#EBE3D3] dark:bg-[#EBE3D3] dark:text-black"
                        : "border border-dashed border-[#837B6D] bg-transparent text-[#837B6D]"
                    }`}
                  >
                    {lvl}
                  </div>
                  {lvl < 8 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[18px] top-[11px] h-[1px] w-2 bg-[#D3C4A5] dark:bg-[#3A3328]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Mini-map trigger button */}
          <button
            onClick={() => setMapOpen(!mapOpen)}
            className="flex items-center gap-1 rounded border border-[#D3C4A5] px-2 py-1 font-mono text-[11px] md:hidden dark:border-[#3A3328]"
          >
            <MapPin className="h-3 w-3 text-[#D9432B]" />
            <span>Map</span>
          </button>

          {/* Right: Ink Gauge & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ink Reservoir Gauge */}
            <div
              title={`Ink Meter: ${inkXP} XP (${inkPercentage}% full)`}
              className="flex items-center gap-1.5 rounded border border-[#D3C4A5] bg-[#E4D7C2]/60 px-2 py-1 font-mono text-xs dark:border-[#3A3328] dark:bg-[#24201A]"
            >
              <div className="relative h-4 w-3 rounded-b-sm border border-[#1B1A17] bg-transparent p-0.5 dark:border-[#EBE3D3]">
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-b-xs bg-[#1B1A17] transition-all duration-500 dark:bg-[#E55840]"
                  style={{ height: `${inkPercentage}%` }}
                />
              </div>
              <span className="font-semibold text-[#1B1A17] dark:text-[#EBE3D3]">
                {inkPercentage}%
              </span>
              <span className="hidden text-[10px] text-[#837B6D] lg:inline dark:text-[#7E7565]">
                INK
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundMuted ? "Enable Paper & Ink Audio" : "Mute Audio"}
              aria-label="Toggle Sound Effects"
              className={`flex h-8 w-8 items-center justify-center rounded border transition-colors ${
                !soundMuted
                  ? "border-[#D9432B] bg-[#D9432B]/10 text-[#D9432B] dark:border-[#E55840] dark:text-[#E55840]"
                  : "border-[#D3C4A5] text-[#837B6D] hover:text-[#1B1A17] dark:border-[#3A3328] dark:text-[#7E7565] dark:hover:text-[#EBE3D3]"
              }`}
            >
              {soundMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>

            {/* Reader Mode Toggle */}
            <button
              onClick={toggleReaderMode}
              title={
                readerMode
                  ? "Switch to Interactive Journal"
                  : "Switch to Clean Reader Mode"
              }
              aria-label="Toggle Reader Mode"
              className={`flex h-8 w-8 items-center justify-center rounded border transition-colors ${
                readerMode
                  ? "border-[#D9432B] bg-[#D9432B] text-white"
                  : "border-[#D3C4A5] text-[#837B6D] hover:text-[#1B1A17] dark:border-[#3A3328] dark:text-[#7E7565] dark:hover:text-[#EBE3D3]"
              }`}
            >
              <BookOpen className="h-4 w-4" />
            </button>

            {/* Night / Day Paper Edition Toggle */}
            <button
              onClick={toggleNightMode}
              title={
                nightMode
                  ? "Switch to Day Paper Edition"
                  : "Switch to Night Archive Edition"
              }
              aria-label="Toggle Paper Edition"
              className="flex h-8 w-8 items-center justify-center rounded border border-[#D3C4A5] text-[#837B6D] hover:text-[#1B1A17] transition-colors dark:border-[#3A3328] dark:text-[#7E7565] dark:hover:text-[#EBE3D3]"
            >
              {nightMode ? (
                <Sun className="h-4 w-4 text-[#DEB459]" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Route Map Drawer */}
        {mapOpen && (
          <div className="border-t border-[#D3C4A5] bg-[#E4D7C2] p-3 md:hidden dark:border-[#3A3328] dark:bg-[#181512]">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-[#837B6D]">
              Journal Map Navigation:
            </p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(LEVEL_NAMES).map(([lvlStr, info]) => {
                const lvl = Number(lvlStr);
                return (
                  <button
                    key={lvl}
                    onClick={() => scrollToLevel(lvl)}
                    className={`rounded border p-1.5 text-left font-mono text-[11px] ${
                      currentLevel === lvl
                        ? "border-[#D9432B] bg-[#D9432B] text-white"
                        : "border-[#D3C4A5] bg-[#F2EBDD] text-[#1B1A17] dark:border-[#3A3328] dark:bg-[#24201A] dark:text-[#EBE3D3]"
                    }`}
                  >
                    <div className="font-bold">LVL {lvl}</div>
                    <div className="truncate text-[10px] opacity-80">
                      {info.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

