"use client";

import React, { useState, useEffect } from "react";
import { useCollector } from "@/context/CollectorContext";
import { Terminal, ExternalLink, Play, RotateCcw, ChevronRight } from "lucide-react";
import { LineMaskReveal } from "@/components/motion/LineMaskReveal";
import { GoldMedallion } from "@/components/seals/GoldMedallion";

interface LeetCodeStats {
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  acceptanceRate?: number;
  ranking?: number;
  streak?: number;
}

export function Level2TheGrind() {
  const { unlockSeal, sealsEarned, setCursorLabel } = useCollector();
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const hasSeal = sealsEarned.includes("seal_grind");

  useEffect(() => {
    fetch("/api/stats/leetcode")
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
      })
      .catch(() => {})
      .finally(() => setStatsLoading(false));
  }, []);

  const array = [1, 2, 4, 5, 7, 8, 9];
  const target = 12;

  const twoPointerSteps = [
    { left: 0, right: 6, sum: 10, action: "Sum (10) < Target (12). Advance Left Pointer to index 1." },
    { left: 1, right: 6, sum: 11, action: "Sum (11) < Target (12). Advance Left Pointer to index 2." },
    { left: 2, right: 6, sum: 13, action: "Sum (13) > Target (12). Decrement Right Pointer to index 5." },
    { left: 2, right: 5, sum: 12, action: "Optimal Pair Found: 4 + 8 = 12. Solved deterministically in O(N) time." },
  ];

  const currentStep = twoPointerSteps[activeStep];

  const handleNextStep = () => {
    if (activeStep < twoPointerSteps.length - 1) {
      const next = activeStep + 1;
      setActiveStep(next);
      if (next === twoPointerSteps.length - 1) {
        unlockSeal("seal_grind");
      }
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <section
      id="chapter-2"
      className="relative min-h-screen w-full border-b border-[#6F665A]/20 bg-[#F6F1E7] py-20 px-6 sm:px-12 md:py-28 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER FOLIO HEADER */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#8C6B3A]">CHAPTER II</span>
            <span className="text-[#6F665A]/40">&bull;</span>
            <span>THE CRUCIBLE // 2024 &ndash; 2025</span>
          </div>
          <span>ALGORITHMIC DISCIPLINE &amp; PLACEMENT RESILIENCE</span>
        </div>

        {/* CHAPTER TITLE & THESIS */}
        <div className="mb-14 max-w-4xl">
          <LineMaskReveal threshold={0.1}>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
              The Grind &amp; <span className="italic font-serif text-[#6B1E1E]">Resilience</span>
            </h2>
          </LineMaskReveal>
          <p className="mt-4 max-w-2xl font-serif text-lg font-light text-[#6F665A] leading-relaxed">
            Placed at Coforge in my 6th semester, yet the offer letter remained delayed indefinitely.
            Eliminated in final technical rounds at Amazon and GoComet. I responded by mastering Data Structures and Algorithms through relentless day-and-night practice.
          </p>
        </div>

        {/* TWO-COLUMN SPREAD */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 mb-16">
          {/* LEFT: THE MEMOIR OF REJECTION */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-8 shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8C6B3A] font-semibold">
                ARCHIVAL LOG // THE TURNING POINT
              </span>

              <div className="mt-6 font-serif text-base leading-relaxed text-[#14110F]/90 space-y-4">
                <p>
                  Securing a placement in the 6th semester at <strong>Coforge</strong> initially felt like the finish line. But as weeks turned into months without an onboarding date or formal documentation, corporate uncertainty set in.
                </p>
                <p>
                  I entered off-campus hiring drives. I advanced through rigorous rounds to the final evaluations at top organizations, including <strong>GoComet</strong> and <strong>Amazon</strong>, only to be rejected at the threshold.
                </p>
                <p>
                  Those rejections were the best teacher I could have received. I realized raw enthusiasm could not replace structured problem-solving. I practiced DSA day and night—dissecting monotonic stacks, binary search variants, graph traversals, and dynamic programming until pattern recognition was instantaneous.
                </p>
                <p className="font-sans text-xs font-semibold text-[#8C6B3A] uppercase tracking-wider">
                  Result: Rebuilt algorithmic foundation &bull; Prepared directly for production engineering at Hudle.
                </p>
              </div>
            </div>

            {/* LIVE LEETCODE TELEMETRY SCOREBOARD */}
            <div className="rounded border border-[#6F665A]/20 bg-[#EDE5D3]/60 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#6F665A]/20 pb-3 font-mono text-[10px] text-[#6F665A]">
                <div className="flex items-center gap-2 font-medium text-[#14110F]">
                  <Terminal className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span>LEETCODE TELEMETRY &bull; SRAJAN 9839</span>
                </div>
                <a
                  href="https://leetcode.com/u/SRAJAN%209839/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#6B1E1E] hover:underline"
                >
                  <span>Profile</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                <div className="rounded border border-[#6F665A]/15 bg-[#FAF7F2] p-3">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#6F665A]">EASY SOLVED</span>
                  <div className="font-display text-2xl font-light text-[#14110F] mt-1">
                    {statsLoading ? "—" : stats?.easySolved ?? "—"}
                  </div>
                </div>

                <div className="rounded border border-[#6F665A]/15 bg-[#FAF7F2] p-3">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C6B3A]">MEDIUM SOLVED</span>
                  <div className="font-display text-2xl font-light text-[#8C6B3A] mt-1">
                    {statsLoading ? "—" : stats?.mediumSolved ?? "—"}
                  </div>
                </div>

                <div className="rounded border border-[#6F665A]/15 bg-[#FAF7F2] p-3">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#6B1E1E]">HARD SOLVED</span>
                  <div className="font-display text-2xl font-light text-[#6B1E1E] mt-1">
                    {statsLoading ? "—" : stats?.hardSolved ?? "—"}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#6F665A]/15 pt-3 font-mono text-[10px] text-[#6F665A]">
                <span>Acceptance Rate: {stats?.acceptanceRate ? `${stats.acceptanceRate}%` : "Verified via API"}</span>
                <span>Active Candidate Track</span>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE ALGORITHMIC TRACE (TWO POINTERS DEMO) */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] text-[#6F665A]">
                <span className="font-semibold text-[#8C6B3A]">INTERACTIVE ALGORITHM WORKBENCH</span>
                <span>O(N) TWO POINTERS SCAN</span>
              </div>

              <div className="mt-4 font-serif text-sm text-[#6F665A]">
                Target sum: <strong className="text-[#14110F]">12</strong> in a sorted array. Brute force requires O(N&sup2;); the dual-pointer convergence achieves optimal O(N) linear time and O(1) space.
              </div>

              {/* Visual Array */}
              <div className="my-8 flex justify-center gap-2">
                {array.map((val, idx) => {
                  const isLeft = idx === currentStep.left;
                  const isRight = idx === currentStep.right;
                  const isMatch = activeStep === twoPointerSteps.length - 1 && (isLeft || isRight);

                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className={`flex h-12 w-10 sm:w-12 items-center justify-center rounded border font-mono text-sm sm:text-base font-semibold transition-all duration-300 ${
                          isMatch
                            ? "border-[#B08D57] bg-[#B08D57]/20 text-[#8C6B3A] ring-2 ring-[#B08D57]"
                            : isLeft
                            ? "border-[#6B1E1E] bg-[#6B1E1E]/10 text-[#6B1E1E]"
                            : isRight
                            ? "border-[#8C6B3A] bg-[#EDE5D3] text-[#8C6B3A]"
                            : "border-[#6F665A]/20 bg-[#FAF7F2] text-[#14110F]"
                        }`}
                      >
                        {val}
                      </div>

                      <div className="mt-2 h-4 font-mono text-[9px] uppercase tracking-wider text-[#6F665A]">
                        {isLeft && isRight
                          ? "L+R"
                          : isLeft
                          ? "Left"
                          : isRight
                          ? "Right"
                          : ""}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Current Step Telemetry Box */}
              <div className="rounded border border-[#6F665A]/20 bg-[#EDE5D3]/40 p-4 font-mono text-xs">
                <div className="flex items-center justify-between text-[#6F665A] text-[10px] border-b border-[#6F665A]/15 pb-2">
                  <span>STEP {activeStep + 1} OF {twoPointerSteps.length}</span>
                  <span>CURRENT SUM: {currentStep.sum}</span>
                </div>
                <p className="mt-2 text-[#14110F] font-medium leading-relaxed">
                  {currentStep.action}
                </p>
              </div>

              {/* Step Controls */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 rounded border border-[#6F665A]/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#6F665A] hover:bg-[#EDE5D3] transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset Trace</span>
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={activeStep === twoPointerSteps.length - 1}
                  className={`flex items-center gap-2 rounded border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                    activeStep === twoPointerSteps.length - 1
                      ? "border-[#B08D57] bg-[#B08D57]/20 text-[#8C6B3A] cursor-default"
                      : "border-[#B08D57] bg-[#EDE5D3] text-[#14110F] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <Play className="h-3 w-3 text-[#B08D57]" />
                  <span>{activeStep === twoPointerSteps.length - 1 ? "Pair Resolved" : "Advance Pointer"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SEAL CONFERMENT CARD */}
        <div className="rounded border border-[#B08D57]/40 bg-[#FAF7F2] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <GoldMedallion
              numeral="II"
              title="The Crucible"
              isUnlocked={hasSeal}
              size="lg"
            />
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#8C6B3A]">
                CHAPTER II SEAL &bull; THE CRUCIBLE
              </span>
              <h4 className="font-display text-xl font-medium text-[#14110F]">
                {hasSeal ? "Seal Conferred &amp; Inscribed" : "The Crucible of Algorithmic Practice"}
              </h4>
              <p className="font-serif text-xs text-[#6F665A] mt-1">
                Conferred upon resolving corporate rejection through structured, daily algorithmic discipline.
              </p>
            </div>
          </div>

          {!hasSeal ? (
            <button
              onClick={() => unlockSeal("seal_grind")}
              onMouseEnter={() => setCursorLabel("CLAIM")}
              onMouseLeave={() => setCursorLabel(null)}
              className="flex items-center gap-2 rounded border border-[#B08D57] bg-[#EDE5D3] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:bg-[#FAF7F2] transition-colors"
            >
              <span>Confer Seal II</span>
              <ChevronRight className="h-3.5 w-3.5 text-[#B08D57]" />
            </button>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C6B3A] border border-[#B08D57]/40 px-3 py-1 rounded bg-[#EDE5D3]/40">
              Recorded in Archives
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
