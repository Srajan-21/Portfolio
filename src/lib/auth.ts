import { supabase } from "./supabase/client";

export const ADMIN_EMAIL = "srivasrajan8@gmail.com";

export async function checkIsAdmin(): Promise<{ isAdmin: boolean; email?: string | null }> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user?.email) {
      return { isAdmin: false };
    }

    const email = session.user.email.toLowerCase();
    // Allow owner email or admin flag
    if (email === ADMIN_EMAIL.toLowerCase()) {
      return { isAdmin: true, email };
    }

    return { isAdmin: false, email };
  } catch {
    return { isAdmin: false };
  }
}
