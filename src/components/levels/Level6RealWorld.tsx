"use client";

import React, { useState } from "react";
import { useCollector } from "@/context/CollectorContext";
import { Activity, ShieldCheck, CheckCircle2, Play, RefreshCw, ChevronRight, Lock } from "lucide-react";
import { LineMaskReveal } from "@/components/motion/LineMaskReveal";
import { GoldMedallion } from "@/components/seals/GoldMedallion";

export function Level6RealWorld() {
  const { unlockSeal, sealsEarned, setCursorLabel } = useCollector();
  const [simState, setSimState] = useState<"idle" | "first_arrival" | "duplicate_received">("idle");
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    "IDLE: Juspay webhook listener waiting on event stream...",
  ]);

  const hasSeal = sealsEarned.includes("seal_hudle");

  const handleSimulateWebhook = () => {
    setSimState("first_arrival");
    setTelemetryLogs([
      "[T+00ms] INCOMING: Juspay POST /api/webhooks/juspay (Order #HD-8921)",
      "[T+15ms] REDIS: SetNX Idempotency Key 'lock:order:HD-8921' -> Lock Acquired",
      "[T+45ms] DB TX: Slot status updated to CONFIRMED. User receipt dispatched.",
      "[T+62ms] HTTP 200 OK returned to Juspay gateway.",
    ]);

    // Simulate network retry / duplicate arrival 1 second later
    setTimeout(() => {
      setSimState("duplicate_received");
      setTelemetryLogs((prev) => [
        ...prev,
        "[T+1050ms] DUPLICATE WEBHOOK DETECTED: Order #HD-8921 re-delivered by network partition",
        "[T+1055ms] REDIS: Key 'lock:order:HD-8921' exists. Duplicate execution bypassed.",
        "[T+1060ms] HTTP 200 OK returned immediately. Exactly-once semantics preserved.",
      ]);
      unlockSeal("seal_hudle");
    }, 1100);
  };

  return (
    <section
      id="chapter-6"
      className="relative min-h-screen w-full border-b border-[#6F665A]/20 bg-[#F6F1E7] py-20 px-6 sm:px-12 md:py-28 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER FOLIO HEADER */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#8C6B3A]">CHAPTER VI</span>
            <span className="text-[#6F665A]/40">&bull;</span>
            <span>THE REAL WORLD // 08/2026 &ndash; PRESENT</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#14110F]">
            <Activity className="h-3.5 w-3.5 text-[#B08D57]" />
            <span>HUDLE &bull; PRODUCTION ENGINEERING</span>
          </div>
        </div>

        {/* CHAPTER TITLE & THESIS */}
        <div className="mb-14 max-w-4xl">
          <LineMaskReveal threshold={0.1}>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
              The Production <span className="italic font-serif text-[#6B1E1E]">Arena</span>
            </h2>
          </LineMaskReveal>
          <p className="mt-4 max-w-3xl font-serif text-lg font-light text-[#6F665A] leading-relaxed">
            Joining Hudle bridged the divide between independent architecture and industrial-scale engineering:
            mastering distributed caching, rate-limiting thresholds, and payment reconciliation across thousands of real transactions.
          </p>
        </div>

        {/* 3 CORE PRODUCTION METRICS */}
        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-6 shadow-sm">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
              RECONCILIATION RELIABILITY
            </span>
            <div className="my-2 font-display text-4xl font-light text-[#8C6B3A]">
              99.8%
            </div>
            <span className="font-mono text-[10px] text-[#6F665A]">
              Juspay Webhook Idempotency
            </span>
          </div>

          <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-6 shadow-sm">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
              PRICING CALCULATION ACCURACY
            </span>
            <div className="my-2 font-display text-4xl font-light text-[#14110F]">
              100%
            </div>
            <span className="font-mono text-[10px] text-[#6F665A]">
              Tiered Cart &amp; Convenience Fees
            </span>
          </div>

          <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-6 shadow-sm">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
              ROUTING DEFECT RESOLUTION
            </span>
            <div className="my-2 font-display text-4xl font-light text-[#6B1E1E]">
              Zero Loops
            </div>
            <span className="font-mono text-[10px] text-[#6F665A]">
              GoRouter Deep-Link Elimination
            </span>
          </div>
        </div>

        {/* TWO-COLUMN DOSSIER */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 mb-16">
          {/* LEFT: THE CORPORATE REALITY */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-8 shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8C6B3A] font-semibold">
                INDUSTRIAL TELEMETRY &amp; IDEMPOTENCY
              </span>

              <div className="mt-6 font-serif text-base leading-relaxed text-[#14110F]/90 space-y-4">
                <p>
                  In isolated projects, a thrown exception simply restarts a terminal process.
                  Inside a live consumer application handling thousands of venue bookings daily, an unhandled webhook or race condition results in double-charged credit cards or double-booked badminton courts.
                </p>
                <p>
                  At <strong>Hudle</strong>, I tackled mission-critical payment pipelines with Juspay. I designed distributed idempotency locks backed by Redis, ensuring that when upstream network spikes duplicate webhook delivery, our servers execute state changes exactly once while responding with HTTP 200.
                </p>
                <p>
                  Beyond payments, I resolved recursive deep-linking loops in GoRouter, re-engineered cart fee pricing tiers, and implemented rate limiters to protect downstream internal microservices.
                </p>
              </div>
            </div>

            {/* STACK LIST */}
            <div className="rounded border border-[#6F665A]/20 bg-[#EDE5D3]/50 p-6 font-mono text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#6F665A] block mb-3 font-semibold">
                PRODUCTION TOOLING &bull; HUDLE
              </span>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {["Redis Caching", "Juspay Gateway", "Distributed Locks", "GoRouter", "Express / Node.js", "PostgreSQL", "Rate Limiting"].map((tech) => (
                  <span key={tech} className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] px-2.5 py-1 text-[#14110F]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE IDEMPOTENCY SIMULATOR */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] text-[#6F665A]">
                <span className="font-semibold text-[#8C6B3A]">IDEMPOTENCY WORKBENCH</span>
                <span>EXACTLY-ONCE WEBHOOK HANDLER</span>
              </div>

              <p className="mt-4 font-serif text-sm text-[#6F665A]">
                Simulate a network partition where Juspay transmits the same payment webhook twice within 1,000ms. Watch the distributed lock prevent double-charging:
              </p>

              <div className="my-6">
                <button
                  onClick={handleSimulateWebhook}
                  disabled={simState === "first_arrival"}
                  className="flex items-center gap-2 rounded border border-[#B08D57] bg-[#EDE5D3] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:bg-[#FAF7F2] transition-colors"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${simState === "first_arrival" ? "animate-spin text-[#B08D57]" : ""}`} />
                  <span>Simulate Dual Webhook Delivery</span>
                </button>
              </div>

              {/* Console Output */}
              <div className="rounded border border-[#6F665A]/20 bg-[#14110F] p-4 font-mono text-xs text-[#EDE5D3] min-h-[160px]">
                <div className="flex justify-between border-b border-[#EDE5D3]/20 pb-2 text-[9px] text-[#6F665A]">
                  <span>LOG: /VAR/LOG/HUDLE/JUSPAY_WEBHOOKS.LOG</span>
                  <span className={simState === "duplicate_received" ? "text-[#B08D57]" : "text-[#6F665A]"}>
                    {simState === "duplicate_received" ? "IDEMPOTENT LOCK VERIFIED" : "AWAITING DISPATCH"}
                  </span>
                </div>
                <div className="mt-3 space-y-1.5 text-[11px] leading-relaxed">
                  {telemetryLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={log.includes("DUPLICATE") ? "text-[#E3C98E] font-medium" : log.includes("CONFIRMED") ? "text-[#B08D57]" : "text-[#EDE5D3]/80"}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEAL CONFERMENT CARD */}
        <div className="rounded border border-[#B08D57]/40 bg-[#FAF7F2] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <GoldMedallion
              numeral="VI"
              title="The Production Seal"
              isUnlocked={hasSeal}
              size="lg"
            />
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#8C6B3A]">
                CHAPTER VI SEAL &bull; THE PRODUCTION SEAL
              </span>
              <h4 className="font-display text-xl font-medium text-[#14110F]">
                {hasSeal ? "Seal Conferred &amp; Inscribed" : "Production Engineering at Hudle"}
              </h4>
              <p className="font-serif text-xs text-[#6F665A] mt-1">
                Conferred upon examining the Juspay webhook idempotency engine and production telemetry at Hudle.
              </p>
            </div>
          </div>

          {!hasSeal ? (
            <button
              onClick={() => unlockSeal("seal_hudle")}
              onMouseEnter={() => setCursorLabel("CLAIM")}
              onMouseLeave={() => setCursorLabel(null)}
              className="flex items-center gap-2 rounded border border-[#B08D57] bg-[#EDE5D3] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:bg-[#FAF7F2] transition-colors"
            >
              <span>Confer Seal VI</span>
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
