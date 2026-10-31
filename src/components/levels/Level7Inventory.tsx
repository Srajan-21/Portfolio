"use client";

import React, { useState } from "react";
import { useStickerWorld } from "@/context/StickerWorldContext";
import { SEED_SKILLS } from "@/lib/supabase/seed-data";
import { SkillCategory } from "@/types/database";
import { Sparkles, CheckCircle2, ArrowRight, Layers, Terminal } from "lucide-react";

const CATEGORIES: Array<"All" | SkillCategory> = [
  "All",
  "Languages",
  "Backend",
  "Frontend",
  "Databases & Search",
  "Cloud & DevOps",
  "System Design & AI",
  "Core CS",
];

export function Level7Inventory() {
  const { addStickers, setMascotSpeech } = useStickerWorld();
  const [selectedCategory, setSelectedCategory] = useState<"All" | SkillCategory>("All");
  const [equippedSkills, setEquippedSkills] = useState<string[]>([]);

  const filteredSkills =
    selectedCategory === "All"
      ? SEED_SKILLS
      : SEED_SKILLS.filter((s) => s.category === selectedCategory);

  const handleEquipSkill = (name: string, category: string) => {
    if (!equippedSkills.includes(name)) {
      setEquippedSkills((prev) => [...prev, name]);
      addStickers(1, `skill_${name}`);
      setMascotSpeech(`Equipped ${name}! Core capability in my engineering stack!`, 3500);
    }
  };

  return (
    <section
      id="chapter-7"
      className="relative min-h-screen w-full bg-[#FFF8EC] py-20 px-4 sm:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER STICKER HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#14121A] pb-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="bg-[#FF8FB8] text-[#14121A] border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm rotate-[1deg]">
              CHAPTER 07
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#14121A]/70">
              THE TOOLKIT • INVENTORY
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#FFC93C] text-[#14121A] border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold shadow-hard-sm">
            <Layers className="h-3.5 w-3.5" />
            <span>25 PRODUCTION CAPABILITIES</span>
          </div>
        </div>

        {/* HERO TITLE & INTRO */}
        <div className="mb-14 max-w-4xl">
          <div className="inline-block bg-white border-2 border-[#14121A] px-3 py-1 text-xs font-mono font-bold uppercase shadow-hard-sm mb-4 rotate-[-1deg]">
            🛠️ PEEL-OFF STICKER SHEET &bull; TAP TO EQUIP (+1 STICKER EACH)
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#14121A] leading-tight">
            The Engineer&apos;s <br />
            <span className="bg-[#FF8FB8] px-2 py-0.5 border-3 border-[#14121A] shadow-hard inline-block rotate-[1deg] text-[#14121A]">
              Sticker Sheet Toolkit
            </span>
          </h2>
          <p className="mt-6 font-sans text-lg md:text-xl text-[#14121A]/80 font-medium leading-relaxed max-w-3xl">
            Skills are not just bullet points on a resume &mdash; they are battle-tested tools forged through hackathon crunches, low-level algorithmic trials, and live production telemetry at Hudle and CLAVIS.
          </p>
        </div>

        {/* CATEGORY FILTER BUTTONS */}
        <div className="mb-10 flex flex-wrap gap-2 font-mono text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 font-bold uppercase border-2 border-[#14121A] transition-all ${
                selectedCategory === cat
                  ? "bg-[#14121A] text-white shadow-hard-sm -translate-y-0.5"
                  : "bg-white text-[#14121A] hover:bg-[#FAF7F2]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* STICKER SHEET GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {filteredSkills.map((skill) => {
            const isEquipped = equippedSkills.includes(skill.name);

            return (
              <div
                key={skill.id}
                onClick={() => handleEquipSkill(skill.name, skill.category)}
                className={`relative cursor-pointer border-3 border-[#14121A] p-4 transition-all duration-200 select-none ${
                  isEquipped
                    ? "bg-[#3DDC97] shadow-hard-sm translate-y-0.5"
                    : "bg-white shadow-hard hover:-translate-y-1 hover:rotate-1"
                }`}
              >
                <div className="flex items-center justify-between border-b border-[#14121A]/10 pb-2">
                  <span className="font-mono text-[9px] uppercase font-bold text-[#14121A]/60">
                    {skill.category}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.2 border border-[#14121A] ${
                      isEquipped ? "bg-[#14121A] text-white" : "bg-[#FFC93C] text-[#14121A]"
                    }`}
                  >
                    {isEquipped ? "EQUIPPED" : "+1 ⭐"}
                  </span>
                </div>

                <div className="my-3">
                  <h4 className="font-display text-base font-black text-[#14121A]">
                    {skill.name}
                  </h4>
                  <div className="w-full h-2 border border-[#14121A] bg-gray-100 mt-2 overflow-hidden">
                    <div
                      style={{ width: `${skill.proficiency}%` }}
                      className="h-full bg-[#2F5BFF]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-[10px] text-[#14121A]/70">
                  <span>Proficiency: {skill.proficiency}%</span>
                  {skill.used_in_project_ids && skill.used_in_project_ids.length > 0 && (
                    <span className="text-[#FF4D2E] font-bold">
                      {skill.used_in_project_ids[0].toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM MILESTONE BANNER */}
        <div className="border-3 border-[#14121A] bg-[#FFC93C] p-6 shadow-hard flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14121A]/80">
              TOOLKIT COMPLETE
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#14121A]">
              Equipped with Modern Full-Stack, Edge Database &amp; System Telemetry
            </h3>
          </div>
          <a
            href="#chapter-8"
            className="btn-press flex items-center gap-2 border-2 border-[#14121A] bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#14121A] shadow-hard-sm shrink-0"
          >
            <span>NEXT: GUESTBOOK &amp; CONTACT</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
