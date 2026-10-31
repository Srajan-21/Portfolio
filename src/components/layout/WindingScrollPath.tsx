"use client";

import React, { useEffect, useState } from "react";
import { Compass, Sparkles, MapPin, Flag, Guitar, Code, Award, Rocket, CheckCircle2 } from "lucide-react";

interface Milestone {
  id: string;
  chapterId: string;
  label: string;
  sub: string;
  icon: string;
  color: string;
  percent: number; // approximate vertical % position
}

const MILESTONES: Milestone[] = [
  {
    id: "m-hero",
    chapterId: "hero-section",
    label: "START",
    sub: "Srajan's Sticker Desk",
    icon: "🚀",
    color: "#FF4D2E",
    percent: 3,
  },
  {
    id: "m-bpit",
    chapterId: "chapter-1",
    label: "09 NOV 2022",
    sub: "BPIT Delhi • B.Tech IT",
    icon: "🎓",
    color: "#2F5BFF",
    percent: 14,
  },
  {
    id: "m-octave",
    chapterId: "chapter-1",
    label: "OCTAVE SOCIETY",
    sub: "Guitarist ➔ President (60+)",
    icon: "🎸",
    color: "#FF8FB8",
    percent: 25,
  },
  {
    id: "m-grind",
    chapterId: "chapter-2",
    label: "THE CRUCIBLE",
    sub: "450+ LeetCode & Rejections",
    icon: "💻",
    color: "#FFC93C",
    percent: 38,
  },
  {
    id: "m-tourphin",
    chapterId: "chapter-3",
    label: "SIH HACKATHON",
    sub: "Tourphin Travel Platform",
    icon: "🧭",
    color: "#3DDC97",
    percent: 50,
  },
  {
    id: "m-nagarro",
    chapterId: "chapter-4",
    label: "CRACK-A-CODE 3.0",
    sub: "3rd Place Podium (Nagarro)",
    icon: "🥉",
    color: "#FFC93C",
    percent: 64,
  },
  {
    id: "m-clavis",
    chapterId: "chapter-5",
    label: "CLAVIS STARTUP",
    sub: "Zero-LLM ATS Magnum Opus",
    icon: "⚡",
    color: "#7B4DFF",
    percent: 76,
  },
  {
    id: "m-hudle",
    chapterId: "chapter-6",
    label: "HUDLE INTERNSHIP",
    sub: "Production Juspay Engine",
    icon: "💳",
    color: "#2F5BFF",
    percent: 88,
  },
];

export function WindingScrollPath() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Decorative SVG trail that snakes down on desktop */}
      <svg
        className="absolute left-1/2 top-0 h-full w-[1200px] -translate-x-1/2 opacity-25"
        preserveAspectRatio="none"
        viewBox="0 0 1000 10000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 500,0 
             C 750,500 850,1200 650,1800 
             C 450,2400 200,2900 350,3700 
             C 500,4500 850,5100 700,5900 
             C 550,6700 250,7300 400,8100 
             C 550,8900 750,9400 500,10000"
          stroke="#14121A"
          strokeWidth="10"
          strokeDasharray="24 20"
          strokeLinecap="round"
        />
      </svg>

      {/* Floating decorative doodles along the margins */}
      <div className="absolute left-8 top-[12%] hidden lg:block rotate-[-12deg] select-none text-2xl opacity-60">
        ⭐
      </div>
      <div className="absolute right-12 top-[22%] hidden lg:block rotate-[15deg] select-none text-3xl opacity-60">
        ⚡
      </div>
      <div className="absolute left-16 top-[35%] hidden lg:block rotate-[8deg] select-none text-3xl opacity-60">
        🎸
      </div>
      <div className="absolute right-20 top-[48%] hidden lg:block rotate-[-15deg] select-none text-2xl opacity-60">
        ☕
      </div>
      <div className="absolute left-10 top-[62%] hidden lg:block rotate-[-6deg] select-none text-3xl opacity-60">
        🏆
      </div>
      <div className="absolute right-16 top-[78%] hidden lg:block rotate-[12deg] select-none text-3xl opacity-60">
        ✨
      </div>
    </div>
  );
}

