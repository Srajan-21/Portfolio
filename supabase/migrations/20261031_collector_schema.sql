-- ==============================================================================
-- Srajan Srivastava — The Collector's Edition Schema Evolution
-- Migration: 20261031_collector_schema.sql
-- ==============================================================================

-- Evolve visitor_progress from legacy ink XP to neutral seals & progress score
ALTER TABLE visitor_progress 
  ADD COLUMN IF NOT EXISTS progress_score INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS seals_earned TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS rank TEXT DEFAULT 'Apprentice';

-- Migrate any legacy xp into progress_score if progress_score is 0
UPDATE visitor_progress 
SET progress_score = xp 
WHERE progress_score = 0 AND xp IS NOT NULL;

-- Allow public upsert for seals and ranks
ALTER TABLE visitor_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public upsert progress" ON visitor_progress;
CREATE POLICY "Public upsert progress" ON visitor_progress FOR ALL USING (true) WITH CHECK (true);

