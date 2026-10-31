"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/sound";
import { useJournal } from "@/context/JournalContext";
import { Compass, ExternalLink, ShieldCheck, Database, CheckCircle, Plus, Trash2 } from "lucide-react";

interface Stop {
  id: string;
  name: string;
  duration: string;
  cost: number;
}

export function Level3FirstBuild() {
  const { addXP } = useJournal();

  // Interactive itinerary stops
  const availableStops: Stop[] = [
    { id: "s1", name: "Old Delhi Secret Spice Trail", duration: "1.5h", cost: 450 },
    { id: "s2", name: "Hidden Heritage Haveli Tea", duration: "1.0h", cost: 600 },
    { id: "s3", name: "Yamuna Sunset Boat Watch", duration: "2.0h", cost: 850 },
  ];

  const [itinerary, setItinerary] = useState<Stop[]>([availableStops[0]]);

  const addStop = (stop: Stop) => {
    if (itinerary.some((s) => s.id === stop.id)) return;
    soundEngine.playClick();
    setItinerary((prev) => [...prev, stop]);
    addXP(20, "TOURPHIN ITINERARY CUSTOMIZED");
  };

  const removeStop = (id: string) => {
    soundEngine.playClick();
    setItinerary((prev) => prev.filter((s) => s.id !== id));
  };

  const totalCost = itinerary.reduce((acc, s) => acc + s.cost, 1200); // 1200 base guide booking fee

  return (
    <section
      id="level-3"
      className="relative min-h-screen w-full border-b-2 border-dashed border-[#D3C4A5] bg-[#FBF8F1] py-16 px-4 transition-colors duration-300 sm:px-8 md:py-24 dark:border-[#3A3328] dark:bg-[#1B1814]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Level Header */}
        <div className="mb-10 flex flex-wrap items-baseline justify-between border-b border-[#D3C4A5] pb-4 font-mono text-xs uppercase tracking-wider text-[#837B6D] dark:border-[#3A3328] dark:text-[#7E7565]">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#D9432B] px-2 py-0.5 font-bold text-white">
              LEVEL 03
            </span>
            <span>FIRST ARCHITECTURAL BUILD // 2023 &ndash; 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#7A8B6F] animate-pulse" />
            <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">TOURPHIN PLATFORM</span>
          </div>
        </div>

        {/* Level Title */}
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2
              data-text="LEVEL 3: TOURPHIN TRAVEL ENGINE"
              className="riso-title font-display text-3xl font-black uppercase tracking-tight text-[#1B1A17] sm:text-5xl md:text-6xl dark:text-[#EBE3D3]"
            >
              TOURPHIN TRAVEL ENGINE
            </h2>
            <p className="mt-3 max-w-3xl font-serif text-lg italic text-[#4B463E] sm:text-xl dark:text-[#B2A896]">
              &ldquo;Connecting travelers with real local guides who actually know the secret spots &mdash; backed by PostgreSQL indexing, transactional webhooks, and AWS CloudFront.&rdquo;
            </p>
          </div>

          {/* Live Link Button */}
          <div className="flex shrink-0 items-center gap-3">
            <a
              href="https://tourphin-eight.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="flex items-center gap-2 rounded border-2 border-[#1B1A17] bg-[#D9432B] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#1B1A17] transition-all hover:translate-x-[1px] hover:translate-y-[1px] dark:border-[#EBE3D3] dark:shadow-[3px_3px_0px_0px_#EBE3D3]"
            >
              <Compass className="h-4 w-4" />
              <span>Launch Live Tourphin</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* 4 Architectural Metric Stamps */}
        <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="stamp-border rounded bg-[#F2EBDD] p-4 text-center dark:bg-[#24201A]">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#837B6D] dark:text-[#7E7565]">
              QUERY EFFICIENCY
            </span>
            <div className="my-1 font-display text-3xl font-black text-[#D9432B] dark:text-[#E55840]">
              ~35%
            </div>
            <span className="font-mono text-[11px] text-[#4B463E] dark:text-[#B2A896]">
              via Indexing &amp; Normalization
            </span>
          </div>

          <div className="stamp-border rounded bg-[#F2EBDD] p-4 text-center dark:bg-[#24201A]">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#837B6D] dark:text-[#7E7565]">
              SCHEMA CAPACITY
            </span>
            <div className="my-1 font-display text-3xl font-black text-[#1B1A17] dark:text-[#EBE3D3]">
              10,000+
            </div>
            <span className="font-mono text-[11px] text-[#4B463E] dark:text-[#B2A896]">
              Users, Bookings &amp; Logs
            </span>
          </div>

          <div className="stamp-border rounded bg-[#F2EBDD] p-4 text-center dark:bg-[#24201A]">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#837B6D] dark:text-[#7E7565]">
              RAZORPAY SUCCESS
            </span>
            <div className="my-1 font-display text-3xl font-black text-[#7A8B6F] dark:text-[#92A585]">
              99%
            </div>
            <span className="font-mono text-[11px] text-[#4B463E] dark:text-[#B2A896]">
              Across 500+ Monthly Txns
            </span>
          </div>

          <div className="stamp-border rounded bg-[#F2EBDD] p-4 text-center dark:bg-[#24201A]">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#837B6D] dark:text-[#7E7565]">
              FAILURE REDUCTION
            </span>
            <div className="my-1 font-display text-3xl font-black text-[#C99A3B] dark:text-[#DEB459]">
              25%
            </div>
            <span className="font-mono text-[11px] text-[#4B463E] dark:text-[#B2A896]">
              Transactional Check Guards
            </span>
          </div>
        </div>

        {/* Narrative & Interactive Itinerary Machine */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column (7 cols): Engineering Dossier */}
          <div className="space-y-6 lg:col-span-7">
            <div className="rounded border-2 border-[#1B1A17] bg-[#F2EBDD] p-6 shadow-[5px_5px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[5px_5px_0px_0px_#EBE3D3]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D9432B] dark:text-[#E55840]">
                SMART INDIA HACKATHON (SIH) ORIGIN STORY
              </span>

              <div className="mt-4 space-y-4 font-serif text-base leading-relaxed text-[#1B1A17] dark:text-[#EBE3D3]">
                <p>
                  Commercial tourism is filled with generic, overpriced packages that miss real city culture.
                  We asked: <em>What if tourists could book authentic local guides, and guides could introduce their own curated routes?</em>
                </p>
                <p>
                  Tourphin was built from the ground up to solve this:
                </p>
                <ul className="list-inside list-disc space-y-2 font-mono text-xs text-[#4B463E] dark:text-[#B2A896]">
                  <li>
                    <strong>Granular RBAC:</strong> Dedicated interfaces for Travelers, Verified Local Guides, and Platform Administrators.
                  </li>
                  <li>
                    <strong>Dynamic Itinerary Customization:</strong> Travelers can take an existing route and add custom hidden stops; guides review and accept or adjust fees before confirmation.
                  </li>
                  <li>
                    <strong>Razorpay Webhook Verification:</strong> Cryptographically validated payment events synced with database status to eliminate ghost bookings.
                  </li>
                  <li>
                    <strong>AWS Media Pipeline:</strong> Guide credentials and landmark photography hosted on AWS S3 with CloudFront edge caching.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Guide Itinerary Customizer */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-5 shadow-[6px_6px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[6px_6px_0px_0px_#EBE3D3]">
              <div className="flex items-center justify-between border-b border-[#D3C4A5] pb-2 font-mono text-xs dark:border-[#3A3328]">
                <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                  INTERACTIVE ITINERARY MACHINE
                </span>
                <span className="text-[#837B6D] dark:text-[#7E7565]">LIVE DEMO</span>
              </div>

              {/* Current Itinerary Stops */}
              <div className="mt-4 space-y-2">
                <span className="font-mono text-[11px] font-bold uppercase text-[#837B6D] dark:text-[#7E7565]">
                  Active Itinerary Route:
                </span>
                <div className="rounded border border-[#D3C4A5] bg-[#F2EBDD] p-2.5 font-mono text-xs dark:border-[#3A3328] dark:bg-[#181512]">
                  <div className="text-[11px] font-bold text-[#7A8B6F] dark:text-[#92A585]">
                    &bull; Base Guide Day Pass &mdash; ₹1,200
                  </div>
                  {itinerary.map((stop) => (
                    <div
                      key={stop.id}
                      className="mt-1.5 flex items-center justify-between rounded bg-[#E4D7C2]/60 px-2 py-1 dark:bg-[#24201A]"
                    >
                      <span>
                        + {stop.name} ({stop.duration})
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#D9432B]">₹{stop.cost}</span>
                        <button
                          onClick={() => removeStop(stop.id)}
                          title="Remove stop"
                          className="text-[#837B6D] hover:text-[#D9432B]"
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
                <span className="font-mono text-[11px] font-bold uppercase text-[#837B6D] dark:text-[#7E7565]">
                  Available Local Hidden Gems:
                </span>
                <div className="mt-1.5 space-y-1.5">
                  {availableStops.map((stop) => {
                    const isAdded = itinerary.some((s) => s.id === stop.id);
                    return (
                      <button
                        key={stop.id}
                        onClick={() => addStop(stop)}
                        disabled={isAdded}
                        className={`flex w-full items-center justify-between rounded border p-2 text-left font-mono text-xs transition-colors ${
                          isAdded
                            ? "border-dashed border-[#837B6D]/40 opacity-50"
                            : "border-[#1B1A17] bg-[#F2EBDD] hover:border-[#D9432B] dark:border-[#EBE3D3] dark:bg-[#181512]"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                            {stop.name}
                          </div>
                          <div className="text-[10px] text-[#837B6D]">
                            Duration: {stop.duration}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 font-bold text-[#D9432B]">
                          <span>₹{stop.cost}</span>
                          {isAdded ? <CheckCircle className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calculated Total Bar */}
              <div className="mt-5 flex items-center justify-between border-t border-[#D3C4A5] pt-3 font-mono dark:border-[#3A3328]">
                <span className="text-xs uppercase text-[#837B6D]">
                  Estimated Total:
                </span>
                <span className="text-lg font-black text-[#1B1A17] dark:text-[#EBE3D3]">
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
