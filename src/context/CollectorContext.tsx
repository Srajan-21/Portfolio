"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CollectorRank } from "@/types/database";
import { supabase } from "@/lib/supabase/client";

export interface SealDefinition {
  id: string;
  numeral: string;
  title: string;
  chapter: string;
  hint: string;
  isHidden?: boolean;
}

export const ALL_SEALS: SealDefinition[] = [
  // 8 Chapter Seals
  { id: "seal_origins", numeral: "I", title: "The Foundation", chapter: "Chapter I: Origins", hint: "Study the BPIT matriculation & Octave leadership." },
  { id: "seal_grind", numeral: "II", title: "The Crucible", chapter: "Chapter II: The Grind", hint: "Witness the resilience through placement rejection." },
  { id: "seal_tourphin", numeral: "III", title: "The Architect", chapter: "Chapter III: Tourphin", hint: "Inspect the SIH guide & booking architecture." },
  { id: "seal_podium", numeral: "IV", title: "The Bronze Laurels", chapter: "Chapter IV: The Podium", hint: "Review the Nagarro 3rd place food-waste design." },
  { id: "seal_clavis", numeral: "V", title: "The Magnum Opus", chapter: "Chapter V: CLAVIS", hint: "Examine the sub-5ms Zero-LLM ATS engine." },
  { id: "seal_hudle", numeral: "VI", title: "The Production Seal", chapter: "Chapter VI: The Real World", hint: "Study the Juspay reconciliation at Hudle." },
  { id: "seal_toolkit", numeral: "VII", title: "The Index", chapter: "Chapter VII: The Toolkit", hint: "Inspect the engineering catalog of competencies." },
  { id: "seal_last_page", numeral: "VIII", title: "The Conferrer", chapter: "Chapter VIII: The Last Page", hint: "Reach the closing archive folio." },

  // 4 Secret Collector Seals
  { id: "seal_konami", numeral: "IX", title: "The Enigma Code", chapter: "Secret Folio", hint: "Enter the traditional arcade keystroke sequence.", isHidden: true },
  { id: "seal_curator", numeral: "X", title: "The Close Observer", chapter: "Secret Folio", hint: "Discover an author annotation in the margins.", isHidden: true },
  { id: "seal_guestbook", numeral: "XI", title: "The Signatory", chapter: "Secret Folio", hint: "Leave your signature in the guest ledger.", isHidden: true },
  { id: "seal_archivist", numeral: "XII", title: "The Interrogator", chapter: "Secret Folio", hint: "Consult Srajan's archival intelligence.", isHidden: true },
];

export function calculateRank(sealCount: number): CollectorRank {
  if (sealCount >= 12) return "Master";
  if (sealCount >= 8) return "Artisan";
  if (sealCount >= 4) return "Journeyman";
  return "Apprentice";
}

export interface CollectorContextType {
  activeChapter: number;
  setActiveChapter: (ch: number) => void;
  sealsEarned: string[];
  unlockSeal: (sealId: string) => boolean;
  rank: CollectorRank;
  cabinetOpen: boolean;
  setCabinetOpen: (open: boolean) => void;
  activeToast: { id: string; title: string; numeral: string } | null;
  cursorLabel: string | null;
  setCursorLabel: (label: string | null) => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  readerMode: boolean;
  toggleReaderMode: () => void;
}

const CollectorContext = createContext<CollectorContextType | undefined>(undefined);

export function CollectorProvider({ children }: { children: React.ReactNode }) {
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [sealsEarned, setSealsEarned] = useState<string[]>([]);
  const [cabinetOpen, setCabinetOpen] = useState<boolean>(false);
  const [activeToast, setActiveToast] = useState<{ id: string; title: string; numeral: string } | null>(null);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  const [readerMode, setReaderMode] = useState<boolean>(false);

  // Load persisted seals and preferences
  useEffect(() => {
    try {
      const savedSeals = localStorage.getItem("srajan_collector_seals");
      if (savedSeals) {
        setSealsEarned(JSON.parse(savedSeals));
      }
      const savedMotion = localStorage.getItem("srajan_reduce_motion");
      if (savedMotion === "true" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setReduceMotion(true);
      }
    } catch {}
  }, []);

  const rank = calculateRank(sealsEarned.length);

  const unlockSeal = useCallback((sealId: string) => {
    if (sealsEarned.includes(sealId)) return false;

    const def = ALL_SEALS.find((s) => s.id === sealId);
    if (!def) return false;

    const updated = [...sealsEarned, sealId];
    setSealsEarned(updated);

    try {
      localStorage.setItem("srajan_collector_seals", JSON.stringify(updated));

      // Quietly sync with Supabase visitor_progress
      const sessionId = sessionStorage.getItem("srajan_session_id") || `sess_${Date.now()}`;
      sessionStorage.setItem("srajan_session_id", sessionId);

      (async () => {
        try {
          await supabase.from("visitor_progress").upsert({
            session_id: sessionId,
            seals_earned: updated,
            rank: calculateRank(updated.length),
            progress_score: updated.length * 100,
            updated_at: new Date().toISOString(),
          });
        } catch {}
      })();
    } catch {}

    // Elegant toast notification
    setActiveToast({ id: def.id, title: def.title, numeral: def.numeral });
    setTimeout(() => setActiveToast(null), 4000);

    return true;
  }, [sealsEarned]);

  const toggleReduceMotion = useCallback(() => {
    setReduceMotion((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("srajan_reduce_motion", String(next));
      } catch {}
      return next;
    });
  }, []);

  const toggleReaderMode = useCallback(() => {
    setReaderMode((prev) => !prev);
  }, []);

  return (
    <CollectorContext.Provider
      value={{
        activeChapter,
        setActiveChapter,
        sealsEarned,
        unlockSeal,
        rank,
        cabinetOpen,
        setCabinetOpen,
        activeToast,
        cursorLabel,
        setCursorLabel,
        reduceMotion,
        toggleReduceMotion,
        readerMode,
        toggleReaderMode,
      }}
    >
      {children}
    </CollectorContext.Provider>
  );
}

export function useCollector() {
  const context = useContext(CollectorContext);
  if (!context) {
    throw new Error("useCollector must be used within a CollectorProvider");
  }
  return context;
}
