import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  email: z.string().email("Invalid email address"),
  subject: z.string().max(100).optional(),
  message: z.string().min(5, "Message must be at least 5 characters").max(2000),
  honeypot: z.string().optional(),
});

// Simple sliding window rate limit cache in memory
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // Rate limiting: 5 messages per 10 minutes per IP
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (entry && entry.expiresAt > now) {
      if (entry.count >= 5) {
        return NextResponse.json(
          { error: "Rate limit reached. Please wait a few minutes before resending." },
          { status: 429 }
        );
      }
      entry.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, expiresAt: now + 600000 });
    }

    const body = await req.json();

    // Honeypot trap for bots
    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json({ error: "Spam bot rejected." }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid contact input." },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    const supabase = createServerClient();
    const { data, error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject: subject || "Portfolio Dispatch",
      message,
      status: "unread",
      ip_hash: ip,
    });

    // Optional webhook forwarder for real-time mobile ping
    const webhookUrl = process.env.DISCORD_OR_TELEGRAM_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith("http")) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `📬 **New Portfolio Transmission from ${name}** (${email}):\n"${message}"`,
          }),
        });
      } catch {}
    }

    return NextResponse.json({
      success: true,
      message: "Transmission delivered directly to Srajan's inbox.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

