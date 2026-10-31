import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const country = req.headers.get("x-vercel-ip-country") || "Unknown";
    const supabase = createServerClient();

    // Track download in resume_downloads table
    try {
      await supabase.from("resume_downloads").insert({ country });
    } catch {}

    // Fetch dynamic resume url from site_settings
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "resume")
      .single();

    const resumeUrl =
      data?.value?.url || "/resume/Srajan_Srivastava_Resume.pdf";

    return NextResponse.redirect(new URL(resumeUrl, req.url));
  } catch {
    return NextResponse.redirect(
      new URL("/resume/Srajan_Srivastava_Resume.pdf", req.url)
    );
  }
}
