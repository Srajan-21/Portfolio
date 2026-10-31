"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/sound";
import { Sparkles } from "lucide-react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [fadingOut, setFadingOut] = useState(false);
  const [stage, setStage] = useState<"nib-approach" | "signing" | "stamped" | "unfurling">("nib-approach");
  const [statusText, setStatusText] = useState("UNROLLING MANUSCRIPT...");

  useEffect(() => {
    // 0.25s: Nib touches paper, calligraphic draw begins
    const t1 = setTimeout(() => {
      setStage("signing");
      soundEngine.playPenScratch();
    }, 250);

    // 1.2s: Secondary phase text
    const t2 = setTimeout(() => {
      setStatusText("VERIFYING ARCHIVAL SYSTEM LOGS...");
    }, 1200);

    // 2.0s: Signature completes, red seal stamp slams down
    const t3 = setTimeout(() => {
      setStage("stamped");
      soundEngine.playStamp();
      setStatusText("FIELD LOG: BPIT DELHI TO HUDLE • READY");
    }, 2000);

    // 3.0s: Hold complete -> trigger unfurling exit
    const t4 = setTimeout(() => {
      handleComplete();
    }, 3100);

    // Escape key listener for skippability
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleComplete = () => {
    if (fadingOut) return;
    setStage("unfurling");
    soundEngine.playPaperTear();
    setFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 650);
  };

  return (
    <aside
      aria-label="Loading Journal Archives"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F2EBDD] text-[#1B1A17] transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] dark:bg-[#181512] dark:text-[#EBE3D3] ${
        fadingOut ? "opacity-0 scale-[1.04] blur-[2px] pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background SVG paper grain texture */}
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply dark:mix-blend-overlay" />

      {/* Editorial Print Registration Corner Marks (+) */}
      <div className="pointer-events-none absolute inset-6 sm:inset-12 border border-[#D3C4A5]/60 dark:border-[#3A3328]/60">
        <span className="absolute -top-3 -left-3 font-mono text-[10px] text-[#837B6D] select-none">+ 01</span>
        <span className="absolute -top-3 -right-3 font-mono text-[10px] text-[#837B6D] select-none">02 +</span>
        <span className="absolute -bottom-3 -left-3 font-mono text-[10px] text-[#837B6D] select-none">+ 03</span>
        <span className="absolute -bottom-3 -right-3 font-mono text-[10px] text-[#837B6D] select-none">04 +</span>
      </div>

      {/* Giant Background Monogram Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute select-none font-display text-[16vw] font-black text-[#1B1A17]/[0.035] dark:text-[#EBE3D3]/[0.035] tracking-tighter"
      >
        VOL. 01
      </div>

      {/* Centerpiece Monograph Plate */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-lg">
        {/* Archival Masthead Tag */}
        <div className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#837B6D] dark:text-[#7E7565]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D9432B] animate-pulse" />
          <span>CONFIDENTIAL FIELD ARCHIVE &bull; ISSUE 2026</span>
        </div>

        {/* Fountain Pen & Signature Canvas Stage */}
        <div className="relative my-2 flex flex-col items-center">
          {/* Detailed Brass/Steel Fountain Pen Nib */}
          <div
            className={`pointer-events-none transition-all duration-1000 ease-out ${
              stage === "nib-approach"
                ? "-translate-x-20 -translate-y-6 rotate-[-25deg] opacity-0"
                : stage === "signing"
                ? "translate-x-16 -translate-y-2 rotate-12 opacity-100 scale-100"
                : "translate-x-28 -translate-y-10 rotate-45 opacity-0 scale-90"
            }`}
          >
            <svg
              className="h-12 w-12 drop-shadow-md text-[#1B1A17] dark:text-[#EBE3D3]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Slanted Master Pen Nib */}
              <path
                d="M3 21L6 18M6 18L17 7L13 3L2 14L6 18Z"
                fill="#C99A3B"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <circle cx="11.5" cy="8.5" r="1.2" fill="currentColor" />
              <line x1="11.5" y1="8.5" x2="3" y2="21" stroke="currentColor" strokeWidth="1" />
              {/* Nib Breathing Hole slit */}
              <line x1="17" y1="7" x2="19" y2="5" stroke="#D9432B" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Self-Drawing Signature Flourish Vector */}
          <div className="relative">
            <svg
              width="340"
              height="100"
              viewBox="0 0 340 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
            >
              {/* Master signature cursive path */}
              <path
                d="M 20 65 C 10 35, 45 15, 75 25 C 105 35, 60 85, 95 80 C 115 78, 125 45, 140 55 C 155 65, 160 80, 180 75 C 200 70, 195 40, 215 45 C 235 50, 230 80, 250 80 C 270 80, 275 55, 295 60 C 315 65, 325 80, 335 75"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="800"
                strokeDashoffset={stage === "nib-approach" ? "800" : "0"}
                style={{
                  transition: "stroke-dashoffset 2.0s cubic-bezier(0.33, 1, 0.68, 1)",
                }}
              />
            </svg>

            {/* Premium Typography Name Reveal */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
                stage === "nib-approach" ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
              }`}
            >
              <h1 className="font-hand text-5xl sm:text-6xl font-bold tracking-wide text-[#1B1A17] dark:text-[#EBE3D3]">
                Srajan Srivastava
              </h1>
              <span className="font-display text-[11px] uppercase tracking-[0.3em] font-semibold text-[#837B6D] dark:text-[#7E7565] -mt-1">
                Software Developer &bull; New Delhi
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Red Wax Stamp Slam */}
        <div
          className={`mt-4 transition-all duration-500 transform ${
            stage === "stamped" || stage === "unfurling"
              ? "opacity-100 scale-100 rotate-[-3deg]"
              : "opacity-0 scale-150 rotate-[-15deg] pointer-events-none"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded border-2 border-dashed border-[#D9432B] bg-[#D9432B]/10 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-[#D9432B] dark:border-[#E55840] dark:text-[#E55840]">
            <Sparkles className="h-3 w-3" />
            <span>AUTHENTICATED FIELD SPECIMEN</span>
          </div>
        </div>

        {/* Live Stage Status Log */}
        <div className="mt-6 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider text-[#4B463E] dark:text-[#B2A896]">
          <span>{statusText}</span>
        </div>

        {/* 3-Second Precision Progress Bar */}
        <div className="mt-5 h-[3px] w-64 overflow-hidden rounded-full bg-[#D3C4A5]/40 dark:bg-[#3A3328]">
          <div
            className="h-full bg-[#D9432B] transition-all duration-[3000ms] ease-linear"
            style={{ width: stage === "nib-approach" ? "0%" : "100%" }}
          />
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleComplete}
        className="group absolute bottom-8 right-8 flex items-center gap-1.5 rounded border border-dashed border-[#837B6D]/50 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#837B6D] hover:border-[#1B1A17] hover:text-[#1B1A17] transition-all dark:text-[#7E7565] dark:hover:border-[#EBE3D3] dark:hover:text-[#EBE3D3]"
      >
        <span>Skip Intro [Esc]</span>
        <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
      </button>
    </aside>
  );
}
