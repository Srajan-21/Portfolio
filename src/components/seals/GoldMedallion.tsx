"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { EASINGS } from "@/lib/motion";
import { useCollector } from "@/context/CollectorContext";

interface GoldMedallionProps {
  numeral: string;
  title: string;
  isUnlocked?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
  showTitle?: boolean;
}

export function GoldMedallion({
  numeral,
  title,
  isUnlocked = false,
  size = "md",
  className = "",
  onClick,
  showTitle = false,
}: GoldMedallionProps) {
  const { reduceMotion, setCursorLabel } = useCollector();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "w-8 h-8 text-[11px]",
    md: "w-14 h-14 text-sm sm:text-base",
    lg: "w-20 h-20 text-lg sm:text-xl",
    xl: "w-28 h-28 text-2xl sm:text-3xl",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current || !isUnlocked) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: -y * 0.12,
      y: x * 0.12,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
    setCursorLabel(null);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isUnlocked) {
      setCursorLabel("MEDALLION");
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          scale: isHovered && isUnlocked ? 1.04 : 1,
        }}
        transition={{ duration: 0.25, ease: EASINGS.snappy }}
        style={{ transformStyle: "preserve-3d" }}
        className={`relative cursor-pointer select-none rounded-full ${sizeClasses[size]}`}
      >
        {isUnlocked ? (
          // UNLOCKED: Embossed Antique Gold Foil Medallion
          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-[#B08D57] bg-gradient-to-br from-[#E3C98E] via-[#B08D57] to-[#8C6B3A] p-[2px] shadow-sm">
            {/* Specular sheen layer */}
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#FAF7F2] shadow-inner transition-colors">
              {/* Fine concentric dashed hairline */}
              <div className="absolute inset-[3px] rounded-full border border-dashed border-[#B08D57]/50" />

              {/* Gold foil reflection gradient ring */}
              <div
                className={`absolute inset-0 rounded-full transition-opacity duration-500 pointer-events-none ${
                  isHovered ? "opacity-30 bg-gradient-to-tr from-transparent via-[#FFF] to-[#E3C98E]" : "opacity-0"
                }`}
              />

              {/* Roman Numeral Emblem */}
              <span className="relative z-10 font-display font-semibold italic text-[#8C6B3A] tracking-wider">
                {numeral}
              </span>
            </div>
          </div>
        ) : (
          // LOCKED: Debossed Archival Silhouette
          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-[#6F665A]/25 bg-[#EDE5D3]/50 p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#E5DDCB]/60 shadow-inner">
              <span className="font-display font-light text-[#6F665A]/40">
                {numeral}
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {showTitle && (
        <span
          className={`mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-center ${
            isUnlocked ? "text-[#14110F] font-medium" : "text-[#6F665A]/60"
          }`}
        >
          {isUnlocked ? title : "CLASSIFIED"}
        </span>
      )}
    </div>
  );
}
