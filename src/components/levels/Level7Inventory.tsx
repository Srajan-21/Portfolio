"use client";

import React, { useState } from "react";
import { useCollector } from "@/context/CollectorContext";
import { SEED_SKILLS } from "@/lib/supabase/seed-data";
import { SkillCategory } from "@/types/database";
import { LineMaskReveal } from "@/components/motion/LineMaskReveal";
import { GoldMedallion } from "@/components/seals/GoldMedallion";
import { ChevronRight, Search } from "lucide-react";

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
  const { unlockSeal, sealsEarned, setCursorLabel } = useCollector();
  const [selectedCategory, setSelectedCategory] = useState<"All" | SkillCategory>("All");
  const [activeSkillName, setActiveSkillName] = useState<string | null>(null);

  const hasSeal = sealsEarned.includes("seal_toolkit");

  const filteredSkills =
    selectedCategory === "All"
      ? SEED_SKILLS
      : SEED_SKILLS.filter((s) => s.category === selectedCategory);

  const handleInspectSkill = (name: string) => {
    setActiveSkillName(name);
    unlockSeal("seal_toolkit");
  };

  return (
    <section
      id="chapter-7"
      className="relative min-h-screen w-full border-b border-[#6F665A]/20 bg-[#FAF7F2] py-20 px-6 sm:px-12 md:py-28 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER FOLIO HEADER */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#8C6B3A]">CHAPTER VII</span>
            <span className="text-[#6F665A]/40">&bull;</span>
            <span>THE TOOLKIT // CATALOGUE OF COMPETENCIES</span>
          </div>
          <span>25 VERIFIED PRODUCTION CAPABILITIES</span>
        </div>

        {/* CHAPTER TITLE & THESIS */}
        <div className="mb-14 max-w-4xl">
          <LineMaskReveal threshold={0.1}>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
              The Technical <span className="italic font-serif text-[#6B1E1E]">Index</span>
            </h2>
          </LineMaskReveal>
          <p className="mt-4 max-w-3xl font-serif text-lg font-light text-[#6F665A] leading-relaxed">
            A restrained, museum-catalogue inventory of engineering disciplines forged through academic trials, hackathon sprints, and live corporate production at Hudle.
          </p>
        </div>

        {/* CATEGORY FILTER STRIP */}
        <div className="mb-10 flex flex-wrap gap-2 font-mono text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded border px-4 py-2 transition-all text-[11px] ${
                selectedCategory === cat
                  ? "border-[#B08D57] bg-[#EDE5D3] font-medium text-[#14110F] shadow-sm"
                  : "border-[#6F665A]/20 bg-[#F6F1E7] text-[#6F665A] hover:border-[#B08D57]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MUSEUM CATALOGUE SPECIFICATION GRID (Restrained, No 3D Tilt) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSkills.map((skill) => {
            const isInspected = activeSkillName === skill.name;
            return (
              <div
                key={skill.id}
                onClick={() => handleInspectSkill(skill.name)}
                onMouseEnter={() => setCursorLabel("INSPECT")}
                onMouseLeave={() => setCursorLabel(null)}
                className={`group cursor-pointer rounded border p-6 transition-all duration-300 ${
                  isInspected
                    ? "border-[#B08D57] bg-[#EDE5D3]/60 shadow-md ring-1 ring-[#B08D57]/30"
                    : "border-[#6F665A]/20 bg-[#F6F1E7] hover:border-[#B08D57]/50 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between border-b border-[#6F665A]/15 pb-2.5 font-mono text-[9px] uppercase tracking-wider text-[#6F665A]">
                  <span>{skill.category}</span>
                  <span className="text-[#8C6B3A] font-semibold">{skill.proficiency}% PROFICIENCY</span>
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <span className="font-display text-xl font-light text-[#14110F] group-hover:text-[#6B1E1E] transition-colors">
                    {skill.name}
                  </span>
                </div>

                {/* Minimal Hairline Proficiency Rule */}
                <div className="mt-4 h-[1.5px] w-full bg-[#EDE5D3]">
                  <div
                    className="h-full bg-gradient-to-r from-[#8C6B3A] to-[#B08D57] transition-all duration-500"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>

                <div className="mt-3 flex justify-between font-mono text-[10px] text-[#6F665A]/70">
                  <span>INDEXED DISCIPLINE</span>
                  <span className="group-hover:text-[#14110F] transition-colors">Click to Inspect &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* SEAL CONFERMENT CARD */}
        <div className="rounded border border-[#B08D57]/40 bg-[#FAF7F2] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <GoldMedallion
              numeral="VII"
              title="The Index"
              isUnlocked={hasSeal}
              size="lg"
            />
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#8C6B3A]">
                CHAPTER VII SEAL &bull; THE INDEX
              </span>
              <h4 className="font-display text-xl font-medium text-[#14110F]">
                {hasSeal ? "Seal Conferred &amp; Inscribed" : "The Technical Index"}
              </h4>
              <p className="font-serif text-xs text-[#6F665A] mt-1">
                Conferred upon exploring the museum catalogue of verified technical capabilities.
              </p>
            </div>
          </div>

          {!hasSeal ? (
            <button
              onClick={() => unlockSeal("seal_toolkit")}
              onMouseEnter={() => setCursorLabel("CLAIM")}
              onMouseLeave={() => setCursorLabel(null)}
              className="flex items-center gap-2 rounded border border-[#B08D57] bg-[#EDE5D3] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:bg-[#FAF7F2] transition-colors"
            >
              <span>Confer Seal VII</span>
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
