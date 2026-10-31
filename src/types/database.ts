export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface TimelineEvent {
  id: string;
  level: number;
  lane?: "code" | "music";
  title: string;
  subtitle: string | null;
  body_md: string;
  date_start: string;
  date_end: string | null;
  tags: string[];
  media_url: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description_md: string;
  tech: string[];
  metrics: Record<string, string | number>;
  links: Record<string, string>;
  cover_url: string | null;
  level: number;
  sort_order: number;
  published: boolean;
  status_badge?: string;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  stamp_variant: "standard" | "trophy" | "music" | "tour" | "dsa";
  image_url: string | null;
  created_at: string;
}

export type SkillCategory =
  | "Languages"
  | "Backend"
  | "Frontend"
  | "Databases & Search"
  | "Cloud & DevOps"
  | "System Design & AI"
  | "Core CS";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  used_in_project_ids: string[];
  icon: string | null;
  sort_order: number;
}

export type CardRarity = "Common" | "Rare" | "Epic" | "Legendary";

export interface TradingCard {
  id: string;
  title: string;
  subtitle: string;
  rarity: CardRarity;
  category: "project" | "achievement" | "origin" | "secret";
  description: string;
  stats: Record<string, string | number>;
  artwork_icon?: string;
  artwork_url?: string | null;
  flavor_text?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward_stickers: number;
  completed?: boolean;
  isSecret?: boolean;
}

export interface SiteSettings {
  currently: {
    building: string;
    listening: string;
    reading: string;
    location: string;
  };
  availability: {
    status: string;
    isOpen: boolean;
  };
  resume: {
    url: string;
    filename: string;
    updated_at: string;
  };
  team_links?: {
    abhishek?: string;
    swaraj?: string;
  };
  contact_info: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    leetcode: string;
    location: string;
  };
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  doodle_data?: string | null;
  approved: boolean;
  ip_hash: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: "unread" | "read" | "archived";
  ip_hash: string | null;
  created_at: string;
}

export type StickerLevel = "Newbie" | "Rookie" | "Pro" | "Legend";
export type CollectorRank = "Apprentice" | "Journeyman" | "Artisan" | "Master";

export interface VisitorProgress {
  session_id: string;
  stickers_count: number;
  level: StickerLevel;
  cards_unlocked: string[];
  quests_completed: string[];
  // Backwards compatibility fields:
  progress_score?: number;
  seals_earned?: string[];
  rank?: CollectorRank;
  levels_unlocked?: number[];
  easter_eggs_found?: string[];
  updated_at: string;
}
