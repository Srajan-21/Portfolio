import { supabase } from "@/lib/supabase/client";
import {
  Chapter,
  TimelineEvent,
  Project,
  Skill,
  TradingCard,
  Quest,
  Teammate,
  AIFact,
  SiteSettings,
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

/**
 * Fetches chapters from Supabase with instant fallback to verified seed data.
 */
export async function getChapters(): Promise<Chapter[]> {
  try {
    const { data, error } = await supabase
      .from("chapters")
      .select("*")
      .order("chapter_num", { ascending: true });

    if (error || !data || data.length === 0) {
      return SEED_CHAPTERS;
    }
    return data as Chapter[];
  } catch {
    return SEED_CHAPTERS;
  }
}

/**
 * Fetches timeline events with code/music lanes.
 */
export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  try {
    const { data, error } = await supabase
      .from("timeline_events")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return SEED_TIMELINE;
    }
    return data as TimelineEvent[];
  } catch {
    return SEED_TIMELINE;
  }
}

/**
 * Fetches projects (Tourphin, CLAVIS, Hudle, etc.).
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return SEED_PROJECTS;
    }
    return data as Project[];
  } catch {
    return SEED_PROJECTS;
  }
}

/**
 * Fetches collectible trading cards.
 */
export async function getTradingCards(): Promise<TradingCard[]> {
  try {
    const { data, error } = await supabase
      .from("trading_cards")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return SEED_CARDS;
    }
    return data as TradingCard[];
  } catch {
    return SEED_CARDS;
  }
}

/**
 * Fetches technical skills inventory.
 */
export async function getSkills(): Promise<Skill[]> {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return SEED_SKILLS;
    }
    return data as Skill[];
  } catch {
    return SEED_SKILLS;
  }
}

/**
 * Fetches teammates (Abhishek Yadav, Swaraj Kumar, etc.).
 */
export async function getTeammates(): Promise<Teammate[]> {
  try {
    const { data, error } = await supabase
      .from("teammates")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return SEED_TEAMMATES;
    }
    return data as Teammate[];
  } catch {
    return SEED_TEAMMATES;
  }
}

/**
 * Fetches AI facts knowledge bank.
 */
export async function getAIFacts(): Promise<AIFact[]> {
  try {
    const { data, error } = await supabase
      .from("ai_facts")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return SEED_AI_FACTS;
    }
    return data as AIFact[];
  } catch {
    return SEED_AI_FACTS;
  }
}

/**
 * Fetches site settings (currently, availability, resume).
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase.from("site_settings").select("key, value");

    if (error || !data || data.length === 0) {
      return SEED_SETTINGS;
    }

    const settings = { ...SEED_SETTINGS };
    data.forEach((row) => {
      if (row.key === "currently" && row.value) settings.currently = row.value;
      if (row.key === "availability" && row.value) settings.availability = row.value;
      if (row.key === "resume" && row.value) settings.resume = row.value;
      if (row.key === "team_links" && row.value) settings.team_links = row.value;
      if (row.key === "contact_info" && row.value) settings.contact_info = row.value;
    });

    return settings;
  } catch {
    return SEED_SETTINGS;
  }
}
