"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStickerWorld } from "@/context/StickerWorldContext";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, X } from "lucide-react";

export function PlayableMascot() {
  const { isPlayMode, togglePlayMode, mascotSpeech, setMascotSpeech, collectSticker } = useStickerWorld();

  // Position state (in Play Mode: screen percentage or px)
  const [position, setPosition] = useState({ x: 100, y: 150 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [isWalking, setIsWalking] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  // Keyboard controls in Play Mode
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!isPlayMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Animation loop for smooth WASD movement
    let animId: number;
    const moveSpeed = 6;

    const gameLoop = () => {
      let dx = 0;
      let dy = 0;

      if (keysPressed.current["arrowleft"] || keysPressed.current["a"]) {
        dx -= moveSpeed;
        setFacing("left");
      }
      if (keysPressed.current["arrowright"] || keysPressed.current["d"]) {
        dx += moveSpeed;
        setFacing("right");
      }
      if (keysPressed.current["arrowup"] || keysPressed.current["w"] || keysPressed.current[" "]) {
        dy -= moveSpeed;
        setIsJumping(true);
      } else {
        setIsJumping(false);
      }
      if (keysPressed.current["arrowdown"] || keysPressed.current["s"]) {
        dy += moveSpeed;
      }

      const walking = dx !== 0 || dy !== 0;
      setIsWalking(walking);

      if (walking) {
        setPosition((prev) => ({
          x: Math.max(20, Math.min(window.innerWidth - 100, prev.x + dx)),
          y: Math.max(20, Math.min(window.innerHeight - 140, prev.y + dy)),
        }));
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlayMode]);

  // Scroll listener for Normal Mode (legs walk when user scrolls!)
  useEffect(() => {
    if (isPlayMode) return;

    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsWalking(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsWalking(false);
      }, 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [isPlayMode]);

  return (
    <>
      {/* PLAY MODE ACTIVE BANNER */}
      {isPlayMode && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full border-ink-4 bg-[#FFC93C] px-5 py-2 shadow-hard animate-bounce">
          <Gamepad2 className="h-5 w-5 text-[#14121A]" />
          <span className="font-mono text-xs font-black uppercase text-[#14121A]">
            PLAY MODE ACTIVE! Use Arrow Keys / WASD
          </span>
          <button
            onClick={togglePlayMode}
            className="flex h-6 w-6 items-center justify-center rounded-full border-ink bg-[#FF4D2E] text-white hover:bg-[#FF4D2E]/80"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* MASCOT AVATAR */}
      <div
        style={
          isPlayMode
            ? {
                position: "fixed",
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: 60,
                transition: "none",
              }
            : {
                position: "fixed",
                bottom: "76px",
                left: "24px",
                zIndex: 40,
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }
        }
        className="pointer-events-auto select-none"
      >
        {/* Speech Bubble */}
        <AnimatePresence>
          {mascotSpeech && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              className="absolute -top-16 left-0 sm:left-4 z-20 min-w-[200px] max-w-[280px] rounded-2xl border-ink-4 bg-white p-3 shadow-hard speech-bubble"
            >
              <div className="flex items-start justify-between gap-1">
                <p className="font-mono text-xs font-bold text-[#14121A] leading-tight">
                  {mascotSpeech}
                </p>
                <button
                  onClick={() => setMascotSpeech(null)}
                  className="text-[#14121A]/60 hover:text-[#14121A] -mt-1 -mr-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Character Sticker */}
        <motion.div
          animate={
            isWalking
              ? {
                  y: [0, -8, 0],
                  rotate: facing === "right" ? [0, 4, -4, 0] : [0, -4, 4, 0],
                }
              : {
                  y: [0, -3, 0],
                  rotate: 0,
                }
          }
          transition={{
            duration: isWalking ? 0.25 : 1.8,
            repeat: Infinity,
            ease: isWalking ? "linear" : "easeInOut",
          }}
          className={`relative cursor-pointer transition-transform duration-150 ${
            facing === "left" ? "-scale-x-100" : "scale-x-100"
          }`}
          onClick={() => {
            collectSticker("mascot_click", 1, "Met Srajan the Mascot!");
            setMascotSpeech("Hey! You poked me! Let's build something epic!");
          }}
        >
          {/* Main Character Body (SVG) */}
          <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl border-ink-4 bg-[#FFC93C] shadow-hard hover:scale-105 active:scale-95 transition-transform">
            <svg viewBox="0 0 100 100" className="h-20 w-20 sm:h-22 sm:w-22 overflow-visible">
              {/* Electric Guitar on Back */}
              <g transform="rotate(-25 30 30)">
                <path
                  d="M 14 36 L 4 10 M 8 20 L 2 34 C 0 42 12 46 16 38 Z"
                  stroke="#FF4D2E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="#FF4D2E"
                />
                <circle cx="10" cy="36" r="3.5" fill="#FFFFFF" stroke="#14121A" strokeWidth="2" />
                <line x1="8" y1="20" x2="3" y2="12" stroke="#14121A" strokeWidth="2" />
              </g>

              {/* Head */}
              <circle cx="50" cy="46" r="22" fill="#FFF8EC" stroke="#14121A" strokeWidth="3" />
              {/* Hair */}
              <path
                d="M 30 42 Q 50 18 70 42 Q 60 26 50 26 Q 40 26 30 42 Z"
                fill="#14121A"
              />
              {/* Glasses */}
              <rect x="37" y="42" width="11" height="8" rx="2" fill="none" stroke="#14121A" strokeWidth="2.5" />
              <rect x="52" y="42" width="11" height="8" rx="2" fill="none" stroke="#14121A" strokeWidth="2.5" />
              <line x1="48" y1="46" x2="52" y2="46" stroke="#14121A" strokeWidth="2.5" />

              {/* Eyes */}
              <circle cx="42" cy="46" r="1.5" fill="#14121A" />
              <circle cx="58" cy="46" r="1.5" fill="#14121A" />

              {/* Cheerful Smile */}
              <path d="M 45 56 Q 50 62 55 56" fill="none" stroke="#FF4D2E" strokeWidth="2.5" strokeLinecap="round" />

              {/* Body / Hoodie */}
              <rect x="36" y="68" width="28" height="20" rx="6" fill="#2F5BFF" stroke="#14121A" strokeWidth="3" />

              {/* Running Sneakers */}
              <g
                transform={
                  isWalking
                    ? "translate(0, 0)"
                    : "translate(0, 0)"
                }
              >
                <rect x="34" y="86" width="12" height="6" rx="2" fill="#FF4D2E" stroke="#14121A" strokeWidth="2" />
                <rect x="54" y="86" width="12" height="6" rx="2" fill="#FF4D2E" stroke="#14121A" strokeWidth="2" />
              </g>
            </svg>

            {/* Sticker Pick Star */}
            <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-ink-2 bg-[#3DDC97] shadow-hard-sm text-xs font-black">
              ★
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

