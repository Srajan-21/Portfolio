import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { session_id, path, level_reached, device, referrer, duration } = body;

    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      "Unknown";

    const supabase = createServerClient();
    try {
      await supabase.from("analytics_events").insert({
        session_id: session_id || "anon",
        path: path || "/",
        level_reached: level_reached || 0,
        country,
        device: device || "Desktop",
        referrer: referrer || "Direct",
        duration: duration || 0,
      });
    } catch {}

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
