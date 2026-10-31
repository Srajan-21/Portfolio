"use client";

import React, { useState, useEffect } from "react";
import { useStickerWorld } from "@/context/StickerWorldContext";
import { Code, Music, Guitar, Users, Award, Calendar, Sparkles, BookOpen, Volume2, ArrowRight } from "lucide-react";

export function Level1Origins() {
  const { addStickers, completeQuest, unlockCard, setMascotSpeech, soundEnabled } = useStickerWorld();
  const [activeLane, setActiveLane] = useState<"all" | "code" | "music">("all");
  const [guitarStrummed, setGuitarStrummed] = useState(false);
  const [hasClaimedReward, setHasClaimedReward] = useState(false);

  // Complete quest when visitor reaches Chapter 1
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("chapter-1");
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.6 && rect.bottom >= 0) {
          completeQuest("q_timeline");
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [completeQuest]);

  // Audio synthesizer for electric guitar chord
  const playGuitarRiff = () => {
    setGuitarStrummed(true);
    setTimeout(() => setGuitarStrummed(false), 800);

    // Audio synth
    if (soundEnabled && typeof window !== "undefined") {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const freqs = [196, 246.94, 293.66, 392]; // G major open chord

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.04);

          gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + idx * 0.04);
          osc.stop(ctx.currentTime + 1.2);
        });
      } catch {}
    }

    if (!hasClaimedReward) {
      addStickers(2, "guitar_riff");
      unlockCard("card_octave_president");
      unlockCard("card_bpit_matriculation");
      setHasClaimedReward(true);
      setMascotSpeech("Rock on! Octave taught me teamwork and stage presence alongside low-level C++!", 4500);
    }
  };

  return (
    <section
      id="chapter-1"
      className="relative min-h-screen w-full bg-[#FFF8EC] py-20 px-4 sm:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER STICKER HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#14121A] pb-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="bg-[#FF4D2E] text-white border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm rotate-[-2deg]">
              CHAPTER 01
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#14121A]/70">
              ORIGINS • 2022 &ndash; 2026
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#FFC93C] text-[#14121A] border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold shadow-hard-sm">
            <Calendar className="h-3.5 w-3.5" />
            <span>DAY ONE: 09 NOV 2022</span>
          </div>
        </div>

        {/* HERO TITLE & INTRO */}
        <div className="mb-14 max-w-4xl">
          <div className="inline-block bg-white border-2 border-[#14121A] px-3 py-1 text-xs font-mono font-bold uppercase shadow-hard-sm mb-4 rotate-[1deg]">
            🏫 BHAGWAN PARSHURAM INSTITUTE OF TECHNOLOGY (BPIT DELHI)
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#14121A] leading-tight">
            The Spark in Code, <br />
            <span className="bg-[#FFC93C] px-2 py-0.5 border-3 border-[#14121A] shadow-hard inline-block rotate-[-1deg] text-[#14121A]">
              The Stage in Octave.
            </span>
          </h2>
          <p className="mt-6 font-sans text-lg md:text-xl text-[#14121A]/80 font-medium leading-relaxed max-w-3xl">
            On November 9, 2022, I walked onto the BPIT campus to pursue B.Tech in Information Technology.
            Two parallel paths started that very week: hacking low-level memory in C++ by day, and electric guitar rehearsals with the college music society by night.
          </p>
        </div>

        {/* INTERACTIVE CONTROLS & LANE SWITCHER */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase text-[#14121A]/70 mr-1">VIEW LANE:</span>
            <button
              onClick={() => setActiveLane("all")}
              className={`px-4 py-2 font-mono text-xs font-bold border-2 border-[#14121A] transition-all ${
                activeLane === "all"
                  ? "bg-[#14121A] text-white shadow-hard-sm -translate-y-0.5"
                  : "bg-white text-[#14121A] hover:bg-[#FAF7F2]"
              }`}
            >
              DUAL TRAJECTORY
            </button>
            <button
              onClick={() => setActiveLane("code")}
              className={`flex items-center gap-1.5 px-4 py-2 font-mono text-xs font-bold border-2 border-[#14121A] transition-all ${
                activeLane === "code"
                  ? "bg-[#2F5BFF] text-white shadow-hard-sm -translate-y-0.5"
                  : "bg-white text-[#14121A] hover:bg-[#FAF7F2]"
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              CODE LANE
            </button>
            <button
              onClick={() => setActiveLane("music")}
              className={`flex items-center gap-1.5 px-4 py-2 font-mono text-xs font-bold border-2 border-[#14121A] transition-all ${
                activeLane === "music"
                  ? "bg-[#FF4D2E] text-white shadow-hard-sm -translate-y-0.5"
                  : "bg-white text-[#14121A] hover:bg-[#FAF7F2]"
              }`}
            >
              <Guitar className="h-3.5 w-3.5" />
              MUSIC LANE
            </button>
          </div>

          {/* Interactive Guitar Pluck Button */}
          <button
            onClick={playGuitarRiff}
            className={`btn-press flex items-center gap-2 border-3 border-[#14121A] bg-[#FF8FB8] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#14121A] shadow-hard ${
              guitarStrummed ? "scale-95 bg-[#3DDC97]" : ""
            }`}
          >
            <Guitar className="h-4 w-4" />
            <span>{hasClaimedReward ? "STRUM GUITAR 🎸" : "PLUCK GUITAR (+2 STICKERS) ⭐"}</span>
          </button>
        </div>

        {/* DUAL STRAND TIMELINE GRID */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mb-16">
          {/* LANE 1: CODE & SYSTEMS (Left or Full) */}
          {(activeLane === "all" || activeLane === "code") && (
            <div className={`space-y-6 ${activeLane === "all" ? "lg:col-span-6" : "lg:col-span-12"}`}>
              {/* Strand Card */}
              <div className="relative border-3 border-[#14121A] bg-white p-6 sm:p-8 shadow-hard">
                {/* Washi tape header */}
                <div className="absolute -top-3 left-6 bg-[#2F5BFF] text-white border-2 border-[#14121A] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider shadow-hard-sm rotate-[-1deg]">
                  LANE A // SYSTEMS & CODE
                </div>

                <div className="mt-4 flex items-center justify-between border-b-2 border-[#14121A]/10 pb-3 font-mono text-xs text-[#14121A]/70">
                  <span className="font-bold text-[#14121A]">B.Tech Information Technology</span>
                  <span>9 Nov 2022 &ndash; Present</span>
                </div>

                <div className="mt-6 space-y-4 font-sans text-base text-[#14121A] leading-relaxed">
                  <p>
                    I didn&apos;t want to just memorize web syntax. From week one, I wanted to understand the machine: how high-level code translates into memory registers, heap buffers, and pointer arithmetic.
                  </p>
                  <p>
                    I started deep with <strong>C++</strong>: exploring Object-Oriented Design, data structures, and algorithmic complexity. Understanding manual memory safety and pointer addresses built the mental bedrock that later made high-concurrency Node.js, distributed database indexing, and realtime architectures natural.
                  </p>
                </div>

                {/* Comic Quote Sticky */}
                <div className="mt-6 border-2 border-[#14121A] bg-[#FFF8EC] p-4 shadow-hard-sm rotate-[1deg]">
                  <p className="font-hand text-lg text-[#14121A] leading-snug">
                    &ldquo;A computer doesn&apos;t execute dreams; it executes instructions. Precision is the only courtesy the CPU respects.&rdquo;
                  </p>
                  <span className="mt-1 block font-mono text-[10px] uppercase font-bold text-[#14121A]/60">
                    &mdash; Day 1 Notebook Entry
                  </span>
                </div>
              </div>

              {/* Polaroid Snapshot: Matriculation Roll */}
              <div className="group relative border-3 border-[#14121A] bg-[#FFF8EC] p-4 shadow-hard rotate-[-1.5deg] hover:rotate-0 transition-transform">
                <div className="aspect-[16/9] w-full border-2 border-[#14121A] bg-[#EDE5D3] flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-4xl mb-2">🎓</div>
                  <span className="font-mono text-sm font-bold text-[#14121A]">MATRICULATION ARCHIVE</span>
                  <span className="font-mono text-xs text-[#14121A]/70">Bhagwan Parshuram Institute of Technology</span>
                  <span className="mt-2 inline-block rounded bg-[#2F5BFF] text-white px-2 py-0.5 font-mono text-[10px] font-bold">
                    DEPT OF INFORMATION TECHNOLOGY
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-xs text-[#14121A]/80">
                  <span className="font-hand text-lg font-bold">First spark at BPIT</span>
                  <span>09.11.2022</span>
                </div>
              </div>
            </div>
          )}

          {/* LANE 2: OCTAVE MUSIC SOCIETY (Right or Full) */}
          {(activeLane === "all" || activeLane === "music") && (
            <div className={`space-y-6 ${activeLane === "all" ? "lg:col-span-6" : "lg:col-span-12"}`}>
              {/* Strand Card */}
              <div className="relative border-3 border-[#14121A] bg-white p-6 sm:p-8 shadow-hard">
                {/* Washi tape header */}
                <div className="absolute -top-3 left-6 bg-[#FF4D2E] text-white border-2 border-[#14121A] px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider shadow-hard-sm rotate-[1deg]">
                  LANE B // OCTAVE MUSIC SOCIETY
                </div>

                <div className="mt-4 flex items-center justify-between border-b-2 border-[#14121A]/10 pb-3 font-mono text-xs text-[#14121A]/70">
                  <span className="font-bold text-[#14121A]">Official Music Society of BPIT</span>
                  <span>Semester 1 &ndash; Present</span>
                </div>

                <div className="mt-6 space-y-4 font-sans text-base text-[#14121A] leading-relaxed">
                  <p>
                    In my <strong>1st semester</strong>, I auditioned and joined Octave as an electric guitarist. I spent weekends rehearsing, gigging, and representing BPIT across Delhi NCR&apos;s inter-college competition circuit, securing multiple battle-of-the-bands wins.
                  </p>
                  <p>
                    By my <strong>5th semester</strong>, I was elevated to <strong>Coordinator</strong>, managing schedules and practices. In my <strong>6th semester</strong>, I took the helm as <strong>President &amp; Head of the Society</strong> &mdash; directing over <strong>60+ active musicians</strong>, audio engineers, and vocalists, steering live productions and organizing major university music festivals.
                  </p>
                </div>

                {/* Leadership Badges */}
                <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="border-2 border-[#14121A] bg-[#FFC93C]/40 p-3">
                    <div className="font-bold text-[#14121A] flex items-center gap-1.5">
                      <Guitar className="h-3.5 w-3.5 text-[#FF4D2E]" />
                      <span>SEM 1 &ndash; 4</span>
                    </div>
                    <span className="text-[11px] text-[#14121A]/80">Lead Electric Guitarist &amp; Circuit Competitor</span>
                  </div>
                  <div className="border-2 border-[#14121A] bg-[#3DDC97]/40 p-3">
                    <div className="font-bold text-[#14121A] flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-[#14121A]" />
                      <span>SEM 5 &ndash; 6</span>
                    </div>
                    <span className="text-[11px] text-[#14121A]/80">Coordinator ➔ President (60+ Members)</span>
                  </div>
                </div>
              </div>

              {/* Polaroid Snapshot: Octave Live Production */}
              <div className="group relative border-3 border-[#14121A] bg-[#FFF8EC] p-4 shadow-hard rotate-[2deg] hover:rotate-0 transition-transform">
                <div className="aspect-[16/9] w-full border-2 border-[#14121A] bg-[#14121A] text-white flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-4xl mb-2">🎸</div>
                  <span className="font-mono text-sm font-bold text-[#FFC93C]">OCTAVE LIVE PRODUCTION</span>
                  <span className="font-mono text-xs text-white/80">Battle of the Bands • Delhi Circuit Winners</span>
                  <span className="mt-2 inline-block rounded bg-[#FF4D2E] text-white px-2 py-0.5 font-mono text-[10px] font-bold">
                    60+ MUSICIANS &amp; CREW LED
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-xs text-[#14121A]/80">
                  <span className="font-hand text-lg font-bold">Stage rhythm == Clean code</span>
                  <span>Octave Head</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM MILESTONE BANNER */}
        <div className="border-3 border-[#14121A] bg-[#FFC93C] p-6 shadow-hard flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14121A]/80">
              ORIGINS MILESTONE UNLOCKED
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#14121A]">
              From 1st Semester Guitar Riffs to 60-Person Leadership &amp; Low-Level C++
            </h3>
          </div>
          <a
            href="#chapter-2"
            className="btn-press flex items-center gap-2 border-2 border-[#14121A] bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#14121A] shadow-hard-sm shrink-0"
          >
            <span>NEXT: THE GRIND</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
