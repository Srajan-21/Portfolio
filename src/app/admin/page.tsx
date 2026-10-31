"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  Chapter,
  TimelineEvent,
  Project,
  TradingCard,
  Skill,
  Quest,
  Teammate,
  AIFact,
  SiteSettings,
  GuestbookEntry,
  ContactMessage,
} from "@/types/database";
import {
  SEED_CHAPTERS,
  SEED_TIMELINE,
  SEED_PROJECTS,
  SEED_CARDS,
  SEED_SKILLS,
  SEED_TEAMMATES,
  SEED_AI_FACTS,
  SEED_SETTINGS,
} from "@/lib/supabase/seed-data";
import {
  LayoutDashboard,
  Settings,
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  Users,
  Bot,
  MessageSquare,
  Mail,
  Plus,
  Save,
  Trash2,
  Edit3,
  Eye,
  LogOut,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Award,
  Gamepad2,
  FileText,
} from "lucide-react";

type AdminTab =
  | "overview"
  | "settings"
  | "chapters"
  | "timeline"
  | "projects"
  | "cards"
  | "teammates"
  | "quests"
  | "aifacts"
  | "guestbook"
  | "contacts";

export default function BackstageAdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>("srivasrajan8@gmail.com");
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [feedback, setFeedback] = useState<string | null>(null);

  // Database Collections State
  const [settings, setSettings] = useState<SiteSettings>(SEED_SETTINGS);
  const [chapters, setChapters] = useState<Chapter[]>(SEED_CHAPTERS);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(SEED_TIMELINE);
  const [projects, setProjects] = useState<Project[]>(SEED_PROJECTS);
  const [cards, setCards] = useState<TradingCard[]>(SEED_CARDS);
  const [teammates, setTeammates] = useState<Teammate[]>(SEED_TEAMMATES);
  const [aiFacts, setAiFacts] = useState<AIFact[]>(SEED_AI_FACTS);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [guestEntries, setGuestEntries] = useState<GuestbookEntry[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState({
    downloads: 0,
    visitors: 0,
    chats: 0,
  });

  // Active Editing States
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCard, setEditingCard] = useState<TradingCard | null>(null);
  const [editingTimeline, setEditingTimeline] = useState<TimelineEvent | null>(null);
  const [newAiFact, setNewAiFact] = useState({ fact: "", category: "experience" as any, keywords: "" });

  const notify = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const revalidateLiveSite = async () => {
    try {
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/" }),
      });
    } catch {}
  };

  // Initial Load & Auth Check
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
      setLoading(false);
    });

    // 1. Fetch site_settings
    supabase.from("site_settings").select("key, value").then(({ data }) => {
      if (data && data.length > 0) {
        const s = { ...SEED_SETTINGS };
        data.forEach((row) => {
          if (row.key === "currently" && row.value) s.currently = row.value;
          if (row.key === "availability" && row.value) s.availability = row.value;
          if (row.key === "resume" && row.value) s.resume = row.value;
          if (row.key === "team_links" && row.value) s.team_links = row.value;
          if (row.key === "contact_info" && row.value) s.contact_info = row.value;
        });
        setSettings(s);
      }
    });

    // 2. Fetch Chapters
    supabase.from("chapters").select("*").order("chapter_num", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setChapters(data as Chapter[]);
    });

    // 3. Fetch Timeline
    supabase.from("timeline_events").select("*").order("sort_order", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setTimeline(data as TimelineEvent[]);
    });

    // 4. Fetch Projects
    supabase.from("projects").select("*").order("sort_order", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setProjects(data as Project[]);
    });

    // 5. Fetch Cards
    supabase.from("trading_cards").select("*").order("sort_order", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setCards(data as TradingCard[]);
    });

    // 6. Fetch Teammates
    supabase.from("teammates").select("*").order("sort_order", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setTeammates(data as Teammate[]);
    });

    // 7. Fetch AI Facts
    supabase.from("ai_facts").select("*").order("sort_order", { ascending: true }).then(({ data }) => {
      if (data && data.length > 0) setAiFacts(data as AIFact[]);
    });

    // 8. Fetch Guestbook & Contacts
    supabase.from("guestbook").select("*").order("created_at", { ascending: false }).limit(40).then(({ data }) => {
      if (data) setGuestEntries(data as GuestbookEntry[]);
    });
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(40).then(({ data }) => {
      if (data) setContacts(data as ContactMessage[]);
    });

    // 9. Analytics Counts
    supabase.from("resume_downloads").select("id", { count: "exact", head: true }).then(({ count }) => {
      if (count !== null) setStats((p) => ({ ...p, downloads: count }));
    });
    supabase.from("visitor_progress").select("session_id", { count: "exact", head: true }).then(({ count }) => {
      if (count !== null) setStats((p) => ({ ...p, visitors: count }));
    });
  }, []);

  // Handlers
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from("site_settings").upsert({ key: "resume", value: settings.resume });
    await supabase.from("site_settings").upsert({ key: "availability", value: settings.availability });
    await supabase.from("site_settings").upsert({ key: "currently", value: settings.currently });
    await supabase.from("site_settings").upsert({ key: "team_links", value: settings.team_links });
    await revalidateLiveSite();
    notify("Settings saved to database & live site refreshed!");
  };

  const handleSaveChapter = async (chap: Chapter) => {
    await supabase.from("chapters").upsert(chap);
    setChapters((prev) => prev.map((c) => (c.chapter_num === chap.chapter_num ? chap : c)));
    setEditingChapter(null);
    await revalidateLiveSite();
    notify(`Chapter ${chap.chapter_num} updated & revalidated!`);
  };

  const handleSaveProject = async (proj: Project) => {
    await supabase.from("projects").upsert(proj);
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === proj.id);
      return idx >= 0 ? prev.map((p) => (p.id === proj.id ? proj : p)) : [...prev, proj];
    });
    setEditingProject(null);
    await revalidateLiveSite();
    notify(`Project '${proj.title}' saved!`);
  };

  const handleSaveCard = async (card: TradingCard) => {
    await supabase.from("trading_cards").upsert(card);
    setCards((prev) => {
      const idx = prev.findIndex((c) => c.id === card.id);
      return idx >= 0 ? prev.map((c) => (c.id === card.id ? card : c)) : [...prev, card];
    });
    setEditingCard(null);
    await revalidateLiveSite();
    notify(`Trading Card '${card.title}' saved!`);
  };

  const handleSaveTimelineEvent = async (event: TimelineEvent) => {
    await supabase.from("timeline_events").upsert(event);
    setTimeline((prev) => {
      const idx = prev.findIndex((e) => e.id === event.id);
      return idx >= 0 ? prev.map((e) => (e.id === event.id ? event : e)) : [...prev, event];
    });
    setEditingTimeline(null);
    await revalidateLiveSite();
    notify(`Timeline event '${event.title}' saved!`);
  };

  const handleAddAiFact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAiFact.fact.trim()) return;

    const factObj: AIFact = {
      id: `fact-${Date.now()}`,
      category: newAiFact.category,
      fact: newAiFact.fact.trim(),
      keywords: newAiFact.keywords.split(",").map((k) => k.trim()).filter(Boolean),
      sort_order: aiFacts.length + 1,
      published: true,
    };

    await supabase.from("ai_facts").upsert(factObj);
    setAiFacts((prev) => [...prev, factObj]);
    setNewAiFact({ fact: "", category: "experience", keywords: "" });
    notify("AI Knowledge Fact added!");
  };

  const handleDeleteAiFact = async (id: string) => {
    await supabase.from("ai_facts").delete().eq("id", id);
    setAiFacts((prev) => prev.filter((f) => f.id !== id));
    notify("AI Knowledge Fact deleted.");
  };

  const handleDeleteGuest = async (id: string) => {
    await supabase.from("guestbook").delete().eq("id", id);
    setGuestEntries((prev) => prev.filter((g) => g.id !== id));
    notify("Guestbook entry deleted.");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF8EC] font-mono text-sm text-[#14121A]">
        Opening Srajan&apos;s Backstage Desk...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8EC] bg-dot-grid text-[#14121A] pb-20">
      {/* FEEDBACK TOAST */}
      {feedback && (
        <div className="fixed top-6 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-2.5 rounded-2xl border-ink-4 bg-[#FFC93C] px-5 py-3 shadow-hard font-mono text-xs font-black uppercase text-[#14121A]">
            <CheckCircle2 className="h-5 w-5 text-[#3DDC97]" />
            <span>{feedback}</span>
          </div>
        </div>
      )}

      {/* TOP DESK HEADER */}
      <header className="border-b-ink-4 bg-white px-6 py-4 shadow-hard">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-ink-2 bg-[#FF4D2E] text-white font-black text-xl shadow-hard-sm">
              ★
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-black uppercase tracking-tight text-[#14121A]">
                  THE BACKSTAGE
                </span>
                <span className="rounded-md border-ink-2 bg-[#3DDC97] px-2 py-0.5 font-mono text-[10px] font-black uppercase">
                  CMS v2.0
                </span>
              </div>
              <span className="font-mono text-xs text-[#14121A]/70">
                Logged in as: <strong className="text-[#14121A]">{userEmail}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={revalidateLiveSite}
              title="Force revalidate live Next.js ISR cache"
              className="btn-press flex items-center gap-1.5 rounded-xl border-ink-2 bg-[#FFC93C] px-3.5 py-2 font-bold shadow-hard-sm"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh Cache</span>
            </button>

            <a
              href="/"
              target="_blank"
              className="btn-press flex items-center gap-1.5 rounded-xl border-ink-2 bg-white px-3.5 py-2 font-bold shadow-hard-sm hover:bg-[#3DDC97]"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>View Live World</span>
            </a>

            <button
              onClick={handleSignOut}
              className="btn-press flex items-center gap-1.5 rounded-xl border-ink-2 bg-[#FF8FB8] px-3.5 py-2 font-bold text-[#14121A] shadow-hard-sm"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
        {/* CHUNKY STICKER NAVIGATION BAR */}
        <div className="flex flex-wrap gap-2 pb-8 border-b-ink-2 font-mono text-xs">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard, color: "#FFC93C" },
            { id: "settings", label: "Hero & Settings", icon: Settings, color: "#FF8FB8" },
            { id: "chapters", label: "Chapters (0-8)", icon: BookOpen, color: "#3DDC97" },
            { id: "timeline", label: "Timeline (Lanes)", icon: Calendar, color: "#2F5BFF", text: "#FFFFFF" },
            { id: "projects", label: "Projects", icon: Layers, color: "#FF4D2E", text: "#FFFFFF" },
            { id: "cards", label: "Trading Cards", icon: Sparkles, color: "#7B4DFF", text: "#FFFFFF" },
            { id: "teammates", label: "Teammates", icon: Users, color: "#FFC93C" },
            { id: "aifacts", label: "AI Knowledge", icon: Bot, color: "#3DDC97" },
            { id: "guestbook", label: `Guestbook (${guestEntries.length})`, icon: MessageSquare, color: "#FF8FB8" },
            { id: "contacts", label: `Inquiries (${contacts.length})`, icon: Mail, color: "#2F5BFF", text: "#FFFFFF" },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                style={active ? { backgroundColor: tab.color, color: tab.text || "#14121A" } : {}}
                className={`btn-press flex items-center gap-2 rounded-xl border-ink-2 px-4 py-2 font-black uppercase transition-all shadow-hard-sm ${
                  active ? "scale-105" : "bg-white text-[#14121A] hover:bg-white/80"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === "overview" && (
          <div className="space-y-8 pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-3xl border-ink-4 bg-[#FFC93C] p-6 shadow-hard">
                <span className="font-mono text-xs font-black uppercase">LIVE VISITORS ACCREDITED</span>
                <div className="my-2 font-display text-5xl font-black text-[#14121A]">
                  {stats.visitors}
                </div>
                <span className="font-mono text-[11px] font-bold text-[#14121A]/80">
                  Recorded in Supabase visitor_progress
                </span>
              </div>

              <div className="rounded-3xl border-ink-4 bg-[#3DDC97] p-6 shadow-hard">
                <span className="font-mono text-xs font-black uppercase">RESUME DOSSIER DOWNLOADS</span>
                <div className="my-2 font-display text-5xl font-black text-[#14121A]">
                  {stats.downloads}
                </div>
                <span className="font-mono text-[11px] font-bold text-[#14121A]/80">
                  Served through /api/resume route
                </span>
              </div>

              <div className="rounded-3xl border-ink-4 bg-[#2F5BFF] p-6 text-white shadow-hard">
                <span className="font-mono text-xs font-black uppercase">DIRECT INQUIRIES RECEIVED</span>
                <div className="my-2 font-display text-5xl font-black text-white">
                  {contacts.length}
                </div>
                <span className="font-mono text-[11px] font-bold text-white/80">
                  Inquiries in contact inbox
                </span>
              </div>
            </div>

            <div className="rounded-3xl border-ink-4 bg-white p-8 shadow-hard">
              <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-[#FF4D2E] mb-4">
                <span>⚡ CMS CAPABILITIES // FULL DYNAMIC SYNC</span>
              </div>
              <p className="font-sans text-base leading-relaxed text-[#14121A]">
                The entire website is now wired to database models. Any modification saved here immediately updates the underlying Supabase tables and triggers instant Next.js ISR cache revalidation without needing a rebuild.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: SITE SETTINGS & HERO */}
        {activeTab === "settings" && (
          <form onSubmit={handleSaveSettings} className="space-y-8 pt-8 max-w-4xl">
            <div className="rounded-3xl border-ink-4 bg-white p-8 shadow-hard space-y-6">
              <div className="flex items-center justify-between border-b-ink-2 pb-4">
                <span className="font-display text-2xl font-black uppercase">Resume &amp; Availability</span>
                <span className="bg-[#FFC93C] px-3 py-1 rounded-full border-ink-2 font-mono text-xs font-black uppercase">
                  Global Settings
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
                <div>
                  <label className="block font-black uppercase mb-1">Resume PDF Path or URL:</label>
                  <input
                    type="text"
                    value={settings.resume?.url || ""}
                    onChange={(e) =>
                      setSettings((p) => ({
                        ...p,
                        resume: { ...p.resume, url: e.target.value },
                      }))
                    }
                    className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5BFF]"
                  />
                  <span className="text-[10px] text-[#14121A]/60 block mt-1">
                    Served directly when visitors click &apos;Download Resume&apos;.
                  </span>
                </div>

                <div>
                  <label className="block font-black uppercase mb-1">Resume Download Filename:</label>
                  <input
                    type="text"
                    value={settings.resume?.filename || ""}
                    onChange={(e) =>
                      setSettings((p) => ({
                        ...p,
                        resume: { ...p.resume, filename: e.target.value },
                      }))
                    }
                    className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5BFF]"
                  />
                </div>
              </div>

              <div className="space-y-4 font-mono text-xs pt-4 border-t-ink-2">
                <div>
                  <label className="block font-black uppercase mb-1">Availability Headline:</label>
                  <input
                    type="text"
                    value={settings.availability?.status || ""}
                    onChange={(e) =>
                      setSettings((p) => ({
                        ...p,
                        availability: { ...p.availability, status: e.target.value },
                      }))
                    }
                    className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-3 text-sm focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-black uppercase mb-1">Currently Building:</label>
                    <input
                      type="text"
                      value={settings.currently?.building || ""}
                      onChange={(e) =>
                        setSettings((p) => ({
                          ...p,
                          currently: { ...p.currently, building: e.target.value },
                        }))
                      }
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-3 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-black uppercase mb-1">Currently Listening:</label>
                    <input
                      type="text"
                      value={settings.currently?.listening || ""}
                      onChange={(e) =>
                        setSettings((p) => ({
                          ...p,
                          currently: { ...p.currently, listening: e.target.value },
                        }))
                      }
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-3 text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn-press flex items-center gap-2 rounded-2xl border-ink-4 bg-[#FF4D2E] px-8 py-3.5 font-mono text-sm font-black uppercase text-white shadow-hard"
              >
                <Save className="h-4 w-4" />
                <span>Save Settings &amp; Revalidate</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: CHAPTERS MANAGEMENT */}
        {activeTab === "chapters" && (
          <div className="space-y-6 pt-8">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-black uppercase">
                Story Chapters (0 to 8)
              </span>
              <span className="font-mono text-xs font-bold text-[#14121A]/70">
                Click any chapter to edit text &amp; theme color
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chapters.map((chap) => (
                <div
                  key={chap.chapter_num}
                  className="rounded-3xl border-ink-4 bg-white p-6 shadow-hard space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{ backgroundColor: chap.theme_color }}
                      className="px-3 py-1 rounded-full border-ink-2 font-mono text-xs font-black uppercase text-[#14121A]"
                    >
                      CH. {chap.chapter_num}
                    </span>
                    <button
                      onClick={() => setEditingChapter(chap)}
                      className="btn-press flex items-center gap-1.5 rounded-lg border-ink-2 bg-[#FFC93C] px-3 py-1 font-mono text-xs font-bold"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <h3 className="font-display text-xl font-black text-[#14121A]">
                    {chap.title}
                  </h3>
                  <div className="font-mono text-xs text-[#2F5BFF] font-bold">
                    {chap.tagline}
                  </div>
                  <p className="font-sans text-xs leading-relaxed text-[#14121A]/80 line-clamp-3">
                    {chap.story_text}
                  </p>
                </div>
              ))}
            </div>

            {/* Editing Chapter Modal */}
            {editingChapter && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-xl rounded-3xl border-ink-4 bg-white p-8 shadow-hard-pop space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b-ink-2 pb-3">
                    <span className="font-display text-xl font-black uppercase">
                      Edit Chapter {editingChapter.chapter_num}
                    </span>
                    <button
                      onClick={() => setEditingChapter(null)}
                      className="rounded-full border-ink-2 bg-[#FF8FB8] p-1.5"
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    <label className="block font-black uppercase mb-1">Title:</label>
                    <input
                      type="text"
                      value={editingChapter.title}
                      onChange={(e) => setEditingChapter({ ...editingChapter, title: e.target.value })}
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-black uppercase mb-1">Tagline:</label>
                    <input
                      type="text"
                      value={editingChapter.tagline || ""}
                      onChange={(e) => setEditingChapter({ ...editingChapter, tagline: e.target.value })}
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-black uppercase mb-1">Theme Color Hex:</label>
                    <input
                      type="text"
                      value={editingChapter.theme_color}
                      onChange={(e) => setEditingChapter({ ...editingChapter, theme_color: e.target.value })}
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-black uppercase mb-1">Story Narrative (Markdown):</label>
                    <textarea
                      rows={5}
                      value={editingChapter.story_text}
                      onChange={(e) => setEditingChapter({ ...editingChapter, story_text: e.target.value })}
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm font-sans"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setEditingChapter(null)}
                      className="rounded-xl border-ink-2 bg-white px-4 py-2 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveChapter(editingChapter)}
                      className="rounded-xl border-ink-2 bg-[#3DDC97] px-6 py-2 font-black uppercase text-[#14121A]"
                    >
                      Save Chapter
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: TIMELINE (CODE VS MUSIC LANES) */}
        {activeTab === "timeline" && (
          <div className="space-y-6 pt-8">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-black uppercase">
                Timeline Events ({timeline.length})
              </span>
              <button
                onClick={() =>
                  setEditingTimeline({
                    id: `tl-${Date.now()}`,
                    level: 1,
                    lane: "code",
                    title: "New Timeline Milestone",
                    subtitle: "Subtitle",
                    body_md: "Description",
                    date_start: "2024-01-01",
                    date_end: null,
                    tags: ["Engineering"],
                    media_url: null,
                    sort_order: timeline.length + 1,
                    published: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                  })
                }
                className="btn-press flex items-center gap-1.5 rounded-xl border-ink-2 bg-[#FF4D2E] px-4 py-2 font-mono text-xs font-black uppercase text-white shadow-hard-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Add Event</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {timeline.map((event) => (
                <div
                  key={event.id}
                  className="rounded-3xl border-ink-4 bg-white p-6 shadow-hard space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full border-ink-2 font-mono text-xs font-black uppercase ${
                        event.lane === "music" ? "bg-[#FF8FB8] text-[#14121A]" : "bg-[#2F5BFF] text-white"
                      }`}
                    >
                      {event.lane === "music" ? "🎵 MUSIC LANE" : "💻 CODE LANE"}
                    </span>
                    <button
                      onClick={() => setEditingTimeline(event)}
                      className="btn-press rounded-lg border-ink-2 bg-[#FFC93C] px-3 py-1 font-mono text-xs font-bold"
                    >
                      Edit
                    </button>
                  </div>

                  <h4 className="font-display text-lg font-black">{event.title}</h4>
                  <div className="font-mono text-xs text-[#14121A]/70">{event.subtitle}</div>
                  <p className="font-sans text-xs leading-relaxed text-[#14121A]/80 line-clamp-3">
                    {event.body_md}
                  </p>
                </div>
              ))}
            </div>

            {/* Editing Timeline Modal */}
            {editingTimeline && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-xl rounded-3xl border-ink-4 bg-white p-8 shadow-hard-pop space-y-4 font-mono text-xs max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b-ink-2 pb-3">
                    <span className="font-display text-xl font-black uppercase">Edit Milestone</span>
                    <button
                      onClick={() => setEditingTimeline(null)}
                      className="rounded-full border-ink-2 bg-[#FF8FB8] p-1.5"
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    <label className="block font-black uppercase mb-1">Title:</label>
                    <input
                      type="text"
                      value={editingTimeline.title}
                      onChange={(e) => setEditingTimeline({ ...editingTimeline, title: e.target.value })}
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-black uppercase mb-1">Lane (Code vs Music):</label>
                      <select
                        value={editingTimeline.lane || "code"}
                        onChange={(e) => setEditingTimeline({ ...editingTimeline, lane: e.target.value as any })}
                        className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm"
                      >
                        <option value="code">💻 Code Lane</option>
                        <option value="music">🎵 Music Lane</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-black uppercase mb-1">Date Start:</label>
                      <input
                        type="text"
                        value={editingTimeline.date_start}
                        onChange={(e) => setEditingTimeline({ ...editingTimeline, date_start: e.target.value })}
                        className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-black uppercase mb-1">Body Text (Markdown):</label>
                    <textarea
                      rows={4}
                      value={editingTimeline.body_md}
                      onChange={(e) => setEditingTimeline({ ...editingTimeline, body_md: e.target.value })}
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm font-sans"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setEditingTimeline(null)}
                      className="rounded-xl border-ink-2 bg-white px-4 py-2 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveTimelineEvent(editingTimeline)}
                      className="rounded-xl border-ink-2 bg-[#3DDC97] px-6 py-2 font-black uppercase"
                    >
                      Save Milestone
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PROJECTS MANAGEMENT */}
        {activeTab === "projects" && (
          <div className="space-y-6 pt-8">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-black uppercase">
                Engineering Projects ({projects.length})
              </span>
              <button
                onClick={() =>
                  setEditingProject({
                    id: `proj-${Date.now()}`,
                    slug: `new-proj-${Date.now()}`,
                    title: "New Project",
                    tagline: "High-throughput build",
                    description_md: "Description of the system architecture...",
                    tech: ["TypeScript", "Next.js"],
                    metrics: {},
                    links: {},
                    cover_url: null,
                    level: 5,
                    sort_order: projects.length + 1,
                    published: true,
                    status_badge: "In Development",
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                  })
                }
                className="btn-press flex items-center gap-1.5 rounded-xl border-ink-2 bg-[#FF4D2E] px-4 py-2 font-mono text-xs font-black uppercase text-white shadow-hard-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-3xl border-ink-4 bg-white p-6 shadow-hard space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-[#FFC93C] px-3 py-1 rounded-full border-ink-2 font-mono text-xs font-black uppercase">
                      {proj.status_badge || "Project"}
                    </span>
                    <button
                      onClick={() => setEditingProject(proj)}
                      className="btn-press rounded-lg border-ink-2 bg-[#3DDC97] px-3 py-1 font-mono text-xs font-bold"
                    >
                      Edit
                    </button>
                  </div>

                  <h3 className="font-display text-xl font-black">{proj.title}</h3>
                  <div className="font-mono text-xs text-[#FF4D2E] font-bold">{proj.tagline}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t) => (
                      <span key={t} className="rounded border-ink-2 bg-[#FFF8EC] px-2 py-0.5 font-mono text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Editing Project Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-xl rounded-3xl border-ink-4 bg-white p-8 shadow-hard-pop space-y-4 font-mono text-xs max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b-ink-2 pb-3">
                    <span className="font-display text-xl font-black uppercase">Edit Project</span>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="rounded-full border-ink-2 bg-[#FF8FB8] p-1.5"
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    <label className="block font-black uppercase mb-1">Title:</label>
                    <input
                      type="text"
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-black uppercase mb-1">Status Badge:</label>
                    <input
                      type="text"
                      value={editingProject.status_badge || ""}
                      placeholder="e.g. Launching Soon, Live Demo"
                      onChange={(e) => setEditingProject({ ...editingProject, status_badge: e.target.value })}
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-black uppercase mb-1">Description (Markdown):</label>
                    <textarea
                      rows={4}
                      value={editingProject.description_md}
                      onChange={(e) => setEditingProject({ ...editingProject, description_md: e.target.value })}
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm font-sans"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setEditingProject(null)}
                      className="rounded-xl border-ink-2 bg-white px-4 py-2 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveProject(editingProject)}
                      className="rounded-xl border-ink-2 bg-[#3DDC97] px-6 py-2 font-black uppercase"
                    >
                      Save Project
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: TRADING CARDS */}
        {activeTab === "cards" && (
          <div className="space-y-6 pt-8">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-black uppercase">
                Holographic Trading Cards ({cards.length})
              </span>
              <button
                onClick={() =>
                  setEditingCard({
                    id: `card_${Date.now()}`,
                    title: "NEW HOLOGRAPHIC CARD",
                    subtitle: "Collector Item",
                    rarity: "Epic",
                    category: "project",
                    description: "Card description...",
                    stats: { Power: "100%" },
                    artwork_icon: "⚡",
                    flavor_text: "Flavor quotation...",
                  })
                }
                className="btn-press flex items-center gap-1.5 rounded-xl border-ink-2 bg-[#7B4DFF] px-4 py-2 font-mono text-xs font-black uppercase text-white shadow-hard-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Add Card</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-3xl border-ink-4 bg-white p-6 shadow-hard space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full border-ink-2 font-mono text-xs font-black uppercase ${
                        card.rarity === "Legendary"
                          ? "bg-[#FFC93C] text-[#14121A]"
                          : card.rarity === "Epic"
                          ? "bg-[#7B4DFF] text-white"
                          : card.rarity === "Rare"
                          ? "bg-[#2F5BFF] text-white"
                          : "bg-[#3DDC97] text-[#14121A]"
                      }`}
                    >
                      {card.rarity}
                    </span>
                    <button
                      onClick={() => setEditingCard(card)}
                      className="btn-press rounded-lg border-ink-2 bg-[#FFC93C] px-3 py-1 font-mono text-xs font-bold"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{card.artwork_icon || "🎴"}</span>
                    <h4 className="font-display text-lg font-black">{card.title}</h4>
                  </div>
                  <div className="font-mono text-xs text-[#14121A]/70">{card.subtitle}</div>
                  <p className="font-sans text-xs text-[#14121A]/80 line-clamp-2">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Editing Card Modal */}
            {editingCard && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-xl rounded-3xl border-ink-4 bg-white p-8 shadow-hard-pop space-y-4 font-mono text-xs max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b-ink-2 pb-3">
                    <span className="font-display text-xl font-black uppercase">Edit Card</span>
                    <button
                      onClick={() => setEditingCard(null)}
                      className="rounded-full border-ink-2 bg-[#FF8FB8] p-1.5"
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    <label className="block font-black uppercase mb-1">Title:</label>
                    <input
                      type="text"
                      value={editingCard.title}
                      onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-black uppercase mb-1">Rarity:</label>
                      <select
                        value={editingCard.rarity}
                        onChange={(e) => setEditingCard({ ...editingCard, rarity: e.target.value as any })}
                        className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm"
                      >
                        <option value="Common">Common</option>
                        <option value="Rare">Rare</option>
                        <option value="Epic">Epic</option>
                        <option value="Legendary">Legendary</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-black uppercase mb-1">Artwork Emoji/Icon:</label>
                      <input
                        type="text"
                        value={editingCard.artwork_icon || ""}
                        onChange={(e) => setEditingCard({ ...editingCard, artwork_icon: e.target.value })}
                        className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-black uppercase mb-1">Description:</label>
                    <textarea
                      rows={3}
                      value={editingCard.description}
                      onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm font-sans"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setEditingCard(null)}
                      className="rounded-xl border-ink-2 bg-white px-4 py-2 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveCard(editingCard)}
                      className="rounded-xl border-ink-2 bg-[#3DDC97] px-6 py-2 font-black uppercase"
                    >
                      Save Card
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: TEAMMATES */}
        {activeTab === "teammates" && (
          <div className="space-y-6 pt-8">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-black uppercase">
                Teammates &amp; Co-Founders
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {teammates.map((tm) => (
                <div
                  key={tm.id}
                  className="rounded-3xl border-ink-4 bg-white p-6 shadow-hard space-y-3 font-mono text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-black">{tm.name}</span>
                    <span className="bg-[#FFC93C] px-2 py-0.5 rounded border-ink-2 text-[10px] uppercase font-bold">
                      {tm.project_slug}
                    </span>
                  </div>

                  <div className="text-[#14121A]/70">{tm.role}</div>

                  <div>
                    <label className="block font-bold uppercase mb-1 text-[10px]">LinkedIn URL:</label>
                    <input
                      type="url"
                      value={tm.linkedin_url || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTeammates((prev) =>
                          prev.map((t) => (t.id === tm.id ? { ...t, linkedin_url: val } : t))
                        );
                      }}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2 text-xs"
                    />
                  </div>

                  <button
                    onClick={async () => {
                      await supabase.from("teammates").upsert(tm);
                      await revalidateLiveSite();
                      notify(`Teammate '${tm.name}' updated!`);
                    }}
                    className="btn-press rounded-xl border-ink-2 bg-[#3DDC97] px-4 py-1.5 font-bold uppercase"
                  >
                    Save Teammate
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: AI KNOWLEDGE FACTS */}
        {activeTab === "aifacts" && (
          <div className="space-y-8 pt-8 max-w-4xl">
            <div className="rounded-3xl border-ink-4 bg-white p-8 shadow-hard space-y-4">
              <span className="font-display text-2xl font-black uppercase">
                Add AI Assistant Knowledge Fact
              </span>
              <p className="font-sans text-xs text-[#14121A]/70">
                Facts entered here are dynamically loaded by the AI assistant chatbot in Chapter VIII so it speaks accurately about Srajan&apos;s real experiences.
              </p>

              <form onSubmit={handleAddAiFact} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase mb-1">Category:</label>
                    <select
                      value={newAiFact.category}
                      onChange={(e) => setNewAiFact({ ...newAiFact, category: e.target.value as any })}
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm"
                    >
                      <option value="education">Education</option>
                      <option value="experience">Experience</option>
                      <option value="projects">Projects</option>
                      <option value="personal">Personal / Music</option>
                      <option value="skills">Skills</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold uppercase mb-1">Keywords (comma-separated):</label>
                    <input
                      type="text"
                      placeholder="e.g. Hudle, webhooks, Juspay"
                      value={newAiFact.keywords}
                      onChange={(e) => setNewAiFact({ ...newAiFact, keywords: e.target.value })}
                      className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase mb-1">Verified Fact Statement:</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Srajan led the Octave music society as President in his 6th semester..."
                    value={newAiFact.fact}
                    onChange={(e) => setNewAiFact({ ...newAiFact, fact: e.target.value })}
                    className="w-full rounded-xl border-ink-2 bg-[#FFF8EC] p-2.5 text-sm font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-press rounded-2xl border-ink-4 bg-[#FF4D2E] px-6 py-2.5 font-bold uppercase text-white shadow-hard-sm"
                >
                  Add Fact to AI Memory
                </button>
              </form>
            </div>

            {/* List of Facts */}
            <div className="space-y-4">
              <span className="font-display text-xl font-black uppercase">
                Active Knowledge Bank ({aiFacts.length} Facts)
              </span>

              <div className="divide-y-2 border-ink-2 rounded-2xl bg-white overflow-hidden shadow-hard">
                {aiFacts.map((fact) => (
                  <div key={fact.id} className="p-4 flex items-start justify-between gap-4 font-mono text-xs">
                    <div>
                      <span className="rounded bg-[#FFC93C] px-2 py-0.5 text-[10px] font-black uppercase border-ink-2 inline-block mb-1">
                        {fact.category}
                      </span>
                      <p className="font-sans text-sm text-[#14121A] mt-1">{fact.fact}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteAiFact(fact.id)}
                      className="text-[#FF4D2E] hover:underline p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: GUESTBOOK MODERATION */}
        {activeTab === "guestbook" && (
          <div className="space-y-6 pt-8">
            <span className="font-display text-2xl font-black uppercase">
              Guestbook Inscriptions ({guestEntries.length})
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {guestEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-3xl border-ink-4 bg-white p-6 shadow-hard space-y-2"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-black text-sm text-[#2F5BFF]">{entry.name}</span>
                    <button
                      onClick={() => handleDeleteGuest(entry.id)}
                      className="text-[#FF4D2E] hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <p className="font-sans text-sm text-[#14121A] italic">
                    &ldquo;{entry.message}&rdquo;
                  </p>

                  {entry.doodle_data && (
                    <div className="mt-2 rounded-xl border-ink-2 bg-[#FFF8EC] p-2">
                      <img src={entry.doodle_data} alt="Doodle" className="h-10 object-contain" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 10: CONTACT INQUIRIES */}
        {activeTab === "contacts" && (
          <div className="space-y-6 pt-8">
            <span className="font-display text-2xl font-black uppercase">
              Direct Contact Transmissions ({contacts.length})
            </span>

            <div className="space-y-4">
              {contacts.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-3xl border-ink-4 bg-white p-6 shadow-hard space-y-2"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <div>
                      <span className="font-black text-sm text-[#14121A]">{msg.name}</span>
                      <span className="text-[#14121A]/70 ml-2">&bull; {msg.email}</span>
                    </div>
                    <span className="text-[10px] text-[#14121A]/60">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {msg.subject && (
                    <div className="font-mono text-xs font-bold text-[#FF4D2E]">
                      Subject: {msg.subject}
                    </div>
                  )}

                  <p className="font-sans text-sm text-[#14121A] leading-relaxed pt-1">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
