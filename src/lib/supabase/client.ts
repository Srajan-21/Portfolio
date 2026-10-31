import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lxlkvpxbgsgxwenjufry.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4bGt2cHhiZ3NneHdlbmp1ZnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0NDUwMDYsImV4cCI6MjEwOTAyMTAwNn0.cxbJFb6vod1aVNuxzMROJPRixwAuJ_vUYQIOqE7bI5s";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

