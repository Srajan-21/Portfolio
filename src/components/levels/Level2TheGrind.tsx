"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/sound";
import { useJournal } from "@/context/JournalContext";
import { Terminal, Award, Flame, ExternalLink, Play, RotateCcw } from "lucide-react";

export function Level2TheGrind() {
  const { addXP } = useJournal();
  const [activeAlgoStep, setActiveAlgoStep] = useState(0);

  // Two Pointers step demonstration
  const twoPointerSteps = [
    { left: 0, right: 6, msg: "Initialize: Left pointer at index 0 [val: 1], Right pointer at index 6 [val: 9]" },
    { left: 1, right: 6, msg: "Sum < Target: Move Left pointer -> index 1 [val: 2]" },
    { left: 2, right: 6, msg: "Sum < Target: Move Left pointer -> index 2 [val: 4]" },
    { left: 2, right: 5, msg: "Sum > Target: Move Right pointer <- index 5 [val: 8]" },
    { left: 3, right: 4, msg: "Target Met: Index 3 [5] + Index 4 [7] = Target 12. O(N) Time achieved!" },
  ];

  const handleStepForward = () => {
    soundEngine.playClick();
    if (activeAlgoStep < twoPointerSteps.length - 1) {
      setActiveAlgoStep((prev) => prev + 1);
      if (activeAlgoStep === twoPointerSteps.length - 2) {
        addXP(30, "ALGORITHM TRACE SOLVED");
      }
    }
  };

  const handleResetAlgo = () => {
    soundEngine.playClick();
    setActiveAlgoStep(0);
  };

  return (
    <section
      id="level-2"
      className="relative min-h-screen w-full border-b-2 border-dashed border-[#D3C4A5] bg-[#F2EBDD] py-16 px-4 transition-colors duration-300 sm:px-8 md:py-24 dark:border-[#3A3328] dark:bg-[#181512]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Level Header */}
        <div className="mb-10 flex flex-wrap items-baseline justify-between border-b border-[#D3C4A5] pb-4 font-mono text-xs uppercase tracking-wider text-[#837B6D] dark:border-[#3A3328] dark:text-[#7E7565]">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#D9432B] px-2 py-0.5 font-bold text-white">
              LEVEL 02
            </span>
            <span>THE GRIND // 2024 &ndash; 2025</span>
          </div>
          <span>DSA, REJECTION &amp; RESILIENCE</span>
        </div>

        {/* Level Title */}
        <div className="mb-12">
          <h2
            data-text="LEVEL 2: THE GRIND & THE SCOREBOARD"
            className="riso-title font-display text-3xl font-black uppercase tracking-tight text-[#1B1A17] sm:text-5xl md:text-6xl dark:text-[#EBE3D3]"
          >
            THE GRIND &amp; THE SCOREBOARD
          </h2>
          <p className="mt-3 max-w-3xl font-serif text-lg italic text-[#4B463E] sm:text-xl dark:text-[#B2A896]">
            &ldquo;Selected in 6th semester at Coforge, but the letter never arrived. Final round heartbreaks at GoComet and Amazon. It was time to stop wishing and start grinding.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column (6 cols): The Narrative of Rejection */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-6 shadow-[5px_5px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[5px_5px_0px_0px_#EBE3D3]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D9432B] dark:text-[#E55840]">
                CHAPTER ENTRY // THE CRUCIBLE
              </span>

              <div className="mt-4 space-y-4 font-serif text-base leading-relaxed text-[#1B1A17] dark:text-[#EBE3D3]">
                <p>
                  In college placement season, getting selected in your 6th semester feels like crossing the finish line.
                  I was placed at <strong>Coforge</strong> &mdash; but as months dragged on without an offer letter, reality hit.
                </p>
                <p>
                  I entered the open market. I made it to the final, agonizing rounds of premier companies like{" "}
                  <strong>GoComet</strong> and <strong>Amazon</strong>, only to be rejected at the eleventh hour.
                  Every rejection stung, but it delivered one unforgiving truth: <em>I hadn’t been consistent in DSA.</em>
                </p>
                <p>
                  No shortcuts. I committed to a brutal daily regimen: solving problems day and night,
                  tracing recursion stacks on physical paper, and mastering C++ data structures before porting my reasoning to TypeScript.
                  That consistency unlocked 300+ LeetCode problems and led directly to my engineering role at Hudle.
                </p>
              </div>

              {/* Hand-drawn Marginalia */}
              <div className="mt-5 rounded border-l-2 border-[#D9432B] bg-[#E4D7C2]/40 p-3 font-hand text-lg text-[#1B1A17] dark:bg-[#181512] dark:text-[#EBE3D3]">
                &ldquo;Rejection is just a compiler error in your career. You fix the syntax, trace the logic, and re-run.&rdquo;
              </div>
            </div>

            {/* Interactive Algorithm Trace Machine */}
            <div className="rounded border border-[#D3C4A5] bg-[#E4D7C2]/50 p-5 dark:border-[#3A3328] dark:bg-[#24201A]">
              <div className="flex items-center justify-between border-b border-[#D3C4A5] pb-2 font-mono text-xs dark:border-[#3A3328]">
                <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                  INTERACTIVE ALGO TRACE: TWO POINTERS
                </span>
                <span className="text-[#837B6D] dark:text-[#7E7565]">
                  Step {activeAlgoStep + 1} of {twoPointerSteps.length}
                </span>
              </div>

              {/* Array Pointer Visualization */}
              <div className="my-4 flex items-center justify-center gap-2 font-mono">
                {[1, 2, 4, 5, 7, 8, 9].map((val, idx) => {
                  const isLeft = activeAlgoStep === 0 ? idx === 0 : activeAlgoStep === 1 ? idx === 1 : activeAlgoStep >= 2 ? (activeAlgoStep === 4 ? idx === 3 : idx === 2) : false;
                  const isRight = activeAlgoStep <= 2 ? idx === 6 : activeAlgoStep === 3 ? idx === 5 : idx === 4;
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="text-[10px] text-[#837B6D] dark:text-[#7E7565]">
                        {isLeft ? "L" : isRight ? "R" : ""}
                      </span>
                      <div
                        className={`flex h-10 w-9 items-center justify-center rounded border font-bold ${
                          isLeft || isRight
                            ? "border-2 border-[#D9432B] bg-[#D9432B] text-white"
                            : "border-[#1B1A17] bg-[#FBF8F1] text-[#1B1A17] dark:border-[#EBE3D3] dark:bg-[#181512] dark:text-[#EBE3D3]"
                        }`}
                      >
                        {val}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="min-h-[44px] font-mono text-xs text-[#4B463E] dark:text-[#B2A896]">
                &gt; {twoPointerSteps[activeAlgoStep].msg}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={handleStepForward}
                  disabled={activeAlgoStep === twoPointerSteps.length - 1}
                  className="flex items-center gap-1.5 rounded border border-[#1B1A17] bg-[#D9432B] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:opacity-90 disabled:opacity-40 dark:border-[#EBE3D3]"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>Next Step</span>
                </button>
                <button
                  onClick={handleResetAlgo}
                  className="flex items-center gap-1.5 rounded border border-[#837B6D] px-3 py-1.5 font-mono text-xs font-bold text-[#837B6D] hover:text-[#1B1A17] dark:text-[#7E7565] dark:hover:text-[#EBE3D3]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): LeetCode Vintage Scoreboard */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-6 shadow-[6px_6px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[6px_6px_0px_0px_#EBE3D3]">
              {/* Scoreboard Masthead */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-[#D3C4A5] pb-3 font-mono text-xs dark:border-[#3A3328]">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-[#D9432B]" />
                  <span className="font-bold uppercase tracking-wider text-[#1B1A17] dark:text-[#EBE3D3]">
                    LEETCODE SCOREBOARD
                  </span>
                </div>
                <a
                  href="https://leetcode.com/u/SRAJAN 9839"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#D9432B] hover:underline dark:text-[#E55840]"
                >
                  <span>@SRAJAN 9839</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Total Solved Big Display */}
              <div className="my-6 flex items-center justify-between rounded border border-[#1B1A17] bg-[#F2EBDD] p-4 dark:border-[#EBE3D3] dark:bg-[#181512]">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#837B6D] dark:text-[#7E7565]">
                    Total Problems Mastered
                  </span>
                  <div className="font-display text-4xl font-black text-[#1B1A17] sm:text-5xl dark:text-[#EBE3D3]">
                    300+
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="flex items-center gap-1 text-[#D9432B] dark:text-[#E55840]">
                    <Flame className="h-4 w-4" />
                    <span className="text-xs font-bold">68 DAY STREAK</span>
                  </div>
                  <span className="text-xs text-[#837B6D] dark:text-[#7E7565]">
                    89.2% Acceptance
                  </span>
                </div>
              </div>

              {/* Solved By Difficulty Tiers */}
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between pb-1">
                    <span className="font-bold text-[#7A8B6F] dark:text-[#92A585]">EASY (115)</span>
                    <span>100% Core Foundations</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded bg-[#D3C4A5]/40 dark:bg-[#3A3328]">
                    <div className="h-full w-[85%] bg-[#7A8B6F]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between pb-1">
                    <span className="font-bold text-[#C99A3B] dark:text-[#DEB459]">MEDIUM (165)</span>
                    <span>Pattern Recognition &amp; Optimization</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded bg-[#D3C4A5]/40 dark:bg-[#3A3328]">
                    <div className="h-full w-[70%] bg-[#C99A3B]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between pb-1">
                    <span className="font-bold text-[#D9432B] dark:text-[#E55840]">HARD (24+)</span>
                    <span>Complex DP &amp; Graph Traversals</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded bg-[#D3C4A5]/40 dark:bg-[#3A3328]">
                    <div className="h-full w-[45%] bg-[#D9432B]" />
                  </div>
                </div>
              </div>

              {/* Mastered Topics Tags */}
              <div className="mt-6 border-t border-[#D3C4A5] pt-4 dark:border-[#3A3328]">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#837B6D] dark:text-[#7E7565]">
                  WEAPONS UNLOCKED IN THE FIELD:
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {[
                    "Sliding Window",
                    "Two Pointers",
                    "Binary Search Trees",
                    "Dynamic Programming",
                    "Graph BFS/DFS",
                    "Monotonic Stack",
                    "Topological Sort",
                    "Bit Manipulation",
                  ].map((topic) => (
                    <span
                      key={topic}
                      className="rounded border border-[#D3C4A5] bg-[#E4D7C2]/60 px-2 py-0.5 text-[#1B1A17] dark:border-[#3A3328] dark:bg-[#24201A] dark:text-[#EBE3D3]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
