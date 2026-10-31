"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/sound";
import { useJournal } from "@/context/JournalContext";
import { InkDoodleCanvas } from "@/components/canvas/InkDoodleCanvas";
import { supabase } from "@/lib/supabase/client";
import {
  Send,
  Download,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Sparkles,
} from "lucide-react";

interface GuestEntry {
  id: string;
  name: string;
  message: string;
  doodle_data?: string | null;
  created_at: string;
}

export function Level8Player2() {
  const { addXP } = useJournal();

  // Guestbook state
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [doodleData, setDoodleData] = useState<string | null>(null);
  const [guestLoading, setGuestLoading] = useState(false);
  const [guestMsgFeedback, setGuestMsgFeedback] = useState<string | null>(null);

  // Contact state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactBody, setContactBody] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "success" | "error">("idle");
  const [contactError, setContactError] = useState<string | null>(null);

  // Fetch guestbook entries on mount
  useEffect(() => {
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then((data) => {
        if (data.entries) {
          setEntries(data.entries);
        }
      })
      .catch(() => {});

    // Realtime subscription for live guestbook posts
    const channel = supabase
      .channel("guestbook_realtime")
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
    setGuestLoading(true);
    setGuestMsgFeedback(null);
    soundEngine.playClick();

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: guestName.trim(),
          message: guestMessage.trim(),
          doodle_data: doodleData,
          honeypot: "",
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to sign guestbook.");
      }

      soundEngine.playStamp();
      addXP(50, "GUESTBOOK SIGNED // PLAYER 2 REGISTERED");
      setGuestName("");
      setGuestMessage("");
      setDoodleData(null);
      setGuestMsgFeedback("Note pinned to the journal!");

      if (result.entry) {
        setEntries((prev) => [result.entry, ...prev]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error submitting";
      setGuestMsgFeedback(msg);
    } finally {
      setGuestLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactStatus("idle");
    setContactError(null);
    soundEngine.playClick();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName.trim(),
          email: contactEmail.trim(),
          subject: contactSubject.trim() || undefined,
          message: contactBody.trim(),
          honeypot: "",
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to dispatch transmission.");
      }

      soundEngine.playStamp();
      addXP(60, "TRANSMISSION DISPATCHED TO SRAJAN");
      setContactStatus("success");
      setContactName("");
      setContactEmail("");
      setContactSubject("");
      setContactBody("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to deliver message.";
      setContactStatus("error");
      setContactError(msg);
    } finally {
      setContactLoading(false);
    }
  };

  const handleResumeDownload = () => {
    soundEngine.playStamp();
    addXP(40, "OFFICIAL RESUME DOSSIER DOWNLOADED");
  };

  return (
    <section
      id="level-8"
      className="relative min-h-screen w-full border-b-2 border-dashed border-[#D3C4A5] bg-[#FBF8F1] py-16 px-4 transition-colors duration-300 sm:px-8 md:py-24 dark:border-[#3A3328] dark:bg-[#1B1814]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Level Header */}
        <div className="mb-10 flex flex-wrap items-baseline justify-between border-b border-[#D3C4A5] pb-4 font-mono text-xs uppercase tracking-wider text-[#837B6D] dark:border-[#3A3328] dark:text-[#7E7565]">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#D9432B] px-2 py-0.5 font-bold text-white">
              FINAL LEVEL
            </span>
            <span>PLAYER 2 (YOU) // CO-OP &amp; TRANSMISSIONS</span>
          </div>
          <div className="flex items-center gap-2 text-[#D9432B] dark:text-[#E55840]">
            <UserCheck className="h-4 w-4" />
            <span className="font-bold">STATUS: READY TO HIRE</span>
          </div>
        </div>

        {/* Level Title */}
        <div className="mb-12">
          <h2
            data-text="FINAL LEVEL: PLAYER 2 (YOU)"
            className="riso-title font-display text-3xl font-black uppercase tracking-tight text-[#1B1A17] sm:text-5xl md:text-6xl dark:text-[#EBE3D3]"
          >
            PLAYER 2 (YOU)
          </h2>
          <p className="mt-3 max-w-3xl font-serif text-lg italic text-[#4B463E] sm:text-xl dark:text-[#B2A896]">
            &ldquo;You&apos;ve reached the end of Volume I. The story doesn&apos;t stop here &mdash; sign the field book, send a transmission, or press start to collaborate.&rdquo;
          </p>
        </div>

        {/* Recruiter Call-To-Action Banner */}
        <div className="mb-12 rounded border-2 border-[#1B1A17] bg-[#F2EBDD] p-6 shadow-[6px_6px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[6px_6px_0px_0px_#EBE3D3]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D9432B] dark:text-[#E55840]">
                CAREER AVAILABILITY STATUS
              </span>
              <h3 className="mt-1 font-display text-2xl font-black text-[#1B1A17] dark:text-[#EBE3D3]">
                Open for Software Engineer &amp; Full Stack Roles
              </h3>
              <p className="mt-2 max-w-2xl font-serif text-sm text-[#4B463E] dark:text-[#B2A896]">
                Looking to build high-throughput backends, fault-tolerant payment flows, and thoughtful developer tooling in New Delhi, hybrid, or remote setups.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeDownload}
                data-cursor="pointer"
                className="flex items-center gap-2 rounded border-2 border-[#1B1A17] bg-[#D9432B] px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#1B1A17] transition-all hover:translate-x-[1px] hover:translate-y-[1px] dark:border-[#EBE3D3] dark:shadow-[3px_3px_0px_0px_#EBE3D3]"
              >
                <Download className="h-4 w-4" />
                <span>Download Resume Dossier</span>
              </a>

              <a
                href="mailto:srivasrajan8@gmail.com"
                data-cursor="pointer"
                className="flex items-center gap-2 rounded border-2 border-[#1B1A17] bg-[#FBF8F1] px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#1B1A17] shadow-[3px_3px_0px_0px_#1B1A17] transition-all hover:translate-x-[1px] hover:translate-y-[1px] dark:border-[#EBE3D3] dark:bg-[#181512] dark:text-[#EBE3D3] dark:shadow-[3px_3px_0px_0px_#EBE3D3]"
              >
                <Mail className="h-4 w-4 text-[#D9432B]" />
                <span>Email Directly</span>
              </a>
            </div>
          </div>
        </div>

        {/* Two Columns: Interactive Guestbook & Contact Transmission Desk */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column (6 cols): Pinned Ink Guestbook & Doodle Canvas */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-6 shadow-[5px_5px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[5px_5px_0px_0px_#EBE3D3]">
              <div className="flex items-center justify-between border-b border-[#D3C4A5] pb-3 font-mono text-xs dark:border-[#3A3328]">
                <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                  FIELD GUESTBOOK // SIGN &amp; SKETCH
                </span>
                <span className="text-[#837B6D] dark:text-[#7E7565]">
                  {entries.length} NOTES PINNED
                </span>
              </div>

              {guestMsgFeedback && (
                <div className="mt-3 rounded border border-[#7A8B6F] bg-[#7A8B6F]/10 p-2 font-mono text-xs text-[#7A8B6F] dark:text-[#92A585]">
                  {guestMsgFeedback}
                </div>
              )}

              <form onSubmit={handleGuestbookSubmit} className="mt-4 space-y-3 font-mono text-xs">
                <div>
                  <label className="block font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                    Your Name or Handle:
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Fellow Engineer"
                    className="mt-1 w-full rounded border border-[#1B1A17] bg-[#F2EBDD] p-2 text-[#1B1A17] focus:border-[#D9432B] focus:outline-none dark:border-[#EBE3D3] dark:bg-[#181512] dark:text-[#EBE3D3]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                    Your Note to Srajan:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Leave feedback, an idea, or college memories..."
                    className="mt-1 w-full rounded border border-[#1B1A17] bg-[#F2EBDD] p-2 text-[#1B1A17] focus:border-[#D9432B] focus:outline-none dark:border-[#EBE3D3] dark:bg-[#181512] dark:text-[#EBE3D3]"
                  />
                </div>

                {/* Doodle Canvas Component */}
                <div className="pt-2">
                  <InkDoodleCanvas onDoodleChange={setDoodleData} />
                </div>

                <button
                  type="submit"
                  disabled={guestLoading}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded border border-[#1B1A17] bg-[#D9432B] py-2.5 font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_#1B1A17] hover:opacity-90 disabled:opacity-50 dark:border-[#EBE3D3]"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{guestLoading ? "Pinning Note..." : "Pin Entry to Field Book (+50 XP)"}</span>
                </button>
              </form>

              {/* Scrollable list of recent guest notes */}
              <div className="mt-6 border-t border-[#D3C4A5] pt-4 dark:border-[#3A3328]">
                <span className="font-mono text-[11px] font-bold uppercase text-[#837B6D] dark:text-[#7E7565]">
                  Recent Journal Signatures:
                </span>
                <div className="mt-3 max-h-[300px] space-y-2.5 overflow-y-auto pr-1">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded border border-[#D3C4A5] bg-[#F2EBDD] p-3 text-xs dark:border-[#3A3328] dark:bg-[#181512]"
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-[#837B6D]">
                        <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                          {entry.name}
                        </span>
                        <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="mt-1.5 font-serif text-sm text-[#4B463E] dark:text-[#B2A896]">
                        &ldquo;{entry.message}&rdquo;
                      </p>
                      {entry.doodle_data && (
                        <div className="mt-2">
                          <img
                            src={entry.doodle_data}
                            alt="Guest Doodle"
                            className="h-10 rounded border border-[#D3C4A5] bg-white/40 p-1 dark:bg-black/30"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Direct Contact Transmission Desk */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-6 shadow-[5px_5px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[5px_5px_0px_0px_#EBE3D3]">
              <div className="flex items-center justify-between border-b border-[#D3C4A5] pb-3 font-mono text-xs dark:border-[#3A3328]">
                <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                  TRANSMISSION DESK // CONTACT SRAJAN
                </span>
                <span className="text-[#D9432B] font-bold">DIRECT TO INBOX</span>
              </div>

              {contactStatus === "success" && (
                <div className="mt-4 flex items-center gap-2 rounded border border-[#7A8B6F] bg-[#7A8B6F]/10 p-3 font-mono text-xs text-[#7A8B6F] dark:text-[#92A585]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Transmission received! Srajan will respond to your email promptly.</span>
                </div>
              )}

              {contactStatus === "error" && (
                <div className="mt-4 flex items-center gap-2 rounded border border-[#D9432B] bg-[#D9432B]/10 p-3 font-mono text-xs text-[#D9432B]">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{contactError}</span>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="mt-4 space-y-4 font-mono text-xs">
                <div>
                  <label className="block font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Jane Doe (Tech Lead)"
                    className="mt-1 w-full rounded border border-[#1B1A17] bg-[#F2EBDD] p-2 text-[#1B1A17] focus:border-[#D9432B] focus:outline-none dark:border-[#EBE3D3] dark:bg-[#181512] dark:text-[#EBE3D3]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                    Your Email:
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="mt-1 w-full rounded border border-[#1B1A17] bg-[#F2EBDD] p-2 text-[#1B1A17] focus:border-[#D9432B] focus:outline-none dark:border-[#EBE3D3] dark:bg-[#181512] dark:text-[#EBE3D3]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                    Subject:
                  </label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="Engineering Role / Project Discussion"
                    className="mt-1 w-full rounded border border-[#1B1A17] bg-[#F2EBDD] p-2 text-[#1B1A17] focus:border-[#D9432B] focus:outline-none dark:border-[#EBE3D3] dark:bg-[#181512] dark:text-[#EBE3D3]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                    Transmission Message:
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactBody}
                    onChange={(e) => setContactBody(e.target.value)}
                    placeholder="Tell me about the problem you're solving, your stack, or an opportunity..."
                    className="mt-1 w-full rounded border border-[#1B1A17] bg-[#F2EBDD] p-2 text-[#1B1A17] focus:border-[#D9432B] focus:outline-none dark:border-[#EBE3D3] dark:bg-[#181512] dark:text-[#EBE3D3]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="flex w-full items-center justify-center gap-2 rounded border border-[#1B1A17] bg-[#D9432B] py-3 font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_#1B1A17] hover:opacity-90 disabled:opacity-50 dark:border-[#EBE3D3]"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{contactLoading ? "Sending Transmission..." : "Send Transmission to Srajan"}</span>
                </button>
              </form>

              {/* Direct coordinates list with SVG icons */}
              <div className="mt-6 border-t border-[#D3C4A5] pt-4 font-mono text-xs dark:border-[#3A3328]">
                <span className="block text-[11px] font-bold uppercase text-[#837B6D] dark:text-[#7E7565]">
                  Direct Coordinates:
                </span>
                <div className="mt-2 space-y-1.5 text-[11px] text-[#4B463E] dark:text-[#B2A896]">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-[#D9432B]" />
                    <a href="mailto:srivasrajan8@gmail.com" className="hover:underline">
                      srivasrajan8@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-[#7A8B6F]" />
                    <span>+91 7007968745</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* LinkedIn SVG */}
                    <svg className="h-3.5 w-3.5 text-[#C99A3B]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    <a
                      href="https://linkedin.com/in/srajan-srivastava"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      linkedin.com/in/srajan-srivastava
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* GitHub SVG */}
                    <svg className="h-3.5 w-3.5 text-[#1B1A17] dark:text-[#EBE3D3]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                    <a
                      href="https://github.com/Srajan-21"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      github.com/Srajan-21
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
