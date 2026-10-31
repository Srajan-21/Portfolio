"use client";

import React, { useState } from "react";
import { useCollector } from "@/context/CollectorContext";
import { Award, Clock, Users, ArrowRight } from "lucide-react";

export function Level4BossFight() {
  const { unlockSeal } = useCollector();

  // Calm portion calculation state
  const [lastMealTime, setLastMealTime] = useState<number>(4);
  const [lastMealType, setLastMealType] = useState<string>("medium");
  const [suggestedGrams, setSuggestedGrams] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const baseGrams = 420;
    const hoursFactor = Math.min(250, lastMealTime * 35);
    const mealDeduction = lastMealType === "heavy" ? 140 : lastMealType === "medium" ? 80 : 20;
    const recommended = Math.max(250, baseGrams + hoursFactor - mealDeduction);
    setSuggestedGrams(recommended);
    unlockSeal("seal_podium");
  };

  return (
    <section
      id="chapter-4"
      className="relative min-h-screen w-full border-b-hairline bg-[#F6F1E7] py-20 px-6 sm:px-12 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* Chapter Header */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b-hairline pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="text-[#8C6B3A] font-semibold">CHAPTER IV</span>
            <span>&bull;</span>
            <span>THE PODIUM // NAGARRO CRACK-A-CODE 3.0</span>
          </div>
          <span>3RD PLACE PODIUM FINISH &bull; 50+ TEAMS</span>
        </div>

        {/* Chapter Title */}
        <div className="mb-14">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
            The Podium &amp; <span className="italic font-serif text-[#6B1E1E]">Prevention</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-lg font-light text-[#6F665A] leading-relaxed">
            Nagarro&apos;s 24-hour national hackathon. Competing against 50+ university teams, we addressed food waste through dynamic nutritional satiety modeling.
          </p>
        </div>

        {/* Architectural Stepped Plinths (The Podium Sequence) */}
        <div className="mb-14 rounded border-hairline bg-[#FAF7F2] p-8 sm:p-12 shadow-editorial">
          <div className="text-center mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8C6B3A] font-semibold">
              NATIONAL HACKATHON PODIUM RESULTS
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 items-end max-w-lg mx-auto pt-6 pb-2">
            {/* 2nd Place Plinth */}
            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] text-[#6F665A] mb-2">RUNNER UP</span>
              <div className="w-full h-24 rounded-t border-t border-x border-[#6F665A]/20 bg-[#EDE5D3]/60 flex items-center justify-center font-display text-xl text-[#6F665A]">
                II
              </div>
            </div>

            {/* 1st Place Plinth */}
            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] text-[#6F665A] mb-2">WINNER</span>
              <div className="w-full h-36 rounded-t border-t border-x border-[#6F665A]/20 bg-[#EDE5D3]/90 flex items-center justify-center font-display text-2xl text-[#6F665A]">
                I
              </div>
            </div>

            {/* 3rd Place Plinth (Srajan's Team) */}
            <div className="flex flex-col items-center">
              {/* Bronze Laurel Seal Badge */}
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#B08D57] bg-[#F6F1E7] shadow-sm">
                <span className="font-display text-xs font-semibold text-[#8C6B3A]">3rd</span>
              </div>
              <div className="w-full h-20 rounded-t border-t-2 border-x border-[#B08D57] bg-[#B08D57]/15 flex items-center justify-center font-display text-xl font-medium text-[#8C6B3A]">
                III
              </div>
            </div>
          </div>

          <div className="text-center mt-6 font-serif text-sm text-[#6F665A]">
            Secured 3rd place out of 50+ engineering teams nationwide.
          </div>
        </div>

        {/* Two-Column Dossier */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Team Roster & Theme Concept */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border-hairline bg-[#FAF7F2] p-8 shadow-editorial">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C6B3A] font-semibold">
                THE HACKATHON TRIO
              </span>

              <div className="mt-6 space-y-3 font-mono text-xs">
                <div className="rounded border-hairline bg-[#F6F1E7] p-3 flex justify-between items-center">
                  <div>
                    <span className="font-medium text-[#14110F]">Srajan Srivastava</span>
                    <p className="text-[10px] text-[#6F665A]">Architecture &bull; Satiety Algorithm</p>
                  </div>
                  <span className="text-[10px] text-[#8C6B3A]">LEAD</span>
                </div>

                <div className="rounded border-hairline bg-[#F6F1E7] p-3 flex justify-between items-center">
                  <div>
                    <span className="font-medium text-[#14110F]">Abhishek Yadav</span>
                    <p className="text-[10px] text-[#6F665A]">Full Stack Systems &bull; Co-developer</p>
                  </div>
                  <span className="text-[10px] text-[#6F665A]">TEAM</span>
                </div>

                <div className="rounded border-hairline bg-[#F6F1E7] p-3 flex justify-between items-center">
                  <div>
                    <span className="font-medium text-[#14110F]">Swaraj Kumar</span>
                    <p className="text-[10px] text-[#6F665A]">Interface &bull; Co-developer</p>
                  </div>
                  <span className="text-[10px] text-[#6F665A]">TEAM</span>
                </div>
              </div>

              <div className="mt-6 font-serif text-sm leading-relaxed text-[#14110F]/90 space-y-3">
                <p>
                  <strong>The Core Idea:</strong> Most food-waste initiatives concentrate on post-consumption salvage.
                  Our food-waste prototype focused on <em>preventative portion estimation</em>: when a user cannot state their hunger level,
                  the system queries the timing and volume of their previous meal to predict a precise portion that leaves zero plate waste.
                </p>
              </div>
            </div>
          </div>

          {/* Calm Interactive Portion Sizing Demo */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border-hairline bg-[#EDE5D3]/40 p-8 shadow-editorial">
              <div className="flex items-center justify-between border-b-hairline pb-3 font-mono text-[10px] text-[#6F665A]">
                <span className="font-medium text-[#14110F]">
                  PORTION ESTIMATION PROTOTYPE
                </span>
                <span>INTERACTIVE</span>
              </div>

              <form onSubmit={handleCalculate} className="mt-6 space-y-5 font-mono text-xs">
                <div>
                  <label className="block text-[#14110F] text-[11px] font-medium">
                    1. Hours elapsed since previous meal: ({lastMealTime}h)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={lastMealTime}
                    onChange={(e) => setLastMealTime(Number(e.target.value))}
                    className="mt-2 w-full accent-[#B08D57]"
                  />
                  <div className="flex justify-between text-[10px] text-[#6F665A] mt-1">
                    <span>1 hour</span>
                    <span>5 hours</span>
                    <span>10+ hours</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[#14110F] text-[11px] font-medium">
                    2. Previous meal composition:
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {[
                      { id: "light", label: "Light Snack" },
                      { id: "medium", label: "Standard" },
                      { id: "heavy", label: "Substantial" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setLastMealType(m.id)}
                        className={`rounded border p-2 text-center text-[11px] transition-colors ${
                          lastMealType === m.id
                            ? "border-[#B08D57] bg-[#B08D57] text-white font-medium"
                            : "border-hairline bg-[#F6F1E7] text-[#14110F]"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded border border-[#6F665A]/30 bg-[#F6F1E7] py-2.5 font-mono text-[11px] uppercase tracking-wider text-[#14110F] hover:border-[#B08D57] hover:bg-[#EDE5D3] transition-colors"
                >
                  <span>Evaluate Suggested Serving</span>
                  <ArrowRight className="h-3 w-3 text-[#B08D57]" />
                </button>
              </form>

              {suggestedGrams !== null && (
                <div className="mt-6 rounded border border-[#B08D57]/40 bg-[#F6F1E7] p-4 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C6B3A]">
                    Recommended Serving Size:
                  </span>
                  <div className="font-display text-4xl font-light text-[#14110F] mt-1">
                    {suggestedGrams} <span className="text-xl">grams</span>
                  </div>
                  <p className="mt-1 font-serif text-xs text-[#6F665A]">
                    Calculated for zero waste based on metabolic latency.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
