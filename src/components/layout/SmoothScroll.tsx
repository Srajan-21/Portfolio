"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useCollector } from "@/context/CollectorContext";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { reduceMotion, readerMode } = useCollector();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // If reduced motion is requested or reader mode is active, do not engage smooth scroll
    if (reduceMotion || readerMode) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
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
  }, [reduceMotion, readerMode]);

  return <>{children}</>;
}
