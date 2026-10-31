-- ==============================================================================
-- Srajan Srivastava — Sticker-Bomb World CMS Schema
-- Migration: 20261101_sticker_cms_schema.sql
-- ==============================================================================

-- 1. CHAPTERS TABLE (0 to 8 Story Chapters)
CREATE TABLE IF NOT EXISTS chapters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_num INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  theme_color TEXT NOT NULL DEFAULT '#FFC93C',
  tagline TEXT,
  story_text TEXT NOT NULL,
  hero_metric TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TRADING CARDS TABLE (Collectible holographic cards)
CREATE TABLE IF NOT EXISTS trading_cards (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  rarity TEXT NOT NULL DEFAULT 'Common', -- 'Common', 'Rare', 'Epic', 'Legendary'
  category TEXT NOT NULL DEFAULT 'project', -- 'project', 'achievement', 'origin', 'role', 'secret'
  description TEXT NOT NULL,
  stats JSONB DEFAULT '{}'::jsonb,
  artwork_icon TEXT,
  artwork_url TEXT,
  flavor_text TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. QUESTS TABLE
CREATE TABLE IF NOT EXISTS quests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  condition_type TEXT NOT NULL DEFAULT 'interaction',
  reward_stickers INTEGER DEFAULT 2,
  is_secret BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TEAMMATES TABLE
CREATE TABLE IF NOT EXISTS teammates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  project_slug TEXT NOT NULL, -- 'crack-a-code', 'clavis'
  linkedin_url TEXT,
  avatar_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. AI FACTS KNOWLEDGE BANK
CREATE TABLE IF NOT EXISTS ai_facts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL, -- 'education', 'experience', 'projects', 'personal', 'skills'
  fact TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. MEDIA ASSETS
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_num INTEGER,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image',
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ALTER TIMELINE EVENTS (Add lane for Code vs Music)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'timeline_events' AND column_name = 'lane'
  ) THEN
    ALTER TABLE timeline_events ADD COLUMN lane TEXT DEFAULT 'code';
  END IF;
END $$;

-- 8. ALTER VISITOR PROGRESS (Add sticker currency, level, quests)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visitor_progress' AND column_name = 'stickers_count'
  ) THEN
    ALTER TABLE visitor_progress ADD COLUMN stickers_count INTEGER DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visitor_progress' AND column_name = 'level'
  ) THEN
    ALTER TABLE visitor_progress ADD COLUMN level TEXT DEFAULT 'Newbie';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visitor_progress' AND column_name = 'cards_unlocked'
  ) THEN
    ALTER TABLE visitor_progress ADD COLUMN cards_unlocked TEXT[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'visitor_progress' AND column_name = 'quests_completed'
  ) THEN
    ALTER TABLE visitor_progress ADD COLUMN quests_completed TEXT[] DEFAULT '{}';
  END IF;
END $$;

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE trading_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE teammates ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
DROP POLICY IF EXISTS "Public read chapters" ON chapters;
CREATE POLICY "Public read chapters" ON chapters FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read trading_cards" ON trading_cards;
CREATE POLICY "Public read trading_cards" ON trading_cards FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read quests" ON quests;
CREATE POLICY "Public read quests" ON quests FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read teammates" ON teammates;
CREATE POLICY "Public read teammates" ON teammates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read ai_facts" ON ai_facts;
CREATE POLICY "Public read ai_facts" ON ai_facts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read media_assets" ON media_assets;
CREATE POLICY "Public read media_assets" ON media_assets FOR SELECT USING (true);

-- Admin Full Write Access Policies
DROP POLICY IF EXISTS "Admin write chapters" ON chapters;
CREATE POLICY "Admin write chapters" ON chapters FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write trading_cards" ON trading_cards;
CREATE POLICY "Admin write trading_cards" ON trading_cards FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write quests" ON quests;
CREATE POLICY "Admin write quests" ON quests FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write teammates" ON teammates;
CREATE POLICY "Admin write teammates" ON teammates FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write ai_facts" ON ai_facts;
CREATE POLICY "Admin write ai_facts" ON ai_facts FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write media_assets" ON media_assets;
CREATE POLICY "Admin write media_assets" ON media_assets FOR ALL USING (true) WITH CHECK (true);

