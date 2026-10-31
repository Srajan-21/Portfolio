"use client";

import React, { useState } from "react";
import { useCollector } from "@/context/CollectorContext";
import { Music, Award, Users, BookOpen, Guitar, Code, ChevronRight } from "lucide-react";
import { LineMaskReveal } from "@/components/motion/LineMaskReveal";
import { GoldMedallion } from "@/components/seals/GoldMedallion";

export function Level1Origins() {
  const { unlockSeal, sealsEarned, setCursorLabel } = useCollector();
  const [activeTrack, setActiveTrack] = useState<"parallel" | "code" | "music">("parallel");

  const hasSeal = sealsEarned.includes("seal_origins");

  const handleClaimSeal = () => {
    unlockSeal("seal_origins");
  };

  return (
    <section
      id="chapter-1"
      className="relative min-h-screen w-full border-b border-[#6F665A]/20 bg-[#FAF7F2] py-20 px-6 sm:px-12 md:py-28 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER FOLIO HEADER */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#8C6B3A]">CHAPTER I</span>
            <span className="text-[#6F665A]/40">&bull;</span>
            <span>ORIGINS // 2022 &ndash; 2026</span>
          </div>
          <span>BHAGWAN PARSHURAM INSTITUTE OF TECHNOLOGY (BPIT DELHI)</span>
        </div>

        {/* CHAPTER TITLE & THESIS */}
        <div className="mb-14 max-w-4xl">
          <LineMaskReveal threshold={0.1}>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
              The Spark &amp; <span className="italic font-serif text-[#6B1E1E]">The Stage</span>
            </h2>
          </LineMaskReveal>
          <p className="mt-4 max-w-2xl font-serif text-lg font-light text-[#6F665A] leading-relaxed">
            November 9, 2022. Matriculation day into B.Tech Information Technology.
            Two parallel disciplines began simultaneously: writing systems code in C++ by day, and electric guitar rehearsals with the Octave Music Society by night.
          </p>
        </div>

        {/* TRACK SELECTOR PILL */}
        <div className="mb-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
          <span className="text-[#6F665A]/70 mr-2">DISCIPLINE VIEW:</span>
          {(["parallel", "code", "music"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveTrack(mode)}
              className={`rounded px-3 py-1 transition-all ${
                activeTrack === mode
                  ? "border border-[#B08D57] bg-[#EDE5D3] text-[#14110F] font-semibold"
                  : "border border-[#6F665A]/20 text-[#6F665A] hover:text-[#14110F]"
              }`}
            >
              {mode === "parallel" ? "Dual Trajectory" : mode === "code" ? "Systems Track" : "Music Society Track"}
            </button>
          ))}
        </div>

        {/* PARALLEL DUAL STRAND TIMELINE */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 mb-16">
          {/* TRACK A: SYSTEMS CODE & MATRICULATION */}
          {(activeTrack === "parallel" || activeTrack === "code") && (
            <div className={`space-y-6 ${activeTrack === "parallel" ? "lg:col-span-6" : "lg:col-span-12"}`}>
              <div className="rounded border border-[#6F665A]/20 bg-[#F6F1E7] p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] text-[#6F665A]">
                  <div className="flex items-center gap-2 font-medium text-[#14110F]">
                    <Code className="h-3.5 w-3.5 text-[#B08D57]" />
                    <span>STRAND A &bull; SYSTEMS CODE</span>
                  </div>
                  <span>BPIT DELHI // B.TECH IT</span>
                </div>

                <div className="mt-6 font-serif text-base leading-relaxed text-[#14110F]/90 space-y-4">
                  <p>
                    On November 9, 2022, I walked onto the BPIT campus. Where peers approached programming as an exam requirement, I wanted to comprehend the hidden layer: how instructions translate into machine registers, pointers, and memory buffers.
                  </p>
                  <p>
                    I began with procedural C++ — testing pointer arithmetic, stack allocation, and memory safety manually. This grounded discipline in low-level memory paved the way for distributed systems, backend architectures, and production telemetry later in my journey.
                  </p>
                </div>

                <div className="mt-8 border-t border-[#6F665A]/20 pt-4 font-serif text-sm italic text-[#8C6B3A]">
                  &ldquo;A computer does not execute ideas; it executes instructions. Precision is the only courtesy the machine understands.&rdquo;
                </div>
              </div>

              {/* Archival Artifact Slot */}
              <div className="rounded border border-dashed border-[#6F665A]/30 bg-[#EDE5D3]/30 p-6 text-center">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#6F665A]">
                  [ARCHIVAL DOCUMENT &bull; MATRICULATION ROLL 2022]
                </span>
                <p className="mt-1 font-serif text-xs text-[#6F665A]/80 italic">
                  Bhagwan Parshuram Institute of Technology &bull; Department of Information Technology
                </p>
              </div>
            </div>
          )}

          {/* TRACK B: OCTAVE MUSIC SOCIETY LEADERSHIP */}
          {(activeTrack === "parallel" || activeTrack === "music") && (
            <div className={`space-y-6 ${activeTrack === "parallel" ? "lg:col-span-6" : "lg:col-span-12"}`}>
              <div className="rounded border border-[#6F665A]/20 bg-[#EDE5D3]/60 p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] text-[#6F665A]">
                  <div className="flex items-center gap-2 font-medium text-[#14110F]">
                    <Guitar className="h-3.5 w-3.5 text-[#B08D57]" />
                    <span>STRAND B &bull; OCTAVE MUSIC SOCIETY</span>
                  </div>
                  <span>GUITARIST &rarr; PRESIDENT</span>
                </div>

                <div className="mt-6 space-y-5 font-mono text-xs">
                  {/* Phase 1 */}
                  <div className="border-l-2 border-[#B08D57] pl-4">
                    <span className="font-semibold text-[#14110F] text-[11px] block">
                      Semester 1: Electric Guitarist
                    </span>
                    <p className="mt-1 font-serif text-xs text-[#6F665A] leading-relaxed">
                      Auditioned and earned a guitar seat in Octave, the official music society of BPIT. Rehearsed daily, competed across university festivals, and claimed multiple inter-college accolades.
                    </p>
                  </div>

                  {/* Phase 2 */}
                  <div className="border-l-2 border-[#B08D57]/70 pl-4">
                    <span className="font-semibold text-[#14110F] text-[11px] block">
                      Semester 5: Society Coordinator
                    </span>
                    <p className="mt-1 font-serif text-xs text-[#6F665A] leading-relaxed">
                      Elected society coordinator. Engineered rehearsal logistics, stage audio coordination, sound check schedules, and competition entries across Delhi NCR.
                    </p>
                  </div>

                  {/* Phase 3 */}
                  <div className="border-l-2 border-[#B08D57]/40 pl-4">
                    <span className="font-semibold text-[#14110F] text-[11px] block">
                      Semester 6: President &amp; Head of Society
                    </span>
                    <p className="mt-1 font-serif text-xs text-[#6F665A] leading-relaxed">
                      Appointed President of Octave. Led 60+ musicians, vocalists, and technical crew. Directed all annual fest productions and managed inter-college musical competitions.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-4 text-center">
                  <div className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C6B3A]">
                    <Users className="h-3.5 w-3.5" />
                    <span>60+ SOCIETY MEMBERS MANAGED</span>
                  </div>
                </div>
              </div>

              {/* Archival Photo Slot */}
              <div className="rounded border border-dashed border-[#6F665A]/30 bg-[#FAF7F2] p-6 text-center">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#6F665A]">
                  [ARCHIVAL PHOTOGRAPH &bull; OCTAVE STAGE RECORD]
                </span>
                <p className="mt-1 font-serif text-xs text-[#6F665A]/80 italic">
                  Live performance with Octave &bull; BPIT Annual Cultural Festival
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SEAL INSPECTION & CONFERMENT CARD */}
        <div className="rounded border border-[#B08D57]/40 bg-[#FAF7F2] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <GoldMedallion
              numeral="I"
              title="The Foundation"
              isUnlocked={hasSeal}
              size="lg"
            />
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#8C6B3A]">
                CHAPTER I SEAL &bull; THE FOUNDATION
              </span>
              <h4 className="font-display text-xl font-medium text-[#14110F]">
                {hasSeal ? "Seal Conferred &amp; Inscribed" : "Matriculation Provenance"}
              </h4>
              <p className="font-serif text-xs text-[#6F665A] mt-1">
                Records the simultaneous dedication to algorithmic foundation and Octave executive leadership.
              </p>
            </div>
          </div>

          {!hasSeal ? (
            <button
              onClick={handleClaimSeal}
              onMouseEnter={() => setCursorLabel("CLAIM")}
              onMouseLeave={() => setCursorLabel(null)}
              className="flex items-center gap-2 rounded border border-[#B08D57] bg-[#EDE5D3] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:bg-[#FAF7F2] transition-colors"
            >
              <span>Confer Seal I</span>
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
