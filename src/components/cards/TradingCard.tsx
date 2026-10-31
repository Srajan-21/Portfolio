"use client";

import React, { useState, useRef } from "react";
import { TradingCard as TradingCardType } from "@/types/database";
import { Sparkles, RotateCw, Lock } from "lucide-react";

interface TradingCardProps {
  card: TradingCardType;
  isUnlocked?: boolean;
  onFlip?: () => void;
  size?: "sm" | "md" | "lg";
}

export function TradingCard({
  card,
  isUnlocked = true,
  onFlip,
  size = "md",
}: TradingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isFlipped, setIsFlipped] = useState(false);

  // Rarity styling tokens
  const rarityColors = {
    Common: { bg: "#FFFFFF", border: "#14121A", badge: "#14121A", text: "#FFFFFF" },
    Rare: { bg: "#EEF4FF", border: "#2F5BFF", badge: "#2F5BFF", text: "#FFFFFF" },
    Epic: { bg: "#FAF0FF", border: "#7B4DFF", badge: "#7B4DFF", text: "#FFFFFF" },
    Legendary: { bg: "#FFF9E6", border: "#FF4D2E", badge: "#FFC93C", text: "#14121A" },
  }[card.rarity] || { bg: "#FFFFFF", border: "#14121A", badge: "#14121A", text: "#FFFFFF" };

  // 3D pointer tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isUnlocked) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleCardClick = () => {
    if (!isUnlocked) return;
    setIsFlipped((prev) => !prev);
    if (onFlip) onFlip();
  };

  const widthClasses = {
    sm: "w-52 h-72",
    md: "w-64 h-92",
    lg: "w-76 h-108",
  }[size];

  if (!isUnlocked) {
    return (
      <div
        className={`${widthClasses} relative border-4 border-dashed border-[#14121A]/40 bg-[#EDE5D3] p-4 flex flex-col items-center justify-center text-center select-none shadow-hard-sm`}
      >
        <Lock className="h-8 w-8 text-[#14121A]/50 mb-2" />
        <span className="font-mono text-xs font-bold uppercase text-[#14121A]/60">LOCKED CARD</span>
        <div className="font-display text-sm font-black text-[#14121A]/40 mt-1">{card.title}</div>
        <p className="font-sans text-[11px] text-[#14121A]/50 mt-2 italic px-2">
          Explore the world chapters to unlock this card!
        </p>
      </div>
    );
  }

  return (
    <div
      style={{ perspective: 1000 }}
      className={`${widthClasses} relative select-none cursor-pointer`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.4, 1)",
        }}
        className="w-full h-full relative"
      >
        {/* CARD FRONT */}
        <div
          style={{
            backfaceVisibility: "hidden",
            backgroundColor: rarityColors.bg,
            borderColor: rarityColors.border,
          }}
          className="absolute inset-0 border-4 p-4 shadow-hard flex flex-col justify-between overflow-hidden"
        >
          {/* Holographic Iridescent Glare Layer */}
          {card.rarity !== "Common" && (
            <div
              style={{
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.7) 0%, rgba(255,201,60,0.3) 25%, rgba(123,77,255,0.2) 50%, transparent 70%)`,
              }}
              className="pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay"
            />
          )}

          {/* Card Top: Rarity & Type */}
          <div className="flex items-center justify-between z-10">
            <span
              className="border-2 border-[#14121A] px-2 py-0.5 font-mono text-[9px] font-black uppercase tracking-wider shadow-hard-sm"
              style={{ backgroundColor: rarityColors.badge, color: rarityColors.text }}
            >
              {card.rarity}
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#14121A]/60">
              {card.category}
            </span>
          </div>

          {/* Card Artwork Center */}
          <div className="my-auto text-center z-10">
            <div className="w-20 h-20 mx-auto rounded-full border-3 border-[#14121A] bg-white flex items-center justify-center text-4xl shadow-hard-sm mb-3">
              {card.artwork_icon || "⭐"}
            </div>
            <h4 className="font-display text-lg font-black text-[#14121A] leading-tight">
              {card.title}
            </h4>
            <span className="font-mono text-[11px] font-bold text-[#FF4D2E] block mt-0.5">
              {card.subtitle}
            </span>
          </div>

          {/* Card Bottom: Description & Flip Hint */}
          <div className="z-10 pt-2 border-t-2 border-dashed border-[#14121A]/20">
            <p className="font-sans text-[11px] text-[#14121A]/80 line-clamp-2 leading-snug">
              {card.description}
            </p>
            <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-[#14121A]/60 font-bold uppercase">
              <span>TAP TO FLIP</span>
              <RotateCw className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* CARD BACK (Stats & Flavor Text) */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: rarityColors.border,
          }}
          className="absolute inset-0 border-4 bg-[#14121A] text-white p-4 shadow-hard flex flex-col justify-between overflow-hidden"
        >
          {/* Card Back Header */}
          <div className="flex items-center justify-between border-b border-white/20 pb-2">
            <span className="font-mono text-[10px] font-bold text-[#FFC93C] uppercase">
              TECHNICAL STATS
            </span>
            <span className="font-mono text-[9px] text-white/60 uppercase">{card.category}</span>
          </div>

          {/* Stats List */}
          <div className="my-auto space-y-2 font-mono text-xs">
            {card.stats &&
              Object.entries(card.stats).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between border-b border-white/10 pb-1">
                  <span className="text-white/70 text-[10px] uppercase">{key}</span>
                  <span className="font-bold text-[#3DDC97]">{val}</span>
                </div>
              ))}

            {card.flavor_text && (
              <div className="mt-4 p-2.5 bg-white/5 border border-white/10 italic font-serif text-[11px] text-[#FFC93C]">
                &ldquo;{card.flavor_text}&rdquo;
              </div>
            )}
          </div>

          {/* Card Back Footer */}
          <div className="pt-2 border-t border-white/20 flex items-center justify-between font-mono text-[9px] text-white/50 uppercase">
            <span>SRAJAN WORLD TRADING CARD</span>
            <RotateCw className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
