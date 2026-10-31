"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCollector, ALL_SEALS, SealDefinition } from "@/context/CollectorContext";
import { GoldMedallion } from "@/components/seals/GoldMedallion";
import { X, Award, ChevronRight, Lock } from "lucide-react";
import { EASINGS } from "@/lib/motion";

export function TheCabinet() {
  const { cabinetOpen, setCabinetOpen, sealsEarned, rank, setActiveChapter } = useCollector();
  const [selectedSeal, setSelectedSeal] = useState<SealDefinition | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && cabinetOpen) {
        setCabinetOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cabinetOpen, setCabinetOpen]);

  const chapterSeals = ALL_SEALS.filter((s) => !s.isHidden);
  const secretSeals = ALL_SEALS.filter((s) => s.isHidden);

  // Rank progression targets
  const getNextRankInfo = () => {
    const count = sealsEarned.length;
    if (count < 4) return { next: "Journeyman", remaining: 4 - count, total: 4 };
    if (count < 8) return { next: "Artisan", remaining: 8 - count, total: 8 };
    if (count < 12) return { next: "Master", remaining: 12 - count, total: 12 };
    return { next: "Master Completed", remaining: 0, total: 12 };
  };

  const nextRank = getNextRankInfo();

  const handleSealClick = (seal: SealDefinition) => {
    setSelectedSeal(seal);
  };

  const handleNavigateChapter = (seal: SealDefinition) => {
    setCabinetOpen(false);
    // Find chapter index
    const chapterMap: Record<string, number> = {
      seal_origins: 1,
      seal_grind: 2,
      seal_tourphin: 3,
      seal_podium: 4,
      seal_clavis: 5,
      seal_hudle: 6,
      seal_toolkit: 7,
      seal_last_page: 8,
    };
    const targetIdx = chapterMap[seal.id];
    if (targetIdx !== undefined) {
      setActiveChapter(targetIdx);
      document.getElementById(`chapter-${targetIdx}`)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {cabinetOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCabinetOpen(false)}
            className="fixed inset-0 bg-[#14110F]/30 backdrop-blur-sm"
          />

          {/* Drawer Tray */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASINGS.editorial }}
            className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-[#6F665A]/20 bg-[#F6F1E7] p-6 sm:p-10 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#6F665A]/20 pb-5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8C6B3A]">
                  ARCHIVAL REPOSITORY
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-light text-[#14110F]">
                  The Cabinet of Seals
                </h2>
              </div>

              <button
                onClick={() => setCabinetOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#6F665A]/20 bg-[#EDE5D3] text-[#14110F] transition-colors hover:border-[#6B1E1E] hover:text-[#6B1E1E]"
                aria-label="Close Cabinet"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Rank Status Plinth */}
            <div className="my-6 rounded border border-[#B08D57]/30 bg-[#FAF7F2] p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
                    CURRENT COLLECTOR RANK
                  </span>
                  <span className="font-display text-xl font-medium text-[#14110F]">
                    {rank}
                  </span>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B08D57] bg-[#EDE5D3] text-[#8C6B3A]">
                  <Award className="h-5 w-5" />
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#EDE5D3]">
                  <div
                    className="h-full bg-gradient-to-r from-[#8C6B3A] via-[#E3C98E] to-[#B08D57] transition-all duration-700"
                    style={{ width: `${(sealsEarned.length / 12) * 100}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[10px] text-[#6F665A]">
                  <span>{sealsEarned.length} of 12 Seals Conferred</span>
                  <span>{nextRank.remaining > 0 ? `${nextRank.remaining} to ${nextRank.next}` : "Master Rank Achieved"}</span>
                </div>
              </div>
            </div>

            {/* Detail Card if selected */}
            {selectedSeal && (
              <div className="mb-6 rounded border border-[#6F665A]/25 bg-[#EDE5D3]/60 p-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#8C6B3A] uppercase tracking-wider font-semibold">
                    SEAL {selectedSeal.numeral} &bull; {selectedSeal.chapter}
                  </span>
                  <button
                    onClick={() => setSelectedSeal(null)}
                    className="text-xs text-[#6F665A] hover:text-[#14110F]"
                  >
                    Close
                  </button>
                </div>
                <h4 className="mt-1 font-display text-lg font-medium text-[#14110F]">
                  {selectedSeal.title}
                </h4>
                <p className="mt-2 font-serif text-sm text-[#6F665A]">
                  {sealsEarned.includes(selectedSeal.id)
                    ? "Conferred and recorded into the archival registry."
                    : selectedSeal.hint}
                </p>

                {sealsEarned.includes(selectedSeal.id) && !selectedSeal.isHidden && (
                  <button
                    onClick={() => handleNavigateChapter(selectedSeal)}
                    className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#6B1E1E] hover:underline"
                  >
                    <span>Read Corresponding Chapter</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}

            {/* SECTION 1: CANONICAL CHAPTER SEALS */}
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-2 border-b border-[#6F665A]/15 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#14110F]">
                  CANONICAL CHAPTER SEALS (I &ndash; VIII)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3 sm:gap-4 py-2">
                {chapterSeals.map((seal) => {
                  const isUnlocked = sealsEarned.includes(seal.id);
                  return (
                    <button
                      key={seal.id}
                      onClick={() => handleSealClick(seal)}
                      className="flex flex-col items-center text-center p-2 rounded transition-colors hover:bg-[#EDE5D3]/40"
                    >
                      <GoldMedallion
                        numeral={seal.numeral}
                        title={seal.title}
                        isUnlocked={isUnlocked}
                        size="md"
                      />
                      <span className="mt-1.5 font-mono text-[9px] uppercase tracking-wider line-clamp-1 text-[#14110F]">
                        {seal.numeral}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: CONCEALED SECRET SEALS */}
            <div>
              <div className="mb-3 flex items-center gap-2 border-b border-[#6F665A]/15 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#14110F]">
                  CONCEALED COLLECTOR SEALS (IX &ndash; XII)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3 sm:gap-4 py-2">
                {secretSeals.map((seal) => {
                  const isUnlocked = sealsEarned.includes(seal.id);
                  return (
                    <button
                      key={seal.id}
                      onClick={() => handleSealClick(seal)}
                      className="flex flex-col items-center text-center p-2 rounded transition-colors hover:bg-[#EDE5D3]/40"
                    >
                      <GoldMedallion
                        numeral={seal.numeral}
                        title={seal.title}
                        isUnlocked={isUnlocked}
                        size="md"
                      />
                      <span className="mt-1.5 font-mono text-[9px] uppercase tracking-wider line-clamp-1 text-[#14110F]">
                        {isUnlocked ? seal.numeral : <Lock className="inline h-3 w-3 text-[#6F665A]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-auto pt-6 border-t border-[#6F665A]/20 font-mono text-[9px] text-[#6F665A] text-center tracking-wider">
              FOLIO PRIVILEGE &bull; RECORDED IN SUPABASE ARCHIVES
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
