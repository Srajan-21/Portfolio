"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StarParticle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export function StickerCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isGrab, setIsGrab] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [stars, setStars] = useState<StarParticle[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if fine pointer device
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("clickable") ||
          target.getAttribute("role") === "button";

        const isDraggable =
          target.classList.contains("draggable") ||
          target.classList.contains("window-titlebar") ||
          target.closest(".window-titlebar");

        setIsPointer(!!isClickable);
        setIsGrab(!!isDraggable);
      }
    };

    const colors = ["#FF4D2E", "#FFC93C", "#2F5BFF", "#3DDC97", "#FF8FB8"];

    const handleClick = (e: MouseEvent) => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 150);

      // Spawn 3 tiny star confetti particles
      const newStars = [0, 1, 2].map((i) => ({
        id: Date.now() + i,
        x: e.clientX + (Math.random() * 30 - 15),
        y: e.clientY + (Math.random() * 30 - 15),
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      setStars((prev) => [...prev.slice(-6), ...newStars]);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Click Star Confetti */}
      <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
        <AnimatePresence>
          {stars.map((star) => (
            <motion.span
              key={star.id}
              initial={{ scale: 0, opacity: 1, y: 0, x: 0 }}
              animate={{
                scale: [0, 1.3, 0],
                opacity: [1, 1, 0],
                y: -30 + Math.random() * 10,
                x: Math.random() * 30 - 15,
                rotate: Math.random() * 60 - 30,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                left: star.x,
                top: star.y,
                color: star.color,
                position: "fixed",
              }}
              className="text-lg font-black select-none"
            >
              ★
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Chunky Illustrated Pointer Hand */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[999] select-none"
        animate={{
          x: position.x - 12,
          y: position.y - 10,
          scale: isClicking ? 0.85 : isPointer ? 1.15 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
        }}
      >
        {isGrab ? (
          // Grab Hand Sticker
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border-ink bg-[#FFC93C] shadow-hard-sm text-sm">
            ✊
          </div>
        ) : isPointer ? (
          // Star Sticker Pointer
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border-ink bg-[#3DDC97] shadow-hard-sm text-sm font-black text-[#14121A]">
            ☝️
          </div>
        ) : (
          // Chunky Yellow Pointer Glove
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-[3px_3px_0px_#14121A]">
            <path
              d="M3 3L10 20L13 13L20 10L3 3Z"
              fill="#FFC93C"
              stroke="#14121A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </motion.div>
    </>
  );
}

