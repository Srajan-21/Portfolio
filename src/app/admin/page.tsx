"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  FileText,
  Upload,
  CheckCircle2,
  Trash2,
  Mail,
  Eye,
  LogOut,
  Save,
  Radio,
  BookOpen,
  Users,
  Award,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"resume" | "guestbook" | "contacts" | "telemetry">("resume");

  // Resume settings state
  const [resumeUrl, setResumeUrl] = useState("/resume/Srajan_Srivastava_Resume.pdf");
  const [resumeFilename, setResumeFilename] = useState("Srajan_Srivastava_Resume.pdf");
  const [resumeSuccess, setResumeSuccess] = useState(false);

  // Teammates LinkedIn state
  const [abhishekLinkedin, setAbhishekLinkedin] = useState("");
  const [swarajLinkedin, setSwarajLinkedin] = useState("");
  const [teamSaved, setTeamSaved] = useState(false);

  // Availability state
  const [isAvailable, setIsAvailable] = useState(true);
  const [availabilityStatus, setAvailabilityStatus] = useState("Open to Software Engineering & Full Stack Roles");

  // Messages, Guestbook, Telemetry
  const [contacts, setContacts] = useState<Array<{ id: string; name: string; email: string; subject: string; message: string; created_at: string }>>([]);
  const [guestEntries, setGuestEntries] = useState<Array<{ id: string; name: string; message: string; approved: boolean; created_at: string }>>([]);
  const [progressRows, setProgressRows] = useState<Array<{ id: string; session_id: string; rank: string; progress_score: number; seals_earned: string[]; updated_at: string }>>([]);

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setUserEmail("srivasrajan8@gmail.com");
        setLoading(false);
      } else {
        setUserEmail(session.user.email || "srivasrajan8@gmail.com");
        setLoading(false);
      }
    });

    // Load initial site_settings
    supabase
      .from("site_settings")
      .select("key, value")
      .then(({ data }) => {
        if (data) {
          data.forEach((row) => {
            if (row.key === "resume" && row.value?.url) {
              setResumeUrl(row.value.url);
              if (row.value.filename) setResumeFilename(row.value.filename);
            }
            if (row.key === "team_links") {
              if (row.value.abhishek) setAbhishekLinkedin(row.value.abhishek);
              if (row.value.swaraj) setSwarajLinkedin(row.value.swaraj);
            }
            if (row.key === "availability") {
              setIsAvailable(row.value.isOpen ?? true);
              if (row.value.status) setAvailabilityStatus(row.value.status);
            }
          });
        }
      });

    // Load contacts
    supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(30)
      .then(({ data }) => {
        if (data) setContacts(data);
      });

    // Load guestbook
    supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(30)
      .then(({ data }) => {
        if (data) setGuestEntries(data);
      });

    // Load visitor progress telemetry
    supabase
      .from("visitor_progress")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(30)
      .then(({ data }) => {
        if (data) setProgressRows(data as any);
      });
  }, []);

  const handleUpdateResume = async (e: React.FormEvent) => {
    e.preventDefault();
    setResumeSuccess(false);

    const payload = {
      url: resumeUrl.trim(),
      filename: resumeFilename.trim(),
      updated_at: new Date().toISOString(),
    };

    await supabase.from("site_settings").upsert({
      key: "resume",
      value: payload,
    });

    setResumeSuccess(true);
    setTimeout(() => setResumeSuccess(false), 3000);
  };

  const handleUpdateTeamLinks = async (e: React.FormEvent) => {
    e.preventDefault();
    setTeamSaved(false);

    await supabase.from("site_settings").upsert({
      key: "team_links",
      value: {
        abhishek: abhishekLinkedin.trim(),
        swaraj: swarajLinkedin.trim(),
      },
    });

    setTeamSaved(true);
    setTimeout(() => setTeamSaved(false), 3000);
  };

  const handleDeleteGuest = async (id: string) => {
    await supabase.from("guestbook").delete().eq("id", id);
    setGuestEntries((prev) => prev.filter((g) => g.id !== id));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F1E7] font-mono text-xs text-[#6F665A]">
        Loading Editor&apos;s Desk...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F1E7] p-6 sm:p-12 text-[#14110F]">
      <div className="mx-auto max-w-6xl">
        {/* HEADER BAR */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#6F665A]/20 pb-5 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="rounded border border-[#B08D57] bg-[#EDE5D3] px-2.5 py-1 text-[10px] font-semibold text-[#8C6B3A] uppercase tracking-wider">
              CURATOR&apos;S DESK
            </span>
            <span className="text-[#6F665A] text-[11px]">
              AUTHENTICATED: {userEmail}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-3 sm:mt-0">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-[#14110F] hover:text-[#6B1E1E] transition-colors"
            >
              <Eye className="h-3.5 w-3.5 text-[#B08D57]" />
              <span>View Live Folio</span>
            </a>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-[#6B1E1E] hover:underline"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="my-8 flex flex-wrap gap-2 font-mono text-xs">
          {[
            { id: "resume", label: "Resume & Folio Assets", icon: FileText },
            { id: "guestbook", label: `Guestbook Ledger (${guestEntries.length})`, icon: BookOpen },
            { id: "contacts", label: `Direct Inquiries (${contacts.length})`, icon: Mail },
            { id: "telemetry", label: "Seals & Telemetry", icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded border px-4 py-2 transition-all ${
                  activeTab === tab.id
                    ? "border-[#B08D57] bg-[#EDE5D3] text-[#14110F] font-semibold shadow-sm"
                    : "border-[#6F665A]/20 bg-[#FAF7F2] text-[#6F665A] hover:bg-[#EDE5D3]/50"
                }`}
              >
                <Icon className="h-3.5 w-3.5 text-[#B08D57]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: RESUME & TEAM ASSETS */}
        {activeTab === "resume" && (
          <div className="space-y-8">
            {/* Resume Manager */}
            <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-8 shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C6B3A] font-semibold">
                RESUME DOSSIER CONFIGURATION
              </span>
              <p className="mt-1 font-serif text-sm text-[#6F665A]">
                When modified here, all visitor download links immediately serve the newly specified PDF asset.
              </p>

              <form onSubmit={handleUpdateResume} className="mt-6 space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[#14110F] font-medium text-[11px]">Resume PDF Path or URL:</label>
                  <input
                    type="text"
                    required
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    className="mt-1 w-full rounded border border-[#6F665A]/20 bg-[#F6F1E7] p-2.5 text-[#14110F] focus:border-[#B08D57] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#14110F] font-medium text-[11px]">Download Filename:</label>
                  <input
                    type="text"
                    required
                    value={resumeFilename}
                    onChange={(e) => setResumeFilename(e.target.value)}
                    className="mt-1 w-full rounded border border-[#6F665A]/20 bg-[#F6F1E7] p-2.5 text-[#14110F] focus:border-[#B08D57] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded border border-[#B08D57] bg-[#EDE5D3] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:bg-[#FAF7F2] transition-colors"
                >
                  <Save className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span>{resumeSuccess ? "Resume Path Updated!" : "Save Resume Configuration"}</span>
                </button>
              </form>
            </div>

            {/* Teammate LinkedIn Profile Fields */}
            <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-8 shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C6B3A] font-semibold">
                TEAMMATE PROFILES // CRACK-A-CODE 3.0 &amp; CLAVIS
              </span>
              <p className="mt-1 font-serif text-sm text-[#6F665A]">
                Update Abhishek Yadav and Swaraj Kumar&apos;s verified LinkedIn URLs:
              </p>

              <form onSubmit={handleUpdateTeamLinks} className="mt-6 space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[#14110F] font-medium text-[11px]">Abhishek Yadav LinkedIn URL:</label>
                  <input
                    type="url"
                    value={abhishekLinkedin}
                    onChange={(e) => setAbhishekLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/abhishek-yadav"
                    className="mt-1 w-full rounded border border-[#6F665A]/20 bg-[#F6F1E7] p-2.5 text-[#14110F] focus:border-[#B08D57] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#14110F] font-medium text-[11px]">Swaraj Kumar LinkedIn URL:</label>
                  <input
                    type="url"
                    value={swarajLinkedin}
                    onChange={(e) => setSwarajLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/swaraj-kumar"
                    className="mt-1 w-full rounded border border-[#6F665A]/20 bg-[#F6F1E7] p-2.5 text-[#14110F] focus:border-[#B08D57] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded border border-[#B08D57] bg-[#EDE5D3] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:bg-[#FAF7F2] transition-colors"
                >
                  <Save className="h-3.5 w-3.5 text-[#B08D57]" />
                  <span>{teamSaved ? "Teammate URLs Saved!" : "Save Teammate Links"}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: GUESTBOOK */}
        {activeTab === "guestbook" && (
          <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-8 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C6B3A] font-semibold">
              GUESTBOOK ARCHIVE ({guestEntries.length} INSCRIPTIONS)
            </span>

            <div className="mt-6 divide-y divide-[#6F665A]/15">
              {guestEntries.map((entry) => (
                <div key={entry.id} className="py-4 flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="font-semibold text-[#14110F]">{entry.name}</span>
                      <span className="text-[#6F665A] text-[10px]">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1.5 font-serif text-sm text-[#14110F]/90">
                      &ldquo;{entry.message}&rdquo;
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteGuest(entry.id)}
                    className="text-[#6F665A] hover:text-[#6B1E1E] p-1"
                    title="Delete Inscription"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CONTACTS */}
        {activeTab === "contacts" && (
          <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-8 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C6B3A] font-semibold">
              DIRECT INQUIRIES ({contacts.length})
            </span>

            <div className="mt-6 divide-y divide-[#6F665A]/15">
              {contacts.map((msg) => (
                <div key={msg.id} className="py-4 space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-semibold text-[#14110F]">{msg.name} &bull; {msg.email}</span>
                    <span className="text-[#6F665A] text-[10px]">{new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>
                  {msg.subject && (
                    <div className="font-mono text-[11px] text-[#8C6B3A]">Subject: {msg.subject}</div>
                  )}
                  <p className="font-serif text-sm text-[#14110F]/90 pt-1">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SEALS & TELEMETRY */}
        {activeTab === "telemetry" && (
          <div className="rounded border border-[#6F665A]/20 bg-[#FAF7F2] p-8 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C6B3A] font-semibold">
              COLLECTOR TELEMETRY &bull; VISITOR PROGRESS LOGS
            </span>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#6F665A]/20 text-[10px] uppercase text-[#6F665A]">
                    <th className="pb-2">Session ID</th>
                    <th className="pb-2">Collector Rank</th>
                    <th className="pb-2">Progress Score</th>
                    <th className="pb-2">Seals Earned</th>
                    <th className="pb-2">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#6F665A]/10">
                  {progressRows.map((row) => (
                    <tr key={row.id} className="py-2.5">
                      <td className="py-2 text-[#14110F]">{row.session_id}</td>
                      <td className="py-2 text-[#8C6B3A] font-semibold">{row.rank || "Apprentice"}</td>
                      <td className="py-2 text-[#14110F]">{row.progress_score ?? 0}</td>
                      <td className="py-2 text-[#6F665A]">
                        {Array.isArray(row.seals_earned) ? row.seals_earned.length : 0} / 12
                      </td>
                      <td className="py-2 text-[#6F665A] text-[10px]">
                        {new Date(row.updated_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
