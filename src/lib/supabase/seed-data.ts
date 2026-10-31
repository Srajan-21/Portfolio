import {
  TimelineEvent,
  Project,
  Achievement,
  Skill,
  SiteSettings,
} from "@/types/database";

export const SEED_TIMELINE: TimelineEvent[] = [
  {
    id: "tl-1",
    level: 1,
    title: "Day One at BPIT Delhi",
    subtitle: "9 November 2022 • B.Tech Information Technology",
    body_md:
      "Walked through the gates of Bhagwan Parshuram Institute of Technology (BPIT Delhi). Stepped into IT with pure curiosity, wanting to understand how software actually works beneath the user interface.",
    date_start: "2022-11-09",
    date_end: "2023-05-01",
    tags: ["BPIT Delhi", "B.Tech IT", "College Day 1"],
    media_url: null,
    sort_order: 1,
    published: true,
    created_at: "2022-11-09T00:00:00Z",
    updated_at: "2026-10-31T00:00:00Z",
  },
  {
    id: "tl-2",
    level: 1,
    title: "Octave: Guitar, Stage & Leadership",
    subtitle: "Official Music Society of BPIT • 1st Sem Guitarist to 6th Sem President",
    body_md:
      "Joined Octave, the official music society of BPIT, in my first semester as an electric guitarist. Battled across dozens of Delhi NCR inter-college competitions and brought home victories. Appointed Coordinator in 5th semester, and elected President & Head in 6th semester—managing 60+ musicians and vocalists, directing live rehearsals, and producing landmark college fests.",
    date_start: "2022-12-01",
    date_end: "2026-05-01",
    tags: ["Octave BPIT", "President", "Electric Guitar", "Leadership", "60+ Members"],
    media_url: null,
    sort_order: 2,
    published: true,
    created_at: "2022-12-01T00:00:00Z",
    updated_at: "2026-10-31T00:00:00Z",
  },
  {
    id: "tl-3",
    level: 2,
    title: "The Placement Struggle & DSA Comeback",
    subtitle: "Coforge Selection, Amazon/GoComet Heartbreaks, and the Midnight Grind",
    body_md:
      "Selected for Coforge in 6th semester, but the offer letter went into corporate limbo. Faced relentless rejections and grueling final-round eliminations at premier companies like GoComet and Amazon. Realized consistency is king: pivoted from haphazard coding into rigorous daily Data Structures & Algorithms practice, grinding LeetCode day and night until patterns clicked.",
    date_start: "2024-08-01",
    date_end: "2025-06-01",
    tags: ["DSA", "LeetCode SRAJAN 9839", "Resilience", "C++", "Systematic Problem Solving"],
    media_url: null,
    sort_order: 3,
    published: true,
    created_at: "2024-08-01T00:00:00Z",
    updated_at: "2026-10-31T00:00:00Z",
  },
  {
    id: "tl-4",
    level: 3,
    title: "Smart India Hackathon & Tourphin",
    subtitle: "First Architectural Build • Travel & Tour Booking Platform",
    body_md:
      "Brainstormed and developed Tourphin for Smart India Hackathon (SIH). Conceived to bridge tourists with real local guides who know genuine hidden gems. Architected custom plan creation, itinerary modifications, dual-interface guide/traveler systems, and transactional booking safeguards.",
    date_start: "2023-09-01",
    date_end: "2024-03-01",
    tags: ["Tourphin", "React", "Supabase", "PostgreSQL", "Razorpay", "SIH"],
    media_url: null,
    sort_order: 4,
    published: true,
    created_at: "2023-09-01T00:00:00Z",
    updated_at: "2026-10-31T00:00:00Z",
  },
  {
    id: "tl-5",
    level: 4,
    title: "Crack-a-Code 3.0 Hackathon Victory",
    subtitle: "3rd Place among 50+ Teams • Nagarro",
    body_md:
      "Formed a powerhouse trio with Abhishek Yadav and Swaraj Kumar for Nagarro's 24-hour hackathon. Tackled food waste through smart nutritional intake prediction: when users cannot gauge appetite, the system queries previous meal timing, composition, and volume to dynamically calculate zero-waste portion suggestions.",
    date_start: "2024-04-10",
    date_end: "2024-04-11",
    tags: ["Nagarro", "Hackathon 3rd Place", "Food Waste Prevention", "Team of 3"],
    media_url: null,
    sort_order: 5,
    published: true,
    created_at: "2024-04-10T00:00:00Z",
    updated_at: "2026-10-31T00:00:00Z",
  },
  {
    id: "tl-6",
    level: 5,
    title: "CLAVIS: The Startup Magnum Opus",
    subtitle: "Intelligent Job Portal & Zero-LLM ATS Platform",
    body_md:
      "Co-founded a startup alongside Abhishek Yadav, Swaraj Kumar, Hemant, and Saurabh. Spearheaded end-to-end architecture, planning, solutioning, and core implementation of CLAVIS: featuring a 6-subsystem architecture including a 15-module Zero-LLM ATS scoring engine, multi-key LLM gateway with Pacific timezone RPD/RPM locks, and deterministic matching.",
    date_start: "2025-01-01",
    date_end: "2026-10-31",
    tags: ["CLAVIS", "Startup", "Next.js 14", "Turso", "SQLite FTS5", "ATS Engine"],
    media_url: null,
    sort_order: 6,
    published: true,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2026-10-31T00:00:00Z",
  },
  {
    id: "tl-7",
    level: 6,
    title: "The Real World: Software Engineering Intern at Hudle",
    subtitle: "Production Scale • New Delhi (08/2026 - Present)",
    body_md:
      "Entered real-world engineering at Hudle. Discovered everything college textbooks never taught: reconciling Juspay payment webhook lifecycles with strict cryptographic signature verification, preventing duplicate charges through database idempotency keys, debugging GoRouter deep-link loops in production, and validating platform fee calculations across complex tiered carts.",
    date_start: "2026-08-01",
    date_end: "2026-10-31",
    tags: ["Hudle", "Production Engineering", "Juspay", "GoRouter", "Webhooks", "Caching"],
    media_url: null,
    sort_order: 7,
    published: true,
    created_at: "2026-08-01T00:00:00Z",
    updated_at: "2026-10-31T00:00:00Z",
  },
];

export const SEED_PROJECTS: Project[] = [
  {
    id: "proj-1",
    slug: "tourphin",
    title: "Tourphin — Local Travel & Tour Platform",
    tagline: "Bridging travelers with verified local guides and customizable itineraries.",
    description_md:
      "Conceived for the Smart India Hackathon. Connects travelers directly with authentic local guides. Features role-based access control (RBAC) across travelers, guides, and platform admins. Built with custom tour plan authoring, itinerary stop customization, secure Razorpay checkout, and image storage via AWS S3 and CloudFront.",
    tech: ["React", "Supabase", "PostgreSQL", "Razorpay", "Gemini API", "AWS S3", "CloudFront"],
    metrics: {
      query_improvement: "35%",
      schema_capacity: "10,000+ users & bookings",
      monthly_tx: "500+",
      tx_success_rate: "99%",
      failure_reduction: "25%",
    },
    links: {
      live: "https://tourphin-eight.vercel.app/",
      github: "https://github.com/Srajan-21/tourphin",
    },
    cover_url: null,
    level: 3,
    sort_order: 1,
    published: true,
    created_at: "2023-09-01T00:00:00Z",
    updated_at: "2026-10-31T00:00:00Z",
  },
  {
    id: "proj-2",
    slug: "crack-a-code-food-waste",
    title: "NutriPortion — Dynamic Food Waste Engine",
    tagline: "Crack-a-Code 3.0 (Nagarro) 3rd Place Award Winner.",
    description_md:
      "Built in a high-pressure 24h sprint by Srajan, Abhishek Yadav, and Swaraj Kumar. Tackled food waste through smart meal prediction: when users cannot state their portion size, it evaluates previous meal timing, macronutrient composition, and elapsed hours to prescribe the exact quantity needed to eliminate leftovers.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Heuristic Math", "Vercel"],
    metrics: {
      teams_competed: "50+",
      finish_rank: "3rd Place",
      time_limit: "24 Hours",
    },
    links: {
      github: "https://github.com/Srajan-21",
    },
    cover_url: null,
    level: 4,
    sort_order: 2,
    published: true,
    created_at: "2024-04-10T00:00:00Z",
    updated_at: "2026-10-31T00:00:00Z",
  },
  {
    id: "proj-3",
    slug: "clavis",
    title: "CLAVIS — Intelligent Job Portal & ATS Platform",
    tagline: "Startup flagship featuring a Zero-LLM ATS scoring engine and fault-tolerant AI gateway.",
    description_md:
      "Co-founded with Abhishek Yadav, Swaraj Kumar, Hemant, and Saurabh. Architected and implemented by Srajan. Contains 6 decoupled subsystems: a multi-key LLM gateway with Pacific timezone RPD/RPM locks, a sub-5ms Zero-LLM ATS scoring engine evaluating 8 weighted pillars across 400 synonyms, a 4-API concurrent ETL pipeline with SHA-256 deduplication, and ARIA autonomous AI resume editor with streaming SSE.",
    tech: [
      "Next.js 14",
      "TypeScript",
      "Turso / LibSQL",
      "Supabase",
      "SQLite FTS5",
      "Gemini API",
      "Zod",
      "SSE",
      "LaTeX",
    ],
    metrics: {
      scoring_latency: "<5ms",
      ats_modules: "15 modules (3,100+ LOC)",
      taxonomy_terms: "400+ synonyms",
      etl_records: "10,000+",
      turso_instances: "6 isolated DBs",
    },
    links: {
      live: "https://clavis.app",
      github: "https://github.com/Srajan-21/clavis",
    },
    cover_url: null,
    level: 5,
    sort_order: 3,
    published: true,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2026-10-31T00:00:00Z",
  },
  {
    id: "proj-4",
    slug: "hudle-payments",
    title: "Hudle Production Payment & Routing Engine",
    tagline: "Mission-critical payment reconciliation and deep-linking architecture at Hudle.",
    description_md:
      "Hardened Juspay webhook lifecycles using cryptographic signature verification, idempotency tracking, and atomic DB transaction syncing (99.5%+ reconciliation reliability). Resolved production GoRouter deep-link redirect loops and back-stack anomalies. Validated platform and convenience fee algorithms across tiered cart values with 100% pricing accuracy.",
    tech: ["Dart", "GoRouter", "Juspay SDK", "PostgreSQL", "Webhooks", "Transaction Idempotency"],
    metrics: {
      reconciliation_reliability: "99.5%+",
      pricing_accuracy: "100%",
      payment_lifecycle: "Zero-leakage",
    },
    links: {
      company: "https://hudle.in",
    },
    cover_url: null,
    level: 6,
    sort_order: 4,
    published: true,
    created_at: "2026-08-01T00:00:00Z",
    updated_at: "2026-10-31T00:00:00Z",
  },
];

export const SEED_ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    title: "Crack-a-Code 3.0 Bronze Trophy",
    description:
      "Secured 3rd place out of 50+ engineering teams at Nagarro's 24-hour national hackathon for food waste prevention.",
    date: "April 2024",
    stamp_variant: "trophy",
    image_url: null,
    created_at: "2024-04-11T00:00:00Z",
  },
  {
    id: "ach-2",
    title: "President, Octave BPIT",
    description:
      "Promoted to President of BPIT's official music society; spearheaded 60+ members and organized multiple college competitions.",
    date: "2025 - 2026",
    stamp_variant: "music",
    image_url: null,
    created_at: "2025-08-01T00:00:00Z",
  },
  {
    id: "ach-3",
    title: "Tourphin SIH Selection",
    description:
      "Smart India Hackathon qualifying project connecting local guides with global tourists.",
    date: "2023",
    stamp_variant: "tour",
    image_url: null,
    created_at: "2023-11-01T00:00:00Z",
  },
  {
    id: "ach-4",
    title: "LeetCode Scoreboard Master",
    description:
      "Cracked 300+ algorithmic problems across arrays, trees, dynamic programming, and graphs (Handle: SRAJAN 9839).",
    date: "2024 - 2026",
    stamp_variant: "dsa",
    image_url: null,
    created_at: "2024-06-01T00:00:00Z",
  },
];

export const SEED_SKILLS: Skill[] = [
  // Languages
  { id: "sk-1", name: "TypeScript", category: "Languages", proficiency: 95, used_in_project_ids: ["clavis", "tourphin"], icon: "typescript", sort_order: 1 },
  { id: "sk-2", name: "JavaScript (ES6+)", category: "Languages", proficiency: 92, used_in_project_ids: ["tourphin", "clavis"], icon: "javascript", sort_order: 2 },
  { id: "sk-3", name: "C++", category: "Languages", proficiency: 88, used_in_project_ids: ["leetcode"], icon: "cpp", sort_order: 3 },
  { id: "sk-4", name: "SQL", category: "Languages", proficiency: 90, used_in_project_ids: ["clavis", "tourphin", "hudle-payments"], icon: "sql", sort_order: 4 },

  // Backend
  { id: "sk-5", name: "Next.js 14 (App Router)", category: "Backend", proficiency: 95, used_in_project_ids: ["clavis"], icon: "nextjs", sort_order: 5 },
  { id: "sk-6", name: "Node.js & Express", category: "Backend", proficiency: 90, used_in_project_ids: ["tourphin", "clavis"], icon: "nodejs", sort_order: 6 },
  { id: "sk-7", name: "REST & Server-Sent Events (SSE)", category: "Backend", proficiency: 92, used_in_project_ids: ["clavis"], icon: "sse", sort_order: 7 },
  { id: "sk-8", name: "Zod Schema Validation", category: "Backend", proficiency: 94, used_in_project_ids: ["clavis"], icon: "zod", sort_order: 8 },

  // Databases & Search
  { id: "sk-9", name: "PostgreSQL", category: "Databases & Search", proficiency: 92, used_in_project_ids: ["tourphin", "hudle-payments"], icon: "postgresql", sort_order: 9 },
  { id: "sk-10", name: "Supabase (Auth, Realtime, DB)", category: "Databases & Search", proficiency: 94, used_in_project_ids: ["tourphin", "clavis"], icon: "supabase", sort_order: 10 },
  { id: "sk-11", name: "Turso & LibSQL", category: "Databases & Search", proficiency: 90, used_in_project_ids: ["clavis"], icon: "turso", sort_order: 11 },
  { id: "sk-12", name: "SQLite FTS5 Full-Text Search", category: "Databases & Search", proficiency: 88, used_in_project_ids: ["clavis"], icon: "sqlite", sort_order: 12 },

  // Frontend
  { id: "sk-13", name: "React 19 / 18", category: "Frontend", proficiency: 94, used_in_project_ids: ["tourphin", "clavis"], icon: "react", sort_order: 13 },
  { id: "sk-14", name: "Tailwind CSS", category: "Frontend", proficiency: 96, used_in_project_ids: ["tourphin", "clavis"], icon: "tailwind", sort_order: 14 },
  { id: "sk-15", name: "Framer Motion & GSAP", category: "Frontend", proficiency: 88, used_in_project_ids: ["portfolio"], icon: "animation", sort_order: 15 },

  // Cloud & DevOps
  { id: "sk-16", name: "AWS S3 & CloudFront", category: "Cloud & DevOps", proficiency: 86, used_in_project_ids: ["tourphin"], icon: "aws", sort_order: 16 },
  { id: "sk-17", name: "Razorpay & Juspay Integration", category: "Cloud & DevOps", proficiency: 90, used_in_project_ids: ["tourphin", "hudle-payments"], icon: "payment", sort_order: 17 },
  { id: "sk-18", name: "Git & GitHub Actions", category: "Cloud & DevOps", proficiency: 92, used_in_project_ids: ["clavis", "tourphin"], icon: "git", sort_order: 18 },

  // System Design & AI
  { id: "sk-19", name: "Zero-LLM ATS Engines", category: "System Design & AI", proficiency: 96, used_in_project_ids: ["clavis"], icon: "ats", sort_order: 19 },
  { id: "sk-20", name: "Multi-Key LLM Gateway Design", category: "System Design & AI", proficiency: 94, used_in_project_ids: ["clavis"], icon: "ai-gateway", sort_order: 20 },
  { id: "sk-21", name: "Gemini API Integration", category: "System Design & AI", proficiency: 92, used_in_project_ids: ["clavis", "tourphin"], icon: "gemini", sort_order: 21 },
  { id: "sk-22", name: "Webhook Idempotency & Reconciliation", category: "System Design & AI", proficiency: 92, used_in_project_ids: ["hudle-payments"], icon: "webhook", sort_order: 22 },

  // Core CS
  { id: "sk-23", name: "Data Structures & Algorithms", category: "Core CS", proficiency: 90, used_in_project_ids: ["leetcode"], icon: "dsa", sort_order: 23 },
  { id: "sk-24", name: "Object-Oriented Design", category: "Core CS", proficiency: 92, used_in_project_ids: ["clavis"], icon: "ood", sort_order: 24 },
  { id: "sk-25", name: "Database Indexing & Normalization", category: "Core CS", proficiency: 90, used_in_project_ids: ["tourphin", "clavis"], icon: "db-design", sort_order: 25 },
];

export const SEED_SETTINGS: SiteSettings = {
  currently: {
    building: "CLAVIS startup launch",
    listening: "Electric guitar blues & prog rock",
    reading: "High-Performance Browser Networking",
    location: "New Delhi, India",
  },
  availability: {
    status: "Open to Software Engineering & Full Stack Roles",
    isOpen: true,
  },
  resume: {
    url: "/resume/Srajan_Srivastava_Resume.pdf",
    filename: "Srajan_Srivastava_Resume.pdf",
    updated_at: "2026-10-31",
  },
  contact_info: {
    email: "srivasrajan8@gmail.com",
    phone: "+91 7007968745",
    github: "https://github.com/Srajan-21",
    linkedin: "https://linkedin.com/in/srajan-srivastava",
    leetcode: "https://leetcode.com/u/SRAJAN 9839",
    location: "New Delhi, India",
  },
};
