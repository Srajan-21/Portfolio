# Srajan Srivastava — The Player's Journal Portfolio

> An interactive field journal and game world charting Srajan Srivastava's software engineering journey from day zero at BPIT Delhi to production at Hudle.

---

## 🎮 Concept: The Living Field Journal

The site is built as a living field journal where each chapter is a level unlocked as the reader-player scrolls through the manuscript:

- **Level 0: Cover Screen** &mdash; Misregistered risograph display typography with an interactive SVG paper-tear intro and hidden Konami code.
- **Level 1: Origins (2022)** &mdash; Matriculation at BPIT Delhi (B.Tech IT) and electric guitar leadership in Octave Music Society (from 1st sem guitarist to 6th sem President managing 60+ members).
- **Level 2: The Grind** &mdash; Coforge placement limbo, final-round heartbreaks at GoComet and Amazon, daily algorithmic comeback with 300+ LeetCode problems (`@SRAJAN 9839`), and an interactive Two Pointers trace visualizer.
- **Level 3: First Build &bull; Tourphin** &mdash; Travel and tour booking platform connecting travelers with verified local guides (`https://tourphin-eight.vercel.app/`). Features RBAC, 35% query optimization via composite indexing, and 99% Razorpay webhook verification.
- **Level 4: Boss Fight &bull; Crack-a-Code 3.0** &mdash; 3rd place out of 50+ teams at Nagarro's national hackathon. Built NutriPortion with teammates Abhishek Yadav and Swaraj Kumar for source-level food waste prevention. Features dynamic HP bar, hit flash, and trophy stamp slam.
- **Level 5: The Magnum Opus &bull; CLAVIS** &mdash; Intelligent Job Portal & ATS Platform. Co-founded with Abhishek, Swaraj, Hemant, and Saurabh. Features 4 interactive subsystem machines (fault-tolerant multi-key LLM gateway, sub-5ms Zero-LLM ATS scoring engine, concurrent ETL pipeline, and ARIA typewriter diff).
- **Level 6: The Real World &bull; Hudle (08/2026 &ndash; Present)** &mdash; Production arena in New Delhi: Juspay webhook lifecycle hardening with idempotency keys (99.5%+ reconciliation reliability), GoRouter deep-link defect resolution, and tiered cart fee calculation.
- **Level 7: The Player's Inventory** &mdash; 25 collectible battle artifacts across 7 categories with 3D tilt hover cards.
- **Final Level: Player 2 (You)** &mdash; Realtime guestbook with HTML5 canvas ink doodle pad, contact desk, and dynamic resume download.
- **Ask Srajan's AI** &mdash; Floating archival assistant that answers questions and triggers page navigation.
- **Editor's Desk (`/admin`)** &mdash; Confidential admin portal to update the live resume PDF, toggle hiring availability, and inspect transmissions.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 / Turbopack (App Router, React 19)
- **Language**: TypeScript Strict
- **Database & Realtime**: Supabase (PostgreSQL, Realtime subscriptions, Row-Level Security)
- **Styling**: Tailwind CSS v4, Custom CSS Variables, SVG feTurbulence Paper Grain Filter
- **Typography**: Fraunces (Display), Newsreader (Editorial Serif), JetBrains Mono (Game UI), Caveat (Marginalia)
- **Animation & Physics**: Framer Motion, Canvas Confetti, Web Audio API Sound Synthesizer
- **Testing**: Built-in Node test runner (`node:test`)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Srajan-21/Portfolio.git
cd Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env.local` and fill in your Supabase credentials:
```bash
cp .env.example .env.local
```

### 4. Run database migrations (optional if connecting to remote Supabase)
Run the SQL files in `supabase/migrations/20261031_init.sql` and `supabase/seed.sql` in your Supabase SQL editor.

### 5. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the journal.

### 6. Run tests & production build
```bash
npm test
npm run build
```

---

## 📬 Contact Coordinates

- **Email**: [srivasrajan8@gmail.com](mailto:srivasrajan8@gmail.com)
- **Phone**: +91 7007968745
- **LinkedIn**: [linkedin.com/in/srajan-srivastava](https://linkedin.com/in/srajan-srivastava)
- **GitHub**: [github.com/Srajan-21](https://github.com/Srajan-21)
- **LeetCode**: [leetcode.com/u/SRAJAN 9839](https://leetcode.com/u/SRAJAN%209839)
