import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const fallbackStats = {
    username: "Srajan-21",
    publicRepos: 18,
    totalStars: 42,
    topLanguages: ["TypeScript", "JavaScript", "C++", "SQL"],
    contributionsThisYear: 840,
    fetched_at: new Date().toISOString(),
  };

  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("stats_cache")
      .select("payload, fetched_at")
      .eq("key", "github")
      .single();

    if (data?.payload) {
      return NextResponse.json({ success: true, stats: data.payload });
    }
  } catch {}

  return NextResponse.json({ success: true, stats: fallbackStats });
}
