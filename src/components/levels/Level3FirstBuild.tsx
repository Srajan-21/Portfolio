"use client";

import React, { useState } from "react";
import { useStickerWorld } from "@/context/StickerWorldContext";
import { Compass, ExternalLink, Plus, Trash2, CheckCircle2, Layers, Database, ShieldCheck, ArrowRight, Shield, UserCheck, Smartphone } from "lucide-react";

interface Stop {
  id: string;
  name: string;
  duration: string;
  cost: number;
  highlight: string;
  guideRecommended?: boolean;
}

export function Level3FirstBuild() {
  const { addStickers, completeQuest, unlockCard, setMascotSpeech } = useStickerWorld();

  const [activeRole, setActiveRole] = useState<"traveler" | "guide" | "admin">("traveler");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [customStopName, setCustomStopName] = useState("");

  const catalogStops: Stop[] = [
    { id: "s1", name: "Old Delhi Heritage Alley Walk", duration: "1.5h", cost: 500, highlight: "Centuries-old hidden courtyards & havelis", guideRecommended: true },
    { id: "s2", name: "Artisan Spice & Direct Trade Trail", duration: "1.0h", cost: 650, highlight: "Direct trade workshops & master craftsmen", guideRecommended: true },
    { id: "s3", name: "Monograph Sunset Viewpoint", duration: "2.0h", cost: 800, highlight: "Panoramic skyline & tea tasting", guideRecommended: false },
    { id: "s4", name: "Midnight Food Kitchens Tasting", duration: "1.5h", cost: 750, highlight: "Centuries-old street recipes", guideRecommended: true },
  ];

  const [itinerary, setItinerary] = useState<Stop[]>([catalogStops[0], catalogStops[1]]);

  // Trigger quest & reward upon interaction
  const triggerReward = () => {
    if (!hasInteracted) {
      addStickers(4, "tourphin_demo");
      completeQuest("q_tourphin");
      unlockCard("card_tourphin");
      setHasInteracted(true);
      setMascotSpeech("Tourphin was born at SIH! We built guide-customized plans and 99% webhook reliability!", 4500);
    }
  };

  const addStop = (stop: Stop) => {
    triggerReward();
    if (itinerary.some((s) => s.id === stop.id)) return;
    setItinerary((prev) => [...prev, stop]);
  };

  const removeStop = (id: string) => {
    triggerReward();
    setItinerary((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddCustomStop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customStopName.trim()) return;
    triggerReward();
    const newStop: Stop = {
      id: `custom-${Date.now()}`,
      name: customStopName.trim(),
      duration: "1.0h",
      cost: 600,
      highlight: "Custom local guide secret spot",
      guideRecommended: true,
    };
    setItinerary((prev) => [...prev, newStop]);
    setCustomStopName("");
  };

  const basePrice = 1200;
  const stopsCost = itinerary.reduce((acc, s) => acc + s.cost, 0);
  const totalCost = basePrice + stopsCost;

  return (
    <section
      id="chapter-3"
      className="relative min-h-screen w-full bg-[#FFF8EC] py-20 px-4 sm:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER STICKER HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#14121A] pb-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="bg-[#3DDC97] text-[#14121A] border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm rotate-[-1deg]">
              CHAPTER 03
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#14121A]/70">
              FIRST ARCHITECTURAL BUILD • 2023 &ndash; 2024
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#FFC93C] text-[#14121A] border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold shadow-hard-sm">
            <Compass className="h-3.5 w-3.5" />
            <span>SMART INDIA HACKATHON (SIH)</span>
          </div>
        </div>

        {/* HERO TITLE & INTRO */}
        <div className="mb-14 max-w-4xl">
          <div className="inline-block bg-white border-2 border-[#14121A] px-3 py-1 text-xs font-mono font-bold uppercase shadow-hard-sm mb-4 rotate-[1deg]">
            🧭 TOURPHIN &bull; TRAVEL &amp; LOCAL GUIDE ECOSYSTEM
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#14121A] leading-tight">
            Tourphin: Connecting Travelers <br />
            <span className="bg-[#FF8FB8] px-2 py-0.5 border-3 border-[#14121A] shadow-hard inline-block rotate-[-1deg] text-[#14121A]">
              With Authentic Local Guides
            </span>
          </h2>
          <p className="mt-6 font-sans text-lg md:text-xl text-[#14121A]/80 font-medium leading-relaxed max-w-3xl">
            Conceived for the Smart India Hackathon. Tourphin bridges travelers directly with verified local guides who know genuine hidden gems.
            Guides can introduce bespoke plans, travelers can customize stops into existing itineraries, and platform admins oversee security &mdash; backed by PostgreSQL normalization, RBAC for 3+ roles, and 99% Razorpay webhook reconciliation.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="https://tourphin-eight.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerReward}
              className="btn-press flex items-center gap-2 border-3 border-[#14121A] bg-[#2F5BFF] text-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider shadow-hard"
            >
              <span>LAUNCH LIVE DEMO ➔</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/Srajan-21/tourphin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press flex items-center gap-2 border-2 border-[#14121A] bg-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#14121A] shadow-hard-sm"
            >
              <span>GITHUB REPOSITORY</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* VERIFIED ARCHITECTURE METRICS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14 font-mono">
          <div className="border-3 border-[#14121A] bg-white p-4 shadow-hard">
            <span className="text-[10px] uppercase font-bold text-[#14121A]/60">QUERY PERFORMANCE</span>
            <div className="font-display text-3xl font-black text-[#2F5BFF] mt-1">~35%</div>
            <p className="font-sans text-xs text-[#14121A]/80 mt-1">Faster latency via DB indexing &amp; normalization</p>
          </div>
          <div className="border-3 border-[#14121A] bg-white p-4 shadow-hard">
            <span className="text-[10px] uppercase font-bold text-[#14121A]/60">SCHEMA CAPACITY</span>
            <div className="font-display text-3xl font-black text-[#3DDC97] mt-1">10,000+</div>
            <p className="font-sans text-xs text-[#14121A]/80 mt-1">Users, bookings &amp; payment transactions</p>
          </div>
          <div className="border-3 border-[#14121A] bg-white p-4 shadow-hard">
            <span className="text-[10px] uppercase font-bold text-[#14121A]/60">WEBHOOK SUCCESS</span>
            <div className="font-display text-3xl font-black text-[#FF4D2E] mt-1">99%</div>
            <p className="font-sans text-xs text-[#14121A]/80 mt-1">500+ monthly Razorpay webhook events</p>
          </div>
          <div className="border-3 border-[#14121A] bg-white p-4 shadow-hard">
            <span className="text-[10px] uppercase font-bold text-[#14121A]/60">FAILURE REDUCTION</span>
            <div className="font-display text-3xl font-black text-[#7B4DFF] mt-1">25%</div>
            <p className="font-sans text-xs text-[#14121A]/80 mt-1">Prevented via atomic transactional locks</p>
          </div>
        </div>

        {/* INTERACTIVE RETRO OS WINDOW: TOURPHIN BUILDER */}
        <div className="border-4 border-[#14121A] bg-white shadow-hard-lg mb-16 overflow-hidden">
          {/* OS Window Title Bar */}
          <div className="bg-[#14121A] text-white px-4 py-2.5 flex items-center justify-between font-mono text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF4D2E] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#FFC93C] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#3DDC97] inline-block" />
              <span className="ml-2">TOURPHIN_ITINERARY_STUDIO_v1.0.EXE</span>
            </div>
            <span className="text-white/60 hidden sm:inline">RBAC DEMO SYSTEM</span>
          </div>

          {/* Subbar: Role Switcher */}
          <div className="border-b-3 border-[#14121A] bg-[#FFF8EC] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase text-[#14121A]/70 mr-1">ACTIVE ROLE:</span>
              <button
                onClick={() => {
                  setActiveRole("traveler");
                  triggerReward();
                }}
                className={`px-3 py-1.5 font-mono text-xs font-bold border-2 border-[#14121A] transition-all ${
                  activeRole === "traveler"
                    ? "bg-[#2F5BFF] text-white shadow-hard-sm"
                    : "bg-white text-[#14121A]"
                }`}
              >
                TRAVELER / USER
              </button>
              <button
                onClick={() => {
                  setActiveRole("guide");
                  triggerReward();
                }}
                className={`px-3 py-1.5 font-mono text-xs font-bold border-2 border-[#14121A] transition-all ${
                  activeRole === "guide"
                    ? "bg-[#FF4D2E] text-white shadow-hard-sm"
                    : "bg-white text-[#14121A]"
                }`}
              >
                LOCAL GUIDE
              </button>
              <button
                onClick={() => {
                  setActiveRole("admin");
                  triggerReward();
                }}
                className={`px-3 py-1.5 font-mono text-xs font-bold border-2 border-[#14121A] transition-all ${
                  activeRole === "admin"
                    ? "bg-[#3DDC97] text-[#14121A] shadow-hard-sm"
                    : "bg-white text-[#14121A]"
                }`}
              >
                ADMIN CONTROL
              </button>
            </div>

            <div className="font-mono text-xs font-bold text-[#14121A]">
              EST. PACKAGE: ₹{totalCost}
            </div>
          </div>

          {/* OS Window Body */}
          <div className="p-6 sm:p-8">
            {/* ROLE 1: TRAVELER INTERFACE */}
            {activeRole === "traveler" && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-display text-xl font-black text-[#14121A]">
                    Custom Itinerary Builder
                  </h4>
                  <p className="font-sans text-xs text-[#14121A]/70 mt-1">
                    Travelers can accept the guide&apos;s base itinerary, or click to add/remove custom spots according to their personal preference.
                  </p>
                </div>

                {/* Current Active Stops */}
                <div className="border-2 border-[#14121A] bg-[#FFF8EC] p-4">
                  <span className="font-mono text-[10px] font-bold uppercase text-[#14121A]/60">
                    CURRENT ITINERARY STOPS ({itinerary.length})
                  </span>
                  <div className="mt-3 space-y-2">
                    {itinerary.map((stop, i) => (
                      <div
                        key={stop.id}
                        className="flex items-center justify-between border-2 border-[#14121A] bg-white p-3 shadow-hard-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#14121A] text-white flex items-center justify-center font-mono text-xs font-bold">
                            {i + 1}
                          </span>
                          <div>
                            <div className="font-mono text-xs font-bold text-[#14121A]">
                              {stop.name}
                            </div>
                            <span className="font-sans text-[11px] text-[#14121A]/70">
                              {stop.highlight} &bull; {stop.duration}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#2F5BFF]">
                            ₹{stop.cost}
                          </span>
                          {itinerary.length > 1 && (
                            <button
                              onClick={() => removeStop(stop.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Remove stop"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Catalog Additions */}
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-[#14121A]/60">
                    RECOMMENDED LOCAL SPOTS TO ADD
                  </span>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {catalogStops.map((stop) => {
                      const isAdded = itinerary.some((s) => s.id === stop.id);
                      return (
                        <button
                          key={stop.id}
                          disabled={isAdded}
                          onClick={() => addStop(stop)}
                          className={`flex items-center justify-between border-2 border-[#14121A] p-3 text-left transition-all ${
                            isAdded
                              ? "bg-gray-100 opacity-60 cursor-not-allowed"
                              : "bg-white hover:bg-[#FAF7F2] shadow-hard-sm"
                          }`}
                        >
                          <div>
                            <div className="font-mono text-xs font-bold text-[#14121A]">
                              {stop.name}
                            </div>
                            <div className="font-sans text-[10px] text-[#14121A]/70">
                              {stop.duration} &bull; ₹{stop.cost}
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold text-[#3DDC97]">
                            {isAdded ? "ADDED" : "+ ADD"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ROLE 2: GUIDE INTERFACE */}
            {activeRole === "guide" && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-display text-xl font-black text-[#14121A]">
                    Local Guide Creator Console
                  </h4>
                  <p className="font-sans text-xs text-[#14121A]/70 mt-1">
                    Guides know the real spots. Introduce your own custom stop into the tour plan to provide tourists with authentic experiences.
                  </p>
                </div>

                <form onSubmit={handleAddCustomStop} className="flex gap-2">
                  <input
                    type="text"
                    value={customStopName}
                    onChange={(e) => setCustomStopName(e.target.value)}
                    placeholder="Enter Secret Local Spot (e.g. Hidden Rooftop Tea Stall)..."
                    className="flex-1 border-2 border-[#14121A] px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-[#2F5BFF]"
                  />
                  <button
                    type="submit"
                    className="btn-press flex items-center gap-1.5 border-2 border-[#14121A] bg-[#FF4D2E] text-white px-4 py-2 font-mono text-xs font-bold uppercase shadow-hard-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>ADD SPOT</span>
                  </button>
                </form>

                <div className="border-2 border-[#14121A] bg-[#FFF8EC] p-4">
                  <span className="font-mono text-[10px] font-bold uppercase text-[#14121A]/60">
                    GUIDE APPROVAL MATRIX
                  </span>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div className="border border-[#14121A] bg-white p-3">
                      <span className="text-[10px] text-[#14121A]/60">STATUS</span>
                      <div className="font-bold text-[#3DDC97] mt-0.5">VERIFIED GUIDE</div>
                    </div>
                    <div className="border border-[#14121A] bg-white p-3">
                      <span className="text-[10px] text-[#14121A]/60">TOTAL BOOKINGS</span>
                      <div className="font-bold text-[#14121A] mt-0.5">142 COMPLETED</div>
                    </div>
                    <div className="border border-[#14121A] bg-white p-3">
                      <span className="text-[10px] text-[#14121A]/60">PAYOUT ACCURACY</span>
                      <div className="font-bold text-[#2F5BFF] mt-0.5">99.8% RECONCILED</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ROLE 3: ADMIN VIEW & WEBHOOK AUDIT */}
            {activeRole === "admin" && (
              <div className="space-y-6 font-mono text-xs">
                <div>
                  <h4 className="font-display text-xl font-black text-[#14121A]">
                    Admin Platform &amp; Razorpay Webhook Reconciler
                  </h4>
                  <p className="font-sans text-xs text-[#14121A]/70 mt-1">
                    Ensuring zero double-booking and tamper-proof payment verification using cryptographic HMAC SHA-256 signatures.
                  </p>
                </div>

                {/* Webhook Lifecycle Steps */}
                <div className="space-y-2">
                  <div className="border-2 border-[#14121A] bg-white p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#3DDC97] text-[#14121A] flex items-center justify-center font-bold text-[10px]">
                        ✓
                      </span>
                      <span>POST /api/webhooks/razorpay &bull; Event: payment.captured</span>
                    </div>
                    <span className="text-[#3DDC97] font-bold">200 OK</span>
                  </div>

                  <div className="border-2 border-[#14121A] bg-white p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#3DDC97] text-[#14121A] flex items-center justify-center font-bold text-[10px]">
                        ✓
                      </span>
                      <span>HMAC-SHA256 signature calculated against secret &amp; matched payload</span>
                    </div>
                    <span className="text-[#3DDC97] font-bold">VALIDATED</span>
                  </div>

                  <div className="border-2 border-[#14121A] bg-white p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#3DDC97] text-[#14121A] flex items-center justify-center font-bold text-[10px]">
                        ✓
                      </span>
                      <span>Atomic DB write: bookings.status = &apos;CONFIRMED&apos; (PostgreSQL transaction)</span>
                    </div>
                    <span className="text-[#3DDC97] font-bold">COMMITTED</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM MILESTONE BANNER */}
        <div className="border-3 border-[#14121A] bg-[#FFC93C] p-6 shadow-hard flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14121A]/80">
              BUILD MILESTONE UNLOCKED
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#14121A]">
              Tourphin Proved Full-Stack Web Architecture, RBAC &amp; Payment Reliability
            </h3>
          </div>
          <a
            href="#chapter-4"
            className="btn-press flex items-center gap-2 border-2 border-[#14121A] bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#14121A] shadow-hard-sm shrink-0"
          >
            <span>NEXT: NAGARRO PODIUM</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
