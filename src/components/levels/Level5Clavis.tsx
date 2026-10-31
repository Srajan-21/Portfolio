"use client";

import React, { useState } from "react";
import { useCollector } from "@/context/CollectorContext";
import { Cpu, Zap, Database, FileText, RefreshCw } from "lucide-react";

export function Level5Clavis() {
  const { unlockSeal } = useCollector();
  const [activePlate, setActivePlate] = useState<number>(0);

  // Plate 1: Gateway fallback simulation
  const [gatewayStatus, setGatewayStatus] = useState<"idle" | "dispatching" | "fallback" | "success">("idle");
  const [gatewayLog, setGatewayLog] = useState<string>("Standby. Ready to evaluate multi-key cascade.");

  const handleTestGateway = () => {
    setGatewayStatus("dispatching");
    setGatewayLog("[GATEWAY] Dispatching token request to Primary Key #1 (Gemini Pro)...");

    setTimeout(() => {
      setGatewayStatus("fallback");
      setGatewayLog("[429 QUOTA EXCEEDED] Primary key reached concurrency threshold -> Triggering atomic fallback to Key #2 (Gemini Flash)...");

      setTimeout(() => {
        setGatewayStatus("success");
        setGatewayLog("[200 OK] Secondary key returned valid SSE stream in 184ms. Zero user-perceived interruption.");
        unlockSeal("seal_clavis");
      }, 700);
    }, 600);
  };

  // Plate 2: ATS illustrative example
  const [atsPreset, setAtsPreset] = useState<"standard" | "uncalibrated">("standard");
  const [ariaStep, setAriaStep] = useState<number>(1);

  const technicalPlates = [
    { id: 0, title: "Multi-Key LLM Gateway", label: "FAULT TOLERANCE" },
    { id: 1, title: "Deterministic ATS Engine", label: "<5MS EVALUATION" },
    { id: 2, title: "Concurrent ETL Pipeline", label: "DATA INGESTION" },
    { id: 3, title: "ARIA Semantic Editor", label: "STREAMING SSE & DIFF" },
  ];

  return (
    <section
      id="chapter-5"
      className="relative min-h-screen w-full border-b-hairline bg-[#FAF7F2] py-20 px-6 sm:px-12 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* Chapter Header */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b-hairline pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="text-[#8C6B3A] font-semibold">CHAPTER V</span>
            <span>&bull;</span>
            <span>THE STARTUP MAGNUM OPUS // 2025 &ndash; 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
            <span className="text-[#14110F]">IN DEVELOPMENT &bull; LAUNCHING SOON</span>
          </div>
        </div>

        {/* Chapter Title */}
        <div className="mb-14">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
            CLAVIS <span className="italic font-serif text-[#6B1E1E]">Architecture</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-lg font-light text-[#6F665A] leading-relaxed">
            Co-founded alongside Abhishek Yadav, Swaraj Kumar, Hemant, and Saurabh. I designed, architected, planned, and implemented the core platform &mdash; featuring a sub-5ms Zero-LLM ATS scoring engine and an atomic multi-key AI gateway.
          </p>
        </div>

        {/* Technical Plate Navigation Tabs */}
        <div className="mb-8 flex flex-wrap gap-2 font-mono text-xs">
          {technicalPlates.map((plate) => (
            <button
              key={plate.id}
              onClick={() => setActivePlate(plate.id)}
              className={`flex items-center gap-2 rounded border px-4 py-2 transition-all ${
                activePlate === plate.id
                  ? "border-[#B08D57] bg-[#EDE5D3] font-medium text-[#14110F]"
                  : "border-hairline bg-[#F6F1E7] text-[#6F665A] hover:border-[#B08D57]/50"
              }`}
            >
              <span>{plate.title}</span>
              <span className="text-[9px] uppercase tracking-wider text-[#8C6B3A]">
                {plate.label}
              </span>
            </button>
          ))}
        </div>

        {/* Technical Plate Display Container */}
        <div className="rounded border-hairline bg-[#F6F1E7] p-8 shadow-editorial">
          {/* PLATE 0: MULTI-KEY LLM GATEWAY */}
          {activePlate === 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-hairline pb-4 font-mono text-[10px] text-[#6F665A]">
                <div className="flex items-center gap-2 font-medium text-[#14110F]">
                  <Cpu className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span>SUBSYSTEM PLATE 01 // FAULT-TOLERANT LLM GATEWAY</span>
                </div>
                <span>PACIFIC TIMEZONE RPD/RPM QUOTAS</span>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="font-serif text-sm leading-relaxed text-[#14110F]/90 space-y-4">
                  <p>
                    Commercial LLM endpoints frequently reject high-concurrency requests with HTTP 429 rate limits.
                    To guarantee uninterrupted service, I architected a multi-key gateway:
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-[#6F665A] list-disc list-inside">
                    <li>Atomic concurrency locks preventing thread cross-contamination.</li>
                    <li>Pacific-timezone quota classification tracking RPD and RPM usage windows.</li>
                    <li>4-tier model fallback cascade: Gemini Pro &rarr; Gemini Flash &rarr; Secondary Key &rarr; Stored Cache.</li>
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
                <div className="rounded border-hairline bg-[#14110F] p-4 font-mono text-xs text-[#EDE5D3]">
                  <div className="flex justify-between border-b border-[#EDE5D3]/20 pb-2 text-[10px] text-[#6F665A]">
                    <span>GATEWAY TELEMETRY CONSOLE</span>
                    <span className="text-[#8C6B3A]">DIAGNOSTIC ACTIVE</span>
                  </div>
                  <div className="mt-3 min-h-[90px] leading-relaxed text-[#EDE5D3]/90 text-[11px]">
                    {gatewayLog}
                  </div>
                  <div className="mt-3 flex justify-between border-t border-[#EDE5D3]/20 pt-2 text-[10px]">
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

          {/* PLATE 1: ZERO-LLM ATS ENGINE */}
          {activePlate === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-hairline pb-4 font-mono text-[10px] text-[#6F665A]">
                <div className="flex items-center gap-2 font-medium text-[#14110F]">
                  <Zap className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span>SUBSYSTEM PLATE 02 // ZERO-LLM ATS SCORING ENGINE</span>
                </div>
                <span>SUB-5MS EVALUATION LATENCY</span>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="font-serif text-sm leading-relaxed text-[#14110F]/90 space-y-4">
                  <p>
                    Rather than consuming expensive, high-latency LLM calls for structural resume parsing,
                    I engineered a deterministic TypeScript evaluator across 15 modular packages (3,100+ LOC):
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-[#6F665A] list-disc list-inside">
                    <li>Evaluates 8 weighted pillars deterministically in <strong>&lt;5ms</strong>.</li>
                    <li>Integrated 400-term synonym taxonomy grouping equivalent competencies.</li>
                    <li>Knockout filters for mandatory skills and experience ceilings.</li>
                  </ul>
                  <div className="flex gap-2 pt-2 font-mono text-xs">
                    <button
                      onClick={() => setAtsPreset("standard")}
                      className={`rounded border px-3 py-1.5 ${
                        atsPreset === "standard"
                          ? "border-[#B08D57] bg-[#EDE5D3] text-[#14110F]"
                          : "border-hairline bg-[#FAF7F2] text-[#6F665A]"
                      }`}
                    >
                      Illustrative Example A
                    </button>
                    <button
                      onClick={() => setAtsPreset("uncalibrated")}
                      className={`rounded border px-3 py-1.5 ${
                        atsPreset === "uncalibrated"
                          ? "border-[#B08D57] bg-[#EDE5D3] text-[#14110F]"
                          : "border-hairline bg-[#FAF7F2] text-[#6F665A]"
                      }`}
                    >
                      Illustrative Example B
                    </button>
                  </div>
                </div>

                {/* ATS Evaluation Diagram */}
                <div className="rounded border-hairline bg-[#FAF7F2] p-5 font-mono text-xs">
                  <div className="flex items-center justify-between border-b-hairline pb-3">
                    <span className="text-[#6F665A] text-[10px] uppercase">Evaluation Metric (Illustrative Demo)</span>
                    <span className="font-display text-2xl font-light text-[#8C6B3A]">
                      {atsPreset === "standard" ? "88 / 100" : "52 / 100"}
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      { name: "Technical Competencies", pct: atsPreset === "standard" ? 92 : 55 },
                      { name: "Quantified Impact Metrics", pct: atsPreset === "standard" ? 85 : 40 },
                      { name: "Synonym Taxonomy Match", pct: atsPreset === "standard" ? 90 : 60 },
                      { name: "Structural Knockout Checks", pct: atsPreset === "standard" ? 100 : 70 },
                    ].map((p) => (
                      <div key={p.name}>
                        <div className="flex justify-between pb-1 text-[10px] text-[#6F665A]">
                          <span>{p.name}</span>
                          <span>{p.pct}%</span>
                        </div>
                        <div className="h-[2px] w-full bg-[#EDE5D3]">
                          <div className="h-full bg-[#B08D57]" style={{ width: `${p.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PLATE 2: ETL PIPELINE */}
          {activePlate === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-hairline pb-4 font-mono text-[10px] text-[#6F665A]">
                <div className="flex items-center gap-2 font-medium text-[#14110F]">
                  <Database className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span>SUBSYSTEM PLATE 03 // CONCURRENT JOB ETL PIPELINE</span>
                </div>
                <span>SHA-256 DEDUPLICATION</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs text-center">
                <div className="rounded border-hairline bg-[#FAF7F2] p-4">
                  <span className="block text-[10px] text-[#8C6B3A] uppercase tracking-wider">01. INGEST</span>
                  <span className="mt-1 block text-[#14110F] text-[11px]">4 Job APIs in Parallel</span>
                </div>
                <div className="rounded border-hairline bg-[#FAF7F2] p-4">
                  <span className="block text-[10px] text-[#8C6B3A] uppercase tracking-wider">02. DEDUP</span>
                  <span className="mt-1 block text-[#14110F] text-[11px]">SHA-256 Content Hash</span>
                </div>
                <div className="rounded border-hairline bg-[#FAF7F2] p-4">
                  <span className="block text-[10px] text-[#8C6B3A] uppercase tracking-wider">03. VALIDATE</span>
                  <span className="mt-1 block text-[#14110F] text-[11px]">Zod Strict Schema</span>
                </div>
                <div className="rounded border-hairline bg-[#FAF7F2] p-4">
                  <span className="block text-[10px] text-[#8C6B3A] uppercase tracking-wider">04. INDEX</span>
                  <span className="mt-1 block text-[#14110F] text-[11px]">Turso SQLite FTS5</span>
                </div>
              </div>

              <p className="font-serif text-sm leading-relaxed text-[#6F665A]">
                Automated 15-day stale record pruning paired with trigger-synced full-text search indexes across 5 fields for sub-10ms query execution across isolated Turso database instances.
              </p>
            </div>
          )}

          {/* PLATE 3: ARIA EDITOR */}
          {activePlate === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-hairline pb-4 font-mono text-[10px] text-[#6F665A]">
                <div className="flex items-center gap-2 font-medium text-[#14110F]">
                  <FileText className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span>SUBSYSTEM PLATE 04 // ARIA SEMANTIC EDITOR</span>
                </div>
                <span>STREAMING SSE &bull; LATEX COMPILATION</span>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="font-serif text-sm leading-relaxed text-[#14110F]/90 space-y-4">
                  <p>
                    ARIA tracks live document revisions through semantic diffing and compiles production-ready LaTeX resumes in under 30 seconds.
                  </p>
                  <button
                    onClick={() => setAriaStep((prev) => (prev === 1 ? 2 : 1))}
                    className="rounded border border-[#6F665A]/30 bg-[#EDE5D3] px-4 py-2 font-mono text-xs text-[#14110F] hover:border-[#B08D57] transition-colors"
                  >
                    <span>Toggle Revision Stage ({ariaStep}/2)</span>
                  </button>
                </div>

                <div className="rounded border-hairline bg-[#FAF7F2] p-5 font-mono text-xs">
                  <div className="text-[10px] text-[#6F665A] border-b-hairline pb-2 mb-3">
                    SEMANTIC DIFF COMPARISON
                  </div>
                  {ariaStep === 1 ? (
                    <div className="space-y-2">
                      <div className="rounded border border-[#6B1E1E]/20 bg-[#6B1E1E]/5 p-2.5 text-[#6B1E1E]">
                        &minus; Developed backend endpoints for user registration.
                      </div>
                      <span className="text-[10px] text-[#6F665A]">
                        [Review]: Lacks quantified scale, concurrency parameters, and operational scope.
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="rounded border border-[#B08D57]/30 bg-[#B08D57]/10 p-2.5 text-[#14110F]">
                        + Architected concurrent SSE gateway handling 10,000+ records with 99.9% uptime.
                      </div>
                      <span className="text-[10px] text-[#8C6B3A]">
                        [Verified]: Measurable engineering impact, architectural metrics, and clear ownership.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
