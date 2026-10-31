"use client";

import React, { useEffect, useState, useRef } from "react";
import { useCollector } from "@/context/CollectorContext";

export function CustomCursor() {
  const { cursorLabel, setCursorLabel, reduceMotion } = useCollector();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Direct mouse coordinates for the 10px dot
  const mousePos = useRef({ x: -100, y: -100 });
  // Lerped coordinates for the 36px hairline ring
  const ringPos = useRef({ x: -100, y: -100 });
  const [renderPos, setRenderPos] = useState({ dotX: -100, dotY: -100, ringX: -100, ringY: -100 });
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || reduceMotion) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const customLabel = target.closest("[data-cursor-label]")?.getAttribute("data-cursor-label");
      if (customLabel) {
        setActiveLabel(customLabel);
      } else if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setActiveLabel(null);
      } else {
        setActiveLabel(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    // Smooth lerp animation loop for the trailing hairline ring
    let animationFrameId: number;
    const lerpFactor = 0.15;

    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      setRenderPos({
        dotX: mousePos.current.x,
        dotY: mousePos.current.y,
        ringX: ringPos.current.x,
        ringY: ringPos.current.y,
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, reduceMotion]);

  if (isTouchDevice || !isVisible) return null;

  const currentLabel = cursorLabel || activeLabel;
  const isExpanded = !!currentLabel;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Refined 10px Center Espresso Dot */}
      <div
        className="absolute rounded-full bg-[#14110F] transition-transform duration-75 ease-out"
        style={{
          width: "8px",
          height: "8px",
          left: `${renderPos.dotX}px`,
          top: `${renderPos.dotY}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 36px / 64px Trailing Hairline Ring */}
      <div
        className={`absolute flex items-center justify-center rounded-full border transition-[width,height,border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded
            ? "border-[#B08D57] bg-[#14110F] text-[#F6F1E7] shadow-lg"
            : "border-[#6F665A]/40 bg-transparent"
        }`}
        style={{
          width: isExpanded ? "64px" : "36px",
          height: isExpanded ? "64px" : "36px",
          left: `${renderPos.ringX}px`,
          top: `${renderPos.ringY}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {isExpanded && (
          <span className="font-mono text-[9px] font-medium tracking-[0.18em] uppercase">
            {currentLabel}
          </span>
        )}
      </div>
    </div>
  );
}
