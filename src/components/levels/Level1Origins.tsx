"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/sound";
import { useJournal } from "@/context/JournalContext";
import { Music, Award, Users, BookOpen, Volume2 } from "lucide-react";

export function Level1Origins() {
  const { addXP } = useJournal();
  const [guitarRiffPlaying, setGuitarRiffPlaying] = useState(false);

  const handleGuitarClick = () => {
    soundEngine.playPenScratch();
    setGuitarRiffPlaying(true);
    addXP(25, "OCTAVE RIFF TRIGGERED");
    setTimeout(() => setGuitarRiffPlaying(false), 1200);
  };

  return (
    <section
      id="level-1"
      className="relative min-h-screen w-full border-b-2 border-dashed border-[#D3C4A5] bg-[#FBF8F1] py-16 px-4 transition-colors duration-300 sm:px-8 md:py-24 dark:border-[#3A3328] dark:bg-[#1B1814]"
    >
      {/* Decorative Washi Tape */}
      <div
        aria-hidden="true"
        className="absolute -top-3 right-16 z-10 h-7 w-28 rotate-[-4deg] bg-[#7A8B6F]/40 shadow-sm backdrop-blur-[1px] dark:bg-[#92A585]/30"
        style={{
          clipPath:
            "polygon(0% 5%, 95% 0%, 100% 90%, 95% 100%, 5% 95%, 0% 90%)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Section Header Banner */}
        <div className="mb-10 flex flex-wrap items-baseline justify-between border-b border-[#D3C4A5] pb-4 font-mono text-xs uppercase tracking-wider text-[#837B6D] dark:border-[#3A3328] dark:text-[#7E7565]">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#D9432B] px-2 py-0.5 font-bold text-white">
              LEVEL 01
            </span>
            <span>ORIGINS // 2022 &ndash; 2026</span>
          </div>
          <span className="hidden sm:inline">
            BHAGWAN PARSHURAM INSTITUTE OF TECHNOLOGY (BPIT DELHI)
          </span>
        </div>

        {/* Level Title */}
        <div className="mb-12">
          <h2
            data-text="LEVEL 1: THE SPARK & THE STAGE"
            className="riso-title font-display text-3xl font-black uppercase tracking-tight text-[#1B1A17] sm:text-5xl md:text-6xl dark:text-[#EBE3D3]"
          >
            THE SPARK &amp; THE STAGE
          </h2>
          <p className="mt-3 max-w-3xl font-serif text-lg italic text-[#4B463E] sm:text-xl dark:text-[#B2A896]">
            &ldquo;November 9, 2022. First day of college. I stepped into B.Tech Information Technology with a blank notebook and an electric guitar in tow.&rdquo;
          </p>
        </div>

        {/* Asymmetrical Scrapbook Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column (7 cols): Matriculation & The Coding Spark */}
          <div className="space-y-6 lg:col-span-7">
            {/* BPIT Day One Docket Card */}
            <div className="relative rounded border-2 border-[#1B1A17] bg-[#F2EBDD] p-6 shadow-[5px_5px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[5px_5px_0px_0px_#EBE3D3]">
              <div className="flex items-center justify-between border-b border-[#D3C4A5] pb-3 font-mono text-xs text-[#837B6D] dark:border-[#3A3328] dark:text-[#7E7565]">
                <div className="flex items-center gap-1.5 font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                  <BookOpen className="h-4 w-4 text-[#D9432B]" />
                  <span>ENTRY #001 &bull; 09 NOV 2022</span>
                </div>
                <span>BPIT DELHI // B.TECH IT</span>
              </div>

              <div className="mt-4 font-serif text-base leading-relaxed text-[#1B1A17] dark:text-[#EBE3D3]">
                <p>
                  Most people enter engineering with a textbook definition of computer science.
                  For me, the curiosity was visceral: I needed to know what happens in the milliseconds
                  between a user tap and the server response.
                </p>
                <p className="mt-3">
                  I joined BPIT Delhi on November 9, 2022. From day one, theory alone wasn’t enough &mdash;
                  I started writing programs to deconstruct problems. The very first semester became a crucible:
                  learning the mechanics of memory, C++, and procedural logic by day, while rehearsing with the college band by night.
                </p>
              </div>

              {/* Hand-drawn Marginalia Note */}
              <div className="mt-4 flex items-center gap-2 font-hand text-lg text-[#D9432B] dark:text-[#E55840]">
                <span>* &ldquo;Software is just music written for silicon.&rdquo;</span>
              </div>
            </div>

            {/* Self-Drawing Interactive SVG Diagram */}
            <div className="rounded border border-[#D3C4A5] bg-[#E4D7C2]/40 p-5 dark:border-[#3A3328] dark:bg-[#181512]">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#837B6D] dark:text-[#7E7565]">
                SCHEMATIC // THE PARALLEL CRAFTS
              </span>
              <div className="mt-3 grid grid-cols-2 gap-4 text-center font-mono text-xs">
                <div className="rounded border border-dashed border-[#1B1A17] p-3 dark:border-[#EBE3D3]">
                  <span className="block font-bold text-[#D9432B] dark:text-[#E55840]">01. ENGINEERING</span>
                  <span className="mt-1 block text-[11px] text-[#4B463E] dark:text-[#B2A896]">
                    Memory &bull; Logic Trees &bull; Web Architecture
                  </span>
                </div>
                <div className="rounded border border-dashed border-[#1B1A17] p-3 dark:border-[#EBE3D3]">
                  <span className="block font-bold text-[#C99A3B] dark:text-[#DEB459]">02. OCTAVE (MUSIC)</span>
                  <span className="mt-1 block text-[11px] text-[#4B463E] dark:text-[#B2A896]">
                    Rhythm &bull; Improvisation &bull; 60+ Member Teamwork
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Octave Music Society Spotlight */}
          <div className="space-y-6 lg:col-span-5">
            {/* The Octave Polaroid Card */}
            <div className="relative rotate-1 rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-5 shadow-[6px_6px_0px_0px_#1B1A17] transition-transform hover:rotate-0 dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[6px_6px_0px_0px_#EBE3D3]">
              {/* Tape on Top */}
              <div
                aria-hidden="true"
                className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-1 bg-[#D9432B]/30 shadow-sm"
              />

              <div className="flex items-center justify-between border-b border-[#D3C4A5] pb-2 font-mono text-[11px] text-[#837B6D] dark:border-[#3A3328] dark:text-[#7E7565]">
                <div className="flex items-center gap-1.5 font-bold text-[#D9432B] dark:text-[#E55840]">
                  <Music className="h-4 w-4" />
                  <span>OCTAVE &bull; BPIT MUSIC SOCIETY</span>
                </div>
                <span>2022 &ndash; 2026</span>
              </div>

              {/* Music Role Progression Timeline */}
              <div className="mt-4 space-y-3 font-mono text-xs">
                <div className="flex items-start gap-2 border-l-2 border-[#D9432B] pl-3">
                  <div>
                    <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                      Semester 1: Guitarist
                    </span>
                    <p className="font-serif text-[13px] text-[#4B463E] dark:text-[#B2A896]">
                      Auditioned and joined as an electric guitarist. Competed across inter-college battles across Delhi NCR, taking home podium trophies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 border-l-2 border-[#C99A3B] pl-3">
                  <div>
                    <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                      Semester 5: Coordinator
                    </span>
                    <p className="font-serif text-[13px] text-[#4B463E] dark:text-[#B2A896]">
                      Promoted to manage society logistics, sound rehearsals, and inter-college event schedules.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 border-l-2 border-[#7A8B6F] pl-3">
                  <div>
                    <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                      Semester 6: President &amp; Head
                    </span>
                    <p className="font-serif text-[13px] text-[#4B463E] dark:text-[#B2A896]">
                      Spearheaded the entire society: managed 60+ musicians and vocalists, orchestrated auditions, and organized flagship fest battlegrounds.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Guitar Riff Action */}
              <div className="mt-5 border-t border-[#D3C4A5] pt-4 dark:border-[#3A3328]">
                <button
                  onClick={handleGuitarClick}
                  data-cursor="pointer"
                  className="flex w-full items-center justify-center gap-2 rounded border border-[#1B1A17] bg-[#E4D7C2] py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#1B1A17] transition-all hover:bg-[#D9432B] hover:text-white dark:border-[#EBE3D3] dark:bg-[#181512] dark:text-[#EBE3D3] dark:hover:bg-[#E55840] dark:hover:text-white"
                >
                  <Volume2 className={`h-4 w-4 ${guitarRiffPlaying ? "animate-bounce text-[#D9432B]" : ""}`} />
                  <span>{guitarRiffPlaying ? "Riff Reverberating!" : "Play Guitar Riff (+25 XP)"}</span>
                </button>
              </div>

              {/* Stamp Badge */}
              <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-[#837B6D] dark:text-[#7E7565]">
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-[#7A8B6F]" />
                  <span>60+ Members Led</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-[#C99A3B]" />
                  <span>Multiple Fest Victories</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
