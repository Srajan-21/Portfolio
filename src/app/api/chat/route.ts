import { NextRequest, NextResponse } from "next/server";
import { SEED_TIMELINE, SEED_PROJECTS, SEED_SKILLS, SEED_SETTINGS } from "@/lib/supabase/seed-data";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Empty query" }, { status: 400 });
    }

    const query = message.toLowerCase().trim();

    // Check navigation intent
    let action: string | null = null;
    if (query.includes("tourphin") || query.includes("travel")) {
      action = "level-3";
    } else if (query.includes("nagarro") || query.includes("hackathon") || query.includes("waste")) {
      action = "level-4";
    } else if (query.includes("clavis") || query.includes("ats") || query.includes("startup")) {
      action = "level-5";
    } else if (query.includes("hudle") || query.includes("juspay") || query.includes("intern")) {
      action = "level-6";
    } else if (query.includes("skill") || query.includes("stack") || query.includes("typescript")) {
      action = "level-7";
    } else if (query.includes("hire") || query.includes("contact") || query.includes("resume") || query.includes("email")) {
      action = "level-8";
    }

    // Check if Gemini API Key is configured
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey && geminiKey.trim().length > 10) {
      try {
        const prompt = `You are Srajan's AI field journal assistant. Answer questions truthfully and concisely using ONLY these facts about Srajan Srivastava:
- Education: BPIT Delhi, B.Tech IT, joined 9 Nov 2022.
- Music & Leadership: President & Head of Octave BPIT (managing 60+ members), started as 1st sem guitarist, won multiple inter-college battles.
- Career path: Coforge selection, faced rejections at Amazon and GoComet final rounds, committed to DSA grind (300+ LeetCode problems on handle SRAJAN 9839), cracked Hudle.
- Tourphin: Travel platform connecting users with local guides, live at https://tourphin-eight.vercel.app/. 35% query optimization, 99% Razorpay success.
- Crack-a-Code 3.0: 3rd place among 50+ teams by Nagarro with teammates Abhishek Yadav and Swaraj Kumar for food waste portion sizing.
- CLAVIS: Startup co-founded with Abhishek, Swaraj, Hemant, Saurabh. Architected Zero-LLM ATS scoring (<5ms) and multi-key LLM gateway.
- Hudle: Intern in New Delhi (08/2026-present), Juspay webhook reconciliation (99.5%+ reliability), GoRouter navigation fixes.
- Contact: srivasrajan8@gmail.com, +91 7007968745.

User question: "${message}"
Answer directly in first-person as Srajan's journal assistant in 2-3 sentences. Do not hallucinate.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const replyText =
            data.candidates?.[0]?.content?.parts?.[0]?.text || null;
          if (replyText) {
            return NextResponse.json({
              reply: replyText.trim(),
              action,
            });
          }
        }
      } catch {
        // Fallback to deterministic neural knowledge base below
      }
    }

    // High-speed Deterministic Knowledge Retrieval Engine
    let reply =
      "I'm Srajan's journal assistant. I can tell you about his work at Hudle, his startup CLAVIS, Tourphin, his hackathon victories, or his music leadership at Octave BPIT!";

    if (query.includes("clavis") || query.includes("ats")) {
      reply =
        "CLAVIS is an intelligent job portal & ATS platform Srajan co-founded. He architected a 15-module Zero-LLM ATS engine that grades resumes in under 5ms, plus a fault-tolerant multi-key AI gateway.";
    } else if (query.includes("tourphin") || query.includes("travel")) {
      reply =
        "Tourphin was born out of the Smart India Hackathon. Srajan built it with React, Supabase, and Razorpay to connect travelers directly with authentic local guides. You can test the live demo at tourphin-eight.vercel.app!";
    } else if (query.includes("hudle") || query.includes("intern") || query.includes("juspay")) {
      reply =
        "At Hudle (New Delhi, 08/2026–Present), Srajan hardened Juspay payment webhook lifecycles with idempotency tracking to achieve 99.5%+ reconciliation reliability, and resolved critical GoRouter deep-link loops in production.";
    } else if (query.includes("hackathon") || query.includes("nagarro") || query.includes("waste")) {
      reply =
        "At Nagarro's Crack-a-Code 3.0, Srajan and teammates Abhishek Yadav & Swaraj Kumar won 3rd place out of 50+ teams by engineering NutriPortion—a dynamic satiety algorithm that predicts meal size based on previous intake to eliminate food waste.";
    } else if (query.includes("music") || query.includes("guitar") || query.includes("octave")) {
      reply =
        "Srajan joined Octave (BPIT's official music society) in his first semester as an electric guitarist. He won multiple battle-of-the-bands trophies, rose to Coordinator, and served as President & Head managing 60+ members!";
    } else if (query.includes("dsa") || query.includes("leetcode") || query.includes("rejection")) {
      reply =
        "After placement offer delays at Coforge and final-round eliminations at GoComet & Amazon, Srajan dedicated himself to daily algorithmic discipline—solving 300+ LeetCode problems (handle SRAJAN 9839) before earning his role at Hudle.";
    } else if (query.includes("hire") || query.includes("contact") || query.includes("email") || query.includes("phone")) {
      reply =
        "Srajan is currently open to Software Engineering and Full Stack roles! You can reach him at srivasrajan8@gmail.com or +91 7007968745, or download his verified resume in Level 8.";
    } else if (query.includes("skills") || query.includes("stack") || query.includes("tech")) {
      reply =
        "Srajan's core stack includes TypeScript, Next.js 14, React, Node.js, PostgreSQL, Supabase, Turso/LibSQL, Zod, and AWS, backed by strong DSA problem solving in C++.";
    }

    return NextResponse.json({ reply, action });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
