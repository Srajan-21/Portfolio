"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { StickerLevel, TradingCard, Quest } from "@/types/database";
import { supabase } from "@/lib/supabase/client";
import { SEED_CARDS } from "@/lib/supabase/seed-data";

export function calculateLevel(stickers: number): StickerLevel {
  if (stickers >= 30) return "Legend";
  if (stickers >= 15) return "Pro";
  if (stickers >= 5) return "Rookie";
  return "Newbie";
}

export const INITIAL_QUESTS: Quest[] = [
  { id: "q_hero", title: "Meet the Mascot", description: "Say hello to Srajan and explore the desk.", reward_stickers: 2 },
  { id: "q_physics", title: "Fling a Sticker", description: "Grab and throw a tech sticker in the hero pile.", reward_stickers: 2 },
  { id: "q_timeline", title: "Walk the Path", description: "Follow the 2022-2026 college journey to Chapter 1.", reward_stickers: 3 },
  { id: "q_peel", title: "Peel the Rejection Wall", description: "Uncover what Srajan learned from the placement grind.", reward_stickers: 3 },
  { id: "q_tourphin", title: "Open Tourphin Window", description: "Inspect the SIH travel architecture demo.", reward_stickers: 4 },
  { id: "q_podium", title: "Visit the Podium", description: "Reach the Nagarro Crack-a-Code 3rd place plinth.", reward_stickers: 4 },
  { id: "q_clavis", title: "Unlock CLAVIS Suite", description: "Open all 4 technical plates of the startup engine.", reward_stickers: 5 },
  { id: "q_hudle", title: "Simulate Juspay Webhook", description: "Test the idempotent webhook replay in the Hudle terminal.", reward_stickers: 4 },
  { id: "q_guestbook", title: "Leave Your Mark", description: "Draw a doodle and sign the public guestbook ledger.", reward_stickers: 5 },
  { id: "q_konami", title: "Arcade Secret Code", description: "Enter the legendary gamer keystroke sequence.", reward_stickers: 5, isSecret: true },
];

export interface StickerWorldContextType {
  stickers: number;
  level: StickerLevel;
  collectedStickerIds: string[];
  collectSticker: (id: string, amount?: number, label?: string) => boolean;
  addStickers: (amount: number, id?: string) => void;
  
  // Play Mode & Mascot
  isPlayMode: boolean;
  togglePlayMode: () => void;
  mascotSpeech: string | null;
  setMascotSpeech: (text: string | null, durationMs?: number) => void;

  // OS Windows
  openWindows: string[];
  activeWindow: string | null;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  bringToFront: (id: string) => void;

  // Cards & Binder
  collectedCards: string[];
  collectCard: (card: TradingCard) => void;
  unlockCard: (cardId: string) => void;
  activeCardPack: TradingCard | null;
  setActiveCardPack: (card: TradingCard | null) => void;

  // Quests
  quests: Quest[];
  completedQuests: string[];
  completeQuest: (questId: string) => void;

  // Settings & Toggles
  soundEnabled: boolean;
  toggleSound: () => void;
  calmMode: boolean;
  toggleCalmMode: () => void;
  activeChapter: number;
  setActiveChapter: (ch: number) => void;

  // Notification Toast
  activeToast: { title: string; subtitle: string; icon?: string } | null;
}

const StickerWorldContext = createContext<StickerWorldContextType | undefined>(undefined);

export function StickerWorldProvider({ children }: { children: React.ReactNode }) {
  const [stickers, setStickers] = useState<number>(0);
  const [collectedStickerIds, setCollectedStickerIds] = useState<string[]>([]);
  const [isPlayMode, setIsPlayMode] = useState<boolean>(false);
  const [mascotSpeech, setMascotSpeech] = useState<string | null>(
    "Yo! Welcome to my sticker world! Scroll along or press 'P' to control me!"
  );
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [collectedCards, setCollectedCards] = useState<string[]>([]);
  const [activeCardPack, setActiveCardPack] = useState<TradingCard | null>(null);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [calmMode, setCalmMode] = useState<boolean>(false);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [activeToast, setActiveToast] = useState<{ title: string; subtitle: string; icon?: string } | null>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const savedStickers = localStorage.getItem("srajan_stickers_count");
      if (savedStickers) setStickers(parseInt(savedStickers, 10));

      const savedIds = localStorage.getItem("srajan_collected_sticker_ids");
      if (savedIds) setCollectedStickerIds(JSON.parse(savedIds));

      const savedCards = localStorage.getItem("srajan_cards_collected");
      if (savedCards) setCollectedCards(JSON.parse(savedCards));

      const savedQuests = localStorage.getItem("srajan_quests_completed");
      if (savedQuests) setCompletedQuests(JSON.parse(savedQuests));

      const savedCalm = localStorage.getItem("srajan_calm_mode");
      if (savedCalm === "true") setCalmMode(true);
    } catch {}
  }, []);

  const level = calculateLevel(stickers);

  // Trigger temporary notification toast
  const triggerToast = useCallback((title: string, subtitle: string, icon = "⭐") => {
    setActiveToast({ title, subtitle, icon });
    setTimeout(() => {
      setActiveToast(null);
    }, 3500);
  }, []);

  // Collect a sticker
  const collectSticker = useCallback(
    (id: string, amount = 1, label?: string) => {
      if (collectedStickerIds.includes(id)) return false;

      const updatedIds = [...collectedStickerIds, id];
      const updatedCount = stickers + amount;

      setCollectedStickerIds(updatedIds);
      setStickers(updatedCount);

      try {
        localStorage.setItem("srajan_collected_sticker_ids", JSON.stringify(updatedIds));
        localStorage.setItem("srajan_stickers_count", updatedCount.toString());
      } catch {}

      triggerToast(`+${amount} Sticker${amount > 1 ? "s" : ""} Earned!`, label || "Added to your collection!");

      // Sync with Supabase visitor_progress quietly
      const sessionId = sessionStorage.getItem("srajan_session_id") || `sess_${Date.now()}`;
      sessionStorage.setItem("srajan_session_id", sessionId);

      try {
        supabase.from("visitor_progress").upsert({
          session_id: sessionId,
          progress_score: updatedCount,
          stickers_count: updatedCount,
          level: calculateLevel(updatedCount),
          updated_at: new Date().toISOString(),
        }).then(() => {}, () => {});
      } catch {}

      return true;
    },
    [collectedStickerIds, stickers, triggerToast]
  );

  const addStickers = useCallback(
    (amount: number, id?: string) => {
      const stickerId = id || `custom_stk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      collectSticker(stickerId, amount);
    },
    [collectSticker]
  );

  // Complete a quest
  const completeQuest = useCallback(
    (questId: string) => {
      if (completedQuests.includes(questId)) return;
      const quest = INITIAL_QUESTS.find((q) => q.id === questId);
      if (!quest) return;

      const updated = [...completedQuests, questId];
      setCompletedQuests(updated);

      try {
        localStorage.setItem("srajan_quests_completed", JSON.stringify(updated));
      } catch {}

      collectSticker(`quest_reward_${questId}`, quest.reward_stickers, `Quest: ${quest.title}`);
    },
    [completedQuests, collectSticker]
  );

  // Collect a trading card (triggers pack reveal)
  const collectCard = useCallback(
    (card: TradingCard) => {
      if (!collectedCards.includes(card.id)) {
        const updated = [...collectedCards, card.id];
        setCollectedCards(updated);
        try {
          localStorage.setItem("srajan_cards_collected", JSON.stringify(updated));
        } catch {}
      }
      setActiveCardPack(card);
    },
    [collectedCards]
  );

  const unlockCard = useCallback(
    (cardId: string) => {
      const card = SEED_CARDS.find((c) => c.id === cardId);
      if (card) {
        collectCard(card);
      }
    },
    [collectCard]
  );

  const setMascotSpeechWithDuration = useCallback((text: string | null, durationMs?: number) => {
    setMascotSpeech(text);
    if (text && durationMs) {
      setTimeout(() => {
        setMascotSpeech((current) => (current === text ? null : current));
      }, durationMs);
    }
  }, []);

  // Play Mode toggle
  const togglePlayMode = useCallback(() => {
    setIsPlayMode((prev) => {
      const next = !prev;
      if (next) {
        setMascotSpeech("🎮 Play Mode ON! Use Arrow Keys or WASD to run around!");
      } else {
        setMascotSpeech("Back to normal scroll mode!");
      }
      return next;
    });
  }, []);

  // Window management
  const openWindow = useCallback((id: string) => {
    setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveWindow(id);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setActiveWindow((prev) => (prev === id ? null : prev));
  }, []);

  const bringToFront = useCallback((id: string) => {
    setActiveWindow(id);
  }, []);

  // Toggles
  const toggleSound = () => setSoundEnabled((prev) => !prev);
  const toggleCalmMode = () => {
    setCalmMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("srajan_calm_mode", next.toString());
      } catch {}
      return next;
    });
  };

  // Keyboard shortcut for 'P' (Play Mode) & 'Escape' (Close active window)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        togglePlayMode();
      }

      if (e.key === "Escape") {
        if (activeCardPack) {
          setActiveCardPack(null);
        } else if (activeWindow) {
          closeWindow(activeWindow);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayMode, activeCardPack, activeWindow, closeWindow]);

  return (
    <StickerWorldContext.Provider
      value={{
        stickers,
        level,
        collectedStickerIds,
        collectSticker,
        addStickers,
        isPlayMode,
        togglePlayMode,
        mascotSpeech,
        setMascotSpeech: setMascotSpeechWithDuration,
        openWindows,
        activeWindow,
        openWindow,
        closeWindow,
        bringToFront,
        collectedCards,
        collectCard,
        unlockCard,
        activeCardPack,
        setActiveCardPack,
        quests: INITIAL_QUESTS,
        completedQuests,
        completeQuest,
        soundEnabled,
        toggleSound,
        calmMode,
        toggleCalmMode,
        activeChapter,
        setActiveChapter,
        activeToast,
      }}
    >
      {children}
    </StickerWorldContext.Provider>
  );
}

export function useStickerWorld() {
  const context = useContext(StickerWorldContext);
  if (!context) {
    throw new Error("useStickerWorld must be used within a StickerWorldProvider");
  }
  return context;
}
