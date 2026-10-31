"use client";

import React, { useState } from "react";
import { useJournal } from "@/context/JournalContext";
import { ArrowDown, Sparkles, Scissors } from "lucide-react";

export function Level0TitleScreen() {
  const { isCoverTorn, tearCover, addXP } = useJournal();
  const [isTearing, setIsTearing] = useState(false);

  const handleStart = () => {
    if (isCoverTorn) {
      document.getElementById("level-1")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setIsTearing(true);
    tearCover();
    addXP(50, "COVER SEAL BROKEN // EXPEDITION COMMENCED");

    setTimeout(() => {
      document.getElementById("level-1")?.scrollIntoView({ behavior: "smooth" });
    }, 650);
  };

  return (
    <section
      id="level-0"
      className="relative min-h-[92vh] w-full overflow-hidden border-b-2 border-dashed border-[#D3C4A5] bg-[#F2EBDD] py-12 px-4 transition-colors duration-300 sm:px-8 md:py-20 dark:border-[#3A3328] dark:bg-[#181512]"
    >
      {/* Decorative Washi Tape at Top Left */}
      <div
        aria-hidden="true"
        className="absolute -top-3 left-10 z-10 h-8 w-32 -rotate-3 bg-[#E4D7C2]/80 shadow-sm backdrop-blur-[1px] dark:bg-[#3A3328]/60"
        style={{
          clipPath:
            "polygon(0% 10%, 5% 0%, 95% 0%, 100% 10%, 96% 100%, 5% 95%, 0% 100%)",
        }}
      />

      {/* Decorative Washi Tape at Top Right */}
      <div
        aria-hidden="true"
        className="absolute -top-2 right-12 z-10 h-8 w-28 rotate-6 bg-[#C99A3B]/40 shadow-sm dark:bg-[#DEB459]/20"
        style={{
          clipPath:
            "polygon(0% 0%, 95% 5%, 100% 90%, 95% 100%, 5% 95%, 0% 85%)",
        }}
      />

      {/* Coffee Cup Ring Watermark in Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 right-6 z-0 h-48 w-48 rounded-full border-4 border-[#C99A3B]/20 mix-blend-multiply sm:h-64 sm:w-64 dark:border-[#DEB459]/10"
        style={{
          boxShadow:
            "inset 0 0 16px rgba(201, 154, 59, 0.15), 0 0 12px rgba(201, 154, 59, 0.1)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-between text-center">
        {/* Editorial Journal Masthead Header */}
        <div className="mb-6 flex w-full flex-wrap items-center justify-between border-b border-[#D3C4A5] pb-4 font-mono text-[11px] uppercase tracking-wider text-[#837B6D] dark:border-[#3A3328] dark:text-[#7E7565]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#D9432B] dark:text-[#E55840]">
              [VOL. 01]
            </span>
            <span>EDITION: OCTOBER 2026</span>
          </div>
          <div className="hidden sm:block">
            RECORD TYPE: FULL STACK ENGINEERING DOSSIER
          </div>
          <div className="flex items-center gap-1.5 text-[#1B1A17] dark:text-[#EBE3D3]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7A8B6F]" />
            <span>NEW DELHI // 28.6139° N</span>
          </div>
        </div>

        {/* Center Title Hero Block */}
        <div className="my-6 w-full max-w-4xl py-4 sm:py-8">
          <div className="mb-3 inline-block rounded-xs border border-dashed border-[#D9432B] bg-[#D9432B]/5 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-[#D9432B] dark:border-[#E55840] dark:bg-[#E55840]/10 dark:text-[#E55840]">
            LEVEL 00 // THE PLAYER&apos;S JOURNAL
          </div>

          {/* Giant Riso-Print Misregistered Display Name */}
          <h1
            data-text="SRAJAN SRIVASTAVA"
            className="riso-title font-display text-4xl font-black uppercase tracking-tight text-[#1B1A17] sm:text-6xl md:text-8xl lg:text-[6.5rem] dark:text-[#EBE3D3]"
          >
            SRAJAN SRIVASTAVA
          </h1>

          <p className="mx-auto mt-4 max-w-2xl font-serif text-lg italic text-[#4B463E] sm:text-xl md:text-2xl dark:text-[#B2A896]">
            &ldquo;An interactive field record of turning curiosity into
            fault-tolerant code &mdash; from day zero at BPIT Delhi to production
            at Hudle.&rdquo;
          </p>

          {/* Marginalia Note with Ink Arrow */}
          <div className="relative mx-auto mt-6 max-w-md">
            <div className="flex items-center justify-center gap-2 font-hand text-xl text-[#D9432B] sm:text-2xl dark:text-[#E55840]">
              <span>* Field notes, battle scars, and live running machines</span>
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Tactile Stamp Badges Array */}
        <div className="my-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
          {/* Stamp 1: Education */}
          <div
            data-cursor="stamp"
            className="stamp-border rotate-[-2deg] rounded-sm bg-[#FBF8F1] p-3 text-left shadow-sm transition-transform hover:rotate-0 dark:bg-[#24201A]"
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#837B6D] dark:text-[#7E7565]">
              STAMP // 01
            </span>
            <div className="font-display text-sm font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
              BPIT Delhi
            </div>
            <div className="font-mono text-[11px] text-[#D9432B] dark:text-[#E55840]">
              B.Tech IT (2022&ndash;2026)
            </div>
          </div>

          {/* Stamp 2: Production Experience */}
          <div
            data-cursor="stamp"
            className="stamp-border rotate-[3deg] rounded-sm bg-[#FBF8F1] p-3 text-left shadow-sm transition-transform hover:rotate-0 dark:bg-[#24201A]"
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#837B6D] dark:text-[#7E7565]">
              STAMP // 02
            </span>
            <div className="font-display text-sm font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
              Hudle Intern
            </div>
            <div className="font-mono text-[11px] text-[#7A8B6F] dark:text-[#92A585]">
              Juspay & GoRouter Prod
            </div>
          </div>

          {/* Stamp 3: Hackathon Winner */}
          <div
            data-cursor="stamp"
            className="stamp-border col-span-2 rotate-[-1deg] rounded-sm bg-[#FBF8F1] p-3 text-left shadow-sm transition-transform hover:rotate-0 sm:col-span-1 dark:bg-[#24201A]"
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#837B6D] dark:text-[#7E7565]">
              STAMP // 03
            </span>
            <div className="font-display text-sm font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
              Crack-a-Code 3.0
            </div>
            <div className="font-mono text-[11px] text-[#C99A3B] dark:text-[#DEB459]">
              3rd Place (50+ Teams)
            </div>
          </div>
        </div>

        {/* Paper Tear / Press Start Action Button */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            onClick={handleStart}
            data-cursor="pointer"
            className={`group relative flex items-center gap-3 overflow-hidden rounded border-2 border-[#1B1A17] bg-[#D9432B] px-8 py-4 font-mono text-sm font-black uppercase tracking-widest text-[#F2EBDD] shadow-[4px_4px_0px_0px_#1B1A17] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1B1A17] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none dark:border-[#EBE3D3] dark:shadow-[4px_4px_0px_0px_#EBE3D3] ${
              isTearing ? "scale-95 opacity-80" : ""
            }`}
          >
            <Scissors className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0" />
            <span>
              {isCoverTorn ? "RESUME EXPEDITION" : "PRESS START // TEAR JOURNAL"}
            </span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </button>

          <div className="flex items-center gap-2 font-hand text-base text-[#837B6D] dark:text-[#7E7565]">
            <span>Or scroll down to unroll the manuscript</span>
            <span className="text-[#D9432B] dark:text-[#E55840]">&darr;</span>
          </div>
        </div>
      </div>

      {/* Jagged Torn Paper Divider Edge at Bottom */}
      <div
        aria-hidden="true"
        className="torn-edge-bottom absolute bottom-0 left-0 right-0 h-6 bg-[#E4D7C2] dark:bg-[#12100E]"
      />
    </section>
  );
}
