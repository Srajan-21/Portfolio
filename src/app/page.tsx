"use client";

import React, { useState, useEffect } from "react";
import { StickerWorldProvider, useStickerWorld } from "@/context/StickerWorldContext";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { StickerCursor } from "@/components/ui/StickerCursor";
import { RetroTaskbar } from "@/components/layout/RetroTaskbar";
import { PlayableMascot } from "@/components/mascot/PlayableMascot";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { HeroStickerWorld } from "@/components/hero/HeroStickerWorld";
import { WindingScrollPath } from "@/components/layout/WindingScrollPath";

// Progressive chapter components (to be overhauled in P3-P6)
import { Level1Origins } from "@/components/levels/Level1Origins";
import { Level2TheGrind } from "@/components/levels/Level2TheGrind";
import { Level3FirstBuild } from "@/components/levels/Level3FirstBuild";
import { Level4BossFight } from "@/components/levels/Level4BossFight";
import { Level5Clavis } from "@/components/levels/Level5Clavis";
import { Level6RealWorld } from "@/components/levels/Level6RealWorld";
import { Level7Inventory } from "@/components/levels/Level7Inventory";
import { Level8Player2 } from "@/components/levels/Level8Player2";
import { CardBinderModal } from "@/components/cards/CardBinderModal";
import { QuestLogModal } from "@/components/quests/QuestLogModal";
import { AskSrajanChat } from "@/components/chat/AskSrajanChat";

function StickerWorldContainer() {
  const { setActiveChapter, completeQuest, openWindows, closeWindow } = useStickerWorld();
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // Check if splash was already viewed in this browser session
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("srajan_sticker_splash_seen");
      if (seen === "true") {
        setShowSplash(false);
      }
    } catch {}
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    try {
      sessionStorage.setItem("srajan_sticker_splash_seen", "true");
    } catch {}
  };

  // Scroll spy to update active chapter
  useEffect(() => {
    const handleScroll = () => {
      const chapters = [
        "hero-section",
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

  // Secret: Konami Code listener (completes quest q_konami)
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
          completeQuest("q_konami");
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [completeQuest]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#FFF8EC] text-[#14121A] selection:bg-[#FFC93C] selection:text-[#14121A] pb-24">
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        
        {/* Playable Mascot & Custom Sticker Cursor */}
        <StickerCursor />
        <PlayableMascot />
        <RetroTaskbar />

        <main className="relative z-10 mx-auto w-full">
          {/* BACKGROUND WINDING ROAD & MILESTONE PATH */}
          <WindingScrollPath />

          {/* LEVEL 0: HERO STICKER WORLD & PHYSICS DESK */}
          <HeroStickerWorld />

          {/* CHAPTER I: ORIGINS (2022) */}
          <Level1Origins />

          {/* CHAPTER II: THE GRIND */}
          <Level2TheGrind />

          {/* CHAPTER III: FIRST BUILD • TOURPHIN */}
          <Level3FirstBuild />

          {/* CHAPTER IV: THE PODIUM • CRACK-A-CODE 3.0 */}
          <Level4BossFight />

          {/* CHAPTER V: CLAVIS • THE STARTUP MAGNUM OPUS */}
          <Level5Clavis />

          {/* CHAPTER VI: THE REAL WORLD • HUDLE */}
          <Level6RealWorld />

          {/* CHAPTER VII: THE TOOLKIT */}
          <Level7Inventory />

          {/* CHAPTER VIII: THE LAST PAGE • GUESTBOOK & CONTACT */}
          <Level8Player2 />
        </main>

        {/* TRADING CARDS BINDER & QUEST LOG MODALS */}
        <CardBinderModal
          isOpen={openWindows.includes("binder")}
          onClose={() => closeWindow("binder")}
        />
        <QuestLogModal
          isOpen={openWindows.includes("quests")}
          onClose={() => closeWindow("quests")}
        />

        {/* AI Chat Bot Assistant */}
        <AskSrajanChat />
      </div>
    </SmoothScroll>
  );
}

export default function Home() {
  return (
    <StickerWorldProvider>
      <StickerWorldContainer />
    </StickerWorldProvider>
  );
}
