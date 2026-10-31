-- ==============================================================================
-- Srajan Srivastava — Seed Data
-- ==============================================================================

-- 1. TIMELINE EVENTS
INSERT INTO timeline_events (level, title, subtitle, body_md, date_start, date_end, tags, sort_order, published)
VALUES
(
  1,
  'Day One at BPIT Delhi',
  '9 November 2022 • B.Tech Information Technology',
  'Walked through the gates of Bhagwan Parshuram Institute of Technology (BPIT Delhi). Stepped into IT with pure curiosity, wanting to understand how software actually works beneath the user interface.',
  '2022-11-09',
  '2023-05-01',
  ARRAY['BPIT Delhi', 'B.Tech IT', 'College Day 1'],
  1,
  true
),
(
  1,
  'Octave: Guitar, Stage & Leadership',
  'Music Society of BPIT • 1st Sem Guitarist to 6th Sem President',
  'Joined Octave, the official music society of BPIT, in my first semester as an electric guitarist. Battled across dozens of Delhi NCR inter-college competitions and brought home victories. Appointed Coordinator in 5th semester, and elected President & Head in 6th semester—managing 60+ musicians and vocalists, directing live rehearsals, and producing landmark college fests.',
  '2022-12-01',
  '2026-05-01',
  ARRAY['Octave BPIT', 'President', 'Electric Guitar', 'Leadership', '60+ Members'],
  2,
  true
),
(
  2,
  'The Placement Struggle & DSA Comeback',
  'Coforge Selection, Amazon/GoComet Heartbreaks, and the Midnight Grind',
  'Selected for Coforge in 6th semester, but the offer letter went into corporate limbo. Faced relentless rejections and grueling final-round eliminations at premier companies like GoComet and Amazon. Realized consistency is king: pivoted from haphazard coding into rigorous daily Data Structures & Algorithms practice, grinding LeetCode day and night until patterns clicked.',
  '2024-08-01',
  '2025-06-01',
  ARRAY['DSA', 'LeetCode SRAJAN 9839', 'Resilience', 'C++', 'Systematic Problem Solving'],
  3,
  true
),
(
  3,
  'Smart India Hackathon & Tourphin',
  'First Architectural Build • Travel & Tour Platform',
  'Brainstormed and developed Tourphin for Smart India Hackathon (SIH). Conceived to bridge tourists with real local guides who know genuine hidden gems. Architected custom plan creation, itinerary modifications, dual-interface guide/traveler systems, and transactional booking safeguards.',
  '2023-09-01',
  '2024-03-01',
  ARRAY['Tourphin', 'React', 'Supabase', 'PostgreSQL', 'Razorpay', 'SIH'],
  4,
  true
),
(
  4,
  'Crack-a-Code 3.0 Hackathon Victory',
  '3rd Place among 50+ Teams • Nagarro',
  'Formed a powerhouse trio with Abhishek Yadav and Swaraj Kumar for Nagarro''s 24-hour hackathon. Tackled food waste through smart nutritional intake prediction: when users cannot gauge appetite, the system queries previous meal timing, composition, and volume to dynamically calculate zero-waste portion suggestions.',
  '2024-04-10',
  '2024-04-11',
  ARRAY['Nagarro', 'Hackathon 3rd Place', 'Food Waste Prevention', 'Team of 3'],
  5,
  true
),
(
  5,
  'CLAVIS: The Startup Magnum Opus',
  'Intelligent Job Portal & Zero-LLM ATS Platform',
  'Co-founded a startup alongside Abhishek Yadav, Swaraj Kumar, Hemant, and Saurabh. Spearheaded end-to-end architecture, planning, solutioning, and core implementation of CLAVIS: featuring a 6-subsystem architecture including a 15-module Zero-LLM ATS scoring engine, multi-key LLM gateway with Pacific timezone RPD/RPM locks, and deterministic matching.',
  '2025-01-01',
  '2026-10-31',
  ARRAY['CLAVIS', 'Startup', 'Next.js 14', 'Turso', 'SQLite FTS5', 'ATS Engine'],
  6,
  true
),
(
  6,
  'The Real World: Software Engineering Intern at Hudle',
  'Production Scale • New Delhi (08/2026 - Present)',
  'Entered real-world engineering at Hudle. Discovered everything college textbooks never taught: reconciling Juspay payment webhook lifecycles with strict cryptographic signature verification, preventing duplicate charges through database idempotency keys, debugging GoRouter deep-link loops in production, and validating platform fee calculations across complex tiered carts.',
  '2026-08-01',
  '2026-10-31',
  ARRAY['Hudle', 'Production Engineering', 'Juspay', 'GoRouter', 'Webhooks', 'Caching'],
  7,
  true
);

-- 2. PROJECTS
INSERT INTO projects (slug, title, tagline, description_md, tech, metrics, links, level, sort_order, published)
VALUES
(
  'tourphin',
  'Tourphin — Local Travel & Tour Platform',
  'Bridging travelers with verified local guides and customizable itineraries.',
  'Conceived for the Smart India Hackathon. Connects travelers directly with authentic local guides. Features role-based access control (RBAC) across travelers, guides, and platform admins. Built with custom tour plan authoring, itinerary stop customization, secure Razorpay checkout, and image storage via AWS S3 and CloudFront.',
  ARRAY['React', 'Supabase', 'PostgreSQL', 'Razorpay', 'Gemini API', 'AWS S3', 'CloudFront'],
  '{"query_improvement": "35%", "schema_capacity": "10,000+ users & bookings", "monthly_tx": "500+", "tx_success_rate": "99%", "failure_reduction": "25%"}'::jsonb,
  '{"live": "https://tourphin-eight.vercel.app/", "github": "https://github.com/Srajan-21/tourphin"}'::jsonb,
  3,
  1,
  true
),
(
  'crack-a-code-food-waste',
  'NutriPortion — Dynamic Food Waste Engine',
  'Crack-a-Code 3.0 (Nagarro) 3rd Place Award Winner.',
  'Built in a high-pressure 24h sprint by Srajan, Abhishek Yadav, and Swaraj Kumar. Tackled food waste through smart meal prediction: when users cannot state their portion size, it evaluates previous meal timing, macronutrient composition, and elapsed hours to prescribe the exact quantity needed to eliminate leftovers.',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Heuristic Math', 'Vercel'],
  '{"teams_competed": "50+", "finish_rank": "3rd Place", "time_limit": "24 Hours"}'::jsonb,
  '{"github": "https://github.com/Srajan-21"}'::jsonb,
  4,
  2,
  true
),
(
  'clavis',
  'CLAVIS — Intelligent Job Portal & ATS Platform',
  'Startup flagship featuring a Zero-LLM ATS scoring engine and fault-tolerant AI gateway.',
  'Co-founded with Abhishek Yadav, Swaraj Kumar, Hemant, and Saurabh. Architected and implemented by Srajan. Contains 6 decoupled subsystems: a multi-key LLM gateway with Pacific timezone RPD/RPM locks, a sub-5ms Zero-LLM ATS scoring engine evaluating 8 weighted pillars across 400 synonyms, a 4-API concurrent ETL pipeline with SHA-256 deduplication, and ARIA autonomous AI resume editor with streaming SSE.',
  ARRAY['Next.js 14', 'TypeScript', 'Turso / LibSQL', 'Supabase', 'SQLite FTS5', 'Gemini API', 'Zod', 'SSE', 'LaTeX'],
  '{"scoring_latency": "<5ms", "ats_modules": "15 modules (3,100+ LOC)", "taxonomy_terms": "400+ synonyms", "etl_records": "10,000+", "turso_instances": "6 isolated DBs"}'::jsonb,
  '{"live": "https://clavis.app", "github": "https://github.com/Srajan-21/clavis"}'::jsonb,
  5,
  3,
  true
),
(
  'hudle-payments',
  'Hudle Production Payment & Routing Engine',
  'Mission-critical payment reconciliation and deep-linking architecture at Hudle.',
  'Hardened Juspay webhook lifecycles using cryptographic signature verification, idempotency tracking, and atomic DB transaction syncing (99.5%+ reconciliation reliability). Resolved production GoRouter deep-link redirect loops and back-stack anomalies. Validated platform and convenience fee algorithms across tiered cart values with 100% pricing accuracy.',
  ARRAY['Dart', 'GoRouter', 'Juspay SDK', 'PostgreSQL', 'Webhooks', 'Transaction Idempotency'],
  '{"reconciliation_reliability": "99.5%+", "pricing_accuracy": "100%", "payment_lifecycle": "Zero-leakage"}'::jsonb,
  '{"company": "https://hudle.in"}'::jsonb,
  6,
  4,
  true
);

-- 3. ACHIEVEMENTS
INSERT INTO achievements (title, description, date, stamp_variant, image_url)
VALUES
(
  'Crack-a-Code 3.0 Bronze Trophy',
  'Secured 3rd place out of 50+ engineering teams at Nagarro''s 24-hour national hackathon for food waste prevention.',
  'April 2024',
  'trophy',
  '/stamps/nagarro_trophy.svg'
),
(
  'President, Octave BPIT',
  'Promoted to President of BPIT''s official music society; spearheaded 60+ members and organized multiple college competitions.',
  '2025 - 2026',
  'music',
  '/stamps/octave_president.svg'
),
(
  'Tourphin SIH Selection',
  'Smart India Hackathon qualifying project connecting local guides with global tourists.',
  '2023',
  'tour',
  '/stamps/sih_badge.svg'
),
(
  'LeetCode Scoreboard Master',
  'Cracked 300+ algorithmic problems across arrays, trees, dynamic programming, and graphs (Handle: SRAJAN 9839).',
  '2024 - 2026',
  'dsa',
  '/stamps/leetcode_star.svg'
);

-- 4. SKILLS
INSERT INTO skills (name, category, proficiency, used_in_project_ids, icon, sort_order)
VALUES
-- Languages
('TypeScript', 'Languages', 95, ARRAY['clavis', 'tourphin'], 'typescript', 1),
('JavaScript (ES6+)', 'Languages', 92, ARRAY['tourphin', 'clavis'], 'javascript', 2),
('C++', 'Languages', 88, ARRAY['leetcode'], 'cpp', 3),
('SQL', 'Languages', 90, ARRAY['clavis', 'tourphin', 'hudle-payments'], 'sql', 4),

-- Backend
('Next.js 14 (App Router)', 'Backend', 95, ARRAY['clavis'], 'nextjs', 5),
('Node.js & Express', 'Backend', 90, ARRAY['tourphin', 'clavis'], 'nodejs', 6),
('REST & Server-Sent Events (SSE)', 'Backend', 92, ARRAY['clavis'], 'sse', 7),
('Zod Schema Validation', 'Backend', 94, ARRAY['clavis'], 'zod', 8),

-- Databases & Search
('PostgreSQL', 'Databases & Search', 92, ARRAY['tourphin', 'hudle-payments'], 'postgresql', 9),
('Supabase (Auth, Realtime, DB)', 'Databases & Search', 94, ARRAY['tourphin', 'clavis'], 'supabase', 10),
('Turso & LibSQL', 'Databases & Search', 90, ARRAY['clavis'], 'turso', 11),
('SQLite FTS5 Full-Text Search', 'Databases & Search', 88, ARRAY['clavis'], 'sqlite', 12),

-- Frontend
('React 19 / 18', 'Frontend', 94, ARRAY['tourphin', 'clavis'], 'react', 13),
('Tailwind CSS', 'Frontend', 96, ARRAY['tourphin', 'clavis'], 'tailwind', 14),
('Framer Motion & GSAP', 'Frontend', 88, ARRAY['portfolio'], 'animation', 15),

-- Cloud & DevOps
('AWS S3 & CloudFront', 'Cloud & DevOps', 86, ARRAY['tourphin'], 'aws', 16),
('Razorpay & Juspay Integration', 'Cloud & DevOps', 90, ARRAY['tourphin', 'hudle-payments'], 'payment', 17),
('Git & GitHub Actions', 'Cloud & DevOps', 92, ARRAY['clavis', 'tourphin'], 'git', 18),

-- System Design & AI
('Zero-LLM ATS Engines', 'System Design & AI', 96, ARRAY['clavis'], 'ats', 19),
('Multi-Key LLM Gateway Design', 'System Design & AI', 94, ARRAY['clavis'], 'ai-gateway', 20),
('Gemini API Integration', 'System Design & AI', 92, ARRAY['clavis', 'tourphin'], 'gemini', 21),
('Webhook Idempotency & Reconciliation', 'System Design & AI', 92, ARRAY['hudle-payments'], 'webhook', 22),

-- Core CS
('Data Structures & Algorithms', 'Core CS', 90, ARRAY['leetcode'], 'dsa', 23),
('Object-Oriented Design', 'Core CS', 92, ARRAY['clavis'], 'ood', 24),
('Database Indexing & Normalization', 'Core CS', 90, ARRAY['tourphin', 'clavis'], 'db-design', 25);

-- 5. SITE SETTINGS
INSERT INTO site_settings (key, value)
VALUES
(
  'currently',
  '{"building": "CLAVIS startup launch", "listening": "Electric guitar blues & prog rock", "reading": "High-Performance Browser Networking", "location": "New Delhi, India"}'::jsonb
),
(
  'availability',
  '{"status": "Open to Software Engineering & Full Stack Roles", "isOpen": true}'::jsonb
),
(
  'resume',
  '{"url": "/resume/Srajan_Srivastava_Resume.pdf", "filename": "Srajan_Srivastava_Resume.pdf", "updated_at": "2026-10-31"}'::jsonb
),
(
  'contact_info',
  '{"email": "srivasrajan8@gmail.com", "phone": "+91 7007968745", "github": "https://github.com/Srajan-21", "linkedin": "https://linkedin.com/in/srajan-srivastava", "leetcode": "https://leetcode.com/u/SRAJAN 9839", "location": "New Delhi, India"}'::jsonb
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
