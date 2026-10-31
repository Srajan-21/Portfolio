"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { soundEngine } from "@/lib/sound";

export type CursorMode = "default" | "stamp" | "magnifier" | "pointer" | "grab";

export interface JournalContextType {
  currentLevel: number;
  setLevel: (lvl: number) => void;
  inkXP: number;
  addXP: (amount: number, reason?: string) => void;
  soundMuted: boolean;
  toggleSound: () => void;
  readerMode: boolean;
  toggleReaderMode: () => void;
  nightMode: boolean;
  toggleNightMode: () => void;
  isCoverTorn: boolean;
  tearCover: () => void;
  cursorMode: CursorMode;
  setCursorMode: (mode: CursorMode) => void;
  easterEggsFound: string[];
  unlockEasterEgg: (eggId: string, bonusXP?: number) => boolean;
  xpToast: string | null;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [inkXP, setInkXP] = useState<number>(50); // Starting XP for Day 1
  const [soundMuted, setSoundMuted] = useState<boolean>(true);
  const [readerMode, setReaderMode] = useState<boolean>(false);
  const [nightMode, setNightMode] = useState<boolean>(false);
  const [isCoverTorn, setIsCoverTorn] = useState<boolean>(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [easterEggsFound, setEasterEggsFound] = useState<string[]>([]);
  const [xpToast, setXpToast] = useState<string | null>(null);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedMuted = localStorage.getItem("srajan_sound_muted");
      if (savedMuted !== null) {
        const isMuted = savedMuted === "true";
        setSoundMuted(isMuted);
        soundEngine.setMuted(isMuted);
      }

      const savedNight = localStorage.getItem("srajan_night_mode");
      if (savedNight === "true") {
        setNightMode(true);
        document.documentElement.classList.add("dark");
      }

      const savedCover = sessionStorage.getItem("srajan_cover_torn");
      if (savedCover === "true") {
        setIsCoverTorn(true);
      }
    } catch {}
  }, []);

  const toggleSound = useCallback(() => {
    setSoundMuted((prev) => {
      const next = !prev;
      soundEngine.setMuted(next);
      try {
        localStorage.setItem("srajan_sound_muted", String(next));
      } catch {}
      if (!next) {
        soundEngine.playClick();
      }
      return next;
    });
  }, []);

  const toggleReaderMode = useCallback(() => {
    setReaderMode((prev) => {
      const next = !prev;
      soundEngine.playPaperTear();
      return next;
    });
  }, []);

  const toggleNightMode = useCallback(() => {
    setNightMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      try {
        localStorage.setItem("srajan_night_mode", String(next));
      } catch {}
      soundEngine.playClick();
      return next;
    });
  }, []);

  const tearCover = useCallback(() => {
    soundEngine.playPaperTear();
    setIsCoverTorn(true);
    try {
      sessionStorage.setItem("srajan_cover_torn", "true");
    } catch {}
  }, []);

  const addXP = useCallback((amount: number, reason?: string) => {
    setInkXP((prev) => {
      const nextXP = Math.min(1000, prev + amount);
      return nextXP;
    });
    soundEngine.playPenScratch();
    if (reason) {
      setXpToast(`+${amount} INK XP: ${reason}`);
      setTimeout(() => setXpToast(null), 3000);
    }
  }, []);

  const unlockEasterEgg = useCallback((eggId: string, bonusXP: number = 100) => {
    if (easterEggsFound.includes(eggId)) return false;
    setEasterEggsFound((prev) => [...prev, eggId]);
    soundEngine.playStamp();
    addXP(bonusXP, `SECRET DISCOVERED [${eggId.toUpperCase()}]`);
    return true;
  }, [easterEggsFound, addXP]);

  return (
    <JournalContext.Provider
      value={{
        currentLevel,
        setLevel: setCurrentLevel,
        inkXP,
        addXP,
        soundMuted,
        toggleSound,
        readerMode,
        toggleReaderMode,
        nightMode,
        toggleNightMode,
        isCoverTorn,
        tearCover,
        cursorMode,
        setCursorMode,
        easterEggsFound,
        unlockEasterEgg,
        xpToast,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
}

