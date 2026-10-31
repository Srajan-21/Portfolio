"use client";

import React from "react";
import { useCollector } from "@/context/CollectorContext";
import { ArrowDown, Sparkles } from "lucide-react";

export function Level0TitleScreen() {
  const { setActiveChapter, setCursorLabel } = useCollector();

  const handleOpenArchive = () => {
    setActiveChapter(1);
    document.getElementById("chapter-1")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="chapter-0"
      className="relative min-h-[92vh] w-full overflow-hidden border-b-hairline bg-[#F6F1E7] py-16 px-6 sm:px-12 md:py-28"
    >
      <div className="mx-auto max-w-5xl flex flex-col justify-between min-h-[75vh]">
        {/* Top Archival Header Bar */}
        <div className="flex flex-wrap items-baseline justify-between border-b-hairline pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="text-[#8C6B3A] font-semibold">VOLUME I</span>
            <span>&bull;</span>
            <span>MMXXII &ndash; MMXXVI</span>
          </div>
          <span className="hidden sm:inline">
            FOLIO: SOFTWARE DEVELOPER &bull; ARCHIVAL MONOGRAPH
          </span>
          <div className="flex items-center gap-1.5 text-[#14110F]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
            <span>NEW DELHI [28.6139° N, 77.2090° E]</span>
          </div>
        </div>

        {/* Center Title Plate */}
        <div className="my-auto py-12 text-center">
          {/* Subtle Small-caps Prefix */}
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6F665A]">
            <span>FRONTISPIECE</span>
            <span className="h-[1px] w-6 bg-[#B08D57]/40" />
            <span className="text-[#8C6B3A]">THE COLLECTOR&apos;S EDITION</span>
          </div>

          {/* High-Contrast Large Light Serif Name */}
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-[#14110F] leading-[0.95]">
            Srajan <span className="font-normal italic font-serif text-[#6B1E1E]">Srivastava</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg sm:text-xl font-light text-[#6F665A] leading-relaxed">
            An editorial archive charting the discipline of software engineering &mdash; from day zero at BPIT Delhi, through algorithmic trials, to the CLAVIS startup and production at Hudle.
          </p>

          {/* Delicate Archival Medallion Emblem */}
          <div className="my-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#B08D57]/40 bg-[#EDE5D3]/40 shadow-sm">
              <span className="font-display text-2xl font-light text-[#8C6B3A] italic">
                S&thinsp;&bull;&thinsp;S
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Navigation Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t-hairline pt-6 font-mono text-[11px] text-[#6F665A]">
          <div className="flex items-center gap-6 text-center sm:text-left">
            <div>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-[#6F665A]/70">INSTITUTION</span>
              <span className="font-medium text-[#14110F]">BPIT Delhi &bull; B.Tech IT</span>
            </div>
            <span className="hidden sm:inline text-[#6F665A]/30">/</span>
            <div>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-[#6F665A]/70">PRODUCTION</span>
              <span className="font-medium text-[#14110F]">Hudle Engineering Intern</span>
            </div>
          </div>

          <button
            onClick={handleOpenArchive}
            onMouseEnter={() => setCursorLabel("OPEN")}
            onMouseLeave={() => setCursorLabel(null)}
            className="group flex items-center gap-3 rounded border border-[#6F665A]/30 bg-[#EDE5D3]/60 px-6 py-2.5 uppercase tracking-[0.18em] text-[#14110F] transition-all duration-300 hover:border-[#B08D57] hover:bg-[#EDE5D3]"
          >
            <span className="text-[10px] font-semibold">Enter Chapter I</span>
            <ArrowDown className="h-3.5 w-3.5 text-[#B08D57] transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
