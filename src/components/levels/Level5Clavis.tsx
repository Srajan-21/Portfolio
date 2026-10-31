"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/sound";
import { useJournal } from "@/context/JournalContext";
import { Cpu, Zap, Database, FileText, ArrowRight, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";

export function Level5Clavis() {
  const { addXP } = useJournal();
  const [activeSubsystem, setActiveSubsystem] = useState<number>(0);

  // Machine 1: LLM Gateway state
  const [gatewayStatus, setGatewayStatus] = useState<"idle" | "dispatching" | "fallback" | "success">("idle");
  const [gatewayLog, setGatewayLog] = useState<string>("Ready to dispatch token stream.");

  const handleTestGateway = () => {
    soundEngine.playClick();
    setGatewayStatus("dispatching");
    setGatewayLog("[GATEWAY] Dispatching request to Key #1 (Primary Gemini Pro)...");

    setTimeout(() => {
      setGatewayStatus("fallback");
      setGatewayLog("[GATEWAY 429] Key #1 hit Pacific RPD quota limit! Concurrency lock triggered -> Tripping fallback to Key #2 (Gemini Flash)...");
      soundEngine.playPenScratch();

      setTimeout(() => {
        setGatewayStatus("success");
        setGatewayLog("[GATEWAY 200 OK] Key #2 returned 200 SSE stream in 184ms! Fallback cascade executed without user interruption.");
        soundEngine.playStamp();
        addXP(40, "LLM GATEWAY FALLBACK TESTED");
      }, 700);
    }, 600);
  };

  // Machine 2: ATS Engine state
  const [atsScore, setAtsScore] = useState<number>(88);
  const [atsPreset, setAtsPreset] = useState<"strong" | "weak">("strong");

  const handleSelectPreset = (preset: "strong" | "weak") => {
    soundEngine.playClick();
    setAtsPreset(preset);
    if (preset === "strong") {
      setAtsScore(92);
      addXP(20, "STRONG ATS PROFILE SCANNED");
    } else {
      setAtsScore(46);
    }
  };

  // Machine 4: ARIA Typewriter Diff state
  const [ariaStep, setAriaStep] = useState<number>(1);
  const handleAriaToggle = () => {
    soundEngine.playClick();
    setAriaStep((prev) => (prev === 1 ? 2 : 1));
    addXP(20, "ARIA DIFF TRANSFORMED");
  };

  const subsystems = [
    { id: 0, title: "Multi-Key LLM Gateway", tag: "FAULT TOLERANCE" },
    { id: 1, title: "Zero-LLM ATS Engine", tag: "<5MS SCORING" },
    { id: 2, title: "Concurrent ETL Pipeline", tag: "10,000+ JOBS" },
    { id: 3, title: "ARIA Autonomous Editor", tag: "STREAMING SSE & DIFF" },
  ];

  return (
    <section
      id="level-5"
      className="relative min-h-screen w-full border-b-2 border-dashed border-[#D3C4A5] bg-[#F2EBDD] py-16 px-4 transition-colors duration-300 sm:px-8 md:py-24 dark:border-[#3A3328] dark:bg-[#181512]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Level Header */}
        <div className="mb-10 flex flex-wrap items-baseline justify-between border-b border-[#D3C4A5] pb-4 font-mono text-xs uppercase tracking-wider text-[#837B6D] dark:border-[#3A3328] dark:text-[#7E7565]">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#D9432B] px-2 py-0.5 font-bold text-white">
              LEVEL 05
            </span>
            <span>THE MAGNUM OPUS // 2025 &ndash; 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D9432B] animate-ping" />
            <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
              CLAVIS &bull; INTELLIGENT ATS &amp; JOB PLATFORM
            </span>
          </div>
        </div>

        {/* Level Title */}
        <div className="mb-12">
          <h2
            data-text="LEVEL 5: CLAVIS — THE STARTUP MAGNUM OPUS"
            className="riso-title font-display text-3xl font-black uppercase tracking-tight text-[#1B1A17] sm:text-5xl md:text-6xl dark:text-[#EBE3D3]"
          >
            CLAVIS &mdash; THE STARTUP MAGNUM OPUS
          </h2>
          <p className="mt-3 max-w-3xl font-serif text-lg italic text-[#4B463E] sm:text-xl dark:text-[#B2A896]">
            &ldquo;Co-founded alongside Abhishek Yadav, Swaraj Kumar, Hemant, and Saurabh. I designed, architected, and implemented the core engines &mdash; from a sub-5ms Zero-LLM ATS evaluator to an atomic multi-key AI gateway.&rdquo;
          </p>
        </div>

        {/* Subsystem Navigation Pills */}
        <div className="mb-8 flex flex-wrap gap-2 font-mono text-xs">
          {subsystems.map((sub) => (
            <button
              key={sub.id}
              onClick={() => {
                soundEngine.playClick();
                setActiveSubsystem(sub.id);
              }}
              data-cursor="pointer"
              className={`flex items-center gap-2 rounded border px-3 py-2 transition-all ${
                activeSubsystem === sub.id
                  ? "border-[#1B1A17] bg-[#D9432B] font-bold text-white shadow-[2px_2px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:shadow-[2px_2px_0px_0px_#EBE3D3]"
                  : "border-[#D3C4A5] bg-[#FBF8F1] text-[#1B1A17] hover:border-[#D9432B] dark:border-[#3A3328] dark:bg-[#24201A] dark:text-[#EBE3D3]"
              }`}
            >
              <span>{sub.title}</span>
              <span className="rounded bg-black/10 px-1.5 py-0.5 text-[9px] dark:bg-white/10">
                {sub.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Machine Showcase Area */}
        <div className="rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-6 shadow-[6px_6px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[6px_6px_0px_0px_#EBE3D3]">
          {/* MACHINE 0: MULTI-KEY LLM GATEWAY */}
          {activeSubsystem === 0 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between border-b border-[#D3C4A5] pb-3 font-mono text-xs dark:border-[#3A3328]">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-[#D9432B]" />
                  <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                    SUBSYSTEM 1: FAULT-TOLERANT MULTI-KEY LLM GATEWAY
                  </span>
                </div>
                <span className="text-[#837B6D] dark:text-[#7E7565]">
                  PACIFIC TIMEZONE RPD/RPM AUTOMATION
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="font-serif text-sm leading-relaxed text-[#1B1A17] dark:text-[#EBE3D3]">
                  <p>
                    Commercial LLMs suffer from arbitrary rate limits (HTTP 429) that cripple user workflows.
                    To solve this, I designed a multi-key gateway architecture with:
                  </p>
                  <ul className="mt-3 list-inside list-disc space-y-1.5 font-mono text-xs text-[#4B463E] dark:text-[#B2A896]">
                    <li>Atomic concurrency locks preventing thread collision.</li>
                    <li>Pacific-timezone quota classification tracking Requests Per Day (RPD) &amp; Per Minute (RPM).</li>
                    <li>A 4-model fallback cascade (Gemini Pro &rarr; Flash &rarr; Secondary Key &rarr; Cache).</li>
                  </ul>
                  <div className="mt-5">
                    <button
                      onClick={handleTestGateway}
                      disabled={gatewayStatus === "dispatching" || gatewayStatus === "fallback"}
                      className="flex items-center gap-2 rounded border border-[#1B1A17] bg-[#D9432B] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_#1B1A17] transition-all hover:opacity-90 disabled:opacity-50 dark:border-[#EBE3D3]"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${gatewayStatus === "dispatching" ? "animate-spin" : ""}`} />
                      <span>Simulate Traffic Spike &amp; Key Fallback</span>
                    </button>
                  </div>
                </div>

                {/* Gateway Terminal Log Box */}
                <div className="rounded border border-[#1B1A17] bg-[#1B1A17] p-4 font-mono text-xs text-[#F2EBDD] dark:border-[#3A3328]">
                  <div className="flex items-center justify-between border-b border-[#3A3328] pb-2 text-[10px] text-[#837B6D]">
                    <span>GATEWAY CONSOLE</span>
                    <span className="text-[#7A8B6F]">SYSTEM HEALTHY</span>
                  </div>
                  <div className="mt-3 min-h-[100px] leading-relaxed text-[#EBE3D3]">
                    {gatewayLog}
                  </div>
                  <div className="mt-3 flex items-center gap-4 border-t border-[#3A3328] pt-2 text-[10px]">
                    <span className={gatewayStatus === "fallback" ? "text-[#D9432B] font-bold" : "text-[#7A8B6F]"}>
                      Key #1: {gatewayStatus === "fallback" ? "LOCKED (429)" : "ACTIVE"}
                    </span>
                    <span className={gatewayStatus === "success" ? "text-[#7A8B6F] font-bold" : "text-[#837B6D]"}>
                      Key #2 (Flash): {gatewayStatus === "success" ? "SERVING (200 OK)" : "STANDBY"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MACHINE 1: ZERO-LLM ATS SCORING ENGINE */}
          {activeSubsystem === 1 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between border-b border-[#D3C4A5] pb-3 font-mono text-xs dark:border-[#3A3328]">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#D9432B]" />
                  <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                    SUBSYSTEM 2: ZERO-LLM ATS SCORING ENGINE (SUB-5MS LATENCY)
                  </span>
                </div>
                <span className="text-[#837B6D] dark:text-[#7E7565]">
                  15 MODULES &bull; 3,100+ LINES OF TYPESCRIPT
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="font-serif text-sm leading-relaxed text-[#1B1A17] dark:text-[#EBE3D3]">
                  <p>
                    Rather than burning expensive, slow LLM tokens for basic resume grading,
                    I engineered a deterministic heuristic engine in TypeScript:
                  </p>
                  <ul className="mt-3 list-inside list-disc space-y-1.5 font-mono text-xs text-[#4B463E] dark:text-[#B2A896]">
                    <li>Evaluates 8 weighted pillars in <strong>&lt;5ms</strong>.</li>
                    <li>Built-in 400-term synonym taxonomy matching equivalent industry skills.</li>
                    <li>Knockout criteria checking mandatory years of experience and core competencies.</li>
                  </ul>

                  <div className="mt-4 flex gap-2 font-mono text-xs">
                    <button
                      onClick={() => handleSelectPreset("strong")}
                      className={`rounded border px-3 py-1.5 ${
                        atsPreset === "strong"
                          ? "border-[#D9432B] bg-[#D9432B] text-white font-bold"
                          : "border-[#D3C4A5] bg-[#F2EBDD] text-[#1B1A17] dark:border-[#3A3328] dark:bg-[#181512] dark:text-[#EBE3D3]"
                      }`}
                    >
                      Preset: Production Architect (92%)
                    </button>
                    <button
                      onClick={() => handleSelectPreset("weak")}
                      className={`rounded border px-3 py-1.5 ${
                        atsPreset === "weak"
                          ? "border-[#D9432B] bg-[#D9432B] text-white font-bold"
                          : "border-[#D3C4A5] bg-[#F2EBDD] text-[#1B1A17] dark:border-[#3A3328] dark:bg-[#181512] dark:text-[#EBE3D3]"
                      }`}
                    >
                      Preset: Vague Buzzwords (46%)
                    </button>
                  </div>
                </div>

                {/* ATS 8-Pillars Visualizer */}
                <div className="rounded border border-[#D3C4A5] bg-[#F2EBDD] p-4 font-mono text-xs dark:border-[#3A3328] dark:bg-[#181512]">
                  <div className="flex items-center justify-between border-b border-[#D3C4A5] pb-2 dark:border-[#3A3328]">
                    <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                      OVERALL ATS FIT SCORE:
                    </span>
                    <span className={`text-xl font-black ${atsScore >= 80 ? "text-[#7A8B6F]" : "text-[#D9432B]"}`}>
                      {atsScore} / 100
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {[
                      { name: "Hard Skills & Stack", pct: atsPreset === "strong" ? 95 : 40 },
                      { name: "Quantified Impact Metrics", pct: atsPreset === "strong" ? 90 : 35 },
                      { name: "400-Term Synonym Match", pct: atsPreset === "strong" ? 92 : 50 },
                      { name: "Knockout Criteria", pct: atsPreset === "strong" ? 100 : 60 },
                    ].map((p) => (
                      <div key={p.name}>
                        <div className="flex justify-between pb-0.5 text-[11px]">
                          <span>{p.name}</span>
                          <span className="font-bold">{p.pct}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded bg-[#D3C4A5]/40 dark:bg-[#3A3328]">
                          <div
                            className={`h-full transition-all duration-500 ${
                              p.pct >= 80 ? "bg-[#7A8B6F]" : "bg-[#D9432B]"
                            }`}
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

          {/* MACHINE 2: CONCURRENT ETL PIPELINE */}
          {activeSubsystem === 2 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between border-b border-[#D3C4A5] pb-3 font-mono text-xs dark:border-[#3A3328]">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-[#D9432B]" />
                  <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                    SUBSYSTEM 3: CONCURRENT JOB ETL PIPELINE
                  </span>
                </div>
                <span className="text-[#837B6D] dark:text-[#7E7565]">
                  SHA-256 DEDUP &bull; 10,000+ RECORDS
                </span>
              </div>

              {/* Animated Pipeline Flow */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4 font-mono text-xs text-center">
                <div className="rounded border border-[#1B1A17] bg-[#F2EBDD] p-3 dark:border-[#EBE3D3] dark:bg-[#181512]">
                  <span className="block font-bold text-[#D9432B]">01. INGEST</span>
                  <span className="mt-1 block text-[11px] text-[#4B463E] dark:text-[#B2A896]">
                    4 Job APIs in Parallel
                  </span>
                </div>
                <div className="rounded border border-[#1B1A17] bg-[#F2EBDD] p-3 dark:border-[#EBE3D3] dark:bg-[#181512]">
                  <span className="block font-bold text-[#C99A3B]">02. DEDUPLICATE</span>
                  <span className="mt-1 block text-[11px] text-[#4B463E] dark:text-[#B2A896]">
                    SHA-256 Content Hash
                  </span>
                </div>
                <div className="rounded border border-[#1B1A17] bg-[#F2EBDD] p-3 dark:border-[#EBE3D3] dark:bg-[#181512]">
                  <span className="block font-bold text-[#7A8B6F]">03. VALIDATE</span>
                  <span className="mt-1 block text-[11px] text-[#4B463E] dark:text-[#B2A896]">
                    Strict Zod Schema
                  </span>
                </div>
                <div className="rounded border border-[#1B1A17] bg-[#F2EBDD] p-3 dark:border-[#EBE3D3] dark:bg-[#181512]">
                  <span className="block font-bold text-[#1B1A17] dark:text-[#EBE3D3]">04. INDEX</span>
                  <span className="mt-1 block text-[11px] text-[#4B463E] dark:text-[#B2A896]">
                    Turso SQLite FTS5
                  </span>
                </div>
              </div>

              <p className="font-serif text-sm leading-relaxed text-[#1B1A17] dark:text-[#EBE3D3]">
                Processes 10,000+ live job postings daily with automatic 15-day stale record pruning,
                feeding into 6 isolated Turso database instances for sub-10ms full-text searches.
              </p>
            </div>
          )}

          {/* MACHINE 3: ARIA AI RESUME EDITOR */}
          {activeSubsystem === 3 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between border-b border-[#D3C4A5] pb-3 font-mono text-xs dark:border-[#3A3328]">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#D9432B]" />
                  <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                    SUBSYSTEM 4: ARIA AUTONOMOUS RESUME EDITOR
                  </span>
                </div>
                <span className="text-[#837B6D] dark:text-[#7E7565]">
                  STREAMING SSE &bull; LATEX COMPILATION &lt;30S
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="font-serif text-sm leading-relaxed text-[#1B1A17] dark:text-[#EBE3D3]">
                  <p>
                    ARIA tracks live bullet-point revisions with semantic diffing and compiles production-ready LaTeX documents in under 30 seconds.
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={handleAriaToggle}
                      className="flex items-center gap-2 rounded border border-[#1B1A17] bg-[#D9432B] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_#1B1A17] dark:border-[#EBE3D3]"
                    >
                      <span>Toggle ARIA Impact Transformation</span>
                    </button>
                  </div>
                </div>

                {/* Typewriter Diff Display */}
                <div className="rounded border border-[#1B1A17] bg-[#F2EBDD] p-4 font-mono text-xs dark:border-[#3A3328] dark:bg-[#181512]">
                  <div className="text-[10px] text-[#837B6D] pb-2 border-b border-[#D3C4A5] dark:border-[#3A3328]">
                    SEMANTIC BULLET DIFF COMPARISON
                  </div>
                  {ariaStep === 1 ? (
                    <div className="mt-3 space-y-2">
                      <div className="rounded bg-[#D9432B]/10 p-2 text-[#D9432B]">
                        - Built backend APIs for jobs and user authentication.
                      </div>
                      <div className="text-[11px] text-[#837B6D]">
                        [ARIA Critique]: Weak action verb. Lacks scale, concurrency, and measurable business impact.
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 space-y-2">
                      <div className="rounded bg-[#7A8B6F]/20 p-2 text-[#7A8B6F] dark:text-[#92A585] font-bold">
                        + Architected concurrent SSE gateway and multi-key quota management, processing 10,000+ jobs with 99.9% uptime.
                      </div>
                      <div className="text-[11px] text-[#7A8B6F] dark:text-[#92A585]">
                        [ARIA Accepted]: High impact, technical precision, and verified metrics.
                      </div>
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
