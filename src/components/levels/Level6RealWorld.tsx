"use client";

import React, { useState } from "react";
import { useStickerWorld } from "@/context/StickerWorldContext";
import { Terminal, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Play, RefreshCw, Layers } from "lucide-react";

export function Level6RealWorld() {
  const { addStickers, completeQuest, unlockCard, setMascotSpeech } = useStickerWorld();

  const [webhookLog, setWebhookLog] = useState<string[]>([
    "[READY] Juspay webhook simulator listening on /api/webhooks/juspay",
    "[STATUS] Cryptographic signature engine: HMAC-SHA256 initialized",
    "[IDEMPOTENCY] Redis/PostgreSQL lock manager active",
  ]);
  const [webhookCount, setWebhookCount] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const triggerReward = () => {
    if (!hasInteracted) {
      addStickers(4, "hudle_webhook");
      completeQuest("q_hudle");
      unlockCard("card_hudle");
      setHasInteracted(true);
      setMascotSpeech("At Hudle, production engineering is about zero leakage and handling duplicate webhooks cleanly!", 4500);
    }
  };

  const handleDispatchWebhook = (isReplay = false) => {
    triggerReward();
    const timestamp = new Date().toLocaleTimeString();

    if (!isReplay) {
      setWebhookCount((prev) => prev + 1);
      setWebhookLog((prev) => [
        `[${timestamp}] ➔ INCOMING: Juspay order_id=ord_hudle_9839, status=CHARGED`,
        `[${timestamp}]   ✓ Signature verified: signature_valid=true`,
        `[${timestamp}]   🔒 Idempotency lock acquired: key=tx_ord_hudle_9839`,
        `[${timestamp}]   💾 Atomic DB commit: booking_status=CONFIRMED (PostgreSQL)`,
        `[${timestamp}]   ⬅ RESPONSE: 200 OK (Payment reconciled without leakage)`,
        ...prev.slice(0, 8),
      ]);
    } else {
      setWebhookLog((prev) => [
        `[${timestamp}] ⚠️ REPLAY DETECTED: Incoming webhook hash identical to processed tx`,
        `[${timestamp}]   🔒 Idempotency check: key=tx_ord_hudle_9839 ALREADY COMMITTED`,
        `[${timestamp}]   🛡️ Duplicate charge blocked: 0 database mutations applied`,
        `[${timestamp}]   ⬅ RESPONSE: 200 OK (Idempotent acknowledge to prevent gateway retries)`,
        ...prev.slice(0, 8),
      ]);
    }
  };

  return (
    <section
      id="chapter-6"
      className="relative min-h-screen w-full bg-[#FFF8EC] py-20 px-4 sm:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER STICKER HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#14121A] pb-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="bg-[#2F5BFF] text-white border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm rotate-[-1deg]">
              CHAPTER 06
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#14121A]/70">
              THE REAL WORLD • 08/2026 &ndash; PRESENT
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#3DDC97] text-[#14121A] border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold shadow-hard-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>SOFTWARE ENGINEERING INTERN &bull; HUDLE</span>
          </div>
        </div>

        {/* HERO TITLE & INTRO */}
        <div className="mb-14 max-w-4xl">
          <div className="inline-block bg-white border-2 border-[#14121A] px-3 py-1 text-xs font-mono font-bold uppercase shadow-hard-sm mb-4 rotate-[1deg]">
            🏢 HUDLE &bull; SPORTS TECH PRODUCTION ENGINEERING &bull; NEW DELHI
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#14121A] leading-tight">
            Production Scale: <br />
            <span className="bg-[#2F5BFF] text-white px-2 py-0.5 border-3 border-[#14121A] shadow-hard inline-block rotate-[-1deg]">
              Payment Telemetry &amp; Routing
            </span>
          </h2>
          <p className="mt-6 font-sans text-lg md:text-xl text-[#14121A]/80 font-medium leading-relaxed max-w-3xl">
            At Hudle, I stepped directly into high-traffic production engineering. I tackled mission-critical infrastructure: hardening <strong>Juspay payment webhooks</strong> with cryptographic validation and database idempotency locks, and debugging complex <strong>GoRouter deep-link redirect cycles</strong>.
          </p>
        </div>

        {/* 3 PRODUCTION PILLARS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="border-3 border-[#14121A] bg-white p-6 shadow-hard">
            <span className="font-mono text-[10px] font-bold text-[#FF4D2E] uppercase">
              RECONCILIATION RELIABILITY
            </span>
            <div className="font-display text-3xl font-black text-[#14121A] mt-1">99.8%+</div>
            <p className="font-sans text-xs text-[#14121A]/80 mt-2 leading-relaxed">
              Implemented strict idempotency keys across Juspay webhook lifecycles, ensuring duplicate network deliveries never trigger double-bookings.
            </p>
          </div>

          <div className="border-3 border-[#14121A] bg-white p-6 shadow-hard">
            <span className="font-mono text-[10px] font-bold text-[#2F5BFF] uppercase">
              DEEP-LINK ARCHITECTURE
            </span>
            <div className="font-display text-3xl font-black text-[#14121A] mt-1">Zero Loops</div>
            <p className="font-sans text-xs text-[#14121A]/80 mt-2 leading-relaxed">
              Resolved nested GoRouter navigation redirects and route stack anomalies, ensuring smooth mobile user onboarding.
            </p>
          </div>

          <div className="border-3 border-[#14121A] bg-white p-6 shadow-hard">
            <span className="font-mono text-[10px] font-bold text-[#3DDC97] uppercase">
              PRICING ACCURACY
            </span>
            <div className="font-display text-3xl font-black text-[#14121A] mt-1">100%</div>
            <p className="font-sans text-xs text-[#14121A]/80 mt-2 leading-relaxed">
              Engineered and audited tiered cart value fee matrices across multi-sport venue booking slots with zero price discrepancies.
            </p>
          </div>
        </div>

        {/* INTERACTIVE RETRO TERMINAL: JUSPAY WEBHOOK SIMULATOR */}
        <div className="border-4 border-[#14121A] bg-[#14121A] text-white shadow-hard-lg mb-16 overflow-hidden">
          {/* Terminal Title Bar */}
          <div className="bg-[#23202E] border-b-2 border-white/20 px-4 py-3 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF4D2E]" />
              <span className="w-3 h-3 rounded-full bg-[#FFC93C]" />
              <span className="w-3 h-3 rounded-full bg-[#3DDC97]" />
              <span className="ml-2 font-bold text-white">HUDLE_PAYMENT_RECONCILER_v2.6.SH</span>
            </div>
            <span className="text-white/60">SIMULATION ENGINE</span>
          </div>

          {/* Terminal Controls Subbar */}
          <div className="bg-[#1C1A24] border-b border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleDispatchWebhook(false)}
                className="btn-press flex items-center gap-2 bg-[#3DDC97] text-[#14121A] border-2 border-black px-4 py-1.5 font-bold uppercase shadow-sm"
              >
                <Play className="h-3.5 w-3.5" />
                <span>DISPATCH WEBHOOK</span>
              </button>
              <button
                onClick={() => handleDispatchWebhook(true)}
                className="btn-press flex items-center gap-2 bg-[#FF4D2E] text-white border-2 border-black px-4 py-1.5 font-bold uppercase shadow-sm"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>TEST REPLAY ATTACK (DUPLICATE)</span>
              </button>
            </div>
            <span className="text-[#3DDC97]">Processed: {webhookCount} TX</span>
          </div>

          {/* Terminal Output Log */}
          <div className="p-4 sm:p-6 font-mono text-xs space-y-2 min-h-[220px]">
            {webhookLog.map((log, index) => {
              const isWarning = log.includes("⚠️") || log.includes("REPLAY DETECTED");
              const isSuccess = log.includes("✓") || log.includes("200 OK");
              const isLock = log.includes("🔒") || log.includes("🛡️");

              return (
                <div
                  key={index}
                  className={`leading-relaxed ${
                    isWarning
                      ? "text-[#FF4D2E] font-bold"
                      : isSuccess
                      ? "text-[#3DDC97]"
                      : isLock
                      ? "text-[#FFC93C]"
                      : "text-white/80"
                  }`}
                >
                  {log}
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM MILESTONE BANNER */}
        <div className="border-3 border-[#14121A] bg-[#FFC93C] p-6 shadow-hard flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14121A]/80">
              PRODUCTION MILESTONE UNLOCKED
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#14121A]">
              From College Projects to Real-World High-Concurrency Production Engineering
            </h3>
          </div>
          <a
            href="#chapter-7"
            className="btn-press flex items-center gap-2 border-2 border-[#14121A] bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#14121A] shadow-hard-sm shrink-0"
          >
            <span>NEXT: SKILLS TOOLKIT</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
