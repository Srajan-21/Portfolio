"use client";

import React, { useEffect, useState, useRef } from "react";
import { useJournal } from "@/context/JournalContext";

interface InkDrop {
  id: number;
  x: number;
  y: number;
  size: number;
  createdAt: number;
}

export function CustomCursor() {
  const { cursorMode, setCursorMode } = useJournal();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [inkDrops, setInkDrops] = useState<InkDrop[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const dropCounter = useRef(0);
  const lastDropTime = useRef(0);

  useEffect(() => {
    // Detect touch-only devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Ink trail generation throttled to every 35ms
      const now = Date.now();
      if (now - lastDropTime.current > 35) {
        lastDropTime.current = now;
        dropCounter.current += 1;
        setInkDrops((prev) => [
          ...prev.slice(-14), // Keep max 15 trailing ink beads
          {
            id: dropCounter.current,
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 2.5 + 2,
            createdAt: now,
          },
        ]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Dynamic hover inspection for data-cursor attributes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const customCursor = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (customCursor === "stamp") setCursorMode("stamp");
      else if (customCursor === "magnifier") setCursorMode("magnifier");
      else if (target.closest("button, a, input, select, textarea, [role='button']")) {
        setCursorMode("pointer");
      } else {
        setCursorMode("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    // Cleanup fading ink drops
    const interval = setInterval(() => {
      const current = Date.now();
      setInkDrops((prev) => prev.filter((drop) => current - drop.createdAt < 600));
    }, 70);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      clearInterval(interval);
    };
  }, [isVisible, setCursorMode]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* Fading Ink Droplets Trail */}
      {inkDrops.map((drop) => {
        const age = Date.now() - drop.createdAt;
        const opacity = Math.max(0, 1 - age / 600) * 0.45;
        return (
          <div
            key={drop.id}
            className="absolute rounded-full bg-[#1B1A17] dark:bg-[#EBE3D3] transition-opacity duration-300"
            style={{
              left: `${drop.x}px`,
              top: `${drop.y}px`,
              width: `${drop.size}px`,
              height: `${drop.size}px`,
              transform: "translate(-50%, -50%)",
              opacity,
            }}
          />
        );
      })}

      {/* Primary Pen / Stamp / Magnifier Cursor */}
      <div
        className="absolute transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-15%, -15%) ${isClicking ? "scale(0.88)" : "scale(1)"}`,
        }}
      >
        {cursorMode === "stamp" ? (
          // Stamp Icon Mode
          <div className="relative -ml-4 -mt-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-[#D9432B] bg-[#F2EBDD]/90 shadow-md">
            <span className="font-mono text-[9px] font-black uppercase tracking-wider text-[#D9432B]">
              SEAL
            </span>
          </div>
        ) : cursorMode === "magnifier" ? (
          // Magnifier Icon Mode
          <div className="relative -ml-3 -mt-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1B1A17] bg-[#F2EBDD]/90 shadow-sm dark:border-[#EBE3D3] dark:bg-[#181512]/90">
            <svg
              className="h-4 w-4 text-[#1B1A17] dark:text-[#EBE3D3]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        ) : cursorMode === "pointer" ? (
          // Interactive Hover Nib
          <div className="relative">
            <svg
              className="h-7 w-7 drop-shadow-sm transition-transform duration-150"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Slanted Calligraphy Fountain Pen Nib */}
              <path
                d="M3 21L6 18M6 18L17 7L13 3L2 14L6 18Z"
                fill="#D9432B"
                stroke="#1B1A17"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="11.5" cy="8.5" r="1" fill="#1B1A17" />
              <line x1="11.5" y1="8.5" x2="3" y2="21" stroke="#1B1A17" strokeWidth="1.2" />
            </svg>
            {isClicking && (
              <span className="absolute -left-1 -top-1 h-3 w-3 animate-ping rounded-full bg-[#D9432B] opacity-75" />
            )}
          </div>
        ) : (
          // Default Hand-inked Pen Nib
          <div className="relative">
            <svg
              className="h-6 w-6 drop-shadow-sm"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Classic Brass/Steel Pen Nib */}
              <path
                d="M3 21L6 18M6 18L17 7L13 3L2 14L6 18Z"
                fill="#1B1A17"
                className="dark:fill-[#EBE3D3]"
                stroke="#F2EBDD"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <circle cx="11.5" cy="8.5" r="1" fill="#F2EBDD" />
              <line x1="11.5" y1="8.5" x2="3" y2="21" stroke="#F2EBDD" strokeWidth="1" />
            </svg>
            {isClicking && (
              <span className="absolute -left-1 -top-1 h-3 w-3 animate-ping rounded-full bg-[#1B1A17] opacity-60 dark:bg-[#EBE3D3]" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
