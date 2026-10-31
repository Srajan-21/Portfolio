"use client";

import React from "react";
import { useStickerWorld } from "@/context/StickerWorldContext";

export interface SealDefinition {
  id: string;
  numeral: string;
  title: string;
  chapter: string;
  hint: string;
  isHidden?: boolean;
}

export const ALL_SEALS: SealDefinition[] = [];

/**
 * Backward compatibility adapter for chapters pending P3-P6 overhaul.
 * Redirects seamlessly to the StickerWorldContext.
 */
export function useCollector() {
  const world = useStickerWorld();

  return {
    activeChapter: world.activeChapter,
    setActiveChapter: (ch: number) => world.setActiveChapter(ch),
    sealsEarned: world.collectedStickerIds,
    unlockSeal: (id: string) => world.collectSticker(id, 2, `Discovered: ${id}`),
    rank: "Master" as any,
    cabinetOpen: false,
    setCabinetOpen: (_open?: any) => {},
    activeToast: null,
    cursorLabel: null,
    setCursorLabel: (_label?: any) => {},
    reduceMotion: world.calmMode,
    toggleReduceMotion: world.toggleCalmMode,
    readerMode: false,
    toggleReaderMode: () => {},
  };
}

export function CollectorProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
