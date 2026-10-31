"use client";

import React from "react";
import { useCollector } from "@/context/CollectorContext";
import { ArrowDown, Sparkles } from "lucide-react";
import { LineMaskReveal } from "@/components/motion/LineMaskReveal";
import { motion } from "framer-motion";
import { EASINGS } from "@/lib/motion";

export function Level0TitleScreen() {
  const { setActiveChapter, setCursorLabel } = useCollector();

  const handleOpenChapterOne = () => {
    setActiveChapter(1);
    const target = document.getElementById("chapter-1");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="chapter-0"
      className="relative min-h-[96vh] w-full overflow-hidden border-b border-[#6F665A]/20 bg-[#F6F1E7] px-6 py-12 sm:px-12 md:py-20 lg:px-20"
    >
      <div className="mx-auto flex min-h-[82vh] max-w-6xl flex-col justify-between">
        {/* TOP FOLIO HEADER: Hairline ruled archival header */}
        <div className="flex flex-wrap items-baseline justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#8C6B3A]">MONOGRAPH NO. 01</span>
            <span className="text-[#6F665A]/40">&bull;</span>
            <span>EDITION DE LUXE</span>
          </div>

          <span className="hidden md:inline text-[#6F665A]/80">
            A PERSONAL CHRONICLE OF SYSTEMS, ALGORITHMS &amp; SCALE
          </span>

          <div className="flex items-center gap-2 text-[#14110F]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
            <span>NEW DELHI [28.6139° N, 77.2090° E]</span>
          </div>
        </div>

        {/* CENTER MONOGRAPH TITLE PLATE */}
        <div className="my-auto py-10 text-center">
          {/* Chapter & Frontispiece indicator */}
          <div className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6F665A]">
            <span className="text-[#8C6B3A]">FOLIO 000</span>
            <span className="h-[1px] w-8 bg-[#B08D57]/40" />
            <span>THE FRONTISPIECE</span>
          </div>

          {/* Monumental Display Title with Line Mask */}
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.0, ease: EASINGS.editorial, delay: 0.2 }}
                className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-light leading-[0.92] tracking-tight text-[#14110F]"
              >
                Srajan <span className="font-serif italic font-normal text-[#6B1E1E]">Srivastava</span>
              </motion.h1>
            </div>

            <div className="overflow-hidden mt-3">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: EASINGS.editorial, delay: 0.35 }}
                className="font-mono text-xs sm:text-sm uppercase tracking-[0.26em] text-[#8C6B3A]"
              >
                Software Developer &bull; Systems Architect &bull; Engineering Intern
              </motion.p>
            </div>
          </div>

          {/* Thesis Statement */}
          <div className="mx-auto mt-8 max-w-2xl">
            <LineMaskReveal delay={0.45} threshold={0.1}>
              <p className="font-serif text-lg sm:text-xl font-light leading-relaxed text-[#6F665A]">
                The journey from first-year matriculation at BPIT Delhi, through hundreds of algorithmic trials and SIH hackathons, to architecting the CLAVIS startup engines and deploying production telemetry at Hudle.
              </p>
            </LineMaskReveal>
          </div>

          {/* Embossed Antique Gold Foil Medallion */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASINGS.editorial, delay: 0.55 }}
            className="my-10 flex justify-center"
          >
            <div
              onMouseEnter={() => setCursorLabel("INSPECT")}
              onMouseLeave={() => setCursorLabel(null)}
              className="group relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-[#B08D57]/50 bg-gradient-to-b from-[#EDE5D3] to-[#F6F1E7] p-1 shadow-sm transition-all duration-500 hover:border-[#B08D57] hover:shadow-md"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full border border-dashed border-[#B08D57]/40 bg-[#FAF7F2] transition-colors group-hover:bg-[#EDE5D3]/50">
                <span className="font-display text-2xl font-light italic text-[#8C6B3A] tracking-wider">
                  S&thinsp;&bull;&thinsp;S
                </span>
              </div>
              <span className="absolute -bottom-6 font-mono text-[8px] uppercase tracking-[0.22em] text-[#6F665A]/70 opacity-0 transition-opacity group-hover:opacity-100">
                PROVENANCE
              </span>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM METADATA & CHAPTER ENTRANCE */}
        <div className="grid grid-cols-1 items-center gap-6 border-t border-[#6F665A]/20 pt-6 font-mono text-[11px] sm:grid-cols-3">
          {/* Key Milestone 1 */}
          <div className="text-left">
            <span className="block text-[9px] uppercase tracking-[0.22em] text-[#6F665A]/60">
              01 &bull; ACADEMIC FOUNDATION
            </span>
            <span className="font-medium text-[#14110F]">BPIT Delhi &bull; B.Tech IT &bull; 2022&ndash;2026</span>
          </div>

          {/* CTA: Begin Reading */}
          <div className="flex justify-center">
            <button
              onClick={handleOpenChapterOne}
              onMouseEnter={() => setCursorLabel("BEGIN")}
              onMouseLeave={() => setCursorLabel(null)}
              className="group flex items-center gap-3 rounded border border-[#6F665A]/30 bg-[#EDE5D3]/60 px-6 py-3 uppercase tracking-[0.2em] text-[#14110F] transition-all duration-300 hover:border-[#B08D57] hover:bg-[#EDE5D3] shadow-sm"
            >
              <span className="text-[10px] font-semibold">Begin Reading &mdash; Chapter I</span>
              <ArrowDown className="h-3.5 w-3.5 text-[#B08D57] transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          </div>

          {/* Key Milestone 2 */}
          <div className="text-left sm:text-right">
            <span className="block text-[9px] uppercase tracking-[0.22em] text-[#6F665A]/60">
              02 &bull; PRODUCTION RECORD
            </span>
            <span className="font-medium text-[#14110F]">Hudle Engineering &bull; Juspay Webhooks</span>
          </div>
        </div>
      </div>
    </section>
  );
}
