"use client";

import React from "react";
import { useStickerWorld } from "@/context/StickerWorldContext";
import { PhysicsStickerPile } from "@/components/hero/PhysicsStickerPile";
import { ArrowDown, Gamepad2, Sparkles, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function HeroStickerWorld() {
  const { togglePlayMode, isPlayMode, stickers, collectSticker } = useStickerWorld();

  const handleStartJourney = () => {
    collectSticker("hero_start", 2, "Started the journey!");
    const target = document.getElementById("chapter-1");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[95vh] w-full pt-10 pb-20 px-4 sm:px-8 md:px-14 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top Header Marquee Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between border-b-ink-2 pb-4 font-mono text-xs font-bold text-[#14121A]">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-[#FF4D2E] border-ink-2 animate-ping" />
            <span className="bg-[#FFC93C] px-2 py-0.5 rounded border-ink-2 text-[10px] uppercase">
              DELHI NCR &bull; 2022 &ndash; 2026
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px]">
            <span>ENGINEERING MEMOIR //</span>
            <span className="bg-[#3DDC97] px-2 py-0.5 rounded border-ink-2">
              VOL. 01 STICKER EDITION
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2F5BFF]" />
            <span>HUDLE INTERN &bull; CLAVIS ARCHITECT</span>
          </div>
        </div>

        {/* Hero Grid: Giant Headline + Physics Pile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Giant Name & Story Introduction */}
          <div className="lg:col-span-7 space-y-6">
            {/* Washi Tape Accent */}
            <div className="inline-block px-4 py-1.5 rounded-sm bg-[#FFC93C] font-mono text-xs font-black uppercase text-[#14121A] border-ink-2 shadow-hard-sm -rotate-2">
              👋 WELCOME TO MY PLAYGROUND &amp; ARCHIVE
            </div>

            {/* Giant Chunky Name */}
            <div className="space-y-1">
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black leading-[0.88] tracking-tight text-[#14121A] uppercase"
              >
                Srajan <br />
                <span className="inline-block bg-[#FF4D2E] text-white px-3 py-1 rounded-2xl border-ink-4 shadow-hard-lg rotate-1">
                  Srivastava
                </span>
              </motion.h1>
            </div>

            {/* Subtitle Line with Tape & Badges */}
            <p className="font-sans text-lg sm:text-xl font-bold leading-snug text-[#14121A] max-w-xl">
              Software developer. Electric guitarist. Ex-president of Octave. Currently debugging payments at{" "}
              <span className="bg-[#FF8FB8] px-2 py-0.5 rounded border-ink text-[#14121A] font-black inline-block -rotate-1">
                Hudle
              </span>{" "}
              and building{" "}
              <span className="bg-[#3DDC97] px-2 py-0.5 rounded border-ink text-[#14121A] font-black inline-block rotate-1">
                CLAVIS
              </span>
              .
            </p>

            {/* Narrative Annotation */}
            <div className="rounded-2xl border-ink-2 bg-white/90 p-4 shadow-hard-sm max-w-lg font-hand text-xl text-[#14121A] rotate-[-0.5deg]">
              &ldquo;From day one at BPIT Delhi (9 Nov 2022) with a blank notebook and an electric guitar, to solving production webhook races at scale.&rdquo;
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* Start the journey */}
              <button
                onClick={handleStartJourney}
                className="btn-press flex items-center gap-2.5 rounded-2xl border-ink-4 bg-[#FFC93C] px-6 py-4 font-mono text-sm sm:text-base font-black uppercase text-[#14121A] shadow-hard"
              >
                <Sparkles className="h-5 w-5 text-[#FF4D2E]" />
                <span>Start the Journey</span>
                <ArrowDown className="h-4 w-4" />
              </button>

              {/* Play Mode CTA */}
              <button
                onClick={togglePlayMode}
                className="btn-press flex items-center gap-2.5 rounded-2xl border-ink-4 bg-[#2F5BFF] px-6 py-4 font-mono text-sm sm:text-base font-black uppercase text-white shadow-hard"
              >
                <Gamepad2 className="h-5 w-5 text-[#FFC93C]" />
                <span>{isPlayMode ? "Exit Play (P)" : "Play Mode (P)"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Physics Sticker Desk */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <PhysicsStickerPile />

            {/* Doodle Arrow Caption */}
            <div className="mt-3 flex items-center gap-2 font-hand text-lg text-[#14121A]">
              <span>👆 Real physics! Fling them into each other!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
