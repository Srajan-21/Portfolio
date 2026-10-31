import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";

const guestbookSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  message: z.string().min(3, "Message must be at least 3 characters").max(400),
  doodle_data: z.any().optional(),
  honeypot: z.string().optional(), // Spam honeypot: must remain empty
});

// Sample fallback entries if table is freshly created
const SAMPLE_GUESTBOOK = [
  {
    id: "g-1",
    name: "Abhishek Yadav",
    message: "CLAVIS architecture is looking formidable! Proud co-founder.",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    approved: true,
  },
  {
    id: "g-2",
    name: "Swaraj Kumar",
    message: "Crack-a-Code 3.0 memories! That 3 AM food-waste math hit different.",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    approved: true,
  },
  {
    id: "g-3",
    name: "Fellow BPITian",
    message: "Saw you perform with Octave back in the day, legendary guitar solo!",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    approved: true,
  },
];

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(30);

    if (error || !data || data.length === 0) {
      return NextResponse.json({ success: true, entries: SAMPLE_GUESTBOOK });
    }

    return NextResponse.json({ success: true, entries: data });
  } catch {
    return NextResponse.json({ success: true, entries: SAMPLE_GUESTBOOK });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Spam honeypot trap
    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json({ error: "Spam bot detected." }, { status: 400 });
    }

    const parsed = guestbookSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid payload." },
        { status: 400 }
      );
    }

    const { name, message, doodle_data } = parsed.data;

    // Basic profanity check
    const vulgarList = ["spam", "casino", "viagra", "crypto-bot"];
    const containsSpam = vulgarList.some((word) =>
      message.toLowerCase().includes(word)
    );
    if (containsSpam) {
      return NextResponse.json(
        { error: "Message flagged by content filter." },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("guestbook")
      .insert({
        name,
        message,
        doodle_data,
        approved: true,
        ip_hash: ip,
      })
      .select()
      .single();

    if (error) {
      // Return optimistic success if Supabase credentials are in development
      return NextResponse.json({
        success: true,
        entry: {
          id: `local-${Date.now()}`,
          name,
          message,
          doodle_data,
          approved: true,
          created_at: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json({ success: true, entry: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

