"use client";

import React, { useState, useEffect } from "react";
import { JournalProvider, useJournal } from "@/context/JournalContext";
import { PaperNoise } from "@/components/layout/PaperNoise";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { HUD } from "@/components/layout/HUD";
import { Level0TitleScreen } from "@/components/levels/Level0TitleScreen";
import { SplashScreen } from "@/components/ui/SplashScreen";

function JournalContainer() {
  const { currentLevel, setLevel, unlockEasterEgg } = useJournal();
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // Check if splash was already viewed in this browser session
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("srajan_splash_seen");
      if (seen === "true") {
        setShowSplash(false);
      }
    } catch {}
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    try {
      sessionStorage.setItem("srajan_splash_seen", "true");
    } catch {}
  };

  // Scroll spy to update active level in HUD
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "level-0",
        "level-1",
        "level-2",
        "level-3",
        "level-4",
        "level-5",
        "level-6",
        "level-7",
        "level-8",
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setLevel(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setLevel]);

  // Easter Egg 1: Konami Code listener
  useEffect(() => {
    const konamiSequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let currentIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiSequence[currentIndex]) {
        currentIndex++;
        if (currentIndex === konamiSequence.length) {
          unlockEasterEgg("konami_code", 150);
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [unlockEasterEgg]);

  return (
    <div className="relative min-h-screen bg-[#F2EBDD] text-[#1B1A17] transition-colors duration-300 dark:bg-[#181512] dark:text-[#EBE3D3]">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <PaperNoise />
      <CustomCursor />
      <HUD />

      <main className="relative z-10 mx-auto w-full">
        {/* LEVEL 0: TITLE SCREEN */}
        <Level0TitleScreen />

        {/* Phase 1 Preview Placeholder for Next Levels */}
        <section
          id="level-1"
          className="relative min-h-[50vh] w-full border-b border-dashed border-[#D3C4A5] bg-[#FBF8F1] py-16 px-6 dark:border-[#3A3328] dark:bg-[#1B1814]"
        >
          <div className="mx-auto max-w-4xl text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D9432B] dark:text-[#E55840]">
              [LEVEL 01 // COMING UP IN PHASE 3]
            </span>
            <h2 className="mt-3 font-display text-3xl font-black uppercase text-[#1B1A17] sm:text-5xl dark:text-[#EBE3D3]">
              LEVEL 1: ORIGINS (2022)
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-serif text-base italic text-[#4B463E] dark:text-[#B2A896]">
              &ldquo;BPIT Delhi, B.Tech IT, day one. Self-drawing sketches and
              the first sparks of code.&rdquo;
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded border border-dashed border-[#837B6D] px-4 py-2 font-mono text-xs text-[#837B6D] dark:text-[#7E7565]">
              <span>Phase 1 Design Foundation Initialized</span>
              <span>&bull;</span>
              <span className="text-[#7A8B6F] font-bold dark:text-[#92A585]">Ready for Phase 2 Schema & Seed</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <JournalProvider>
      <JournalContainer />
    </JournalProvider>
  );
}
