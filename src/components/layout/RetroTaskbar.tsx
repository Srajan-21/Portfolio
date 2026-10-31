"use client";

import React from "react";
import { useStickerWorld } from "@/context/StickerWorldContext";
import {
  Gamepad2,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  CheckSquare,
  Wind,
} from "lucide-react";

export function RetroTaskbar() {
  const {
    stickers,
    level,
    isPlayMode,
    togglePlayMode,
    soundEnabled,
    toggleSound,
    calmMode,
    toggleCalmMode,
    openWindow,
    activeToast,
  } = useStickerWorld();

  return (
    <>
      {/* FLOATING POPUP TOAST FOR STICKERS / QUESTS */}
      {activeToast && (
        <div className="fixed bottom-20 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-3 rounded-2xl border-ink-4 bg-[#FFC93C] p-4 shadow-hard">
            <span className="text-2xl">{activeToast.icon || "⭐"}</span>
            <div>
              <span className="block font-mono text-[10px] font-black uppercase text-[#14121A]">
                {activeToast.title}
              </span>
              <span className="font-sans text-sm font-bold text-[#14121A]">
                {activeToast.subtitle}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* RETRO DESKTOP TASKBAR */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 h-14 border-t-ink-4 bg-[#FFF8EC] px-3 sm:px-6 shadow-hard flex items-center justify-between">
        {/* Left: Start / Mascot Pill & Level Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Start Pill */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-1.5 rounded-lg border-ink-2 bg-[#FF4D2E] px-3 py-1.5 font-mono text-xs font-black uppercase text-white shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
          >
            <span>SRAJAN OS</span>
          </button>

          {/* Level Pill */}
          <div className="hidden md:flex items-center gap-2 rounded-lg border-ink-2 bg-[#3DDC97] px-3 py-1 font-mono text-[11px] font-black uppercase text-[#14110F] shadow-hard-sm">
            <span>LVL:</span>
            <span className="text-[#14121A]">{level}</span>
          </div>

          {/* Sticker Currency Counter */}
          <div className="flex items-center gap-1.5 rounded-lg border-ink-2 bg-[#FFC93C] px-3 py-1 font-mono text-xs font-black text-[#14121A] shadow-hard-sm">
            <span>⭐</span>
            <span>{stickers} Stickers</span>
          </div>
        </div>

        {/* Center: Play Mode Switch */}
        <div className="flex items-center">
          <button
            onClick={togglePlayMode}
            className={`flex items-center gap-2 rounded-lg border-ink-2 px-3 sm:px-4 py-1.5 font-mono text-xs font-black uppercase transition-all shadow-hard-sm ${
              isPlayMode
                ? "bg-[#2F5BFF] text-white ring-2 ring-[#FFC93C]"
                : "bg-white text-[#14121A] hover:bg-[#FFC93C]"
            }`}
          >
            <Gamepad2 className="h-4 w-4" />
            <span className="hidden sm:inline">Play Mode (P)</span>
            <span className="sm:hidden">Play</span>
          </button>
        </div>

        {/* Right: Windows, Binder, Audio & Calm Mode Toggles */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quests Button */}
          <button
            onClick={() => openWindow("quests")}
            title="Open Quest Log"
            className="flex items-center gap-1 rounded-lg border-ink-2 bg-white px-2.5 py-1 text-xs font-bold shadow-hard-sm hover:bg-[#3DDC97] transition-colors"
          >
            <CheckSquare className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Quests</span>
          </button>

          {/* Card Binder Button */}
          <button
            onClick={() => openWindow("binder")}
            title="Open Trading Card Binder"
            className="flex items-center gap-1 rounded-lg border-ink-2 bg-white px-2.5 py-1 text-xs font-bold shadow-hard-sm hover:bg-[#FF8FB8] transition-colors"
          >
            <Layers className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Cards</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute UI Audio" : "Enable UI Audio"}
            className="flex h-8 w-8 items-center justify-center rounded-lg border-ink-2 bg-white shadow-hard-sm hover:bg-[#FFC93C] transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-[#14121A]" />
            ) : (
              <VolumeX className="h-4 w-4 text-[#14121A]/60" />
            )}
          </button>

          {/* Calm Mode Toggle */}
          <button
            onClick={toggleCalmMode}
            title={calmMode ? "Disable Calm Mode" : "Enable Calm Mode (Reduce Physics & Auto-Motion)"}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border-ink-2 shadow-hard-sm transition-colors ${
              calmMode ? "bg-[#3DDC97] text-[#14121A]" : "bg-white text-[#14121A]/60 hover:bg-[#3DDC97]/40"
            }`}
          >
            <Wind className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </>
  );
}
