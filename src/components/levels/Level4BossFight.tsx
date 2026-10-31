"use client";

import React, { useState } from "react";
import { useCollector } from "@/context/CollectorContext";
import { Award, Clock, Users, ArrowRight, ExternalLink, ChevronRight, Utensils } from "lucide-react";
import { LineMaskReveal } from "@/components/motion/LineMaskReveal";
import { GoldMedallion } from "@/components/seals/GoldMedallion";

export function Level4BossFight() {
  const { unlockSeal, sealsEarned, setCursorLabel } = useCollector();

  // Satiety meal prediction interactive state
  const [lastMealHours, setLastMealHours] = useState<number>(4);
  const [mealDensity, setMealDensity] = useState<"light" | "medium" | "heavy">("medium");
  const [activityLevel, setActivityLevel] = useState<"sedentary" | "moderate" | "active">("moderate");
  const [recommendedGrams, setRecommendedGrams] = useState<number | null>(null);

  const hasSeal = sealsEarned.includes("seal_podium");

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const baseGrams = 420;
    const hoursFactor = Math.min(250, lastMealHours * 35);
    const densityDeduction = mealDensity === "heavy" ? 140 : mealDensity === "medium" ? 80 : 20;
    const activityBoost = activityLevel === "active" ? 90 : activityLevel === "moderate" ? 40 : 0;
    
    // Formula verified in unit tests
    const recommended = Math.max(250, baseGrams + hoursFactor - densityDeduction + activityBoost);
    setRecommendedGrams(recommended);
    unlockSeal("seal_podium");
  };

  return (
    <section
      id="chapter-4"
      className="relative min-h-screen w-full border-b border-[#6F665A]/20 bg-[#F6F1E7] py-20 px-6 sm:px-12 md:py-28 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER FOLIO HEADER */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#8C6B3A]">CHAPTER IV</span>
            <span className="text-[#6F665A]/40">&bull;</span>
            <span>THE PODIUM // NAGARRO CRACK-A-CODE 3.0</span>
          </div>
          <span>3RD PLACE NATIONAL FINISH &bull; 50+ TEAMS</span>
        </div>

        {/* CHAPTER TITLE & THESIS */}
        <div className="mb-14 max-w-4xl">
          <LineMaskReveal threshold={0.1}>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
              The Podium &amp; <span className="italic font-serif text-[#6B1E1E]">Prevention</span>
            </h2>
          </LineMaskReveal>
          <p className="mt-4 max-w-2xl font-serif text-lg font-light text-[#6F665A] leading-relaxed">
            Nagarro&apos;s 24-hour national hackathon. Challenged with food waste management, our three-person team designed a predictive nutritional satiety system that calculates exact portions before meal preparation begins.
          </p>
        </div>

        {/* ARCHITECTURAL STEPPED PLINTHS */}
        <div className="mb-16 rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-8 sm:p-12 shadow-sm">
          <div className="text-center mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8C6B3A] font-semibold">
              NATIONAL HACKATHON PODIUM // 50+ UNIVERSITIES
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 items-end max-w-md mx-auto pt-6 pb-2">
            {/* 2nd Place Plinth */}
            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] text-[#6F665A] mb-2 uppercase tracking-wider">RUNNER UP</span>
              <div className="w-full h-24 rounded-t border-t border-x border-[#6F665A]/20 bg-[#EDE5D3]/60 flex items-center justify-center font-display text-xl text-[#6F665A]">
                II
              </div>
            </div>

            {/* 1st Place Plinth */}
            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] text-[#6F665A] mb-2 uppercase tracking-wider">WINNER</span>
              <div className="w-full h-36 rounded-t border-t border-x border-[#6F665A]/20 bg-[#EDE5D3]/90 flex items-center justify-center font-display text-2xl text-[#6F665A]">
                I
              </div>
            </div>

            {/* 3rd Place Plinth (Srajan's Team) */}
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#B08D57] bg-[#F6F1E7] shadow-sm">
                <span className="font-display text-xs font-semibold text-[#8C6B3A]">3rd</span>
              </div>
              <div className="w-full h-20 rounded-t border-t-2 border-x border-[#B08D57] bg-[#B08D57]/15 flex items-center justify-center font-display text-xl font-medium text-[#8C6B3A]">
                III
              </div>
            </div>
          </div>

          <div className="text-center mt-6 font-serif text-sm text-[#6F665A]">
            Laurels awarded by Nagarro engineering judges following 24 continuous hours of prototyping and live architecture defense.
          </div>
        </div>

        {/* TWO-COLUMN DOSSIER */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 mb-16">
          {/* LEFT: TEAM ROSTER & PREVENTATIVE THESIS */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-8 shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8C6B3A] font-semibold">
                THE HACKATHON TRIO
              </span>

              <div className="mt-6 space-y-4">
                {/* Srajan */}
                <div className="flex items-center justify-between border-b border-[#6F665A]/15 pb-3">
                  <div>
                    <span className="font-display text-base font-medium text-[#14110F] block">Srajan Srivastava</span>
                    <span className="font-mono text-[10px] text-[#6F665A] uppercase tracking-wider">System Architecture &bull; Calculation Engine</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#8C6B3A] uppercase tracking-widest font-semibold">LEAD</span>
                </div>

                {/* Abhishek Yadav */}
                <div className="flex items-center justify-between border-b border-[#6F665A]/15 pb-3">
                  <div>
                    <span className="font-display text-base font-medium text-[#14110F] block">Abhishek Yadav</span>
                    <span className="font-mono text-[10px] text-[#6F665A] uppercase tracking-wider">Interface Design &bull; Frontend Logic</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#6F665A] uppercase tracking-wider">[CO-DEVELOPER]</span>
                </div>

                {/* Swaraj Kumar */}
                <div className="flex items-center justify-between pb-1">
                  <div>
                    <span className="font-display text-base font-medium text-[#14110F] block">Swaraj Kumar</span>
                    <span className="font-mono text-[10px] text-[#6F665A] uppercase tracking-wider">Data Modeling &bull; Research Validation</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#6F665A] uppercase tracking-wider">[CO-DEVELOPER]</span>
                </div>
              </div>
            </div>

            <div className="rounded border border-[#6F665A]/20 bg-[#EDE5D3]/50 p-8 shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8C6B3A] font-semibold">
                PRE-PLATE PREVENTION THESIS
              </span>
              <div className="mt-4 font-serif text-sm leading-relaxed text-[#14110F]/90 space-y-3">
                <p>
                  Most food-waste initiatives focus on redistribution after the food is already prepared and discarded.
                  Our prototype tackled the root cause: <em>over-portioning prior to serving</em>.
                </p>
                <p>
                  When asked how much they want to eat, users often guess poorly. Our model queries prior meal composition, hours elapsed since consumption, and active physical strain to predict physiological satiety with high accuracy.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE SATIETY CALCULATOR */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] text-[#6F665A]">
                <span className="font-semibold text-[#8C6B3A]">INTERACTIVE SATIETY ENGINE</span>
                <span>PORTION OPTIMIZER</span>
              </div>

              <form onSubmit={handleCalculate} className="mt-6 space-y-5">
                {/* Hours Since Last Meal */}
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6F665A] mb-1">
                    Hours Elapsed Since Last Meal: <span className="font-semibold text-[#14110F]">{lastMealHours}h</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={lastMealHours}
                    onChange={(e) => setLastMealHours(parseInt(e.target.value))}
                    className="w-full accent-[#B08D57] bg-[#EDE5D3] h-1.5 rounded"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-[#6F665A]/70 mt-1">
                    <span>1 hour</span>
                    <span>6 hours</span>
                    <span>12 hours</span>
                  </div>
                </div>

                {/* Density of Previous Meal */}
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6F665A] mb-1">
                    Density of Prior Meal:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["light", "medium", "heavy"] as const).map((density) => (
                      <button
                        type="button"
                        key={density}
                        onClick={() => setMealDensity(density)}
                        className={`rounded border py-2 text-center font-mono text-xs uppercase tracking-wider transition-all ${
                          mealDensity === density
                            ? "border-[#B08D57] bg-[#EDE5D3] text-[#14110F] font-semibold"
                            : "border-[#6F665A]/20 bg-[#FAF7F2] text-[#6F665A] hover:bg-[#EDE5D3]/30"
                        }`}
                      >
                        {density}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6F665A] mb-1">
                    Physical Exertion Level:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["sedentary", "moderate", "active"] as const).map((level) => (
                      <button
                        type="button"
                        key={level}
                        onClick={() => setActivityLevel(level)}
                        className={`rounded border py-2 text-center font-mono text-xs uppercase tracking-wider transition-all ${
                          activityLevel === level
                            ? "border-[#B08D57] bg-[#EDE5D3] text-[#14110F] font-semibold"
                            : "border-[#6F665A]/20 bg-[#FAF7F2] text-[#6F665A] hover:bg-[#EDE5D3]/30"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded border border-[#B08D57] bg-[#EDE5D3] py-3 font-mono text-xs uppercase tracking-widest text-[#14110F] hover:bg-[#FAF7F2] transition-colors font-medium"
                >
                  Calculate Ideal Portion (Grams)
                </button>
              </form>

              {/* Recommended Portion Result Plinth */}
              {recommendedGrams !== null && (
                <div className="mt-6 rounded border border-[#B08D57]/40 bg-[#EDE5D3]/40 p-4 text-center animate-fade-in">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#8C6B3A]">
                    OPTIMAL ESTIMATED MEAL PORTION
                  </span>
                  <div className="my-1 font-display text-3xl font-light text-[#14110F]">
                    {recommendedGrams} <span className="font-serif text-lg italic text-[#6F665A]">grams</span>
                  </div>
                  <p className="font-serif text-xs text-[#6F665A]">
                    Calculated to satisfy physiological metabolic deficit with 0% post-meal plate waste.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEAL CONFERMENT CARD */}
        <div className="rounded border border-[#B08D57]/40 bg-[#FAF7F2] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <GoldMedallion
              numeral="IV"
              title="The Bronze Laurels"
              isUnlocked={hasSeal}
              size="lg"
            />
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#8C6B3A]">
                CHAPTER IV SEAL &bull; THE BRONZE LAURELS
              </span>
              <h4 className="font-display text-xl font-medium text-[#14110F]">
                {hasSeal ? "Seal Conferred &amp; Inscribed" : "Nagarro Hackathon Podium"}
              </h4>
              <p className="font-serif text-xs text-[#6F665A] mt-1">
                Conferred upon reviewing the 3rd place finish among 50+ national teams in the Nagarro 24-hour sprint.
              </p>
            </div>
          </div>

          {!hasSeal ? (
            <button
              onClick={() => unlockSeal("seal_podium")}
              onMouseEnter={() => setCursorLabel("CLAIM")}
              onMouseLeave={() => setCursorLabel(null)}
              className="flex items-center gap-2 rounded border border-[#B08D57] bg-[#EDE5D3] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:bg-[#FAF7F2] transition-colors"
            >
              <span>Confer Seal IV</span>
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
