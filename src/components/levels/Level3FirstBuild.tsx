"use client";

import React, { useState } from "react";
import { useCollector } from "@/context/CollectorContext";
import { Compass, ExternalLink, Plus, Trash2 } from "lucide-react";

interface Stop {
  id: string;
  name: string;
  duration: string;
  cost: number;
}

export function Level3FirstBuild() {
  const { unlockSeal } = useCollector();

  // Neutral curated itinerary stops (no invented specific vendor names)
  const availableStops: Stop[] = [
    { id: "s1", name: "Curated Heritage Trail", duration: "1.5h", cost: 500 },
    { id: "s2", name: "Local Culinary Exploration", duration: "1.0h", cost: 650 },
    { id: "s3", name: "Historic District Sunset Walk", duration: "2.0h", cost: 800 },
  ];

  const [itinerary, setItinerary] = useState<Stop[]>([availableStops[0]]);

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
      className="relative min-h-screen w-full border-b-hairline bg-[#FAF7F2] py-20 px-6 sm:px-12 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* Chapter Header */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b-hairline pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="text-[#8C6B3A] font-semibold">CHAPTER III</span>
            <span>&bull;</span>
            <span>FIRST ARCHITECTURAL BUILD // 2023 &ndash; 2024</span>
          </div>
          <span>SMART INDIA HACKATHON &bull; TOURPHIN</span>
        </div>

        {/* Chapter Title */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
              Tourphin <span className="italic font-serif text-[#6B1E1E]">Travel Platform</span>
            </h2>
            <p className="mt-4 max-w-2xl font-serif text-lg font-light text-[#6F665A] leading-relaxed">
              Connecting travelers directly with local guides who possess authentic neighborhood knowledge &mdash; backed by PostgreSQL normalization, transactional webhooks, and AWS CloudFront.
            </p>
          </div>

          <a
            href="https://tourphin-eight.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border border-[#6F665A]/30 bg-[#EDE5D3]/60 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:border-[#B08D57] hover:bg-[#EDE5D3] transition-colors shrink-0"
          >
            <Compass className="h-3.5 w-3.5 text-[#B08D57]" />
            <span>Visit Live Demo</span>
            <ExternalLink className="h-3 w-3 text-[#6F665A]" />
          </a>
        </div>

        {/* 4 Resume Metric Cards */}
        <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded border-hairline bg-[#F6F1E7] p-6 text-center shadow-editorial">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
              QUERY EFFICIENCY
            </span>
            <div className="my-2 font-display text-4xl font-light text-[#8C6B3A]">
              ~35%
            </div>
            <span className="font-mono text-[10px] text-[#6F665A]">
              Index &amp; Normalization Gain
            </span>
          </div>

          <div className="rounded border-hairline bg-[#F6F1E7] p-6 text-center shadow-editorial">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
              DATABASE SCALE
            </span>
            <div className="my-2 font-display text-4xl font-light text-[#14110F]">
              10,000+
            </div>
            <span className="font-mono text-[10px] text-[#6F665A]">
              Users &amp; Transaction Logs
            </span>
          </div>

          <div className="rounded border-hairline bg-[#F6F1E7] p-6 text-center shadow-editorial">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
              PAYMENT VERIFICATION
            </span>
            <div className="my-2 font-display text-4xl font-light text-[#8C6B3A]">
              99%
            </div>
            <span className="font-mono text-[10px] text-[#6F665A]">
              500+ Monthly Razorpay Txns
            </span>
          </div>

          <div className="rounded border-hairline bg-[#F6F1E7] p-6 text-center shadow-editorial">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6F665A]">
              FAILURE REDUCTION
            </span>
            <div className="my-2 font-display text-4xl font-light text-[#6B1E1E]">
              25%
            </div>
            <span className="font-mono text-[10px] text-[#6F665A]">
              Transactional Check Guards
            </span>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Architectural Dossier */}
          <div className="space-y-6 lg:col-span-7">
            <div className="rounded border-hairline bg-[#F6F1E7] p-8 shadow-editorial">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C6B3A] font-semibold">
                SYSTEM SPECIFICATIONS
              </span>

              <div className="mt-6 font-serif text-base leading-relaxed text-[#14110F]/90 space-y-4">
                <p>
                  Built for the Smart India Hackathon (SIH), Tourphin was conceived to eliminate friction between travelers and real local guides:
                </p>
                <ul className="space-y-2.5 font-mono text-xs text-[#6F665A] list-disc list-inside">
                  <li>
                    <strong className="text-[#14110F]">Role-Based Access Control:</strong> Isolated dashboards for Travelers, Verified Guides, and Platform Administrators.
                  </li>
                  <li>
                    <strong className="text-[#14110F]">Dynamic Itinerary Modification:</strong> Guides introduce custom plans, and travelers can add custom waypoints with live fee adjustments.
                  </li>
                  <li>
                    <strong className="text-[#14110F]">Webhook Idempotency:</strong> Razorpay payment signatures are validated cryptographically to prevent duplicate reservations.
                  </li>
                  <li>
                    <strong className="text-[#14110F]">Cloud Edge Caching:</strong> Verification documents and media delivered via AWS S3 and CloudFront.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Itinerary Demo */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded border-hairline bg-[#EDE5D3]/40 p-6 shadow-editorial">
              <div className="flex items-center justify-between border-b-hairline pb-3 font-mono text-[10px] text-[#6F665A]">
                <span className="font-medium text-[#14110F]">
                  ITINERARY CONFIGURATION PLATE
                </span>
                <span>INTERACTIVE</span>
              </div>

              <div className="mt-4 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#6F665A]">
                  Active Selected Stops:
                </span>
                <div className="rounded border-hairline bg-[#F6F1E7] p-3 font-mono text-xs">
                  <div className="text-[11px] text-[#8C6B3A] font-medium">
                    &bull; Base Guide Standard Route &mdash; ₹1,200
                  </div>
                  {itinerary.map((stop) => (
                    <div
                      key={stop.id}
                      className="mt-2 flex items-center justify-between rounded bg-[#EDE5D3]/50 px-2.5 py-1.5"
                    >
                      <span className="text-[11px] text-[#14110F]">
                        + {stop.name} ({stop.duration})
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#8C6B3A]">₹{stop.cost}</span>
                        <button
                          onClick={() => removeStop(stop.id)}
                          className="text-[#6F665A] hover:text-[#6B1E1E]"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Custom Stop Options */}
              <div className="mt-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#6F665A]">
                  Available Optional Waypoints:
                </span>
                <div className="mt-2 space-y-1.5">
                  {availableStops.map((stop) => {
                    const isAdded = itinerary.some((s) => s.id === stop.id);
                    return (
                      <button
                        key={stop.id}
                        onClick={() => addStop(stop)}
                        disabled={isAdded}
                        className={`flex w-full items-center justify-between rounded border p-2 text-left font-mono text-xs transition-colors ${
                          isAdded
                            ? "border-hairline opacity-40 bg-transparent"
                            : "border-hairline bg-[#F6F1E7] hover:border-[#B08D57]"
                        }`}
                      >
                        <span className="text-[11px] text-[#14110F]">{stop.name}</span>
                        <div className="flex items-center gap-1.5 text-[#8C6B3A] font-medium text-[11px]">
                          <span>₹{stop.cost}</span>
                          {!isAdded && <Plus className="h-3 w-3" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex items-baseline justify-between border-t-hairline pt-3 font-mono">
                <span className="text-[10px] uppercase text-[#6F665A]">Calculated Total:</span>
                <span className="font-display text-2xl font-light text-[#14110F]">
                  ₹{totalCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
