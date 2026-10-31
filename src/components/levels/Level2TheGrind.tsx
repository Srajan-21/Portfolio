"use client";

import React, { useState, useEffect } from "react";
import { useCollector } from "@/context/CollectorContext";
import { Terminal, ExternalLink, Play, RotateCcw } from "lucide-react";

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
  const { unlockSeal } = useCollector();
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    fetch("/api/stats/leetcode")
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
      })
      .catch(() => {})
      .finally(() => setStatsLoading(false));
  }, []);

  const twoPointerSteps = [
    { left: 0, right: 6, msg: "Index 0 [val 1] and Index 6 [val 9]. Evaluating pair sum..." },
    { left: 1, right: 6, msg: "Sum < Target. Increment left pointer to Index 1 [val 2]." },
    { left: 2, right: 6, msg: "Sum < Target. Increment left pointer to Index 2 [val 4]." },
    { left: 2, right: 5, msg: "Sum > Target. Decrement right pointer to Index 5 [val 8]." },
    { left: 3, right: 4, msg: "Optimal Pair Found: 5 + 7 = Target 12. Solved in O(N) deterministic time." },
  ];

  const handleStep = () => {
    if (activeStep < twoPointerSteps.length - 1) {
      setActiveStep((prev) => prev + 1);
      if (activeStep === twoPointerSteps.length - 2) {
        unlockSeal("seal_grind");
      }
    }
  };

  return (
    <section
      id="chapter-2"
      className="relative min-h-screen w-full border-b-hairline bg-[#F6F1E7] py-20 px-6 sm:px-12 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* Chapter Header */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b-hairline pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="text-[#8C6B3A] font-semibold">CHAPTER II</span>
            <span>&bull;</span>
            <span>THE CRUCIBLE // 2024 &ndash; 2025</span>
          </div>
          <span>ALGORITHMIC DISCIPLINE &amp; REJECTION</span>
        </div>

        {/* Chapter Title */}
        <div className="mb-14">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
            The Grind &amp; <span className="italic font-serif text-[#6B1E1E]">Resilience</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-lg font-light text-[#6F665A] leading-relaxed">
            Placed at Coforge in my 6th semester with the offer letter indefinitely delayed. Final round eliminations at GoComet and Amazon. I turned to daily algorithmic rigor to rebuild my foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: The Narrative of Rejection */}
          <div className="space-y-8 lg:col-span-6">
            <div className="rounded border-hairline bg-[#FAF7F2] p-8 shadow-editorial">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C6B3A] font-semibold">
                FOLIO // THE CRUCIBLE
              </span>

              <div className="mt-6 font-serif text-base leading-relaxed text-[#14110F]/90 space-y-4">
                <p>
                  In college recruitment, receiving an offer in the 6th semester appears to settle your path.
                  I was placed at <strong>Coforge</strong> &mdash; but as months passed with no letter issued, I had to confront the reality of corporate uncertainty.
                </p>
                <p>
                  I entered competitive off-campus drives. I reached the final technical rounds of premier firms like{" "}
                  <strong>GoComet</strong> and <strong>Amazon</strong>, only to be turned away at the last hurdle.
                  Those rejections were humbling, but they revealed a clear diagnosis: <em>I had not been consistent in Data Structures and Algorithms.</em>
                </p>
                <p>
                  I replaced frustration with discipline: solving problems daily, tracing recursion call stacks on paper,
                  and practicing day and night. That persistence solidified my problem-solving ability and directly opened the door to my role at Hudle.
                </p>
              </div>
            </div>

            {/* Interactive Algorithmic Trace */}
            <div className="rounded border-hairline bg-[#EDE5D3]/40 p-6">
              <div className="flex items-center justify-between border-b-hairline pb-3 font-mono text-[10px] text-[#6F665A]">
                <span className="font-medium text-[#14110F]">
                  DETERMINISTIC TRACE // TWO POINTERS
                </span>
                <span>STEP {activeStep + 1} / {twoPointerSteps.length}</span>
              </div>

              <div className="my-6 flex items-center justify-center gap-2 font-mono">
                {[1, 2, 4, 5, 7, 8, 9].map((val, idx) => {
                  const isLeft = activeStep === 0 ? idx === 0 : activeStep === 1 ? idx === 1 : activeStep >= 2 ? (activeStep === 4 ? idx === 3 : idx === 2) : false;
                  const isRight = activeStep <= 2 ? idx === 6 : activeStep === 3 ? idx === 5 : idx === 4;
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="text-[9px] text-[#8C6B3A] font-mono h-3">
                        {isLeft ? "L" : isRight ? "R" : ""}
                      </span>
                      <div
                        className={`flex h-9 w-8 items-center justify-center rounded border font-mono text-xs transition-colors ${
                          isLeft || isRight
                            ? "border-[#B08D57] bg-[#B08D57] text-white font-medium"
                            : "border-hairline bg-[#FAF7F2] text-[#14110F]"
                        }`}
                      >
                        {val}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="min-h-[36px] font-mono text-xs text-[#6F665A]">
                &gt; {twoPointerSteps[activeStep].msg}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={handleStep}
                  disabled={activeStep === twoPointerSteps.length - 1}
                  className="flex items-center gap-1.5 rounded border border-[#6F665A]/30 bg-[#F6F1E7] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#14110F] hover:border-[#B08D57] disabled:opacity-40 transition-colors"
                >
                  <Play className="h-3 w-3 text-[#B08D57]" />
                  <span>Advance Pointer</span>
                </button>
                <button
                  onClick={() => setActiveStep(0)}
                  className="flex items-center gap-1.5 rounded border border-hairline px-3 py-1.5 font-mono text-[11px] text-[#6F665A] hover:text-[#14110F]"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live LeetCode Scoreboard (Live data only, graceful fallback) */}
          <div className="space-y-8 lg:col-span-6">
            <div className="rounded border-hairline bg-[#FAF7F2] p-8 shadow-editorial">
              <div className="flex items-center justify-between border-b-hairline pb-4 font-mono text-[10px] text-[#6F665A]">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span className="font-medium text-[#14110F] uppercase tracking-[0.16em]">
                    LEETCODE VERIFIED TELEMETRY
                  </span>
                </div>
                <a
                  href="https://leetcode.com/u/SRAJAN 9839"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#8C6B3A] hover:underline"
                >
                  <span>@SRAJAN 9839</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Total Solved Count Display */}
              <div className="my-8 flex items-baseline justify-between rounded border-hairline bg-[#EDE5D3]/30 p-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6F665A]">
                    Problems Solved
                  </span>
                  <div className="font-display text-5xl font-light text-[#14110F] mt-1">
                    {statsLoading ? "—" : stats?.totalSolved ?? "—"}
                  </div>
                </div>
                <div className="text-right font-mono text-xs text-[#6F665A]">
                  <div>Streak: {statsLoading ? "—" : stats?.streak ? `${stats.streak} days` : "—"}</div>
                  <div className="text-[11px] mt-0.5">
                    Acceptance: {statsLoading ? "—" : stats?.acceptanceRate ? `${stats.acceptanceRate}%` : "—"}
                  </div>
                </div>
              </div>

              {/* Breakdown by difficulty */}
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between pb-1 text-[11px]">
                    <span className="text-[#6F665A]">Easy Tier</span>
                    <span className="font-medium text-[#14110F]">
                      {statsLoading ? "—" : stats?.easySolved ?? "—"}
                    </span>
                  </div>
                  <div className="h-[2px] w-full bg-[#EDE5D3]">
                    <div className="h-full bg-[#B08D57]" style={{ width: stats?.easySolved ? "65%" : "0%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between pb-1 text-[11px]">
                    <span className="text-[#6F665A]">Medium Tier</span>
                    <span className="font-medium text-[#14110F]">
                      {statsLoading ? "—" : stats?.mediumSolved ?? "—"}
                    </span>
                  </div>
                  <div className="h-[2px] w-full bg-[#EDE5D3]">
                    <div className="h-full bg-[#8C6B3A]" style={{ width: stats?.mediumSolved ? "75%" : "0%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between pb-1 text-[11px]">
                    <span className="text-[#6F665A]">Hard Tier</span>
                    <span className="font-medium text-[#14110F]">
                      {statsLoading ? "—" : stats?.hardSolved ?? "—"}
                    </span>
                  </div>
                  <div className="h-[2px] w-full bg-[#EDE5D3]">
                    <div className="h-full bg-[#6B1E1E]" style={{ width: stats?.hardSolved ? "40%" : "0%" }} />
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t-hairline pt-4 font-mono text-[10px] text-[#6F665A]">
                <span>Data polled dynamically via LeetCode telemetry API. Zero hardcoded counters.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
