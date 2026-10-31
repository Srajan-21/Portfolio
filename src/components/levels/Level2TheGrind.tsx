"use client";

import React, { useState, useEffect } from "react";
import { useStickerWorld } from "@/context/StickerWorldContext";
import { Terminal, ExternalLink, Play, RotateCcw, AlertTriangle, CheckCircle2, Flame, Award, ArrowRight } from "lucide-react";

interface LeetCodeStats {
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  acceptanceRate?: number;
  ranking?: number;
  streak?: number;
}

interface RejectionNote {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  context: string;
  revealedLesson: string;
  rotation: string;
  isPeeled: boolean;
}

export function Level2TheGrind() {
  const { addStickers, completeQuest, unlockCard, setMascotSpeech } = useStickerWorld();
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  // Peelable Rejection Notes
  const [notes, setNotes] = useState<RejectionNote[]>([
    {
      id: "note-coforge",
      title: "Coforge",
      badge: "Placed 6th Sem • Offer Delayed",
      badgeColor: "#FF4D2E",
      context: "Cleared all placement rounds and was selected, but the offer letter was indefinitely delayed by the company.",
      revealedLesson: "An offer isn't real until signed. I didn't wait around; I turned to intense personal building and real-world system design.",
      rotation: "-2deg",
      isPeeled: false,
    },
    {
      id: "note-amazon",
      title: "Amazon",
      badge: "Rejected Final Round",
      badgeColor: "#FFC93C",
      context: "Advanced through coding assessments and multiple technical loops before getting rejected in the final interview.",
      revealedLesson: "Deepened my grasp of distributed edge cases, microservice boundaries, and system resilience under massive concurrency.",
      rotation: "1.5deg",
      isPeeled: false,
    },
    {
      id: "note-gocomet",
      title: "GoComet",
      badge: "Rejected Final Round",
      badgeColor: "#FF8FB8",
      context: "Made it to the last evaluation stage. A heartbreaking near-miss that tested my perseverance.",
      revealedLesson: "High-scale logistics architecture requires atomic database transaction locks, not superficial async promises.",
      rotation: "-1deg",
      isPeeled: false,
    },
    {
      id: "note-dsa-habit",
      title: "Initial DSA Inconsistency",
      badge: "2023 Crucible",
      badgeColor: "#2F5BFF",
      context: "Initially struggled with staying consistent in algorithmic problem-solving while balancing college and music.",
      revealedLesson: "Rebuilt discipline from zero. Started practicing C++ data structures day and night until two-pointers, graphs, and DP became second nature.",
      rotation: "2deg",
      isPeeled: false,
    },
  ]);

  // Fetch live LeetCode stats
  useEffect(() => {
    fetch("/api/stats/leetcode")
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
      })
      .catch(() => {})
      .finally(() => setStatsLoading(false));
  }, []);

  const peelNote = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id && !n.isPeeled) {
          addStickers(2, `peel_${id}`);
          completeQuest("q_peel");
          unlockCard("card_dsa_grind");
          setMascotSpeech("Every rejection was an engineering upgrade! That grind paved the way to Hudle!", 4000);
          return { ...n, isPeeled: true };
        }
        return n;
      })
    );
  };

  // Two pointer algorithm visualizer
  const array = [1, 2, 4, 5, 7, 8, 9];
  const target = 12;
  const twoPointerSteps = [
    { left: 0, right: 6, sum: 10, action: "Sum (10) < Target (12). Advance Left Pointer to index 1." },
    { left: 1, right: 6, sum: 11, action: "Sum (11) < Target (12). Advance Left Pointer to index 2." },
    { left: 2, right: 6, sum: 13, action: "Sum (13) > Target (12). Decrement Right Pointer to index 5." },
    { left: 2, right: 5, sum: 12, action: "Optimal Pair Found: 4 + 8 = 12. Solved deterministically in O(N) time!" },
  ];

  const currentStep = twoPointerSteps[activeStep];

  const handleNextStep = () => {
    if (activeStep < twoPointerSteps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <section
      id="chapter-2"
      className="relative min-h-screen w-full bg-[#FFF8EC] py-20 px-4 sm:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER STICKER HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#14121A] pb-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="bg-[#FFC93C] text-[#14121A] border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm rotate-[1deg]">
              CHAPTER 02
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#14121A]/70">
              THE CRUCIBLE • 2024 &ndash; 2025
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#FF4D2E] text-white border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold shadow-hard-sm">
            <Flame className="h-3.5 w-3.5" />
            <span>DAY &amp; NIGHT GRIND</span>
          </div>
        </div>

        {/* HERO TITLE & INTRO */}
        <div className="mb-14 max-w-4xl">
          <div className="inline-block bg-white border-2 border-[#14121A] px-3 py-1 text-xs font-mono font-bold uppercase shadow-hard-sm mb-4 rotate-[-1deg]">
            ⚔️ RESILIENCE UNDER REJECTION &amp; ALGORITHMIC RIGOR
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#14121A] leading-tight">
            The Rejection Wall <br />
            <span className="bg-[#2F5BFF] text-white px-2 py-0.5 border-3 border-[#14121A] shadow-hard inline-block rotate-[1deg]">
              &amp; The LeetCode Crucible
            </span>
          </h2>
          <p className="mt-6 font-sans text-lg md:text-xl text-[#14121A]/80 font-medium leading-relaxed max-w-3xl">
            Success is never linear. I was placed at Coforge in my 6th semester, but the offer letter was indefinitely delayed. I faced heartbreak in the final rounds of top tier companies like Amazon and GoComet.
            Instead of giving up, I worked hard, practicing Data Structures &amp; Algorithms day and night until the logic turned to steel.
          </p>
        </div>

        {/* SECTION 1: INTERACTIVE REJECTION WALL */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#14121A] text-white border-2 border-[#14121A] px-2.5 py-1 font-mono text-xs font-bold uppercase">
                INTERACTIVE
              </span>
              <h3 className="font-display text-2xl font-black text-[#14121A]">
                The Rejection Wall &mdash; Peel to Reveal Lessons (+2 Stickers Each)
              </h3>
            </div>
            <span className="font-mono text-xs text-[#14121A]/70 hidden sm:inline">
              Click any note to peel
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                onClick={() => peelNote(note.id)}
                className={`relative cursor-pointer border-3 border-[#14121A] p-6 transition-all duration-300 ${
                  note.isPeeled
                    ? "bg-[#3DDC97] shadow-hard-sm translate-y-1"
                    : "bg-[#FFF8EC] shadow-hard hover:-translate-y-1.5"
                }`}
                style={{ transform: note.isPeeled ? "none" : `rotate(${note.rotation})` }}
              >
                {/* Pin sticker */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#14121A] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  📌
                </div>

                {/* Company Name & Status */}
                <div className="mt-2 flex items-center justify-between">
                  <h4 className="font-display text-xl font-black text-[#14121A]">{note.title}</h4>
                  <span
                    className="border border-[#14121A] px-2 py-0.5 font-mono text-[9px] font-bold text-[#14121A]"
                    style={{ backgroundColor: note.badgeColor }}
                  >
                    {note.badge}
                  </span>
                </div>

                {!note.isPeeled ? (
                  <div className="mt-4 space-y-3">
                    <p className="font-sans text-xs text-[#14121A]/80 leading-relaxed">
                      {note.context}
                    </p>
                    <div className="pt-3 border-t-2 border-dashed border-[#14121A]/30 flex items-center justify-between font-mono text-[10px] font-bold uppercase text-[#FF4D2E]">
                      <span>CLICK TO PEEL ➔</span>
                      <span>+2 ⭐</span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-[#14121A] uppercase">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#14121A]" />
                      <span>LESSON UNLOCKED</span>
                    </div>
                    <p className="font-sans text-xs font-bold text-[#14121A] leading-relaxed">
                      &ldquo;{note.revealedLesson}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: LEETCODE ARCADE SCOREBOARD & TWO-POINTER SIMULATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* LEETCODE ARCADE STATS (5 cols) */}
          <div className="lg:col-span-5 border-3 border-[#14121A] bg-[#14121A] p-6 sm:p-8 text-white shadow-hard">
            <div className="flex items-center justify-between border-b-2 border-white/20 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3DDC97] animate-ping" />
                <span className="font-mono text-xs font-bold text-[#FFC93C] uppercase tracking-wider">
                  LEETCODE SCOREBOARD
                </span>
              </div>
              <a
                href="https://leetcode.com/u/SRAJAN 9839"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-xs text-white/70 hover:text-white underline decoration-[#FFC93C]"
              >
                <span>SRAJAN 9839</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="mt-6">
              <div className="text-center p-4 border-2 border-white/20 bg-white/5 mb-6">
                <span className="font-mono text-xs uppercase text-white/60">TOTAL PROBLEMS SOLVED</span>
                <div className="font-display text-5xl font-black text-[#3DDC97] mt-1">
                  {stats?.totalSolved || "450+"}
                </div>
                <span className="font-mono text-[10px] text-white/60">Consistent Practice • C++ &amp; Full Stack</span>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-3 gap-3 font-mono text-center">
                <div className="border border-white/20 p-2.5 bg-white/5">
                  <span className="text-[10px] text-[#3DDC97] uppercase">EASY</span>
                  <div className="font-bold text-lg">{stats?.easySolved || "140+"}</div>
                </div>
                <div className="border border-white/20 p-2.5 bg-white/5">
                  <span className="text-[10px] text-[#FFC93C] uppercase">MEDIUM</span>
                  <div className="font-bold text-lg">{stats?.mediumSolved || "260+"}</div>
                </div>
                <div className="border border-white/20 p-2.5 bg-white/5">
                  <span className="text-[10px] text-[#FF4D2E] uppercase">HARD</span>
                  <div className="font-bold text-lg">{stats?.hardSolved || "50+"}</div>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between font-mono text-xs text-white/70">
                <span>LANGUAGE: C++ / TS</span>
                <span className="text-[#3DDC97]">DISCIPLINE: 100%</span>
              </div>
            </div>
          </div>

          {/* TWO-POINTER ALGORITHM SIMULATOR (7 cols) */}
          <div className="lg:col-span-7 border-3 border-[#14121A] bg-white p-6 sm:p-8 shadow-hard">
            <div className="flex items-center justify-between border-b-2 border-[#14121A]/10 pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-[#2F5BFF]" />
                <span className="font-mono text-xs font-bold text-[#14121A] uppercase tracking-wider">
                  TWO-POINTER ALGORITHM SIMULATOR (TARGET: {target})
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-[#FF4D2E]">O(N) DETERMINISTIC</span>
            </div>

            <div className="mt-6">
              <p className="font-sans text-xs text-[#14121A]/80 mb-6">
                Mastering algorithms changed everything. Rather than brute-force $O(N^2)$ iterations, two pointers converge from both ends of a sorted array in linear $O(N)$ time.
              </p>

              {/* Array Elements Visualizer */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-6 bg-[#FFF8EC] border-2 border-[#14121A] mb-6">
                {array.map((num, idx) => {
                  const isLeft = idx === currentStep.left;
                  const isRight = idx === currentStep.right;
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="font-mono text-[10px] text-[#14121A]/60 mb-1">
                        {isLeft ? "LEFT" : isRight ? "RIGHT" : `[${idx}]`}
                      </span>
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#14121A] flex items-center justify-center font-mono font-bold text-base transition-all ${
                          isLeft
                            ? "bg-[#2F5BFF] text-white shadow-hard-sm scale-110"
                            : isRight
                            ? "bg-[#FF4D2E] text-white shadow-hard-sm scale-110"
                            : "bg-white text-[#14121A]"
                        }`}
                      >
                        {num}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Step Action Box */}
              <div className="border-2 border-[#14121A] bg-[#FFF8EC] p-4 mb-6">
                <span className="font-mono text-[10px] font-bold text-[#14121A]/60 uppercase">
                  STEP {activeStep + 1} OF {twoPointerSteps.length}
                </span>
                <p className="font-mono text-xs font-bold text-[#14121A] mt-1">
                  {currentStep.action}
                </p>
              </div>

              {/* Simulator Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleNextStep}
                  disabled={activeStep === twoPointerSteps.length - 1}
                  className={`btn-press flex items-center gap-2 border-2 border-[#14121A] px-4 py-2 font-mono text-xs font-bold uppercase ${
                    activeStep === twoPointerSteps.length - 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#3DDC97] text-[#14121A] shadow-hard-sm"
                  }`}
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>{activeStep === twoPointerSteps.length - 1 ? "SOLVED!" : "NEXT STEP ➔"}</span>
                </button>
                <button
                  onClick={handleReset}
                  className="btn-press flex items-center gap-1.5 border-2 border-[#14121A] bg-white px-3 py-2 font-mono text-xs font-bold uppercase text-[#14121A] shadow-hard-sm"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>RESET</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM MILESTONE BANNER */}
        <div className="border-3 border-[#14121A] bg-[#FFC93C] p-6 shadow-hard flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14121A]/80">
              CRUCIBLE LESSON SUMMARY
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#14121A]">
              Rejections Forged Resilience &bull; Day &amp; Night Practice Unlocked Production Rigor
            </h3>
          </div>
          <a
            href="#chapter-3"
            className="btn-press flex items-center gap-2 border-2 border-[#14121A] bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#14121A] shadow-hard-sm shrink-0"
          >
            <span>NEXT: TOURPHIN BUILD</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
