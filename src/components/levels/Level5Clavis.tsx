"use client";

import React, { useState } from "react";
import { useCollector } from "@/context/CollectorContext";
import { Cpu, Zap, Database, FileText, RefreshCw, ChevronRight, Terminal, Layers } from "lucide-react";
import { LineMaskReveal } from "@/components/motion/LineMaskReveal";
import { GoldMedallion } from "@/components/seals/GoldMedallion";

export function Level5Clavis() {
  const { unlockSeal, sealsEarned, setCursorLabel } = useCollector();
  const [activePlate, setActivePlate] = useState<number>(0);

  // Plate 0: Multi-Key Gateway simulation
  const [gatewayStatus, setGatewayStatus] = useState<"idle" | "dispatching" | "fallback" | "success">("idle");
  const [gatewayLog, setGatewayLog] = useState<string>("Standby. Gateway telemetry awaiting concurrent load event.");

  const hasSeal = sealsEarned.includes("seal_clavis");

  const handleTestGateway = () => {
    setGatewayStatus("dispatching");
    setGatewayLog("[GATEWAY] Ingesting request batch -> Routing to Primary Key #1 (Gemini 1.5 Pro)...");

    setTimeout(() => {
      setGatewayStatus("fallback");
      setGatewayLog("[429 RATE LIMIT TRIPPED] Atomic concurrency lock engaged -> Pacific quota threshold reached -> Cascade switching to Key #2 (Gemini 1.5 Flash)...");

      setTimeout(() => {
        setGatewayStatus("success");
        setGatewayLog("[200 OK STREAMING] Key #2 returned active SSE stream in 162ms. Exactly 0 dropped frames for end-user.");
        unlockSeal("seal_clavis");
      }, 750);
    }, 650);
  };

  // Plate 1: ATS Scoring Engine Demo
  const [atsPreset, setAtsPreset] = useState<"calibrated" | "uncalibrated">("calibrated");

  // Plate 3: ARIA Semantic Editor Typewriter Diff Step
  const [ariaStep, setAriaStep] = useState<number>(0);

  const ariaDiffSteps = [
    {
      label: "Input Raw Bullet",
      before: "Handled database queries and made them faster for the team.",
      after: "Handled database queries and made them faster for the team.",
      action: "ARIA AST Analysis: Missing quantified metric, passive phrasing.",
    },
    {
      label: "Autonomous Tool Call #2: Metrics Engine",
      before: "Handled database queries and made them faster for the team.",
      after: "Optimized PostgreSQL relational schemas via composite indexing & normalization, reducing query latency by 35% across 10,000+ records.",
      action: "Function Call: Inject verified performance delta & active verb.",
    },
    {
      label: "Autonomous Tool Call #4: LaTeX Compiler",
      before: "Draft LaTeX snippet generated",
      after: "\\resumeItem{Optimized PostgreSQL schemas via composite indexing, reducing latency by 35\\% across 10k+ rows.}",
      action: "Compiled to PDF in 18.4s via pdflatex headless container.",
    },
  ];

  const technicalPlates = [
    { id: 0, title: "Multi-Key LLM Gateway", label: "FAULT TOLERANCE" },
    { id: 1, title: "Zero-LLM ATS Engine", label: "<5MS DETERMINISTIC" },
    { id: 2, title: "Concurrent ETL Pipeline", label: "4 APIS & DEDUP" },
    { id: 3, title: "Polyglot DB & ARIA", label: "TURSO & SSE DIFF" },
  ];

  return (
    <section
      id="chapter-5"
      className="relative min-h-screen w-full border-b border-[#6F665A]/20 bg-[#FAF7F2] py-20 px-6 sm:px-12 md:py-28 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER FOLIO HEADER */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#8C6B3A]">CHAPTER V</span>
            <span className="text-[#6F665A]/40">&bull;</span>
            <span>THE STARTUP MAGNUM OPUS // 2025 &ndash; 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57] animate-pulse" />
            <span className="text-[#14110F] font-semibold">PRODUCTION HARDENING &bull; LAUNCHING SOON</span>
          </div>
        </div>

        {/* CHAPTER TITLE & FOUNDING ARCHITECTURE */}
        <div className="mb-14 max-w-4xl">
          <LineMaskReveal threshold={0.1}>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
              CLAVIS <span className="italic font-serif text-[#6B1E1E]">Architecture</span>
            </h2>
          </LineMaskReveal>
          <p className="mt-4 max-w-3xl font-serif text-lg font-light text-[#6F665A] leading-relaxed">
            Co-founded alongside <strong>Abhishek Yadav</strong>, <strong>Swaraj Kumar</strong>, <strong>Hemant</strong>, and <strong>Saurabh</strong>.
            I designed, architected, planned, and implemented the core engineering machinery: an atomic multi-key AI gateway, a zero-LLM deterministic ATS evaluator operating in &lt;5ms, and concurrent data pipelines.
          </p>
        </div>

        {/* TECHNICAL PLATE NAVIGATION TABS */}
        <div className="mb-8 flex flex-wrap gap-2 font-mono text-xs">
          {technicalPlates.map((plate) => (
            <button
              key={plate.id}
              onClick={() => setActivePlate(plate.id)}
              className={`flex items-center gap-2 rounded border px-4 py-2.5 transition-all ${
                activePlate === plate.id
                  ? "border-[#B08D57] bg-[#EDE5D3] font-medium text-[#14110F] shadow-sm"
                  : "border-[#6F665A]/20 bg-[#F6F1E7] text-[#6F665A] hover:border-[#B08D57]/40"
              }`}
            >
              <span>{plate.title}</span>
              <span className="text-[9px] uppercase tracking-wider text-[#8C6B3A]">
                {plate.label}
              </span>
            </button>
          ))}
        </div>

        {/* TECHNICAL PLATE CONTAINER */}
        <div className="rounded border border-[#6F665A]/20 bg-[#F6F1E7] p-8 sm:p-10 shadow-sm mb-16">
          {/* PLATE 0: MULTI-KEY LLM GATEWAY */}
          {activePlate === 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] text-[#6F665A]">
                <div className="flex items-center gap-2 font-medium text-[#14110F]">
                  <Cpu className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span>SUBSYSTEM PLATE 01 // FAULT-TOLERANT MULTI-KEY GATEWAY</span>
                </div>
                <span>PACIFIC TIMEZONE RPD/RPM QUOTAS</span>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="font-serif text-sm leading-relaxed text-[#14110F]/90 space-y-4">
                  <p>
                    Commercial LLM endpoints frequently reject high-throughput concurrent requests with HTTP 429 rate limits.
                    To guarantee zero user-perceived downtime, I designed an atomic gateway with an automatic model fallback cascade:
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-[#6F665A]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C6B3A] font-semibold">&bull;</span>
                      <span><strong>Atomic Concurrency Locks:</strong> Mutex locks prevent race conditions across parallel threads.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C6B3A] font-semibold">&bull;</span>
                      <span><strong>Pacific Quota Classification:</strong> Synchronized with Google AI Studio daily quotas (resetting at midnight PT).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C6B3A] font-semibold">&bull;</span>
                      <span><strong>4-Tier Fallback Cascade:</strong> Gemini 1.5 Pro &rarr; Gemini 1.5 Flash &rarr; Backup API Key &rarr; Stored Synthesis Cache.</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <button
                      onClick={handleTestGateway}
                      disabled={gatewayStatus === "dispatching" || gatewayStatus === "fallback"}
                      className="flex items-center gap-2 rounded border border-[#6F665A]/30 bg-[#EDE5D3] px-4 py-2 font-mono text-xs text-[#14110F] hover:border-[#B08D57] transition-colors"
                    >
                      <RefreshCw className={`h-3 w-3 ${gatewayStatus === "dispatching" ? "animate-spin text-[#B08D57]" : ""}`} />
                      <span>Simulate Traffic Surge &amp; Fallback</span>
                    </button>
                  </div>
                </div>

                {/* Console Log */}
                <div className="rounded border border-[#6F665A]/20 bg-[#14110F] p-5 font-mono text-xs text-[#EDE5D3]">
                  <div className="flex justify-between border-b border-[#EDE5D3]/20 pb-2 text-[10px] text-[#6F665A]">
                    <span>GATEWAY TELEMETRY CONSOLE</span>
                    <span className="text-[#8C6B3A]">LIVE DIAGNOSTIC</span>
                  </div>
                  <div className="mt-4 min-h-[100px] leading-relaxed text-[#EDE5D3]/90 text-[11px]">
                    {gatewayLog}
                  </div>
                  <div className="mt-4 flex justify-between border-t border-[#EDE5D3]/20 pt-2 text-[10px]">
                    <span className={gatewayStatus === "fallback" ? "text-[#6B1E1E] font-medium" : "text-[#EDE5D3]/60"}>
                      Key #1: {gatewayStatus === "fallback" ? "TRIPPED (429)" : "ONLINE"}
                    </span>
                    <span className={gatewayStatus === "success" ? "text-[#B08D57] font-medium" : "text-[#EDE5D3]/60"}>
                      Key #2: {gatewayStatus === "success" ? "SERVING (200 OK)" : "STANDBY"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PLATE 1: ZERO-LLM ATS SCORING ENGINE */}
          {activePlate === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] text-[#6F665A]">
                <div className="flex items-center gap-2 font-medium text-[#14110F]">
                  <Zap className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span>SUBSYSTEM PLATE 02 // ZERO-LLM ATS SCORING ENGINE</span>
                </div>
                <span>SUB-5MS EVALUATION LATENCY</span>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="font-serif text-sm leading-relaxed text-[#14110F]/90 space-y-4">
                  <p>
                    Rather than relying on non-deterministic, expensive LLM calls for structural resume parsing, I built an algorithmic evaluator across 15 modular TypeScript packages (3,100+ LOC):
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-[#6F665A]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C6B3A] font-semibold">&bull;</span>
                      <span><strong>8 Weighted Pillars:</strong> Quantified impact, structural syntax, seniority calibration, and knockout filters.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C6B3A] font-semibold">&bull;</span>
                      <span><strong>400-Term Synonym Taxonomy:</strong> Normalizes equivalent terms (e.g., K8s = Kubernetes, Postgres = PostgreSQL).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8C6B3A] font-semibold">&bull;</span>
                      <span><strong>Sub-5ms Execution:</strong> In-memory dictionary lookups without external network overhead.</span>
                    </li>
                  </ul>
                  <div className="flex gap-2 pt-2 font-mono text-xs">
                    <button
                      onClick={() => setAtsPreset("calibrated")}
                      className={`rounded border px-3 py-1.5 ${
                        atsPreset === "calibrated"
                          ? "border-[#B08D57] bg-[#EDE5D3] text-[#14110F] font-semibold"
                          : "border-[#6F665A]/20 bg-[#FAF7F2] text-[#6F665A]"
                      }`}
                    >
                      Illustrative Example A (Calibrated)
                    </button>
                    <button
                      onClick={() => setAtsPreset("uncalibrated")}
                      className={`rounded border px-3 py-1.5 ${
                        atsPreset === "uncalibrated"
                          ? "border-[#B08D57] bg-[#EDE5D3] text-[#14110F] font-semibold"
                          : "border-[#6F665A]/20 bg-[#FAF7F2] text-[#6F665A]"
                      }`}
                    >
                      Illustrative Example B (Draft)
                    </button>
                  </div>
                </div>

                {/* ATS Evaluation Diagram */}
                <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-6 font-mono text-xs shadow-inner">
                  <div className="flex items-center justify-between border-b border-[#6F665A]/15 pb-3">
                    <span className="text-[#6F665A] text-[10px] uppercase">Composite ATS Score (Demo)</span>
                    <span className="font-display text-3xl font-light text-[#8C6B3A]">
                      {atsPreset === "calibrated" ? "91 / 100" : "54 / 100"}
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      { name: "Technical Competency Alignment", pct: atsPreset === "calibrated" ? 94 : 58 },
                      { name: "Quantified Impact Metrics", pct: atsPreset === "calibrated" ? 88 : 42 },
                      { name: "Synonym Taxonomy Resolution", pct: atsPreset === "calibrated" ? 92 : 64 },
                      { name: "Structural Knockout Checks", pct: atsPreset === "calibrated" ? 100 : 70 },
                    ].map((p) => (
                      <div key={p.name}>
                        <div className="flex justify-between pb-1 text-[10px] text-[#6F665A]">
                          <span>{p.name}</span>
                          <span>{p.pct}%</span>
                        </div>
                        <div className="h-[2px] w-full bg-[#EDE5D3]">
                          <div
                            className="h-full bg-[#B08D57] transition-all duration-500"
                            style={{ width: `${p.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PLATE 2: CONCURRENT ETL PIPELINE */}
          {activePlate === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] text-[#6F665A]">
                <div className="flex items-center gap-2 font-medium text-[#14110F]">
                  <Database className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span>SUBSYSTEM PLATE 03 // CONCURRENT JOB ETL PIPELINE</span>
                </div>
                <span>SHA-256 DEDUPLICATION</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs text-center">
                <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-4">
                  <span className="block text-[10px] text-[#8C6B3A] uppercase tracking-wider">01. INGEST</span>
                  <span className="mt-1 block text-[#14110F] text-[11px] font-medium">4 Job APIs in Parallel</span>
                  <span className="text-[9px] text-[#6F665A] mt-1 block">Aggregated every 6h</span>
                </div>

                <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-4">
                  <span className="block text-[10px] text-[#8C6B3A] uppercase tracking-wider">02. VALIDATE</span>
                  <span className="mt-1 block text-[#14110F] text-[11px] font-medium">Zod Schema Bounds</span>
                  <span className="text-[9px] text-[#6F665A] mt-1 block">Strict field invariants</span>
                </div>

                <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-4">
                  <span className="block text-[10px] text-[#8C6B3A] uppercase tracking-wider">03. DEDUP</span>
                  <span className="mt-1 block text-[#14110F] text-[11px] font-medium">SHA-256 Hashes</span>
                  <span className="text-[9px] text-[#6F665A] mt-1 block">Collision-free index</span>
                </div>

                <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-4">
                  <span className="block text-[10px] text-[#8C6B3A] uppercase tracking-wider">04. PRUNE</span>
                  <span className="mt-1 block text-[#14110F] text-[11px] font-medium">15-Day Stale Sweep</span>
                  <span className="text-[9px] text-[#6F665A] mt-1 block">Automated DB hygiene</span>
                </div>
              </div>

              <div className="font-serif text-sm leading-relaxed text-[#14110F]/90">
                <p>
                  Aggregating listings across multiple job portals introduces redundant postings and schema drift.
                  The pipeline normalizes unstructured payloads with Zod, validates title-company collisions with SHA-256 fingerprinting, and purges expired listings after 15 days, maintaining 10,000+ active records with zero human intervention.
                </p>
              </div>
            </div>
          )}

          {/* PLATE 3: POLYGLOT DB & ARIA */}
          {activePlate === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] text-[#6F665A]">
                <div className="flex items-center gap-2 font-medium text-[#14110F]">
                  <FileText className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span>SUBSYSTEM PLATE 04 // 6 ISOLATED TURSO DBS &amp; ARIA EDITOR</span>
                </div>
                <span>FTS5 TRIGGER-SYNCED &amp; LATEX &lt;30S</span>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="font-serif text-sm leading-relaxed text-[#14110F]/90 space-y-4">
                  <p>
                    <strong>Polyglot Database Architecture:</strong> 6 isolated Turso (LibSQL) edge databases isolate user data, analytics, job index, and scoring models. SQLite FTS5 with trigger-synced virtual tables delivers full-text search across 5 fields in sub-10ms latency.
                  </p>
                  <p>
                    <strong>ARIA (Autonomous AI Resume Editor):</strong> Operates over streaming Server-Sent Events (SSE). Utilizes 4 function-calling tools to analyze resume bullet points, calculate delta diffs, and compile to print-ready PDF via headless LaTeX in &lt;30 seconds.
                  </p>
                </div>

                {/* Interactive ARIA Diff Tracer */}
                <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-5 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-[#6F665A]/15 pb-2">
                    <span className="text-[10px] text-[#8C6B3A] uppercase tracking-wider font-semibold">
                      ARIA DIFF TRACE // {ariaDiffSteps[ariaStep].label}
                    </span>
                    <button
                      onClick={() => setAriaStep((prev) => (prev + 1) % ariaDiffSteps.length)}
                      className="text-[10px] uppercase text-[#6B1E1E] hover:underline"
                    >
                      Next Step &rarr;
                    </button>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="rounded bg-[#EDE5D3]/50 p-2.5 text-[11px] text-[#14110F]">
                      <span className="text-[9px] uppercase tracking-wider text-[#6F665A] block">Before:</span>
                      <p className="line-through text-[#6F665A]">{ariaDiffSteps[ariaStep].before}</p>
                    </div>

                    <div className="rounded bg-[#B08D57]/10 border border-[#B08D57]/30 p-2.5 text-[11px] text-[#14110F]">
                      <span className="text-[9px] uppercase tracking-wider text-[#8C6B3A] block">After (ARIA Transformed):</span>
                      <p className="text-[#14110F] font-medium">{ariaDiffSteps[ariaStep].after}</p>
                    </div>

                    <div className="pt-2 text-[10px] text-[#6F665A] italic">
                      {ariaDiffSteps[ariaStep].action}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SEAL CONFERMENT CARD */}
        <div className="rounded border border-[#B08D57]/40 bg-[#FAF7F2] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <GoldMedallion
              numeral="V"
              title="The Magnum Opus"
              isUnlocked={hasSeal}
              size="lg"
            />
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#8C6B3A]">
                CHAPTER V SEAL &bull; THE MAGNUM OPUS
              </span>
              <h4 className="font-display text-xl font-medium text-[#14110F]">
                {hasSeal ? "Seal Conferred &amp; Inscribed" : "CLAVIS Startup Architecture"}
              </h4>
              <p className="font-serif text-xs text-[#6F665A] mt-1">
                Conferred upon examining the multi-key gateway, sub-5ms ATS engine, and ARIA LaTeX pipeline.
              </p>
            </div>
          </div>

          {!hasSeal ? (
            <button
              onClick={() => unlockSeal("seal_clavis")}
              onMouseEnter={() => setCursorLabel("CLAIM")}
              onMouseLeave={() => setCursorLabel(null)}
              className="flex items-center gap-2 rounded border border-[#B08D57] bg-[#EDE5D3] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:bg-[#FAF7F2] transition-colors"
            >
              <span>Confer Seal V</span>
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
