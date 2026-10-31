"use client";

import React, { useState, useEffect } from "react";
import { JournalProvider, useJournal } from "@/context/JournalContext";
import { PaperNoise } from "@/components/layout/PaperNoise";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { HUD } from "@/components/layout/HUD";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { Level0TitleScreen } from "@/components/levels/Level0TitleScreen";
import { Level1Origins } from "@/components/levels/Level1Origins";
import { Level2TheGrind } from "@/components/levels/Level2TheGrind";
import { Level3FirstBuild } from "@/components/levels/Level3FirstBuild";
import { Level4BossFight } from "@/components/levels/Level4BossFight";
import { Level5Clavis } from "@/components/levels/Level5Clavis";
import { Level6RealWorld } from "@/components/levels/Level6RealWorld";
import { Level7Inventory } from "@/components/levels/Level7Inventory";
import { Level8Player2 } from "@/components/levels/Level8Player2";
import { AskSrajanChat } from "@/components/chat/AskSrajanChat";

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

        {/* LEVEL 1: ORIGINS (2022) — BPIT Delhi & Octave Music Society */}
        <Level1Origins />

        {/* LEVEL 2: THE GRIND — LeetCode, Rejection & Algorithmic Resilience */}
        <Level2TheGrind />

        {/* LEVEL 3: FIRST BUILD — Tourphin Travel Engine (React, Supabase, Razorpay) */}
        <Level3FirstBuild />

        {/* LEVEL 4: BOSS FIGHT — Crack-a-Code 3.0 Hackathon Victory (3rd Place) */}
        <Level4BossFight />

        {/* LEVEL 5: THE MAGNUM OPUS — CLAVIS Intelligent Job Portal & ATS Platform */}
        <Level5Clavis />

        {/* LEVEL 6: THE REAL WORLD — Hudle Production Engineering (Juspay & GoRouter) */}
        <Level6RealWorld />

        {/* LEVEL 7: THE PLAYER'S INVENTORY — 25 Collectible Battle Artifacts */}
        <Level7Inventory />

        {/* FINAL LEVEL: PLAYER 2 (YOU) — Guestbook, Transmission Desk & Resume Dossier */}
        <Level8Player2 />
      </main>

      {/* Floating Interactive AI Assistant */}
      <AskSrajanChat />
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
