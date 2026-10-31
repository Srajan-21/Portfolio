"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isPeeling, setIsPeeling] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  const triggerPeel = useCallback(() => {
    if (isPeeling) return;
    setIsPeeling(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [isPeeling, onComplete]);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(triggerPeel, 400);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        triggerPeel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [triggerPeel]);

  const nameLetters = ["S", "R", "A", "J", "A", "N"];
  const letterColors = ["#FF4D2E", "#FFC93C", "#2F5BFF", "#3DDC97", "#FF8FB8", "#7B4DFF"];

  return (
    <aside
      aria-label="Loading Sticker World"
      onClick={triggerPeel}
      className={`fixed inset-0 z-[150] flex flex-col items-center justify-center bg-[#FFF8EC] bg-dot-grid cursor-pointer select-none overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isPeeling ? "scale-105 -rotate-2 -translate-y-full opacity-0 pointer-events-none" : "scale-100 opacity-100"
      }`}
    >
      {/* Tape Strips on corners */}
      <div className="absolute top-6 left-8 h-8 w-28 bg-[#FFC93C]/80 -rotate-12 border-ink-2 shadow-hard-sm" />
      <div className="absolute top-6 right-8 h-8 w-28 bg-[#FF8FB8]/80 rotate-12 border-ink-2 shadow-hard-sm" />
      <div className="absolute bottom-6 left-8 h-8 w-28 bg-[#3DDC97]/80 rotate-6 border-ink-2 shadow-hard-sm" />
      <div className="absolute bottom-6 right-8 h-8 w-28 bg-[#2F5BFF]/80 -rotate-6 border-ink-2 shadow-hard-sm" />

      {/* Center Stage: Mascot running & Marker trail */}
      <div className="relative flex flex-col items-center px-6 text-center max-w-xl">
        {/* Animated Running Mascot Sticker */}
        <motion.div
          animate={{
            x: [-60, 60, -60],
            y: [0, -14, 0],
            rotate: [-4, 6, -4],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative mb-6"
        >
          {/* Mascot SVG: Boy with Guitar */}
          <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border-ink-4 bg-[#FFC93C] shadow-hard">
            <svg viewBox="0 0 100 100" className="h-20 w-20">
              {/* Electric Guitar on Back */}
              <path
                d="M 22 25 L 12 12 M 16 18 L 8 28 C 6 34 16 38 20 32 Z"
                stroke="#FF4D2E"
                strokeWidth="4"
                strokeLinecap="round"
                fill="#FF4D2E"
              />
              <circle cx="16" cy="30" r="4" fill="#FFFFFF" stroke="#14121A" strokeWidth="2" />

              {/* Head */}
              <circle cx="50" cy="46" r="24" fill="#FFF8EC" stroke="#14121A" strokeWidth="3" />
              {/* Hair */}
              <path
                d="M 28 42 Q 50 18 72 42 Q 62 26 50 26 Q 38 26 28 42 Z"
                fill="#14121A"
              />
              {/* Glasses */}
              <rect x="36" y="42" width="12" height="9" rx="2" fill="none" stroke="#14121A" strokeWidth="2.5" />
              <rect x="52" y="42" width="12" height="9" rx="2" fill="none" stroke="#14121A" strokeWidth="2.5" />
              <line x1="48" y1="46" x2="52" y2="46" stroke="#14121A" strokeWidth="2.5" />
              {/* Smile */}
              <path d="M 44 58 Q 50 64 56 58" fill="none" stroke="#FF4D2E" strokeWidth="2.5" strokeLinecap="round" />
            </svg>

            {/* Sticker Star Badge */}
            <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full border-ink bg-[#3DDC97] shadow-hard-sm text-xs font-black">
              ★
            </div>
          </div>
        </motion.div>

        {/* Marker-Pen Popping Letters: S - R - A - J - A - N */}
        <div className="flex items-center gap-2 sm:gap-3 my-4">
          {nameLetters.map((letter, i) => {
            const letterProgress = Math.floor((progress / 100) * (nameLetters.length + 1));
            const isRevealed = i <= letterProgress;
            const color = letterColors[i % letterColors.length];

            return (
              <motion.div
                key={letter}
                initial={{ scale: 0, rotate: -15 }}
                animate={isRevealed ? { scale: 1, rotate: (i % 2 === 0 ? 3 : -4) } : { scale: 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 15 }}
                style={{ backgroundColor: color }}
                className="flex h-14 w-12 sm:h-18 sm:w-16 items-center justify-center rounded-xl border-ink-4 shadow-hard text-3xl sm:text-4xl font-black text-white"
              >
                {letter}
              </motion.div>
            );
          })}
        </div>

        {/* Subtitle Sticker Tag */}
        <div className="my-2 inline-block rounded-lg border-ink bg-white px-4 py-1.5 shadow-hard-sm rotate-1">
          <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#14121A]">
            STICKER-BOMB WORLD &bull; 2026 EDITION
          </span>
        </div>

        {/* Chunky Bouncing Progress Bar */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="relative h-6 w-56 sm:w-72 rounded-full border-ink-4 bg-white shadow-hard-sm overflow-hidden p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#FF4D2E] via-[#FFC93C] to-[#3DDC97]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.05 }}
            />
          </div>

          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#14121A]">
            <Sparkles className="h-3.5 w-3.5 text-[#FFC93C]" />
            <span>UNROLLING STICKER SHEET... {progress}%</span>
          </div>
        </div>

        {/* Skip hint */}
        <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-[#14121A]/60">
          Click anywhere or press ESC to jump in!
        </div>
      </div>
    </aside>
  );
}
