"use client";

import React, { useState, useEffect } from "react";
import { CollectorProvider, useCollector } from "@/context/CollectorContext";
import { PaperNoise } from "@/components/layout/PaperNoise";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CollectorTopBar } from "@/components/layout/CollectorTopBar";
import { VerticalChapterIndex } from "@/components/layout/VerticalChapterIndex";
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

function CollectorContainer() {
  const { activeChapter, setActiveChapter, unlockSeal, activeToast } = useCollector();
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // Check if splash was already viewed in this browser session
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("srajan_collector_splash_seen");
      if (seen === "true") {
        setShowSplash(false);
      }
    } catch {}
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    try {
      sessionStorage.setItem("srajan_collector_splash_seen", "true");
    } catch {}
  };

  // Scroll spy to update active chapter numeral in top bar and vertical index
  useEffect(() => {
    const handleScroll = () => {
      const chapters = [
        "chapter-0",
        "chapter-1",
        "chapter-2",
        "chapter-3",
        "chapter-4",
        "chapter-5",
        "chapter-6",
        "chapter-7",
        "chapter-8",
      ];

      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveChapter(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActiveChapter]);

  // Secret Seal: Konami Code listener
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
          unlockSeal("seal_konami");
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [unlockSeal]);

  return (
    <div className="relative min-h-screen bg-[#F6F1E7] text-[#14110F] selection:bg-[#6B1E1E] selection:text-[#F6F1E7]">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <PaperNoise />
      <CustomCursor />
      <CollectorTopBar />
      <VerticalChapterIndex />

      {/* Gentle Seal Earned Toast */}
      {activeToast && (
        <div className="fixed bottom-8 right-8 z-50 animate-fade-in">
          <div className="flex items-center gap-3 rounded border border-[#B08D57]/40 bg-[#FAF7F2] p-4 shadow-plinth">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B08D57] bg-[#EDE5D3] text-[#8C6B3A] font-display font-semibold text-sm">
              {activeToast.numeral}
            </div>
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C6B3A]">
                SEAL CONFERRED
              </span>
              <span className="font-display text-base font-light text-[#14110F]">
                {activeToast.title}
              </span>
            </div>
          </div>
        </div>
      )}

      <main className="relative z-10 mx-auto w-full lg:pl-16">
        {/* FRONTISPIECE / CHAPTER 0 */}
        <Level0TitleScreen />

        {/* CHAPTER I: ORIGINS (2022) */}
        <Level1Origins />

        {/* CHAPTER II: THE GRIND */}
        <Level2TheGrind />

        {/* CHAPTER III: FIRST BUILD &bull; TOURPHIN */}
        <Level3FirstBuild />

        {/* CHAPTER IV: THE PODIUM &bull; CRACK-A-CODE 3.0 */}
        <Level4BossFight />

        {/* CHAPTER V: CLAVIS &bull; THE STARTUP MAGNUM OPUS */}
        <Level5Clavis />

        {/* CHAPTER VI: THE REAL WORLD &bull; HUDLE */}
        <Level6RealWorld />

        {/* CHAPTER VII: THE TOOLKIT */}
        <Level7Inventory />

        {/* CHAPTER VIII: THE LAST PAGE &bull; CERTIFICATE OF PASSAGE */}
        <Level8Player2 />
      </main>

      {/* Archival Assistant */}
      <AskSrajanChat />
    </div>
  );
}

export default function Home() {
  return (
    <CollectorProvider>
      <CollectorContainer />
    </CollectorProvider>
  );
}
