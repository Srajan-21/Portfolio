"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStickerWorld } from "@/context/StickerWorldContext";
import { supabase } from "@/lib/supabase/client";
import { Send, Download, Mail, Phone, CheckCircle2, AlertCircle, Sparkles, Trophy, Gamepad2, Heart, ExternalLink } from "lucide-react";

interface GuestEntry {
  id: string;
  name: string;
  message: string;
  doodle_data?: string | null;
  created_at: string;
}

export function Level8Player2() {
  const { addStickers, completeQuest, setMascotSpeech, stickers, level } = useStickerWorld();

  // Guestbook state
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [guestLoading, setGuestLoading] = useState(false);
  const [guestFeedback, setGuestFeedback] = useState<string | null>(null);

  // Contact state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactBody, setContactBody] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "success" | "error">("idle");
  const [contactError, setContactError] = useState<string | null>(null);

  // Downloadable Player Card Canvas
  const [playerName, setPlayerName] = useState("Player 2");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Arcade Mini-Game (Sticker Catcher)
  const [gameScore, setGameScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  // Initial guestbook fetch & Realtime subscription
  useEffect(() => {
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then((data) => {
        if (data.entries) setEntries(data.entries);
      })
      .catch(() => {});

    const channel = supabase
      .channel("sticker_guestbook")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          const newEntry = payload.new as GuestEntry;
          setEntries((prev) => [newEntry, ...prev.filter((e) => e.id !== newEntry.id)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleGuestbookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;

    setGuestLoading(true);
    setGuestFeedback(null);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: guestName.trim(),
          message: guestMessage.trim(),
          honeypot: "",
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to record message.");

      setGuestFeedback("Sticky note posted to the world wall! +5 Stickers awarded! ⭐");
      setGuestName("");
      setGuestMessage("");
      addStickers(5, "guestbook_sign");
      completeQuest("q_guestbook");
      setMascotSpeech("Thank you for signing my desk! You're officially part of the story!", 4500);
    } catch (err: unknown) {
      setGuestFeedback(err instanceof Error ? err.message : "Error posting note.");
    } finally {
      setGuestLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactStatus("idle");
    setContactError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName.trim(),
          email: contactEmail.trim(),
          subject: contactSubject.trim() || "Portfolio Transmission",
          message: contactBody.trim(),
          honeypot: "",
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to transmit message.");

      setContactStatus("success");
      setContactName("");
      setContactEmail("");
      setContactSubject("");
      setContactBody("");
      addStickers(3, "contact_sent");
      setMascotSpeech("Message transmitted directly to Srajan's inbox! He will reply shortly!", 4500);
    } catch (err: unknown) {
      setContactStatus("error");
      setContactError(err instanceof Error ? err.message : "Transmission failed.");
    } finally {
      setContactLoading(false);
    }
  };

  // Generate Player Card PNG
  const downloadPlayerCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Dimensions: 600 x 400
    canvas.width = 600;
    canvas.height = 400;

    // Background paper
    ctx.fillStyle = "#FFF8EC";
    ctx.fillRect(0, 0, 600, 400);

    // Thick ink border
    ctx.lineWidth = 12;
    ctx.strokeStyle = "#14121A";
    ctx.strokeRect(6, 6, 588, 388);

    // Header strip
    ctx.fillStyle = "#FFC93C";
    ctx.fillRect(12, 12, 576, 70);
    ctx.fillStyle = "#14121A";
    ctx.font = "bold 24px monospace";
    ctx.fillText("SRAJAN'S STICKER WORLD", 30, 56);

    // Badge
    ctx.fillStyle = "#2F5BFF";
    ctx.fillRect(440, 26, 130, 42);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 16px monospace";
    ctx.fillText(level.toUpperCase(), 465, 52);

    // Player Name
    ctx.fillStyle = "#14121A";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText(playerName || "Player 2", 30, 140);

    // Stats
    ctx.font = "18px monospace";
    ctx.fillText(`⭐ Total Stickers: ${stickers}`, 30, 190);
    ctx.fillText(`🎮 Rank Status: ${level}`, 30, 225);
    ctx.fillText(`📅 Certified: ${new Date().toLocaleDateString()}`, 30, 260);

    // Watermark
    ctx.fillStyle = "#FF4D2E";
    ctx.font = "bold 14px monospace";
    ctx.fillText("srajan.dev • Software Developer", 30, 340);

    // Trigger download
    const link = document.createElement("a");
    link.download = `${playerName.replace(/\s+/g, "_")}_Player_Card.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    addStickers(2, "download_card");
  };

  return (
    <section
      id="chapter-8"
      className="relative min-h-screen w-full bg-[#FFF8EC] py-20 px-4 sm:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* CHAPTER STICKER HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#14121A] pb-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="bg-[#3DDC97] text-[#14121A] border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm rotate-[-1deg]">
              CHAPTER 08
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#14121A]/70">
              THE LAST PAGE • PLAYER 2
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#FF4D2E] text-white border-2 border-[#14121A] px-3 py-1 font-mono text-xs font-bold shadow-hard-sm">
            <Heart className="h-3.5 w-3.5" />
            <span>COMMUNITY LEDGER &amp; TRANSMISSION</span>
          </div>
        </div>

        {/* HERO TITLE & INTRO */}
        <div className="mb-14 max-w-4xl">
          <div className="inline-block bg-white border-2 border-[#14121A] px-3 py-1 text-xs font-mono font-bold uppercase shadow-hard-sm mb-4 rotate-[1deg]">
            🤝 LEAVE A STICKER &bull; TRANSMIT A TRANSMISSION
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#14121A] leading-tight">
            Leave Your Mark, <br />
            <span className="bg-[#3DDC97] px-2 py-0.5 border-3 border-[#14121A] shadow-hard inline-block rotate-[-1deg] text-[#14121A]">
              Connect With Srajan
            </span>
          </h2>
          <p className="mt-6 font-sans text-lg md:text-xl text-[#14121A]/80 font-medium leading-relaxed max-w-3xl">
            You&apos;ve journeyed from matriculation day at BPIT, through 60-member Octave rock stages, the LeetCode grind, SIH Tourphin, the Nagarro podium, CLAVIS architecture, to live production at Hudle.
            Now it&apos;s your turn: pin a note to the wall, or transmit an opportunity!
          </p>
        </div>

        {/* SECTION 1: GUESTBOOK WALL & CONTACT DESK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* GUESTBOOK LEDGER (6 cols) */}
          <div className="lg:col-span-6 border-4 border-[#14121A] bg-white p-6 sm:p-8 shadow-hard-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b-2 border-[#14121A]/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📌</span>
                  <h3 className="font-display text-xl font-black text-[#14121A]">
                    Public Sticker Wall
                  </h3>
                </div>
                <span className="font-mono text-xs bg-[#FFC93C] border border-[#14121A] px-2 py-0.5 font-bold">
                  LIVE REALTIME
                </span>
              </div>

              {/* Guestbook Form */}
              <form onSubmit={handleGuestbookSubmit} className="space-y-4 mb-6">
                <div>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Your Name or GitHub Handle..."
                    required
                    className="w-full border-2 border-[#14121A] p-2.5 font-mono text-xs outline-none focus:ring-2 focus:ring-[#2F5BFF] bg-[#FFF8EC]"
                  />
                </div>
                <div>
                  <textarea
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Leave a message, greeting, or feedback..."
                    required
                    rows={3}
                    className="w-full border-2 border-[#14121A] p-2.5 font-mono text-xs outline-none focus:ring-2 focus:ring-[#2F5BFF] bg-[#FFF8EC]"
                  />
                </div>

                {guestFeedback && (
                  <div className="border border-[#14121A] bg-[#3DDC97]/30 p-2 font-mono text-xs font-bold text-[#14121A]">
                    {guestFeedback}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={guestLoading}
                  className="btn-press w-full py-2.5 bg-[#FFC93C] text-[#14121A] border-2 border-[#14121A] font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm"
                >
                  {guestLoading ? "POSTING NOTE..." : "PIN NOTE TO WALL (+5 ⭐)"}
                </button>
              </form>
            </div>

            {/* Recent Wall Notes */}
            <div className="border-t-2 border-[#14121A]/10 pt-4 max-h-60 overflow-y-auto space-y-2">
              <span className="font-mono text-[10px] font-bold uppercase text-[#14121A]/60 block mb-1">
                RECENT STICKY NOTES ({entries.length}):
              </span>
              {entries.slice(0, 5).map((entry) => (
                <div
                  key={entry.id}
                  className="border-2 border-[#14121A] bg-[#FFF8EC] p-3 shadow-hard-sm rotate-[-0.5deg]"
                >
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold">
                    <span className="text-[#2F5BFF]">{entry.name}</span>
                    <span className="text-[#14121A]/50 text-[9px]">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#14121A] mt-1 leading-snug">
                    {entry.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT TRANSMISSION DESK (6 cols) */}
          <div className="lg:col-span-6 border-4 border-[#14121A] bg-[#14121A] text-white p-6 sm:p-8 shadow-hard-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-[#3DDC97]" />
                  <h3 className="font-display text-xl font-black text-white">
                    Transmit Direct Message
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#3DDC97]">ENCRYPTED</span>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your Name *"
                    required
                    className="w-full border-2 border-white/20 bg-white/5 p-2.5 font-mono text-xs text-white outline-none focus:border-[#3DDC97]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Your Email *"
                    required
                    className="w-full border-2 border-white/20 bg-white/5 p-2.5 font-mono text-xs text-white outline-none focus:border-[#3DDC97]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="Subject (e.g. Software Engineer Opportunity)"
                    className="w-full border-2 border-white/20 bg-white/5 p-2.5 font-mono text-xs text-white outline-none focus:border-[#3DDC97]"
                  />
                </div>
                <div>
                  <textarea
                    value={contactBody}
                    onChange={(e) => setContactBody(e.target.value)}
                    placeholder="Your message / project details..."
                    required
                    rows={4}
                    className="w-full border-2 border-white/20 bg-white/5 p-2.5 font-mono text-xs text-white outline-none focus:border-[#3DDC97]"
                  />
                </div>

                {contactStatus === "success" && (
                  <div className="p-3 bg-[#3DDC97]/20 border border-[#3DDC97] text-[#3DDC97] font-mono text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Message transmitted successfully!</span>
                  </div>
                )}

                {contactStatus === "error" && (
                  <div className="p-3 bg-red-500/20 border border-red-500 text-red-400 font-mono text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{contactError || "Failed to send message."}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="btn-press w-full py-2.5 bg-[#3DDC97] text-[#14121A] border-2 border-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{contactLoading ? "TRANSMITTING..." : "TRANSMIT MESSAGE (+3 ⭐)"}</span>
                </button>
              </form>
            </div>

            {/* Direct Contact Coordinates */}
            <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/70">
              <a
                href="mailto:srivasrajan8@gmail.com"
                className="hover:text-white underline decoration-[#3DDC97]"
              >
                srivasrajan8@gmail.com
              </a>
              <a
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#FFC93C] hover:text-white"
              >
                <Download className="h-3.5 w-3.5" />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION 2: DOWNLOADABLE PLAYER CARD GENERATOR */}
        <div className="border-4 border-[#14121A] bg-[#FFC93C] p-6 sm:p-8 shadow-hard-lg mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14121A]/80">
                PLAYER CERTIFICATE ENGINE
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-[#14121A] mt-1">
                Generate Your Personalized &ldquo;Player Card&rdquo; PNG
              </h3>
              <p className="font-sans text-xs text-[#14121A]/80 mt-1 max-w-xl">
                Enter your name or gamer tag to render an official collectible card showing your stickers collected and verified level status.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter Your Name..."
                className="border-2 border-[#14121A] bg-white px-3 py-2 font-mono text-xs font-bold outline-none w-full sm:w-48"
              />
              <button
                onClick={downloadPlayerCard}
                className="btn-press flex items-center gap-2 border-2 border-[#14121A] bg-[#14121A] text-white px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider shadow-hard-sm shrink-0 w-full sm:w-auto justify-center"
              >
                <Download className="h-4 w-4" />
                <span>DOWNLOAD PNG</span>
              </button>
            </div>
          </div>

          {/* Hidden Canvas for PNG export */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* FOOTER COLOPHON */}
        <div className="border-t-4 border-[#14121A] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#14121A]/70">
          <div>
            &copy; 2026 Srajan Srivastava &bull; Handcrafted in New Delhi with Next.js 16 &amp; Supabase
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Srajan-21"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#14121A] underline"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/srajan-srivastava"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#14121A] underline"
            >
              LinkedIn
            </a>
            <a
              href="https://leetcode.com/u/SRAJAN 9839"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#14121A] underline"
            >
              LeetCode
            </a>
            <a
              href="/admin"
              className="hover:text-[#14121A] underline font-bold text-[#FF4D2E]"
            >
              Backstage CMS ➔
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
