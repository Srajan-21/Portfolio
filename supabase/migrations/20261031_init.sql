-- ==============================================================================
-- Srajan Srivastava — The Player's Journal Portfolio Schema
-- Migration: 20261031_init.sql
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TIMELINE EVENTS TABLE
CREATE TABLE IF NOT EXISTS timeline_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level INTEGER NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  body_md TEXT NOT NULL,
  date_start TEXT NOT NULL,
  date_end TEXT,
  tags TEXT[] DEFAULT '{}',
  media_url TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description_md TEXT NOT NULL,
  tech TEXT[] DEFAULT '{}',
  metrics JSONB DEFAULT '{}'::jsonb,
  links JSONB DEFAULT '{}'::jsonb,
  cover_url TEXT,
  level INTEGER NOT NULL,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  stamp_variant TEXT DEFAULT 'standard',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SKILLS TABLE
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Languages', 'Backend', 'Frontend', 'Databases & Search', 'Cloud & DevOps', 'System Design & AI', 'Core CS'
  proficiency INTEGER DEFAULT 80,
  used_in_project_ids TEXT[] DEFAULT '{}',
  icon TEXT,
  sort_order INTEGER DEFAULT 0
);

-- 5. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. GUESTBOOK TABLE (With Realtime & Canvas Doodle Data)
CREATE TABLE IF NOT EXISTS guestbook (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  doodle_data JSONB,
  approved BOOLEAN DEFAULT true,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread', -- 'unread', 'read', 'archived'
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ANALYTICS EVENTS TABLE (Privacy-First)
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  path TEXT NOT NULL,
  level_reached INTEGER DEFAULT 0,
  country TEXT DEFAULT 'Unknown',
  device TEXT,
  referrer TEXT,
  duration INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. VISITOR PROGRESS & EASTER EGGS TABLE
CREATE TABLE IF NOT EXISTS visitor_progress (
  session_id TEXT PRIMARY KEY,
  xp INTEGER DEFAULT 0,
  levels_unlocked INTEGER[] DEFAULT '{0}',
  easter_eggs_found TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. STATS CACHE (GitHub, LeetCode)
CREATE TABLE IF NOT EXISTS stats_cache (
  key TEXT PRIMARY KEY,
  payload JSONB NOT NULL,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. CHAT SESSIONS & MESSAGES (AI Assistant Logs)
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  role TEXT NOT NULL, -- 'user', 'assistant'
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. RESUME DOWNLOADS TRACKER
CREATE TABLE IF NOT EXISTS resume_downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country TEXT DEFAULT 'Unknown',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_downloads ENABLE ROW LEVEL SECURITY;

-- Public READ for Published Content
CREATE POLICY "Public read published timeline" ON timeline_events FOR SELECT USING (published = true);
CREATE POLICY "Public read published projects" ON projects FOR SELECT USING (published = true);
CREATE POLICY "Public read achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read approved guestbook" ON guestbook FOR SELECT USING (approved = true);

-- Public INSERT for Visitor Interactions
CREATE POLICY "Public insert guestbook" ON guestbook FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert contact" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert analytics" ON analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public upsert progress" ON visitor_progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read stats cache" ON stats_cache FOR SELECT USING (true);
CREATE POLICY "Public insert chat sessions" ON chat_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert chat messages" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert resume downloads" ON resume_downloads FOR INSERT WITH CHECK (true);

-- Authenticated Admin Policies (Full Access)
CREATE POLICY "Admin full timeline" ON timeline_events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full achievements" ON achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full skills" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full guestbook" ON guestbook FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full contact" ON contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full analytics" ON analytics_events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full stats" ON stats_cache FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full chat" ON chat_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
