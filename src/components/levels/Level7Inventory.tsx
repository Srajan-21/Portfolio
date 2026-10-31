"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/sound";
import { useJournal } from "@/context/JournalContext";
import { SEED_SKILLS } from "@/lib/supabase/seed-data";
import { SkillCategory, Skill } from "@/types/database";
import { Backpack, Sparkles, Filter, ExternalLink } from "lucide-react";

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
  const { addXP } = useJournal();
  const [selectedCategory, setSelectedCategory] = useState<"All" | SkillCategory>("All");
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const filteredSkills =
    selectedCategory === "All"
      ? SEED_SKILLS
      : SEED_SKILLS.filter((s) => s.category === selectedCategory);

  const handleFilterClick = (cat: "All" | SkillCategory) => {
    soundEngine.playClick();
    setSelectedCategory(cat);
  };

  const handleCardClick = (skill: Skill) => {
    soundEngine.playStamp();
    addXP(15, `INSPECTED ITEM: [${skill.name.toUpperCase()}]`);
  };

  return (
    <section
      id="level-7"
      className="relative min-h-screen w-full border-b-2 border-dashed border-[#D3C4A5] bg-[#F2EBDD] py-16 px-4 transition-colors duration-300 sm:px-8 md:py-24 dark:border-[#3A3328] dark:bg-[#181512]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Level Header */}
        <div className="mb-10 flex flex-wrap items-baseline justify-between border-b border-[#D3C4A5] pb-4 font-mono text-xs uppercase tracking-wider text-[#837B6D] dark:border-[#3A3328] dark:text-[#7E7565]">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#D9432B] px-2 py-0.5 font-bold text-white">
              LEVEL 07
            </span>
            <span>PLAYER SATCHEL // COLLECTED WEAPONS &amp; ARTIFACTS</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
            <Backpack className="h-4 w-4 text-[#D9432B]" />
            <span>25 ARTIFACTS IN INVENTORY</span>
          </div>
        </div>

        {/* Level Title */}
        <div className="mb-10">
          <h2
            data-text="LEVEL 7: THE PLAYER'S INVENTORY"
            className="riso-title font-display text-3xl font-black uppercase tracking-tight text-[#1B1A17] sm:text-5xl md:text-6xl dark:text-[#EBE3D3]"
          >
            THE PLAYER&apos;S INVENTORY
          </h2>
          <p className="mt-3 max-w-3xl font-serif text-lg italic text-[#4B463E] sm:text-xl dark:text-[#B2A896]">
            &ldquo;Every skill here was forged in the fire of real code &mdash; not tutorial hell. Hover over any artifact to trace its battlefield application.&rdquo;
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-8 flex flex-wrap gap-2 font-mono text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`rounded border px-3 py-1.5 transition-all ${
                selectedCategory === cat
                  ? "border-[#1B1A17] bg-[#D9432B] font-bold text-white shadow-[2px_2px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:shadow-[2px_2px_0px_0px_#EBE3D3]"
                  : "border-[#D3C4A5] bg-[#FBF8F1] text-[#1B1A17] hover:border-[#D9432B] dark:border-[#3A3328] dark:bg-[#24201A] dark:text-[#EBE3D3]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Collectible 3D Tilt Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => handleCardClick(skill)}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              data-cursor="pointer"
              className="group relative cursor-pointer rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-4 shadow-[4px_4px_0px_0px_#1B1A17] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[4px_4px_0px_0px_#EBE3D3] dark:hover:shadow-[6px_6px_0px_0px_#EBE3D3]"
            >
              {/* Category Subtitle */}
              <div className="flex items-center justify-between border-b border-[#D3C4A5] pb-2 font-mono text-[10px] uppercase text-[#837B6D] dark:border-[#3A3328] dark:text-[#7E7565]">
                <span>{skill.category}</span>
                <span className="font-bold text-[#D9432B] dark:text-[#E55840]">
                  {skill.proficiency}% PROFICIENCY
                </span>
              </div>

              {/* Skill Name */}
              <div className="mt-3 font-display text-base font-bold text-[#1B1A17] group-hover:text-[#D9432B] dark:text-[#EBE3D3] dark:group-hover:text-[#E55840]">
                {skill.name}
              </div>

              {/* Progress bar */}
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded bg-[#D3C4A5]/40 dark:bg-[#3A3328]">
                <div
                  className="h-full bg-[#1B1A17] transition-all group-hover:bg-[#D9432B] dark:bg-[#EBE3D3] dark:group-hover:bg-[#E55840]"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>

              {/* Where Used Badge */}
              <div className="mt-3 border-t border-dashed border-[#D3C4A5] pt-2 font-mono text-[11px] text-[#4B463E] dark:border-[#3A3328] dark:text-[#B2A896]">
                <span className="text-[10px] font-bold text-[#837B6D] uppercase">
                  Used in:
                </span>{" "}
                {skill.used_in_project_ids.map((proj) => (
                  <span
                    key={proj}
                    className="mr-1 inline-block rounded bg-[#E4D7C2]/60 px-1.5 py-0.5 text-[10px] text-[#1B1A17] dark:bg-[#181512] dark:text-[#EBE3D3]"
                  >
                    #{proj}
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
