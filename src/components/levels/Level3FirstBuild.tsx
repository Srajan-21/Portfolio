"use client";

import React, { useState } from "react";
import { useCollector } from "@/context/CollectorContext";
import { Compass, ExternalLink, Plus, Trash2, CheckCircle2, ChevronRight, Layers, Database, ShieldCheck } from "lucide-react";
import { LineMaskReveal } from "@/components/motion/LineMaskReveal";
import { GoldMedallion } from "@/components/seals/GoldMedallion";

interface Stop {
  id: string;
  name: string;
  duration: string;
  cost: number;
  highlight: string;
}

export function Level3FirstBuild() {
  const { unlockSeal, sealsEarned, setCursorLabel } = useCollector();

  // Neutral curated itinerary stops
  const catalogStops: Stop[] = [
    { id: "s1", name: "Old Quarter Heritage Walk", duration: "1.5h", cost: 500, highlight: "Hidden courtyards & historical architecture" },
    { id: "s2", name: "Artisan Silk & Spice Trail", duration: "1.0h", cost: 650, highlight: "Direct trade workshops & local masters" },
    { id: "s3", name: "Monograph Sunset Point", duration: "2.0h", cost: 800, highlight: "Panoramic skyline & tea tasting" },
    { id: "s4", name: "Culinary Origins Tasting", duration: "1.5h", cost: 750, highlight: "Centuries-old recipes & street kitchens" },
  ];

  const [itinerary, setItinerary] = useState<Stop[]>([catalogStops[0]]);

  const hasSeal = sealsEarned.includes("seal_tourphin");

  const addStop = (stop: Stop) => {
    if (itinerary.some((s) => s.id === stop.id)) return;
    setItinerary((prev) => [...prev, stop]);
    unlockSeal("seal_tourphin");
  };

  const removeStop = (id: string) => {
    setItinerary((prev) => prev.filter((s) => s.id !== id));
  };

  const totalCost = itinerary.reduce((acc, s) => acc + s.cost, 1200);

  return (
    <section
      id="chapter-3"
      className="relative min-h-screen w-full border-b border-[#6F665A]/20 bg-[#FAF7F2] py-20 px-6 sm:px-12 md:py-28 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER FOLIO HEADER */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#8C6B3A]">CHAPTER III</span>
            <span className="text-[#6F665A]/40">&bull;</span>
            <span>FIRST ARCHITECTURAL BUILD // 2023 &ndash; 2024</span>
          </div>
          <span>SMART INDIA HACKATHON (SIH) &bull; TOURPHIN</span>
        </div>

        {/* CHAPTER TITLE & DEMO ACTION */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <LineMaskReveal threshold={0.1}>
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
                Tourphin <span className="italic font-serif text-[#6B1E1E]">Travel Platform</span>
              </h2>
            </LineMaskReveal>
            <p className="mt-4 font-serif text-lg font-light text-[#6F665A] leading-relaxed">
              Conceived for the Smart India Hackathon. The platform links travelers directly to verified neighborhood guides who create bespoke itineraries &mdash; built upon PostgreSQL normalization, role-based controls, and razor-sharp webhook reconciliation.
            </p>
          </div>

          <a
            href="https://tourphin-eight.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorLabel("DEMO")}
            onMouseLeave={() => setCursorLabel(null)}
            className="group flex items-center gap-2.5 rounded border border-[#6F665A]/30 bg-[#EDE5D3]/70 px-6 py-3 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:border-[#B08D57] hover:bg-[#EDE5D3] transition-all shadow-sm shrink-0"
          >
            <Compass className="h-4 w-4 text-[#B08D57]" />
            <span className="font-semibold">Visit Live Demo</span>
            <ExternalLink className="h-3 w-3 text-[#6F665A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 4 VERIFIED ENGINEERING SPECIFICATION PLATES */}
        <div className="mb-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded border border-[#6F665A]/20 bg-[#F6F1E7] p-6 text-center shadow-sm">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
              QUERY EFFICIENCY
            </span>
            <div className="my-2 font-display text-4xl font-light text-[#8C6B3A]">
              ~35%
            </div>
            <span className="font-mono text-[10px] text-[#6F665A]">
              Index &amp; 3NF Normalization
            </span>
          </div>

          <div className="rounded border border-[#6F665A]/20 bg-[#F6F1E7] p-6 text-center shadow-sm">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
              SCHEMA SCALE
            </span>
            <div className="my-2 font-display text-4xl font-light text-[#14110F]">
              10,000+
            </div>
            <span className="font-mono text-[10px] text-[#6F665A]">
              Users &amp; Transaction Logs
            </span>
          </div>

          <div className="rounded border border-[#6F665A]/20 bg-[#F6F1E7] p-6 text-center shadow-sm">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
              WEBHOOK RECONCILIATION
            </span>
            <div className="my-2 font-display text-4xl font-light text-[#8C6B3A]">
              99%
            </div>
            <span className="font-mono text-[10px] text-[#6F665A]">
              Success Across 500+ Mo. Txns
            </span>
          </div>

          <div className="rounded border border-[#6F665A]/20 bg-[#F6F1E7] p-6 text-center shadow-sm">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
              TRANSACTIONAL SAFETY
            </span>
            <div className="my-2 font-display text-4xl font-light text-[#6B1E1E]">
              &minus;25%
            </div>
            <span className="font-mono text-[10px] text-[#6F665A]">
              Booking Failure Reduction
            </span>
          </div>
        </div>

        {/* TWO-COLUMN ARCHITECTURAL BREAKDOWN */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 mb-16">
          {/* LEFT: THE SIH SPECIFICATION */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border border-[#6F665A]/20 bg-[#F6F1E7] p-8 shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8C6B3A] font-semibold">
                SYSTEM ARCHITECTURE &amp; RBAC
              </span>

              <div className="mt-6 font-serif text-base leading-relaxed text-[#14110F]/90 space-y-4">
                <p>
                  Built as our debut entry for the <strong>Smart India Hackathon (SIH)</strong>, Tourphin challenged the rigid structure of mass tourism.
                  Traditional portals lock visitors into static group packages. We built a system allowing authentic local residents to publish curated plans, and granted travelers the power to modify itineraries dynamically.
                </p>
                <p>
                  To manage concurrent stakeholders, I implemented strict <strong>Role-Based Access Control (RBAC)</strong> across three distinct personas:
                </p>
                <ul className="space-y-2 font-mono text-xs text-[#14110F]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#B08D57] shrink-0 mt-0.5" />
                    <span><strong>Administrator:</strong> Global audit logs, dispute arbitration, guide KYC verification.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#B08D57] shrink-0 mt-0.5" />
                    <span><strong>Local Guide:</strong> Bespoke itinerary authoring, pricing thresholds, booking confirmations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#B08D57] shrink-0 mt-0.5" />
                    <span><strong>Traveler:</strong> Custom stop insertions, Razorpay payment flows, real-time reviews.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* STACK TELEMETRY */}
            <div className="rounded border border-[#6F665A]/20 bg-[#EDE5D3]/50 p-6 font-mono text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#6F665A] block mb-3 font-semibold">
                PROVENANCE TECH STACK
              </span>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {["React", "Supabase", "PostgreSQL", "Razorpay Webhooks", "Gemini API", "AWS S3 / IAM / CloudFront"].map((tech) => (
                  <span key={tech} className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] px-2.5 py-1 text-[#14110F]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE ITINERARY CUSTOMIZER */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#6F665A]/20 pb-4 font-mono text-[10px] text-[#6F665A]">
                <span className="font-semibold text-[#8C6B3A]">INTERACTIVE ITINERARY ENGINE</span>
                <span>CUSTOM STOP MODIFIER</span>
              </div>

              <p className="mt-4 font-serif text-sm text-[#6F665A]">
                Experience how Tourphin allows travelers to customize guide plans by appending authentic cultural stops in real time:
              </p>

              {/* Active Itinerary List */}
              <div className="my-6 space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#6F665A] block">
                  CURRENT COMMITTED ITINERARY ({itinerary.length} STOPS)
                </span>
                {itinerary.map((stop, idx) => (
                  <div
                    key={stop.id}
                    className="flex items-center justify-between rounded border border-[#6F665A]/15 bg-[#F6F1E7] p-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-semibold text-[#8C6B3A]">
                        0{idx + 1}
                      </span>
                      <div>
                        <span className="font-medium text-[#14110F] block">{stop.name}</span>
                        <span className="font-serif text-[11px] text-[#6F665A]">{stop.highlight}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-[#6F665A]">{stop.duration} &bull; ₹{stop.cost}</span>
                      {itinerary.length > 1 && (
                        <button
                          onClick={() => removeStop(stop.id)}
                          className="text-[#6F665A] hover:text-[#6B1E1E]"
                          title="Remove stop"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Addable Stops Drawer */}
              <div className="mt-4 border-t border-[#6F665A]/15 pt-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#6F665A] block mb-2">
                  AVAILABLE LOCAL STOPS TO APPEND:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {catalogStops.map((stop) => {
                    const isAdded = itinerary.some((s) => s.id === stop.id);
                    return (
                      <button
                        key={stop.id}
                        onClick={() => addStop(stop)}
                        disabled={isAdded}
                        className={`flex items-center justify-between rounded border p-2.5 text-left text-xs transition-all ${
                          isAdded
                            ? "border-[#6F665A]/15 bg-[#EDE5D3]/30 opacity-60 cursor-default"
                            : "border-[#6F665A]/25 bg-[#FAF7F2] hover:border-[#B08D57] hover:bg-[#EDE5D3]/50"
                        }`}
                      >
                        <div>
                          <span className="font-medium text-[#14110F]">{stop.name}</span>
                          <span className="font-serif text-[10px] text-[#6F665A] block">{stop.duration}</span>
                        </div>
                        <span className="font-mono text-[11px] font-semibold text-[#8C6B3A]">
                          {isAdded ? "Added" : `+ ₹${stop.cost}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calculated Total Bar */}
              <div className="mt-6 flex items-center justify-between border-t border-[#6F665A]/20 pt-4 font-mono text-xs">
                <span className="text-[#6F665A]">Total Est. Package:</span>
                <span className="text-base font-semibold text-[#14110F]">₹{totalCost}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEAL CONFERMENT CARD */}
        <div className="rounded border border-[#B08D57]/40 bg-[#FAF7F2] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <GoldMedallion
              numeral="III"
              title="The Architect"
              isUnlocked={hasSeal}
              size="lg"
            />
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#8C6B3A]">
                CHAPTER III SEAL &bull; THE ARCHITECT
              </span>
              <h4 className="font-display text-xl font-medium text-[#14110F]">
                {hasSeal ? "Seal Conferred &amp; Inscribed" : "First Full-Stack Architecture"}
              </h4>
              <p className="font-serif text-xs text-[#6F665A] mt-1">
                Conferred upon inspecting the Tourphin SIH travel platform and verified production metrics.
              </p>
            </div>
          </div>

          {!hasSeal ? (
            <button
              onClick={() => unlockSeal("seal_tourphin")}
              onMouseEnter={() => setCursorLabel("CLAIM")}
              onMouseLeave={() => setCursorLabel(null)}
              className="flex items-center gap-2 rounded border border-[#B08D57] bg-[#EDE5D3] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:bg-[#FAF7F2] transition-colors"
            >
              <span>Confer Seal III</span>
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
