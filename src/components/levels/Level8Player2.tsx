"use client";

import React, { useState, useEffect } from "react";
import { useCollector } from "@/context/CollectorContext";
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
  Award,
} from "lucide-react";

interface GuestEntry {
  id: string;
  name: string;
  message: string;
  doodle_data?: string | null;
  created_at: string;
}

export function Level8Player2() {
  const { unlockSeal, rank, sealsEarned, setCursorLabel } = useCollector();

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

  // Certificate personalization
  const [certificateName, setCertificateName] = useState("Distinguished Reader");
  const [dateStamp, setDateStamp] = useState("October 2026");

  useEffect(() => {
    setDateStamp(new Date().toLocaleDateString());
    unlockSeal("seal_last_page");

    fetch("/api/guestbook")
      .then((res) => res.json())
      .then((data) => {
        if (data.entries) setEntries(data.entries);
      })
      .catch(() => {});

    const channel = supabase
      .channel("collector_guestbook")
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
  }, [unlockSeal]);

  const handleGuestbookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuestLoading(true);
    setGuestMsgFeedback(null);

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
      if (!res.ok) throw new Error(result.error || "Failed to record signature.");

      unlockSeal("seal_guestbook");
      setGuestName("");
      setGuestMessage("");
      setDoodleData(null);
      setGuestMsgFeedback("Signature permanently recorded in the ledger.");

      if (result.entry) {
        setEntries((prev) => [result.entry, ...prev]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error submitting signature";
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
      if (!res.ok) throw new Error(result.error || "Failed to dispatch communication.");

      setContactStatus("success");
      setContactName("");
      setContactEmail("");
      setContactSubject("");
      setContactBody("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Delivery failure.";
      setContactStatus("error");
      setContactError(msg);
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <section
      id="chapter-8"
      className="relative min-h-screen w-full border-b-hairline bg-[#F6F1E7] py-20 px-6 sm:px-12 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* Chapter Header */}
        <div className="mb-12 flex flex-wrap items-baseline justify-between border-b-hairline pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6F665A]">
          <div className="flex items-center gap-2">
            <span className="text-[#8C6B3A] font-semibold">CHAPTER VIII</span>
            <span>&bull;</span>
            <span>THE LAST PAGE // THE CONFERRER</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#14110F]">
            <UserCheck className="h-3.5 w-3.5 text-[#B08D57]" />
            <span>OPEN TO SOFTWARE ENGINEERING ROLES</span>
          </div>
        </div>

        {/* Chapter Title */}
        <div className="mb-14">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#14110F]">
            The Last <span className="italic font-serif text-[#6B1E1E]">Page</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-lg font-light text-[#6F665A] leading-relaxed">
            You have reached the close of this edition. Sign the archival ledger, transmit an inquiry, or download the verified resume dossier below.
          </p>
        </div>

        {/* Career Dossier & Resume Action Card */}
        <div className="mb-14 rounded border-hairline bg-[#FAF7F2] p-8 shadow-editorial">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C6B3A] font-semibold">
                PROFESSIONAL ENGAGEMENT
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-light text-[#14110F] mt-1">
                Open to Full-Stack &amp; Backend Engineering
              </h3>
              <p className="mt-2 font-serif text-sm text-[#6F665A] max-w-xl">
                Available for software engineering roles in New Delhi, hybrid, or remote setups. Focusing on resilient distributed systems, payment reconciliation, and developer tooling.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/api/resume"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorLabel("DOWNLOAD")}
                onMouseLeave={() => setCursorLabel(null)}
                className="flex items-center gap-2 rounded border border-[#6F665A]/30 bg-[#EDE5D3] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:border-[#B08D57] transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-[#B08D57]" />
                <span>Resume Dossier (PDF)</span>
              </a>

              <a
                href="mailto:srivasrajan8@gmail.com"
                className="flex items-center gap-2 rounded border border-hairline bg-[#F6F1E7] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:border-[#B08D57] transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-[#B08D57]" />
                <span>Email Directly</span>
              </a>
            </div>
          </div>
        </div>

        {/* Certificate of Passage Finale */}
        <div className="mb-16 rounded border-2 border-[#B08D57]/40 bg-[#FAF7F2] p-8 sm:p-12 shadow-plinth text-center">
          <div className="inline-flex items-center justify-center rounded-full border border-[#B08D57]/40 p-2 text-[#8C6B3A] mb-4">
            <Award className="h-6 w-6" />
          </div>

          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8C6B3A] font-semibold">
            CERTIFICATE OF PASSAGE &bull; THE COLLECTOR&apos;S EDITION
          </div>

          <h4 className="font-display text-3xl sm:text-4xl font-light text-[#14110F] mt-3">
            This Certifies That
          </h4>

          <div className="my-4 max-w-sm mx-auto">
            <input
              type="text"
              value={certificateName}
              onChange={(e) => setCertificateName(e.target.value)}
              className="w-full text-center font-display text-2xl sm:text-3xl font-normal italic text-[#6B1E1E] bg-transparent border-b border-[#B08D57]/40 focus:outline-none focus:border-[#B08D57]"
              placeholder="Your Name"
            />
          </div>

          <p className="font-serif text-sm text-[#6F665A] max-w-md mx-auto">
            Has traversed the chapters of Srajan Srivastava&apos;s monograph from BPIT Delhi (2022) to production at Hudle.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 font-mono text-xs text-[#6F665A] border-t-hairline pt-6">
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-[#6F665A]/70">CONFERRED RANK</span>
              <span className="font-medium text-[#14110F]">{rank}</span>
            </div>
            <span className="text-[#6F665A]/30">&bull;</span>
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-[#6F665A]/70">SEALS ACCREDITED</span>
              <span className="font-medium text-[#14110F]">{sealsEarned.length} of 12</span>
            </div>
            <span className="text-[#6F665A]/30">&bull;</span>
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-[#6F665A]/70">DATE STAMP</span>
              <span className="font-medium text-[#14110F]">{dateStamp}</span>
            </div>
          </div>
        </div>

        {/* Two Columns: Guestbook & Contact */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Guestbook */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border-hairline bg-[#FAF7F2] p-8 shadow-editorial">
              <div className="flex items-center justify-between border-b-hairline pb-3 font-mono text-[10px] text-[#6F665A]">
                <span className="font-medium text-[#14110F]">ARCHIVAL GUESTBOOK</span>
                <span>{entries.length} INSCRIPTIONS</span>
              </div>

              {guestMsgFeedback && (
                <div className="mt-3 rounded border border-[#B08D57]/40 bg-[#EDE5D3]/40 p-2 font-mono text-xs text-[#8C6B3A]">
                  {guestMsgFeedback}
                </div>
              )}

              <form onSubmit={handleGuestbookSubmit} className="mt-4 space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-[#14110F] font-medium text-[11px]">Your Name / Identity:</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Fellow Engineer"
                    className="mt-1 w-full rounded border-hairline bg-[#F6F1E7] p-2 text-[#14110F] focus:border-[#B08D57] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#14110F] font-medium text-[11px]">Note / Inscription:</label>
                  <textarea
                    required
                    rows={3}
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Leave a thought, reflection, or note..."
                    className="mt-1 w-full rounded border-hairline bg-[#F6F1E7] p-2 text-[#14110F] focus:border-[#B08D57] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <InkDoodleCanvas onDoodleChange={setDoodleData} />
                </div>

                <button
                  type="submit"
                  disabled={guestLoading}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded border border-[#6F665A]/30 bg-[#EDE5D3] py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:border-[#B08D57] disabled:opacity-50 transition-colors"
                >
                  <span>{guestLoading ? "Recording..." : "Record Inscription to Archive"}</span>
                </button>
              </form>

              {/* Inscriptions Feed */}
              <div className="mt-8 border-t-hairline pt-4">
                <span className="font-mono text-[10px] uppercase text-[#6F665A]">Recent Inscriptions:</span>
                <div className="mt-3 max-h-[260px] space-y-2.5 overflow-y-auto pr-1">
                  {entries.map((entry) => (
                    <div key={entry.id} className="rounded border-hairline bg-[#F6F1E7] p-3 text-xs">
                      <div className="flex justify-between font-mono text-[10px] text-[#6F665A]">
                        <span className="font-medium text-[#14110F]">{entry.name}</span>
                        <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="mt-1 font-serif text-xs text-[#14110F]/80">
                        &ldquo;{entry.message}&rdquo;
                      </p>
                      {entry.doodle_data && (
                        <div className="mt-2">
                          <img
                            src={entry.doodle_data}
                            alt="Doodle"
                            className="h-8 rounded border-hairline bg-white/40 p-0.5"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Desk */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border-hairline bg-[#FAF7F2] p-8 shadow-editorial">
              <div className="flex items-center justify-between border-b-hairline pb-3 font-mono text-[10px] text-[#6F665A]">
                <span className="font-medium text-[#14110F]">DIRECT TRANSMISSION DESK</span>
                <span>INBOX</span>
              </div>

              {contactStatus === "success" && (
                <div className="mt-4 flex items-center gap-2 rounded border border-[#B08D57]/40 bg-[#EDE5D3]/40 p-3 font-mono text-xs text-[#8C6B3A]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Communication recorded. Srajan will review and reply promptly.</span>
                </div>
              )}

              {contactStatus === "error" && (
                <div className="mt-4 flex items-center gap-2 rounded border border-[#6B1E1E]/30 bg-[#6B1E1E]/5 p-3 font-mono text-xs text-[#6B1E1E]">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{contactError}</span>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="mt-4 space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[#14110F] font-medium text-[11px]">Your Name:</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Hiring Manager / Tech Lead"
                    className="mt-1 w-full rounded border-hairline bg-[#F6F1E7] p-2 text-[#14110F] focus:border-[#B08D57] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#14110F] font-medium text-[11px]">Email Address:</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="lead@company.com"
                    className="mt-1 w-full rounded border-hairline bg-[#F6F1E7] p-2 text-[#14110F] focus:border-[#B08D57] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#14110F] font-medium text-[11px]">Subject:</label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="Full Stack Opportunity / Technical Inscription"
                    className="mt-1 w-full rounded border-hairline bg-[#F6F1E7] p-2 text-[#14110F] focus:border-[#B08D57] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#14110F] font-medium text-[11px]">Message:</label>
                  <textarea
                    required
                    rows={4}
                    value={contactBody}
                    onChange={(e) => setContactBody(e.target.value)}
                    placeholder="Describe your project, team, or opportunity..."
                    className="mt-1 w-full rounded border-hairline bg-[#F6F1E7] p-2 text-[#14110F] focus:border-[#B08D57] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="flex w-full items-center justify-center gap-2 rounded border border-[#6F665A]/30 bg-[#EDE5D3] py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:border-[#B08D57] disabled:opacity-50 transition-colors"
                >
                  <Send className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span>{contactLoading ? "Transmitting..." : "Send Direct Transmission"}</span>
                </button>
              </form>

              {/* Direct Coordinates */}
              <div className="mt-8 border-t-hairline pt-4 font-mono text-[11px] text-[#6F665A] space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-[#B08D57]" />
                  <a href="mailto:srivasrajan8@gmail.com" className="hover:underline text-[#14110F]">
                    srivasrajan8@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-[#B08D57]" />
                  <span>+91 7007968745</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
