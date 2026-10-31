"use client";

import React, { useState } from "react";
import { useStickerWorld } from "@/context/StickerWorldContext";
import { SEED_CARDS } from "@/lib/supabase/seed-data";
import { TradingCard } from "@/components/cards/TradingCard";
import { X, Sparkles, Trophy, Layers, Filter } from "lucide-react";

interface CardBinderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CardBinderModal({ isOpen, onClose }: CardBinderModalProps) {
  const { collectedCards, activeCardPack, setActiveCardPack } = useStickerWorld();
  const [filterRarity, setFilterRarity] = useState<string>("ALL");

  if (!isOpen && !activeCardPack) return null;

  // New Pack Reveal Modal takes priority if active
  if (activeCardPack) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="relative flex flex-col items-center">
          <div className="mb-4 text-center">
            <span className="inline-block bg-[#FFC93C] text-[#14121A] border-2 border-[#14121A] px-4 py-1 font-mono text-xs font-black uppercase tracking-wider shadow-hard-sm mb-2 animate-bounce">
              ✨ NEW CARD UNLOCKED! ✨
            </span>
            <h3 className="font-display text-3xl font-black text-white">
              {activeCardPack.title}
            </h3>
          </div>

          <div className="scale-105 my-4">
            <TradingCard card={activeCardPack} isUnlocked={true} size="lg" />
          </div>

          <button
            onClick={() => setActiveCardPack(null)}
            className="btn-press mt-4 px-8 py-3 bg-[#3DDC97] text-[#14121A] border-3 border-[#14121A] font-mono text-xs font-black uppercase tracking-wider shadow-hard"
          >
            ADD TO BINDER &amp; CONTINUE
          </button>
        </div>
      </div>
    );
  }

  const filteredCards = SEED_CARDS.filter((card) => {
    if (filterRarity === "ALL") return true;
    return card.rarity.toUpperCase() === filterRarity;
  });

  const unlockedCount = SEED_CARDS.filter((c) => collectedCards.includes(c.id)).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-5xl max-h-[90vh] border-4 border-[#14121A] bg-[#FFF8EC] shadow-hard-pop flex flex-col overflow-hidden">
        {/* Binder Window Header */}
        <div className="bg-[#14121A] text-white px-5 py-3.5 flex items-center justify-between border-b-3 border-[#14121A]">
          <div className="flex items-center gap-3">
            <span className="text-xl">🎴</span>
            <div>
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                SRAJAN&apos;S TRADING CARD BINDER
              </h3>
              <span className="font-mono text-[10px] text-[#FFC93C]">
                COLLECTED: {unlockedCount} / {SEED_CARDS.length} CARDS
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="border-b-2 border-[#14121A]/20 bg-white px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[#14121A]/70" />
            <span className="font-mono text-xs font-bold uppercase text-[#14121A]/70">RARITY:</span>
            {["ALL", "LEGENDARY", "EPIC", "RARE", "COMMON"].map((rarity) => (
              <button
                key={rarity}
                onClick={() => setFilterRarity(rarity)}
                className={`px-3 py-1 font-mono text-[11px] font-bold uppercase border-2 border-[#14121A] transition-all ${
                  filterRarity === rarity
                    ? "bg-[#14121A] text-white shadow-hard-sm"
                    : "bg-[#FFF8EC] text-[#14121A] hover:bg-white"
                }`}
              >
                {rarity}
              </button>
            ))}
          </div>

          <span className="font-mono text-xs text-[#14121A]/60">
            Click cards to flip &amp; view stats
          </span>
        </div>

        {/* 9-Pocket Binder Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {filteredCards.map((card) => {
              const isUnlocked = collectedCards.includes(card.id);
              return (
                <div key={card.id} className="flex justify-center">
                  <TradingCard card={card} isUnlocked={isUnlocked} size="sm" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
