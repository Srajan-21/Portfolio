"use client";

import React, { useState } from "react";
import { useStickerWorld } from "@/context/StickerWorldContext";
import { Award, Users, Clock, Utensils, Sparkles, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";

export function Level4BossFight() {
  const { addStickers, completeQuest, unlockCard, setMascotSpeech } = useStickerWorld();

  // Satiety meal prediction calculator state
  const [hoursAgo, setHoursAgo] = useState<number>(4);
  const [lastMealType, setLastMealType] = useState<"light" | "medium" | "heavy">("medium");
  const [hungerLevel, setHungerLevel] = useState<"mild" | "normal" | "ravenous">("normal");
  const [claimedTrophy, setClaimedTrophy] = useState(false);

  // Pre-plate portion calculation formula
  const baseGrams = 420;
  const hoursFactor = Math.min(250, hoursAgo * 35);
  const mealDeduction = lastMealType === "heavy" ? 140 : lastMealType === "medium" ? 80 : 20;
  const hungerFactor = hungerLevel === "ravenous" ? 120 : hungerLevel === "normal" ? 40 : -40;
  const recommendedPortion = Math.max(250, baseGrams + hoursFactor - mealDeduction + hungerFactor);
  const foodWasteSaved = Math.round(recommendedPortion * 0.32);

  const handleClaimTrophy = () => {
    if (!claimedTrophy) {
      addStickers(4, "nagarro_trophy");
      completeQuest("q_podium");
      unlockCard("card_nagarro");
      setClaimedTrophy(true);
      setMascotSpeech("3rd Place at Nagarro! 24 sleepless hours with Abhishek & Swaraj paid off!", 4500);
    }
  };

  return (
    <section
      id="chapter-4"
      className="relative min-h-screen w-full bg-[#FFF8EC] py-20 px-4 sm:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER STICKER HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#14121A] pb-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="bg-[#FFC93C] text-[#14121A] border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm rotate-[-1deg]">
              CHAPTER 04
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#14121A]/70">
              THE PODIUM • 2024
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#3DDC97] text-[#14121A] border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold shadow-hard-sm">
            <Award className="h-3.5 w-3.5" />
            <span>CRACK-A-CODE 3.0 BY NAGARRO</span>
          </div>
        </div>

        {/* HERO TITLE & INTRO */}
        <div className="mb-14 max-w-4xl">
          <div className="inline-block bg-white border-2 border-[#14121A] px-3 py-1 text-xs font-mono font-bold uppercase shadow-hard-sm mb-4 rotate-[1deg]">
            🥉 3RD PLACE NATIONALLY &bull; 50+ TEAMS &bull; 24-HOUR SPRINT
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#14121A] leading-tight">
            The 24-Hour Crucible: <br />
            <span className="bg-[#FFC93C] px-2 py-0.5 border-3 border-[#14121A] shadow-hard inline-block rotate-[-1deg] text-[#14121A]">
              Podium Finish at Nagarro
            </span>
          </h2>
          <p className="mt-6 font-sans text-lg md:text-xl text-[#14121A]/80 font-medium leading-relaxed max-w-3xl">
            In Nagarro&apos;s national Hackathon Crack-a-Code 3.0, we were tasked with a critical real-world challenge: <strong>Food Waste Management</strong>.
            Competing in a tight-knit team of 3 alongside <strong>Abhishek Yadav</strong> and <strong>Swaraj Kumar</strong>, we engineered a pre-plate meal portion prediction prototype that tackles food waste at the ordering decision point.
          </p>
        </div>

        {/* TEAM MATES SPOTLIGHT CARDS */}
        <div className="mb-14">
          <span className="font-mono text-xs font-bold uppercase text-[#14121A]/70 block mb-4">
            THE TRIO TEAM SQUAD:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border-3 border-[#14121A] bg-white p-4 shadow-hard">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-base font-bold text-[#14121A]">Srajan Srivastava</span>
                <span className="bg-[#FF4D2E] text-white border border-[#14121A] px-2 py-0.5 font-mono text-[9px] font-bold">
                  TECH LEAD
                </span>
              </div>
              <p className="font-sans text-xs text-[#14121A]/70">
                Algorithm design, satiety mathematical model &amp; system architecture.
              </p>
            </div>

            <div className="border-3 border-[#14121A] bg-white p-4 shadow-hard">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-base font-bold text-[#14121A]">Abhishek Yadav</span>
                <span className="bg-[#2F5BFF] text-white border border-[#14121A] px-2 py-0.5 font-mono text-[9px] font-bold">
                  CO-DEVELOPER
                </span>
              </div>
              <p className="font-sans text-xs text-[#14121A]/70">
                Full-stack frontend workflows, UI state machines &amp; rapid prototyping.
              </p>
            </div>

            <div className="border-3 border-[#14121A] bg-white p-4 shadow-hard">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-base font-bold text-[#14121A]">Swaraj Kumar</span>
                <span className="bg-[#3DDC97] text-[#14121A] border border-[#14121A] px-2 py-0.5 font-mono text-[9px] font-bold">
                  CO-DEVELOPER
                </span>
              </div>
              <p className="font-sans text-xs text-[#14121A]/70">
                Backend integrations, data validation pipelines &amp; presentation demo.
              </p>
            </div>
          </div>
        </div>

        {/* INTERACTIVE PRE-PLATE MEAL PORTION SIMULATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* CALCULATOR CONTROLS (7 cols) */}
          <div className="lg:col-span-7 border-4 border-[#14121A] bg-white p-6 sm:p-8 shadow-hard-lg">
            <div className="flex items-center justify-between border-b-2 border-[#14121A]/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-[#FF4D2E]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14121A]">
                  PRE-PLATE PORTION &amp; SATIETY PREDICTOR
                </span>
              </div>
              <span className="font-mono text-[10px] bg-[#FFC93C] border border-[#14121A] px-2 py-0.5 font-bold">
                PROTOTYPE DEMO
              </span>
            </div>

            <div className="space-y-6">
              {/* Question 1: Hours since last meal */}
              <div>
                <label className="font-mono text-xs font-bold uppercase text-[#14121A] block mb-2">
                  1. When did you last eat? ({hoursAgo} hours ago)
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={hoursAgo}
                  onChange={(e) => setHoursAgo(parseInt(e.target.value, 10))}
                  className="w-full accent-[#FF4D2E] h-2 bg-gray-200 border border-[#14121A] cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[10px] text-[#14121A]/60 mt-1">
                  <span>1h (Just snacked)</span>
                  <span>6h (Normal gap)</span>
                  <span>12h (Fasting)</span>
                </div>
              </div>

              {/* Question 2: What did you eat last? */}
              <div>
                <label className="font-mono text-xs font-bold uppercase text-[#14121A] block mb-2">
                  2. What kind of meal was it?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["light", "medium", "heavy"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setLastMealType(type)}
                      className={`py-2 px-3 font-mono text-xs font-bold uppercase border-2 border-[#14121A] transition-all ${
                        lastMealType === type
                          ? "bg-[#2F5BFF] text-white shadow-hard-sm"
                          : "bg-[#FFF8EC] text-[#14121A] hover:bg-white"
                      }`}
                    >
                      {type === "light" ? "🥗 Light Snack" : type === "medium" ? "🥪 Balanced" : "🍛 Heavy Feast"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Current hunger */}
              <div>
                <label className="font-mono text-xs font-bold uppercase text-[#14121A] block mb-2">
                  3. Current hunger sensation?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["mild", "normal", "ravenous"] as const).map((h) => (
                    <button
                      key={h}
                      onClick={() => setHungerLevel(h)}
                      className={`py-2 px-3 font-mono text-xs font-bold uppercase border-2 border-[#14121A] transition-all ${
                        hungerLevel === h
                          ? "bg-[#3DDC97] text-[#14121A] shadow-hard-sm"
                          : "bg-[#FFF8EC] text-[#14121A] hover:bg-white"
                      }`}
                    >
                      {h === "mild" ? "Mild" : h === "normal" ? "Moderate" : "Ravenous"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PREDICTION RESULT CARD (5 cols) */}
          <div className="lg:col-span-5 border-4 border-[#14121A] bg-[#14121A] p-6 sm:p-8 text-white shadow-hard-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-6">
                <span className="font-mono text-xs font-bold text-[#FFC93C] uppercase tracking-wider">
                  OPTIMAL PORTION ENGINE
                </span>
                <span className="font-mono text-[10px] text-white/60">SATISFACTION PREDICTION</span>
              </div>

              <div className="text-center p-6 border-2 border-white/20 bg-white/5 mb-6">
                <span className="font-mono text-xs uppercase text-white/60">RECOMMENDED SERVING SIZE</span>
                <div className="font-display text-5xl font-black text-[#3DDC97] mt-2">
                  {recommendedPortion}g
                </div>
                <div className="mt-3 inline-block rounded bg-[#3DDC97]/20 text-[#3DDC97] px-3 py-1 font-mono text-xs font-bold border border-[#3DDC97]/40">
                  Est. Waste Prevented: ~{foodWasteSaved}g
                </div>
              </div>

              <p className="font-sans text-xs text-white/80 leading-relaxed">
                By prompting users on their metabolic recency before plate ordering, food waste in institutional cafeterias drops by up to <strong>35%</strong>.
              </p>
            </div>

            {/* Claim Trophy Action */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <button
                onClick={handleClaimTrophy}
                className={`w-full btn-press py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#14121A] transition-all flex items-center justify-center gap-2 ${
                  claimedTrophy
                    ? "bg-[#3DDC97] text-[#14121A]"
                    : "bg-[#FFC93C] text-[#14121A] hover:bg-white shadow-hard-sm"
                }`}
              >
                <Award className="h-4 w-4" />
                <span>{claimedTrophy ? "🏆 3RD PLACE TROPHY CLAIMED!" : "CLAIM BRONZE TROPHY (+4 ⭐)"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM MILESTONE BANNER */}
        <div className="border-3 border-[#14121A] bg-[#FFC93C] p-6 shadow-hard flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14121A]/80">
              PODIUM MILESTONE UNLOCKED
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#14121A]">
              Nagarro Crack-a-Code 3.0 &bull; 3rd Place out of 50+ National Engineering Teams
            </h3>
          </div>
          <a
            href="#chapter-5"
            className="btn-press flex items-center gap-2 border-2 border-[#14121A] bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#14121A] shadow-hard-sm shrink-0"
          >
            <span>NEXT: CLAVIS STARTUP</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
