import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const fallbackStats = {
    username: "SRAJAN 9839",
    totalSolved: 304,
    easySolved: 115,
    mediumSolved: 165,
    hardSolved: 24,
    acceptanceRate: 89.2,
    ranking: 142050,
    streak: 68,
    fetched_at: new Date().toISOString(),
  };

  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("stats_cache")
      .select("payload, fetched_at")
      .eq("key", "leetcode")
      .single();

    if (data?.payload) {
      return NextResponse.json({ success: true, stats: data.payload });
    }
  } catch {}

  return NextResponse.json({ success: true, stats: fallbackStats });
}

