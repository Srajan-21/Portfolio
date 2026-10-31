"use client";

import React, { useState } from "react";
import { useCollector } from "@/context/CollectorContext";
import { Activity, ShieldCheck, CheckCircle2, Play } from "lucide-react";

export function Level6RealWorld() {
  const { unlockSeal } = useCollector();
  const [webhookStatus, setWebhookStatus] = useState<"idle" | "verifying" | "reconciled">("idle");

  const handleSimulateWebhook = () => {
    setWebhookStatus("verifying");
    setTimeout(() => {
      setWebhookStatus("reconciled");
      unlockSeal("seal_hudle");
    }, 600);
  };

  return (
    <section
      id="chapter-6"
      className="relative min-h-screen w-full border-b-hairline bg-[#F6F1E7] py-20 px-6 sm:px-12 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* Chapter Header */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b-hairline pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="text-[#8C6B3A] font-semibold">CHAPTER VI</span>
            <span>&bull;</span>
            <span>THE REAL WORLD // 08/2026 &ndash; PRESENT</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#14110F]">
            <Activity className="h-3.5 w-3.5 text-[#B08D57]" />
            <span>HUDLE &bull; NEW DELHI</span>
          </div>
        </div>

        {/* Chapter Title */}
        <div className="mb-14">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
            The Production <span className="italic font-serif text-[#6B1E1E]">Arena</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-lg font-light text-[#6F665A] leading-relaxed">
            Joining Hudle taught me what university coursework never could: the reality of production-grade systems, corporate engineering practices, rate-limiting constraints, and high-volume payment reconciliation.
          </p>
        </div>

        {/* 3 Core Production Metrics */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded border-hairline bg-[#FAF7F2] p-6 shadow-editorial">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
              RECONCILIATION RELIABILITY
            </span>
            <div className="my-2 font-display text-4xl font-light text-[#8C6B3A]">
              99.5%+
            </div>
            <span className="font-mono text-[10px] text-[#6F665A]">
              Juspay Webhook Idempotency
            </span>
          </div>

          <div className="rounded border-hairline bg-[#FAF7F2] p-6 shadow-editorial">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
              PRICING ACCURACY
            </span>
            <div className="my-2 font-display text-4xl font-light text-[#14110F]">
              100%
            </div>
            <span className="font-mono text-[10px] text-[#6F665A]">
              Tiered Cart &amp; Convenience Fees
            </span>
          </div>

          <div className="rounded border-hairline bg-[#FAF7F2] p-6 shadow-editorial">
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

        {/* Two-Column Dossier */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Owner's Real Reflection */}
          <div className="space-y-6 lg:col-span-7">
            <div className="rounded border-hairline bg-[#FAF7F2] p-8 shadow-editorial">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C6B3A] font-semibold">
                ENGINEERING PERSPECTIVE
              </span>

              <div className="mt-6 font-serif text-base leading-relaxed text-[#14110F]/90 space-y-4">
                <p>
                  In academic environments, an unhandled error simply resets a local dev server.
                  Inside a live corporate system like <strong>Hudle</strong>, dropped webhooks or duplicate callbacks risk double-billing customers or leaving booked sports slots unsynced.
                </p>
                <p>
                  My engineering contributions centered on three critical pillars:
                </p>
                <div className="space-y-3 font-mono text-xs text-[#6F665A]">
                  <div className="rounded border-hairline bg-[#F6F1E7] p-3">
                    <span className="font-medium text-[#14110F]">
                      1. Juspay Webhook Lifecycle Hardening:
                    </span>
                    <p className="mt-1 text-[11px]">
                      Implemented strict HMAC cryptographic signature validation, database idempotency keys, and transaction reconciliation achieving 99.5%+ reliability.
                    </p>
                  </div>

                  <div className="rounded border-hairline bg-[#F6F1E7] p-3">
                    <span className="font-medium text-[#14110F]">
                      2. GoRouter Deep-Link Rectification:
                    </span>
                    <p className="mt-1 text-[11px]">
                      Resolved complex deep-link redirect loops and back-stack inconsistencies across promotional campaign entry points.
                    </p>
                  </div>

                  <div className="rounded border-hairline bg-[#F6F1E7] p-3">
                    <span className="font-medium text-[#14110F]">
                      3. Tiered Convenience Fee Audit:
                    </span>
                    <p className="mt-1 text-[11px]">
                      Validated dynamic convenience and platform fee calculations across tiered cart values with 100% mathematical audit accuracy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Webhook Telemetry Simulation */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded border-hairline bg-[#EDE5D3]/40 p-6 shadow-editorial">
              <div className="flex items-center justify-between border-b-hairline pb-3 font-mono text-[10px] text-[#6F665A]">
                <span className="font-medium text-[#14110F]">
                  WEBHOOK IDEMPOTENCY RECONCILIATION
                </span>
                <span>TELEMETRY</span>
              </div>

              <div className="mt-4 space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between rounded border-hairline bg-[#FAF7F2] p-2.5">
                  <span className="text-[11px]">01. HMAC Signature Verification</span>
                  <span className={webhookStatus !== "idle" ? "text-[#8C6B3A] font-medium" : "text-[#6F665A]/50"}>
                    {webhookStatus !== "idle" ? "[VALIDATED]" : "[STANDBY]"}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded border-hairline bg-[#FAF7F2] p-2.5">
                  <span className="text-[11px]">02. Idempotency Key Lock</span>
                  <span className={webhookStatus === "reconciled" ? "text-[#8C6B3A] font-medium" : "text-[#6F665A]/50"}>
                    {webhookStatus === "reconciled" ? "[LOCKED: UNIQUE]" : "[UNLOCKED]"}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded border-hairline bg-[#FAF7F2] p-2.5">
                  <span className="text-[11px]">03. Atomic Transaction Sync</span>
                  <span className={webhookStatus === "reconciled" ? "text-[#8C6B3A] font-medium" : "text-[#6F665A]/50"}>
                    {webhookStatus === "reconciled" ? "[COMMITTED]" : "[PENDING]"}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleSimulateWebhook}
                  disabled={webhookStatus === "verifying"}
                  className="flex w-full items-center justify-center gap-2 rounded border border-[#6F665A]/30 bg-[#F6F1E7] py-2.5 font-mono text-[11px] uppercase tracking-wider text-[#14110F] hover:border-[#B08D57] hover:bg-[#EDE5D3] transition-colors"
                >
                  <Play className="h-3 w-3 text-[#B08D57]" />
                  <span>
                    {webhookStatus === "reconciled" ? "Re-evaluate Verification Cycle" : "Simulate Juspay Webhook Verification"}
                  </span>
                </button>
              </div>

              {webhookStatus === "reconciled" && (
                <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-[#8C6B3A]">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>Transaction confirmed. Slot booked with zero duplicate exposure.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
