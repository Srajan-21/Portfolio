"use client";

import React from "react";
import { useCollector } from "@/context/CollectorContext";
import { Music, Award, Users, BookOpen } from "lucide-react";

export function Level1Origins() {
  const { unlockSeal } = useCollector();

  return (
    <section
      id="chapter-1"
      className="relative min-h-screen w-full border-b-hairline bg-[#FAF7F2] py-20 px-6 sm:px-12 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* Chapter Header */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b-hairline pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="text-[#8C6B3A] font-semibold">CHAPTER I</span>
            <span>&bull;</span>
            <span>ORIGINS // 2022 &ndash; 2026</span>
          </div>
          <span>BHAGWAN PARSHURAM INSTITUTE OF TECHNOLOGY (BPIT DELHI)</span>
        </div>

        {/* Chapter Title */}
        <div className="mb-14">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
            The Spark &amp; <span className="italic font-serif text-[#6B1E1E]">The Stage</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-lg font-light text-[#6F665A] leading-relaxed">
            November 9, 2022. I entered B.Tech Information Technology with a blank notebook and an electric guitar. The parallel discipline of structured software and live performance began here.
          </p>
        </div>

        {/* Two-Column Editorial Spread */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Matriculation & The Core Spark */}
          <div className="space-y-8 lg:col-span-7">
            <div className="rounded border-hairline bg-[#F6F1E7] p-8 shadow-editorial">
              <div className="flex items-center justify-between border-b-hairline pb-4 font-mono text-[10px] text-[#6F665A]">
                <div className="flex items-center gap-2 font-medium text-[#14110F]">
                  <BookOpen className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span>ENTRY 01 &bull; 09 NOVEMBER 2022</span>
                </div>
                <span>BPIT DELHI // B.TECH IT</span>
              </div>

              <div className="mt-6 font-serif text-base leading-relaxed text-[#14110F]/90 space-y-4">
                <p>
                  Most start engineering by memorizing syntax. For me, the fascination was fundamental:
                  understanding how data flows through registers, network buffers, and memory allocations in the fractions of a second between a keystroke and an execution.
                </p>
                <p>
                  I joined BPIT Delhi on November 9, 2022. From day one, theory alone felt incomplete &mdash;
                  I wrote small procedural programs to test ideas. C++ and memory management shaped my logic by day,
                  while rehearsals with the college music society occupied my evenings.
                </p>
              </div>

              <div className="mt-8 border-t-hairline pt-4 font-serif text-sm italic text-[#8C6B3A]">
                &ldquo;Code and music share an identical geometry: harmony born from strict structural constraints.&rdquo;
              </div>
            </div>
          </div>

          {/* Right Column: Octave Music Society Leadership */}
          <div className="space-y-8 lg:col-span-5">
            <div className="rounded border-hairline bg-[#EDE5D3]/50 p-8 shadow-editorial">
              <div className="flex items-center justify-between border-b-hairline pb-4 font-mono text-[10px] text-[#6F665A]">
                <div className="flex items-center gap-2 font-medium text-[#14110F]">
                  <Music className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span>OCTAVE &bull; BPIT MUSIC SOCIETY</span>
                </div>
                <span>2022 &ndash; 2026</span>
              </div>

              <div className="mt-6 space-y-5 font-mono text-xs">
                <div className="border-l border-[#B08D57] pl-4">
                  <span className="font-semibold text-[#14110F] text-[11px] block">
                    Semester 1: Guitarist
                  </span>
                  <p className="mt-1 font-serif text-xs text-[#6F665A] leading-relaxed">
                    Auditioned and joined as an electric guitarist. Participated in multiple inter-college competitions across Delhi NCR and won several podium finishes.
                  </p>
                </div>

                <div className="border-l border-[#B08D57]/70 pl-4">
                  <span className="font-semibold text-[#14110F] text-[11px] block">
                    Semester 5: Coordinator
                  </span>
                  <p className="mt-1 font-serif text-xs text-[#6F665A] leading-relaxed">
                    Appointed society coordinator, overseeing rehearsal schedules, technical audio arrangements, and university fest logistics.
                  </p>
                </div>

                <div className="border-l border-[#B08D57]/40 pl-4">
                  <span className="font-semibold text-[#14110F] text-[11px] block">
                    Semester 6: President &amp; Head
                  </span>
                  <p className="mt-1 font-serif text-xs text-[#6F665A] leading-relaxed">
                    Elected President and Head of the society, directing 60+ members, leading teams to university competitions, and organizing major events throughout college.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t-hairline pt-4 font-mono text-[10px] text-[#6F665A]">
                <div className="flex items-center gap-1.5">
                  <Users className="h-3 w-3 text-[#B08D57]" />
                  <span>60+ Members Led</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="h-3 w-3 text-[#B08D57]" />
                  <span>Inter-College Laurels</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
