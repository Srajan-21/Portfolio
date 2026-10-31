"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/sound";
import { useJournal } from "@/context/JournalContext";
import { Activity, ShieldCheck, CheckCircle2, GitBranch, ArrowRight, Play } from "lucide-react";

export function Level6RealWorld() {
  const { addXP } = useJournal();
  const [webhookStatus, setWebhookStatus] = useState<"idle" | "verifying" | "reconciled">("idle");

  const handleSimulateWebhook = () => {
    soundEngine.playClick();
    setWebhookStatus("verifying");

    setTimeout(() => {
      setWebhookStatus("reconciled");
      soundEngine.playStamp();
      addXP(40, "JUSPAY IDEMPOTENCY RECONCILED");
    }, 700);
  };

  return (
    <section
      id="level-6"
      className="relative min-h-screen w-full border-b-2 border-dashed border-[#D3C4A5] bg-[#FBF8F1] py-16 px-4 transition-colors duration-300 sm:px-8 md:py-24 dark:border-[#3A3328] dark:bg-[#1B1814]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Level Header */}
        <div className="mb-10 flex flex-wrap items-baseline justify-between border-b border-[#D3C4A5] pb-4 font-mono text-xs uppercase tracking-wider text-[#837B6D] dark:border-[#3A3328] dark:text-[#7E7565]">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#D9432B] px-2 py-0.5 font-bold text-white">
              LEVEL 06
            </span>
            <span>THE REAL WORLD // 08/2026 &ndash; PRESENT</span>
          </div>
          <div className="flex items-center gap-2 text-[#7A8B6F] dark:text-[#92A585]">
            <Activity className="h-4 w-4" />
            <span className="font-bold">HUDLE &bull; NEW DELHI</span>
          </div>
        </div>

        {/* Level Title */}
        <div className="mb-12">
          <h2
            data-text="LEVEL 6: THE PRODUCTION ARENA"
            className="riso-title font-display text-3xl font-black uppercase tracking-tight text-[#1B1A17] sm:text-5xl md:text-6xl dark:text-[#EBE3D3]"
          >
            THE PRODUCTION ARENA
          </h2>
          <p className="mt-3 max-w-3xl font-serif text-lg italic text-[#4B463E] sm:text-xl dark:text-[#B2A896]">
            &ldquo;Textbooks teach you how to write code. Production at Hudle taught me how software lives, breathes, fails, and reconciles under real human money.&rdquo;
          </p>
        </div>

        {/* 3 Core Production Metrics */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="stamp-border rounded bg-[#F2EBDD] p-5 dark:bg-[#24201A]">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#837B6D] dark:text-[#7E7565]">
              RECONCILIATION RELIABILITY
            </span>
            <div className="my-1 font-display text-4xl font-black text-[#7A8B6F] dark:text-[#92A585]">
              99.5%+
            </div>
            <span className="font-mono text-xs text-[#4B463E] dark:text-[#B2A896]">
              Juspay Webhook Idempotency
            </span>
          </div>

          <div className="stamp-border rounded bg-[#F2EBDD] p-5 dark:bg-[#24201A]">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#837B6D] dark:text-[#7E7565]">
              FEE PRICING ACCURACY
            </span>
            <div className="my-1 font-display text-4xl font-black text-[#1B1A17] dark:text-[#EBE3D3]">
              100%
            </div>
            <span className="font-mono text-xs text-[#4B463E] dark:text-[#B2A896]">
              Tiered Cart &amp; Convenience Engine
            </span>
          </div>

          <div className="stamp-border rounded bg-[#F2EBDD] p-5 dark:bg-[#24201A]">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#837B6D] dark:text-[#7E7565]">
              ROUTING DEFECT ELIMINATION
            </span>
            <div className="my-1 font-display text-4xl font-black text-[#D9432B] dark:text-[#E55840]">
              ZERO
            </div>
            <span className="font-mono text-xs text-[#4B463E] dark:text-[#B2A896]">
              GoRouter Deep-Link Loops
            </span>
          </div>
        </div>

        {/* Dossier Grid: Production Lessons & Live Webhook Simulation */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column (7 cols): The Reality of Corporate Production */}
          <div className="space-y-6 lg:col-span-7">
            <div className="rounded border-2 border-[#1B1A17] bg-[#F2EBDD] p-6 shadow-[5px_5px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[5px_5px_0px_0px_#EBE3D3]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D9432B] dark:text-[#E55840]">
                LESSONS COLLEGE NEVER TAUGHT ME
              </span>

              <div className="mt-4 space-y-4 font-serif text-base leading-relaxed text-[#1B1A17] dark:text-[#EBE3D3]">
                <p>
                  At college, if a database call fails, you refresh the page.
                  In production at <strong>Hudle</strong>, if a payment webhook is dropped or delivered twice,
                  real money is lost or a user is billed multiple times without receiving their sports venue slot.
                </p>
                <p>
                  My engineering focus centered on three core systems:
                </p>
                <div className="space-y-3 font-mono text-xs text-[#4B463E] dark:text-[#B2A896]">
                  <div className="rounded border border-[#D3C4A5] bg-[#FBF8F1] p-3 dark:border-[#3A3328] dark:bg-[#181512]">
                    <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                      1. Juspay Webhook Lifecycle Hardening:
                    </span>
                    <p className="mt-1 text-[11px]">
                      Enforcing cryptographic HMAC signature verification, database transaction idempotency keys, and reconciliation pipelines achieving 99.5%+ reliability.
                    </p>
                  </div>

                  <div className="rounded border border-[#D3C4A5] bg-[#FBF8F1] p-3 dark:border-[#3A3328] dark:bg-[#181512]">
                    <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                      2. GoRouter Deep-Link Architecture:
                    </span>
                    <p className="mt-1 text-[11px]">
                      Eliminating infinite redirect loops and back-stack anomalies when users open notifications from external push campaigns.
                    </p>
                  </div>

                  <div className="rounded border border-[#D3C4A5] bg-[#FBF8F1] p-3 dark:border-[#3A3328] dark:bg-[#181512]">
                    <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                      3. Tiered Convenience Fee Calculation:
                    </span>
                    <p className="mt-1 text-[11px]">
                      Validating dynamic tiered pricing across variable cart totals with 100% mathematical audit accuracy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Webhook Lifecycle Inspector */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-5 shadow-[6px_6px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[6px_6px_0px_0px_#EBE3D3]">
              <div className="flex items-center justify-between border-b border-[#D3C4A5] pb-2 font-mono text-xs dark:border-[#3A3328]">
                <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                  JUSPAY WEBHOOK RECONCILIATION
                </span>
                <span className="text-[#7A8B6F] font-bold">PRODUCTION TELEMETRY</span>
              </div>

              {/* Webhook Lifecycle Steps */}
              <div className="mt-4 space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between rounded border border-[#D3C4A5] bg-[#F2EBDD] p-2 dark:border-[#3A3328] dark:bg-[#181512]">
                  <span>01. Cryptographic HMAC Check</span>
                  <span className={webhookStatus !== "idle" ? "text-[#7A8B6F] font-bold" : "text-[#837B6D]"}>
                    {webhookStatus !== "idle" ? "[VALID SIGNATURE]" : "[WAITING]"}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded border border-[#D3C4A5] bg-[#F2EBDD] p-2 dark:border-[#3A3328] dark:bg-[#181512]">
                  <span>02. Idempotency Key Lock</span>
                  <span className={webhookStatus === "reconciled" ? "text-[#7A8B6F] font-bold" : "text-[#837B6D]"}>
                    {webhookStatus === "reconciled" ? "[NO DUPLICATE]" : "[LOCK OPEN]"}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded border border-[#D3C4A5] bg-[#F2EBDD] p-2 dark:border-[#3A3328] dark:bg-[#181512]">
                  <span>03. Atomic DB Transaction</span>
                  <span className={webhookStatus === "reconciled" ? "text-[#7A8B6F] font-bold" : "text-[#837B6D]"}>
                    {webhookStatus === "reconciled" ? "[COMMITTED]" : "[PENDING]"}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <button
                  onClick={handleSimulateWebhook}
                  disabled={webhookStatus === "verifying"}
                  className="flex w-full items-center justify-center gap-2 rounded border border-[#1B1A17] bg-[#7A8B6F] py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_#1B1A17] transition-all hover:opacity-90 dark:border-[#EBE3D3]"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>
                    {webhookStatus === "reconciled" ? "Re-Trigger Webhook Event" : "Simulate Live Juspay Webhook"}
                  </span>
                </button>
              </div>

              {webhookStatus === "reconciled" && (
                <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-[#7A8B6F] dark:text-[#92A585]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Reconciliation Verified: Order synced, slot reserved with 0 leakage.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
