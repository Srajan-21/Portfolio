"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useStickerWorld } from "@/context/StickerWorldContext";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { calmMode } = useStickerWorld();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // If calm mode is active or user prefers reduced motion, do not engage smooth scroll
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (calmMode || prefersReduced) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.08,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.4,
      infinite: false,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [calmMode]);

  return <>{children}</>;
}
