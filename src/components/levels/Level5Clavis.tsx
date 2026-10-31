"use client";

import React, { useState } from "react";
import { useStickerWorld } from "@/context/StickerWorldContext";
import { Cpu, Zap, Shield, Database, FileCode, CheckCircle2, ArrowRight, Play, ExternalLink, Terminal, Layers } from "lucide-react";

export function Level5Clavis() {
  const { addStickers, completeQuest, unlockCard, setMascotSpeech } = useStickerWorld();

  const [activePlate, setActivePlate] = useState<"ats" | "gateway" | "turso" | "aria">("ats");
  const [atsScoreSimulated, setAtsScoreSimulated] = useState<number | null>(null);
  const [atsRunning, setAtsRunning] = useState(false);
  const [hasUnlockedClavis, setHasUnlockedClavis] = useState(false);

  // Trigger reward
  const triggerReward = () => {
    if (!hasUnlockedClavis) {
      addStickers(5, "clavis_architecture");
      completeQuest("q_clavis");
      unlockCard("card_clavis");
      unlockCard("card_aria");
      unlockCard("card_gateway");
      unlockCard("card_turso_db");
      setHasUnlockedClavis(true);
      setMascotSpeech("CLAVIS is our startup baby! Sub-5ms deterministic ATS scoring without costly LLM latency!", 4500);
    }
  };

  const runAtsBenchmark = () => {
    setAtsRunning(true);
    triggerReward();
    setTimeout(() => {
      setAtsScoreSimulated(88.4);
      setAtsRunning(false);
    }, 450);
  };

  return (
    <section
      id="chapter-5"
      className="relative min-h-screen w-full bg-[#FFF8EC] py-20 px-4 sm:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER STICKER HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#14121A] pb-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="bg-[#7B4DFF] text-white border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm rotate-[1deg]">
              CHAPTER 05
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#14121A]/70">
              THE MAGNUM OPUS • 2025 &ndash; 2026
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#FFC93C] text-[#14121A] border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold shadow-hard-sm">
            <Zap className="h-3.5 w-3.5" />
            <span>STARTUP CO-FOUNDER &bull; CLAVIS</span>
          </div>
        </div>

        {/* HERO TITLE & INTRO */}
        <div className="mb-14 max-w-4xl">
          <div className="inline-block bg-white border-2 border-[#14121A] px-3 py-1 text-xs font-mono font-bold uppercase shadow-hard-sm mb-4 rotate-[-1deg]">
            🚀 CLAVIS &bull; INTELLIGENT CAREER PLATFORM &amp; ZERO-LLM ATS
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#14121A] leading-tight">
            CLAVIS: Architecture of <br />
            <span className="bg-[#7B4DFF] text-white px-2 py-0.5 border-3 border-[#14121A] shadow-hard inline-block rotate-[1deg]">
              a High-Throughput Startup
            </span>
          </h2>
          <p className="mt-6 font-sans text-lg md:text-xl text-[#14121A]/80 font-medium leading-relaxed max-w-3xl">
            Co-founded alongside <strong>Abhishek Yadav, Swaraj Kumar, Hemant, and Saurabh</strong>.
            I designed, architected, and engineered the core technical implementation of CLAVIS &mdash; from a deterministic <strong>sub-5ms ATS scoring engine</strong> to a <strong>multi-key cascade gateway</strong> and <strong>edge SQLite FTS5 pipelines</strong>.
          </p>
        </div>

        {/* 4 CORE TECHNICAL PLATES SELECTOR */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <button
            onClick={() => {
              setActivePlate("ats");
              triggerReward();
            }}
            className={`p-4 border-3 border-[#14121A] text-left transition-all ${
              activePlate === "ats"
                ? "bg-[#FFC93C] shadow-hard -translate-y-1"
                : "bg-white hover:bg-[#FAF7F2] shadow-hard-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Cpu className="h-5 w-5 text-[#14121A]" />
              <span className="font-mono text-[9px] font-bold border border-[#14121A] px-1.5 py-0.5 bg-white">
                &lt;5ms
              </span>
            </div>
            <div className="font-display text-sm sm:text-base font-black text-[#14121A]">
              Deterministic ATS
            </div>
            <span className="font-mono text-[10px] text-[#14121A]/70">Zero-LLM scoring engine</span>
          </button>

          <button
            onClick={() => {
              setActivePlate("gateway");
              triggerReward();
            }}
            className={`p-4 border-3 border-[#14121A] text-left transition-all ${
              activePlate === "gateway"
                ? "bg-[#FF4D2E] text-white shadow-hard -translate-y-1"
                : "bg-white hover:bg-[#FAF7F2] shadow-hard-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Shield className={`h-5 w-5 ${activePlate === "gateway" ? "text-white" : "text-[#FF4D2E]"}`} />
              <span className="font-mono text-[9px] font-bold border border-[#14121A] px-1.5 py-0.5 bg-white text-[#14121A]">
                CASCADE
              </span>
            </div>
            <div className={`font-display text-sm sm:text-base font-black ${activePlate === "gateway" ? "text-white" : "text-[#14121A]"}`}>
              Multi-Key Gateway
            </div>
            <span className={`font-mono text-[10px] ${activePlate === "gateway" ? "text-white/80" : "text-[#14121A]/70"}`}>
              Mutex locks &amp; zero 429s
            </span>
          </button>

          <button
            onClick={() => {
              setActivePlate("turso");
              triggerReward();
            }}
            className={`p-4 border-3 border-[#14121A] text-left transition-all ${
              activePlate === "turso"
                ? "bg-[#2F5BFF] text-white shadow-hard -translate-y-1"
                : "bg-white hover:bg-[#FAF7F2] shadow-hard-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Database className={`h-5 w-5 ${activePlate === "turso" ? "text-white" : "text-[#2F5BFF]"}`} />
              <span className="font-mono text-[9px] font-bold border border-[#14121A] px-1.5 py-0.5 bg-white text-[#14121A]">
                6 DBs
              </span>
            </div>
            <div className={`font-display text-sm sm:text-base font-black ${activePlate === "turso" ? "text-white" : "text-[#14121A]"}`}>
              Turso LibSQL ETL
            </div>
            <span className={`font-mono text-[10px] ${activePlate === "turso" ? "text-white/80" : "text-[#14121A]/70"}`}>
              SQLite FTS5 Edge Search
            </span>
          </button>

          <button
            onClick={() => {
              setActivePlate("aria");
              triggerReward();
            }}
            className={`p-4 border-3 border-[#14121A] text-left transition-all ${
              activePlate === "aria"
                ? "bg-[#3DDC97] shadow-hard -translate-y-1"
                : "bg-white hover:bg-[#FAF7F2] shadow-hard-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <FileCode className="h-5 w-5 text-[#14121A]" />
              <span className="font-mono text-[9px] font-bold border border-[#14121A] px-1.5 py-0.5 bg-white text-[#14121A]">
                SSE DIFFS
              </span>
            </div>
            <div className="font-display text-sm sm:text-base font-black text-[#14121A]">
              ARIA Resume Editor
            </div>
            <span className="font-mono text-[10px] text-[#14121A]/70">Sub-30s LaTeX stream</span>
          </button>
        </div>

        {/* ACTIVE PLATE DEEP DIVE CONTAINER */}
        <div className="border-4 border-[#14121A] bg-white p-6 sm:p-8 shadow-hard-lg mb-16">
          {/* PLATE 1: ZERO-LLM ATS ENGINE */}
          {activePlate === "ats" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#14121A]/10 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-[#7B4DFF] uppercase tracking-wider">
                    MODULE 01 &bull; 15 SPECIALIZED MODULES &bull; 3,100+ LOC
                  </span>
                  <h3 className="font-display text-2xl font-black text-[#14121A] mt-1">
                    Deterministic Zero-LLM ATS Scoring Engine
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#3DDC97] text-[#14121A] border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold">
                    LATENCY &lt; 5ms
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-4 font-sans text-sm text-[#14121A] leading-relaxed">
                  <p>
                    Most resume tools query expensive LLMs for ATS scoring, taking 4-8 seconds and introducing hallucinated scores. For CLAVIS, I built a <strong>deterministic rule-engine in TypeScript</strong>: 15 distinct AST evaluation modules operating on <strong>8 weighted pillars</strong>.
                  </p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                    <div className="border border-[#14121A] bg-[#FFF8EC] p-2">
                      <span className="font-bold text-[#7B4DFF]">1. Hard Skills Matrix</span>
                      <span className="block text-[10px] text-[#14121A]/70">Exact &amp; synonym mapping</span>
                    </div>
                    <div className="border border-[#14121A] bg-[#FFF8EC] p-2">
                      <span className="font-bold text-[#7B4DFF]">2. Recency Decay</span>
                      <span className="block text-[10px] text-[#14121A]/70">Temporal weighting</span>
                    </div>
                    <div className="border border-[#14121A] bg-[#FFF8EC] p-2">
                      <span className="font-bold text-[#7B4DFF]">3. Quantitative Metric Scope</span>
                      <span className="block text-[10px] text-[#14121A]/70">Action verb + impact %</span>
                    </div>
                    <div className="border border-[#14121A] bg-[#FFF8EC] p-2">
                      <span className="font-bold text-[#7B4DFF]">4. Section Parseability</span>
                      <span className="block text-[10px] text-[#14121A]/70">Standard heading hierarchy</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#14121A]/70">
                    Includes a curated <strong>400-term taxonomy dictionary</strong> that understands aliases across languages, frameworks, and cloud services (e.g. <code>k8s</code> = <code>Kubernetes</code>).
                  </p>
                </div>

                <div className="lg:col-span-5 border-2 border-[#14121A] bg-[#14121A] text-white p-5 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#FFC93C] uppercase">
                      BENCHMARK EVALUATOR
                    </span>
                    <div className="mt-4 p-4 border border-white/20 bg-white/5 text-center">
                      <span className="font-mono text-[10px] text-white/60 uppercase">DETERMINISTIC ATS SCORE</span>
                      <div className="font-display text-4xl font-black text-[#3DDC97] mt-1">
                        {atsRunning ? "SCORING..." : atsScoreSimulated ? `${atsScoreSimulated}/100` : "-- / 100"}
                      </div>
                      <span className="font-mono text-[10px] text-[#3DDC97]">
                        Execution: 3.4ms &bull; 0 LLM tokens
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={runAtsBenchmark}
                    disabled={atsRunning}
                    className="mt-4 btn-press w-full py-2.5 bg-[#FFC93C] text-[#14121A] border-2 border-[#14121A] font-mono text-xs font-bold uppercase flex items-center justify-center gap-2"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span>{atsRunning ? "RUNNING PIPELINE..." : "RUN 5ms ATS BENCHMARK"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PLATE 2: MULTI-KEY CASCADE GATEWAY */}
          {activePlate === "gateway" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#14121A]/10 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-[#FF4D2E] uppercase tracking-wider">
                    MODULE 02 &bull; ZERO-DOWNTIME RESILIENCE
                  </span>
                  <h3 className="font-display text-2xl font-black text-[#14121A] mt-1">
                    Multi-Key Cascade LLM Gateway
                  </h3>
                </div>
                <span className="bg-[#FF4D2E] text-white border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold">
                  ZERO 429 ERRORS
                </span>
              </div>

              <div className="font-sans text-sm text-[#14121A] space-y-4 leading-relaxed">
                <p>
                  To handle peak applicant volume without crashing on third-party API rate limits, I implemented an <strong>active concurrency cascade gateway</strong> with atomic mutex locking per key.
                </p>
                <div className="border-2 border-[#14121A] bg-[#FFF8EC] p-4 font-mono text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#14121A]">
                    <span className="w-2 h-2 rounded-full bg-[#3DDC97]" />
                    <span>KEY ROTATION PIPELINE:</span>
                  </div>
                  <div className="pl-4 space-y-1 text-[#14121A]/80">
                    <div>➔ Primary Key Pool: Gemini 1.5 Pro (Active concurrency mutex lock)</div>
                    <div>➔ Secondary Key Pool: Automatic switch upon RPM/TPM saturation threshold</div>
                    <div>➔ Fallback Tier: High-throughput Flash model cascade</div>
                    <div>➔ Pacific-Timezone Quota Tracker: Reset timestamp reconciliation</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PLATE 3: TURSO LIBSQL EDGE ETL */}
          {activePlate === "turso" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#14121A]/10 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-[#2F5BFF] uppercase tracking-wider">
                    MODULE 03 &bull; DISTRIBUTED STORAGE &bull; 6 ISOLATED INSTANCES
                  </span>
                  <h3 className="font-display text-2xl font-black text-[#14121A] mt-1">
                    Turso LibSQL Polyglot Edge Pipeline
                  </h3>
                </div>
                <span className="bg-[#2F5BFF] text-white border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold">
                  SQLITE FTS5 SEARCH
                </span>
              </div>

              <div className="font-sans text-sm text-[#14121A] space-y-4 leading-relaxed">
                <p>
                  Built to process <strong>10,000+ scraped and normalized job postings</strong> daily. The data layer is distributed across 6 isolated Turso edge databases, featuring <strong>SQLite FTS5 trigger-synced full-text search</strong> across job title, company, requirements, location, and tags.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="border border-[#14121A] bg-[#FFF8EC] p-3 text-center">
                    <span className="text-[10px] text-[#14121A]/60">SEARCH LATENCY</span>
                    <div className="font-bold text-lg text-[#2F5BFF] mt-1">&lt; 8ms</div>
                  </div>
                  <div className="border border-[#14121A] bg-[#FFF8EC] p-3 text-center">
                    <span className="text-[10px] text-[#14121A]/60">ETL RECORDS</span>
                    <div className="font-bold text-lg text-[#3DDC97] mt-1">10,000+</div>
                  </div>
                  <div className="border border-[#14121A] bg-[#FFF8EC] p-3 text-center">
                    <span className="text-[10px] text-[#14121A]/60">REPLICATION</span>
                    <div className="font-bold text-lg text-[#FF4D2E] mt-1">Edge Distributed</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PLATE 4: ARIA STREAMING RESUME EDITOR */}
          {activePlate === "aria" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#14121A]/10 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-[#3DDC97] uppercase tracking-wider">
                    MODULE 04 &bull; SERVER-SENT EVENTS &bull; AUTONOMOUS TOOLS
                  </span>
                  <h3 className="font-display text-2xl font-black text-[#14121A] mt-1">
                    ARIA Autonomous Resume Streaming Editor
                  </h3>
                </div>
                <span className="bg-[#3DDC97] text-[#14121A] border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold">
                  &lt;30s LATEX COMPILE
                </span>
              </div>

              <div className="font-sans text-sm text-[#14121A] space-y-4 leading-relaxed">
                <p>
                  ARIA uses <strong>Server-Sent Events (SSE)</strong> to stream resume suggestions and bullet refactors directly into a live LaTeX AST editor. Powered by 4 function-calling tools:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="border border-[#14121A] bg-[#FFF8EC] p-2.5">
                    <div className="font-bold text-[#14121A]">1. formatValidator()</div>
                    <span className="text-[11px] text-[#14121A]/70">Checks ATS line margins, fonts &amp; glyphs</span>
                  </div>
                  <div className="border border-[#14121A] bg-[#FFF8EC] p-2.5">
                    <div className="font-bold text-[#14121A]">2. verbStrengthener()</div>
                    <span className="text-[11px] text-[#14121A]/70">Replaces passive voice with executive impact</span>
                  </div>
                  <div className="border border-[#14121A] bg-[#FFF8EC] p-2.5">
                    <div className="font-bold text-[#14121A]">3. metricSynthesizer()</div>
                    <span className="text-[11px] text-[#14121A]/70">Extracts quantifiable scope and percentages</span>
                  </div>
                  <div className="border border-[#14121A] bg-[#FFF8EC] p-2.5">
                    <div className="font-bold text-[#14121A]">4. latexCompilerDiff()</div>
                    <span className="text-[11px] text-[#14121A]/70">Compiles PDF diffs in sub-30 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM MILESTONE BANNER */}
        <div className="border-3 border-[#14121A] bg-[#FFC93C] p-6 shadow-hard flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14121A]/80">
              STARTUP MILESTONE UNLOCKED
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#14121A]">
              CLAVIS: High-Throughput Engineering Architected for Production Launch
            </h3>
          </div>
          <a
            href="#chapter-6"
            className="btn-press flex items-center gap-2 border-2 border-[#14121A] bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#14121A] shadow-hard-sm shrink-0"
          >
            <span>NEXT: PRODUCTION AT HUDLE</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
