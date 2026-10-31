"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASINGS } from "@/lib/motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const triggerExit = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 650);
  }, [isExiting, onComplete]);

  // Tick the progress counter from 000 to 100 over ~1250ms
  useEffect(() => {
    const startTime = performance.now();
    const duration = 1250;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setNameVisible(true);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    // After 2100ms, trigger split curtain exit
    timerRef.current = setTimeout(() => {
      triggerExit();
    }, 2250);

    // Keyboard listener: Escape triggers immediate skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        triggerExit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [triggerExit]);

  return (
    <aside
      aria-label="Monograph Cover — Edition De Luxe"
      onClick={triggerExit}
      className="fixed inset-0 z-[120] cursor-pointer select-none overflow-hidden"
    >
      {/* SPLIT CURTAIN PANELS */}
      {/* Top Half Panel */}
      <motion.div
        initial={{ y: "0%" }}
        animate={isExiting ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: 0.65, ease: EASINGS.expoInOut }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#F6F1E7] border-b border-[#B08D57]/30 shadow-2xl"
      />

      {/* Bottom Half Panel */}
      <motion.div
        initial={{ y: "0%" }}
        animate={isExiting ? { y: "100%" } : { y: "0%" }}
        transition={{ duration: 0.65, ease: EASINGS.expoInOut }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#F6F1E7] border-t border-[#B08D57]/30 shadow-2xl"
      />

      {/* CENTERPIECE CONTENT (fades softly as curtains part) */}
      <motion.div
        animate={isExiting ? { opacity: 0, scale: 0.98 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: EASINGS.editorial }}
        className="relative z-10 flex h-full w-full flex-col items-center justify-between p-8 sm:p-14 text-center pointer-events-none"
      >
        {/* Archival Corner Registration Marks */}
        <div className="absolute top-8 left-8 font-mono text-[10px] text-[#6F665A]/40 tracking-wider">
          + 01 &bull; FOLIO
        </div>
        <div className="absolute top-8 right-8 font-mono text-[10px] text-[#6F665A]/40 tracking-wider">
          EDITION DE LUXE &bull; 02 +
        </div>
        <div className="absolute bottom-8 left-8 font-mono text-[10px] text-[#6F665A]/40 tracking-wider">
          + 03 &bull; MMXXVI
        </div>
        <div className="absolute bottom-8 right-8 font-mono text-[10px] text-[#6F665A]/40 tracking-wider">
          ESC TO ENTER &bull; 04 +
        </div>

        {/* Top Folio Header */}
        <div className="pt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6F665A]">
          <span>THE COLLECTOR&apos;S MONOGRAPH &bull; NO. 01</span>
        </div>

        {/* Center: Monogram & Title Plate */}
        <div className="my-auto flex flex-col items-center">
          {/* Gold Foil Animated Monogram */}
          <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="splashGoldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8C6B3A" />
                  <stop offset="40%" stopColor="#E3C98E" />
                  <stop offset="70%" stopColor="#B08D57" />
                  <stop offset="100%" stopColor="#F2E2B5" />
                </linearGradient>
              </defs>

              {/* Outer Fine Circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="url(#splashGoldFoil)"
                strokeWidth="1.2"
                strokeDasharray="276"
                initial={{ strokeDashoffset: 276, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 0.9 }}
                transition={{ duration: 1.15, ease: EASINGS.editorial }}
              />

              {/* Inner Calligraphic Serif "S" */}
              <motion.path
                d="M 68 28 C 64 22 58 19 50 19 C 39 19 32 26 32 35 C 32 45 40 50 52 54 C 66 59 74 65 74 76 C 74 88 64 95 49 95 C 38 95 30 89 26 80"
                fill="none"
                stroke="url(#splashGoldFoil)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray="200"
                initial={{ strokeDashoffset: 200, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ duration: 1.25, ease: EASINGS.editorial, delay: 0.1 }}
              />

              {/* Center Archival Diamond Accent */}
              <motion.polygon
                points="50,47 53,50 50,53 47,50"
                fill="#B08D57"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
            </svg>
          </div>

          {/* Line-Masked Name Reveal */}
          <div className="space-y-1">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "115%" }}
                animate={nameVisible ? { y: "0%" } : { y: "115%" }}
                transition={{ duration: 0.75, ease: EASINGS.editorial }}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.06em] text-[#14110F] uppercase"
              >
                Srajan Srivastava
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "115%" }}
                animate={nameVisible ? { y: "0%" } : { y: "115%" }}
                transition={{ duration: 0.75, ease: EASINGS.editorial, delay: 0.08 }}
                className="font-serif italic text-base sm:text-lg text-[#6B1E1E]"
              >
                A Personal Archive of Software Craftsmanship
              </motion.p>
            </div>
          </div>

          {/* Hairline Progress Runner */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="relative h-[1.5px] w-48 sm:w-64 overflow-hidden rounded-full bg-[#EDE5D3]">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8C6B3A] via-[#E3C98E] to-[#B08D57]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.05 }}
              />
            </div>

            {/* Tabular Mono Counter */}
            <div className="flex items-center gap-2 font-mono text-[11px] tabular-nums tracking-widest text-[#6F665A]">
              <span>{String(progress).padStart(3, "0")}</span>
              <span>/</span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* Bottom Subtitle / Skip Hint */}
        <div className="pb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[#6F665A]/60">
          <span>CLICK ANYWHERE OR PRESS ESC TO OPEN</span>
        </div>
      </motion.div>
    </aside>
  );
}
