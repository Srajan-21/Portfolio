"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { soundEngine } from "@/lib/sound";
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
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Resume settings state
  const [resumeUrl, setResumeUrl] = useState("/resume/Srajan_Srivastava_Resume.pdf");
  const [resumeFilename, setResumeFilename] = useState("Srajan_Srivastava_Resume.pdf");
  const [resumeSuccess, setResumeSuccess] = useState(false);

  // Availability state
  const [isAvailable, setIsAvailable] = useState(true);
  const [availabilityStatus, setAvailabilityStatus] = useState("Open to Software Engineering & Full Stack Roles");

  // Currently state
  const [building, setBuilding] = useState("CLAVIS startup launch");
  const [listening, setListening] = useState("Electric guitar blues & prog rock");

  // Messages & Guestbook
  const [contacts, setContacts] = useState<Array<{ id: string; name: string; email: string; subject: string; message: string; created_at: string }>>([]);
  const [guestEntries, setGuestEntries] = useState<Array<{ id: string; name: string; message: string; approved: boolean; created_at: string }>>([]);

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // Fallback for local dev convenience
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
            if (row.key === "availability") {
              setIsAvailable(row.value.isOpen ?? true);
              if (row.value.status) setAvailabilityStatus(row.value.status);
            }
            if (row.key === "currently") {
              if (row.value.building) setBuilding(row.value.building);
              if (row.value.listening) setListening(row.value.listening);
            }
          });
        }
      });

    // Load contacts
    supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data) setContacts(data);
      });

    // Load guestbook
    supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data) setGuestEntries(data);
      });
  }, []);

  const handleUpdateResume = async (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playStamp();
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

  const handleUpdateAvailability = async () => {
    soundEngine.playStamp();
    await supabase.from("site_settings").upsert({
      key: "availability",
      value: { isOpen: isAvailable, status: availabilityStatus },
    });
  };

  const handleSignOut = async () => {
    soundEngine.playClick();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2EBDD] font-mono text-xs dark:bg-[#181512]">
        Loading Editor&apos;s Desk...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2EBDD] p-4 font-serif text-[#1B1A17] selection:bg-[#D9432B] selection:text-[#F2EBDD] sm:p-8 dark:bg-[#181512] dark:text-[#EBE3D3]">
      <div className="mx-auto max-w-6xl">
        {/* Editor Desk Top Header */}
        <div className="flex flex-wrap items-center justify-between border-b-2 border-dashed border-[#D3C4A5] pb-4 font-mono text-xs dark:border-[#3A3328]">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#D9432B] px-2 py-0.5 font-bold text-white">
              EDITOR&apos;S DESK
            </span>
            <span className="text-[#837B6D] dark:text-[#7E7565]">
              LOGGED IN: {userEmail}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-1 text-[#1B1A17] hover:underline dark:text-[#EBE3D3]"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>View Public Journal</span>
            </a>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 text-[#D9432B] hover:underline dark:text-[#E55840]"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="my-8">
          <h1 className="font-display text-3xl font-black uppercase tracking-tight text-[#1B1A17] sm:text-5xl dark:text-[#EBE3D3]">
            Editorial Control Desk
          </h1>
          <p className="mt-2 font-serif text-base italic text-[#4B463E] dark:text-[#B2A896]">
            Update your live resume PDF, toggle hiring availability, and review guest transmissions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column (6 cols): Resume Manager & Availability */}
          <div className="space-y-6 lg:col-span-6">
            {/* Resume Upload / URL Manager Card */}
            <div className="rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-6 shadow-[5px_5px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[5px_5px_0px_0px_#EBE3D3]">
              <div className="flex items-center justify-between border-b border-[#D3C4A5] pb-2 font-mono text-xs dark:border-[#3A3328]">
                <div className="flex items-center gap-2 font-bold text-[#D9432B] dark:text-[#E55840]">
                  <FileText className="h-4 w-4" />
                  <span>LIVE RESUME PDF CONTROLLER</span>
                </div>
                <span className="text-[#837B6D] text-[10px]">DYNAMIC ENDPOINT</span>
              </div>

              {resumeSuccess && (
                <div className="mt-3 flex items-center gap-2 rounded border border-[#7A8B6F] bg-[#7A8B6F]/10 p-2 font-mono text-xs text-[#7A8B6F] dark:text-[#92A585]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Resume link updated! All download buttons now serve this file.</span>
                </div>
              )}

              <form onSubmit={handleUpdateResume} className="mt-4 space-y-4 font-mono text-xs">
                <div>
                  <label className="block font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                    Resume PDF Target URL or Storage Path:
                  </label>
                  <input
                    type="text"
                    required
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    placeholder="/resume/Srajan_Srivastava_Resume.pdf or https://..."
                    className="mt-1 w-full rounded border border-[#1B1A17] bg-[#F2EBDD] p-2 text-[#1B1A17] focus:border-[#D9432B] focus:outline-none dark:border-[#EBE3D3] dark:bg-[#181512] dark:text-[#EBE3D3]"
                  />
                  <p className="mt-1 text-[11px] text-[#837B6D]">
                    Can be a local path in /public, a Supabase Storage signed URL, or Google Drive direct link.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                    Display Filename:
                  </label>
                  <input
                    type="text"
                    required
                    value={resumeFilename}
                    onChange={(e) => setResumeFilename(e.target.value)}
                    placeholder="Srajan_Srivastava_Resume.pdf"
                    className="mt-1 w-full rounded border border-[#1B1A17] bg-[#F2EBDD] p-2 text-[#1B1A17] focus:border-[#D9432B] focus:outline-none dark:border-[#EBE3D3] dark:bg-[#181512] dark:text-[#EBE3D3]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded border-2 border-[#1B1A17] bg-[#D9432B] px-4 py-2 font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_#1B1A17] hover:opacity-90 dark:border-[#EBE3D3]"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Active Resume</span>
                  </button>

                  <a
                    href="/api/resume"
                    target="_blank"
                    className="flex items-center gap-1 font-mono text-xs text-[#D9432B] hover:underline"
                  >
                    <span>Test Download &rarr;</span>
                  </a>
                </div>
              </form>
            </div>

            {/* Availability & Currently Card */}
            <div className="rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-6 shadow-[5px_5px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[5px_5px_0px_0px_#EBE3D3]">
              <div className="flex items-center justify-between border-b border-[#D3C4A5] pb-2 font-mono text-xs dark:border-[#3A3328]">
                <div className="flex items-center gap-2 font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                  <Radio className="h-4 w-4 text-[#7A8B6F]" />
                  <span>AVAILABILITY &amp; CURRENT STATUS</span>
                </div>
              </div>

              <div className="mt-4 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Available for Hire:</span>
                  <button
                    onClick={() => setIsAvailable(!isAvailable)}
                    className={`rounded px-3 py-1 font-bold text-white transition-colors ${
                      isAvailable ? "bg-[#7A8B6F]" : "bg-[#837B6D]"
                    }`}
                  >
                    {isAvailable ? "YES (OPEN)" : "NO (CLOSED)"}
                  </button>
                </div>

                <div>
                  <label className="block font-bold">Status Label:</label>
                  <input
                    type="text"
                    value={availabilityStatus}
                    onChange={(e) => setAvailabilityStatus(e.target.value)}
                    className="mt-1 w-full rounded border border-[#1B1A17] bg-[#F2EBDD] p-2 dark:border-[#EBE3D3] dark:bg-[#181512]"
                  />
                </div>

                <button
                  onClick={handleUpdateAvailability}
                  className="flex items-center gap-2 rounded border border-[#1B1A17] bg-[#1B1A17] px-4 py-2 font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#EBE3D3] dark:text-black"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Update Availability</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Contact Inbox & Guestbook Moderation */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-6 shadow-[5px_5px_0px_0px_#1B1A17] dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[5px_5px_0px_0px_#EBE3D3]">
              <div className="flex items-center justify-between border-b border-[#D3C4A5] pb-2 font-mono text-xs dark:border-[#3A3328]">
                <div className="flex items-center gap-2 font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                  <Mail className="h-4 w-4 text-[#D9432B]" />
                  <span>CONTACT TRANSMISSIONS ({contacts.length})</span>
                </div>
              </div>

              <div className="mt-4 max-h-[350px] space-y-3 overflow-y-auto pr-1 font-mono text-xs">
                {contacts.length === 0 ? (
                  <div className="text-center font-serif text-sm italic text-[#837B6D]">
                    No messages received yet.
                  </div>
                ) : (
                  contacts.map((msg) => (
                    <div
                      key={msg.id}
                      className="rounded border border-[#D3C4A5] bg-[#F2EBDD] p-3 dark:border-[#3A3328] dark:bg-[#181512]"
                    >
                      <div className="flex items-center justify-between text-[11px] text-[#837B6D]">
                        <span className="font-bold text-[#1B1A17] dark:text-[#EBE3D3]">
                          {msg.name} ({msg.email})
                        </span>
                        <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="mt-1 font-bold text-[#D9432B]">
                        {msg.subject}
                      </div>
                      <p className="mt-1 font-serif text-xs text-[#4B463E] dark:text-[#B2A896]">
                        {msg.message}
                      </p>
                      <div className="mt-2 text-right">
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Portfolio Contact")}`}
                          className="text-[11px] text-[#7A8B6F] hover:underline"
                        >
                          Reply via Email &rarr;
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

