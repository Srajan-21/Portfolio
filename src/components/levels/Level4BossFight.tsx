"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { soundEngine } from "@/lib/sound";
import { useJournal } from "@/context/JournalContext";
import { Trophy, Clock, Users, Zap, ShieldAlert, Award, Sparkles } from "lucide-react";

export function Level4BossFight() {
  const { addXP } = useJournal();
  const [bossHP, setBossHP] = useState<number>(100);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  // Meal prediction calculator state
  const [lastMealTime, setLastMealTime] = useState<number>(4); // hours ago
  const [lastMealType, setLastMealType] = useState<string>("heavy"); // light, medium, heavy
  const [calculatedGrams, setCalculatedGrams] = useState<number | null>(null);

  const handleCalculateMeal = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playStamp();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);

    // Dynamic satiety calculation
    const baseGrams = 420;
    const hoursFactor = Math.min(250, lastMealTime * 35);
    const mealDeduction = lastMealType === "heavy" ? 140 : lastMealType === "medium" ? 80 : 20;
    const recommended = Math.max(250, baseGrams + hoursFactor - mealDeduction);
    setCalculatedGrams(recommended);

    // Damage the Boss
    const nextHP = Math.max(0, bossHP - 35);
    setBossHP(nextHP);

    if (nextHP === 0 && !isVictory) {
      setIsVictory(true);
      addXP(100, "BOSS DEFEATED // 3RD PLACE TROPHY UNLOCKED");
      // Trigger paper confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D9432B", "#C99A3B", "#1B1A17", "#F2EBDD"],
      });
    } else {
      addXP(25, "NUTRITION ENGINE ACCURACY ATTACK");
    }
  };

  const handleInstantVictory = () => {
    if (isVictory) return;
    soundEngine.playStamp();
    setBossHP(0);
    setIsVictory(true);
    addXP(100, "BOSS DEFEATED // 3RD PLACE TROPHY UNLOCKED");
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D9432B", "#C99A3B", "#1B1A17", "#F2EBDD"],
    });
  };

  return (
    <section
      id="level-4"
      className={`relative min-h-screen w-full border-b-2 border-dashed border-[#D3C4A5] bg-[#F2EBDD] py-16 px-4 transition-all duration-300 sm:px-8 md:py-24 dark:border-[#3A3328] dark:bg-[#181512] ${
        isShaking ? "translate-x-1 -translate-y-1" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Level Header */}
        <div className="mb-10 flex flex-wrap items-baseline justify-between border-b border-[#D3C4A5] pb-4 font-mono text-xs uppercase tracking-wider text-[#837B6D] dark:border-[#3A3328] dark:text-[#7E7565]">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#D9432B] px-2 py-0.5 font-bold text-white">
              LEVEL 04
            </span>
            <span>BOSS FIGHT // 24-HOUR ARENA</span>
          </div>
          <div className="flex items-center gap-2 text-[#D9432B] dark:text-[#E55840]">
            <Clock className="h-4 w-4" />
            <span className="font-bold">CRACK-A-CODE 3.0 BY NAGARRO</span>
          </div>
        </div>

        {/* Level Title */}
        <div className="mb-10">
          <h2
            data-text="LEVEL 4: THE 24-HOUR BOSS FIGHT"
            className="riso-title font-display text-3xl font-black uppercase tracking-tight text-[#1B1A17] sm:text-5xl md:text-6xl dark:text-[#EBE3D3]"
          >
            THE 24-HOUR BOSS FIGHT
          </h2>
          <p className="mt-3 max-w-3xl font-serif text-lg italic text-[#4B463E] sm:text-xl dark:text-[#B2A896]">
            &ldquo;50+ engineering teams. A ticking 24-hour clock. We conquered the food waste challenge by building a dynamic nutritional satiety engine.&rdquo;
          </p>
        </div>

        {/* The Boss Battle HUD Card */}
        <div className="mb-10 rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-6 shadow-[6px_6px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[6px_6px_0px_0px_#EBE3D3]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D3C4A5] pb-4 dark:border-[#3A3328]">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#837B6D] dark:text-[#7E7565]">
                BOSS TARGET
              </span>
              <div className="font-display text-xl font-black text-[#1B1A17] sm:text-2xl dark:text-[#EBE3D3]">
                CHALLENGE: NATIONWIDE FOOD WASTE
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="font-bold text-[#D9432B]">BOSS HP:</span>
              <span className="font-black text-lg text-[#1B1A17] dark:text-[#EBE3D3]">
                {bossHP} / 100
              </span>
            </div>
          </div>

          {/* Depleting Health Bar */}
          <div className="my-4 h-5 w-full overflow-hidden rounded border border-[#1B1A17] bg-[#E4D7C2] p-0.5 dark:border-[#EBE3D3] dark:bg-[#181512]">
            <div
              className={`h-full transition-all duration-500 ${
                bossHP > 50
                  ? "bg-[#D9432B]"
                  : bossHP > 20
                  ? "bg-[#C99A3B]"
                  : "bg-[#7A8B6F]"
              }`}
              style={{ width: `${bossHP}%` }}
            />
          </div>

          {/* Victory Trophy Stamp Slam Condition */}
          {isVictory ? (
            <div className="animate-stamp-slam my-6 rounded border-2 border-dashed border-[#C99A3B] bg-[#F2EBDD] p-6 text-center shadow-lg dark:bg-[#181512]">
              <div className="inline-flex items-center justify-center rounded-full bg-[#C99A3B]/20 p-3 text-[#C99A3B]">
                <Trophy className="h-10 w-10" />
              </div>
              <h3 className="mt-3 font-display text-2xl font-black uppercase text-[#1B1A17] sm:text-3xl dark:text-[#EBE3D3]">
                BRONZE TROPHY UNLOCKED &bull; 3RD PLACE
              </h3>
              <p className="mx-auto mt-2 max-w-xl font-serif text-sm italic text-[#4B463E] dark:text-[#B2A896]">
                &ldquo;Out of 50+ universities and engineering teams across India, our dynamic satiety algorithm secured 3rd place at Nagarro Crack-a-Code 3.0.&rdquo;
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between font-mono text-xs text-[#837B6D] dark:text-[#7E7565]">
              <span>Use the calculator below to attack with precision portions!</span>
              <button
                onClick={handleInstantVictory}
                className="text-[#D9432B] underline hover:opacity-80"
              >
                [Force Finisher &rarr;]
              </button>
            </div>
          )}
        </div>

        {/* Two Columns: Team Roster & Interactive Nutrition Machine */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column (6 cols): Hackathon Team & Concept */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-6 shadow-[5px_5px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[5px_5px_0px_0px_#EBE3D3]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D9432B] dark:text-[#E55840]">
                THE TRIO SQUAD // 3 CO-DEVELOPERS
              </span>

              <div className="mt-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between rounded border border-[#D3C4A5] bg-[#F2EBDD] p-3 dark:border-[#3A3328] dark:bg-[#181512]">
                  <div>
                    <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                      01. Srajan Srivastava
                    </span>
                    <p className="text-[11px] text-[#837B6D]">
                      Architecture &bull; Satiety Math &bull; Next.js Implementation
                    </p>
                  </div>
                  <span className="rounded bg-[#D9432B] px-2 py-0.5 font-bold text-white text-[10px]">
                    LEAD
                  </span>
                </div>

                <div className="flex items-center justify-between rounded border border-[#D3C4A5] bg-[#F2EBDD] p-3 dark:border-[#3A3328] dark:bg-[#181512]">
                  <div>
                    <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                      02. Abhishek Yadav
                    </span>
                    <p className="text-[11px] text-[#837B6D]">
                      Co-founder &bull; Full Stack &bull; Backend Logic
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-[#837B6D]">MEMBER</span>
                </div>

                <div className="flex items-center justify-between rounded border border-[#D3C4A5] bg-[#F2EBDD] p-3 dark:border-[#3A3328] dark:bg-[#181512]">
                  <div>
                    <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                      03. Swaraj Kumar
                    </span>
                    <p className="text-[11px] text-[#837B6D]">
                      Co-founder &bull; Frontend Systems &bull; UI Flow
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-[#837B6D]">MEMBER</span>
                </div>
              </div>

              {/* The Core Insight */}
              <div className="mt-5 font-serif text-sm leading-relaxed text-[#1B1A17] dark:text-[#EBE3D3]">
                <p>
                  <strong>The Breakthrough:</strong> Most food waste systems attempt post-waste redistribution.
                  We chose <em>source-level prevention</em>: whenever someone is unable to estimate their appetite,
                  our system asks when they last ate, what they ate, and portion density &mdash; and prescribes the exact portion to order or cook so zero food is left behind.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Interactive Meal Prediction Engine */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-6 shadow-[6px_6px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[6px_6px_0px_0px_#EBE3D3]">
              <div className="flex items-center justify-between border-b border-[#D3C4A5] pb-2 font-mono text-xs dark:border-[#3A3328]">
                <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                  NUTRIPORTION ENGINE // LIVE INTERACTIVE
                </span>
                <span className="text-[#D9432B] font-bold">24H PROTO</span>
              </div>

              <form onSubmit={handleCalculateMeal} className="mt-4 space-y-4">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase text-[#1B1A17] dark:text-[#EBE3D3]">
                    1. When was your last meal? ({lastMealTime} hours ago)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={lastMealTime}
                    onChange={(e) => setLastMealTime(Number(e.target.value))}
                    className="mt-2 w-full accent-[#D9432B]"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-[#837B6D]">
                    <span>1h ago</span>
                    <span>5h ago</span>
                    <span>10h+ ago</span>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase text-[#1B1A17] dark:text-[#EBE3D3]">
                    2. What did you eat last?
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-xs">
                    {[
                      { id: "light", label: "Light Snack / Fruit" },
                      { id: "medium", label: "Standard Meal" },
                      { id: "heavy", label: "Heavy / High Protein" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setLastMealType(m.id)}
                        className={`rounded border p-2 text-center transition-colors ${
                          lastMealType === m.id
                            ? "border-[#D9432B] bg-[#D9432B] text-white font-bold"
                            : "border-[#D3C4A5] bg-[#F2EBDD] text-[#1B1A17] dark:border-[#3A3328] dark:bg-[#181512] dark:text-[#EBE3D3]"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  data-cursor="pointer"
                  className="flex w-full items-center justify-center gap-2 rounded border-2 border-[#1B1A17] bg-[#D9432B] py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#1B1A17] transition-all hover:translate-x-[1px] hover:translate-y-[1px] dark:border-[#EBE3D3] dark:shadow-[3px_3px_0px_0px_#EBE3D3]"
                >
                  <Zap className="h-4 w-4" />
                  <span>Execute Portion Satiety Math &bull; Attack Boss</span>
                </button>
              </form>

              {/* Calculated Result Display */}
              {calculatedGrams !== null && (
                <div className="mt-5 rounded border border-[#7A8B6F] bg-[#7A8B6F]/10 p-4 font-mono dark:bg-[#92A585]/10">
                  <div className="flex items-center justify-between text-xs text-[#7A8B6F] dark:text-[#92A585]">
                    <span className="font-bold">RECOMMENDED OPTIMAL PORTION:</span>
                    <span>ZERO-WASTE PRECISE</span>
                  </div>
                  <div className="mt-1 font-display text-3xl font-black text-[#1B1A17] dark:text-[#EBE3D3]">
                    {calculatedGrams} grams
                  </div>
                  <p className="mt-1 text-[11px] text-[#4B463E] dark:text-[#B2A896]">
                    Calculated based on metabolic latency of {lastMealTime}h and {lastMealType} caloric profile.
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

