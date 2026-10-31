"use client";

import React, { useState } from "react";
import { useCollector } from "@/context/CollectorContext";
import { SEED_SKILLS } from "@/lib/supabase/seed-data";
import { SkillCategory } from "@/types/database";

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
  const { unlockSeal, setCursorLabel } = useCollector();
  const [selectedCategory, setSelectedCategory] = useState<"All" | SkillCategory>("All");

  const filteredSkills =
    selectedCategory === "All"
      ? SEED_SKILLS
      : SEED_SKILLS.filter((s) => s.category === selectedCategory);

  const handleSelectSkill = (skillName: string) => {
    unlockSeal("seal_toolkit");
  };

  return (
    <section
      id="chapter-7"
      className="relative min-h-screen w-full border-b-hairline bg-[#FAF7F2] py-20 px-6 sm:px-12 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* Chapter Header */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b-hairline pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="text-[#8C6B3A] font-semibold">CHAPTER VII</span>
            <span>&bull;</span>
            <span>THE TOOLKIT // CATALOGUE OF COMPETENCIES</span>
          </div>
          <span>25 VERIFIED TECHNICAL CAPABILITIES</span>
        </div>

        {/* Chapter Title */}
        <div className="mb-14">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
            The Technical <span className="italic font-serif text-[#6B1E1E]">Index</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-lg font-light text-[#6F665A] leading-relaxed">
            A museum-grade catalogue of technical proficiencies forged through real production challenges &mdash; from low-level algorithms to distributed cloud pipelines.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-10 flex flex-wrap gap-2 font-mono text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded border px-3.5 py-1.5 transition-all text-[11px] ${
                selectedCategory === cat
                  ? "border-[#B08D57] bg-[#EDE5D3] font-medium text-[#14110F]"
                  : "border-hairline bg-[#F6F1E7] text-[#6F665A] hover:border-[#B08D57]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Museum Catalogue Index Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => handleSelectSkill(skill.name)}
              onMouseEnter={() => setCursorLabel("INSPECT")}
              onMouseLeave={() => setCursorLabel(null)}
              className="group cursor-pointer rounded border-hairline bg-[#F6F1E7] p-5 shadow-editorial transition-all duration-300 hover:border-[#B08D57]/50"
            >
              <div className="flex items-center justify-between border-b-hairline pb-2 font-mono text-[9px] uppercase tracking-wider text-[#6F665A]">
                <span>{skill.category}</span>
                <span className="text-[#8C6B3A] font-medium">{skill.proficiency}% PROFICIENCY</span>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-display text-lg font-light text-[#14110F] group-hover:text-[#6B1E1E] transition-colors">
                  {skill.name}
                </span>
              </div>

              {/* Minimal hairline proficiency gauge */}
              <div className="mt-3 h-[1.5px] w-full bg-[#EDE5D3]">
                <div
                  className="h-full bg-[#B08D57] transition-all duration-500"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>

              {/* Proven in Projects */}
              <div className="mt-3 flex flex-wrap gap-1 font-mono text-[9px] text-[#6F665A]">
                <span className="text-[#6F665A]/60">PROVEN IN:</span>
                {skill.used_in_project_ids.map((p) => (
                  <span key={p} className="text-[#14110F] underline decoration-[#B08D57]/40">
                    #{p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
