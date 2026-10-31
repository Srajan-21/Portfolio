"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ADMIN_EMAIL } from "@/lib/auth";
import { KeyRound, Mail, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { soundEngine } from "@/lib/sound";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMagicLink, setIsMagicLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    soundEngine.playClick();

    try {
      if (isMagicLink) {
        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });
        if (error) throw error;
        setSuccessMsg("Magic link dispatched! Check your inbox.");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;

        if (data.user?.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
          setErrorMsg("Access restricted to editor allowlist (srivasrajan8@gmail.com).");
          await supabase.auth.signOut();
          return;
        }

        soundEngine.playStamp();
        router.push("/admin");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2EBDD] p-4 font-serif text-[#1B1A17] selection:bg-[#D9432B] selection:text-[#F2EBDD] dark:bg-[#181512] dark:text-[#EBE3D3]">
      <div className="paper-grain pointer-events-none fixed inset-0 opacity-20" />

      {/* Editor's Desk Dossier Card */}
      <div className="relative z-10 w-full max-w-md rounded border-2 border-[#1B1A17] bg-[#FBF8F1] p-6 shadow-[6px_6px_0px_0px_#1B1A17] sm:p-8 dark:border-[#EBE3D3] dark:bg-[#24201A] dark:shadow-[6px_6px_0px_0px_#EBE3D3]">
        {/* Top Confidential Stamp */}
        <div className="mb-4 flex items-center justify-between border-b border-[#D3C4A5] pb-3 font-mono text-[11px] uppercase tracking-wider text-[#837B6D] dark:border-[#3A3328] dark:text-[#7E7565]">
          <span>JOURNAL // EDITORS DESK</span>
          <span className="font-bold text-[#D9432B] dark:text-[#E55840]">RESTRICTED</span>
        </div>

        <h1 className="font-display text-2xl font-black uppercase tracking-tight text-[#1B1A17] sm:text-3xl dark:text-[#EBE3D3]">
          Editor Access
        </h1>
        <p className="mt-1 font-serif text-sm italic text-[#4B463E] dark:text-[#B2A896]">
          Sign in to modify timeline chapters, manage live projects, moderate guestbook notes, and upload fresh resumes.
        </p>

        {/* Error / Success Alerts */}
        {errorMsg && (
          <div className="mt-4 flex items-center gap-2 rounded border border-[#D9432B] bg-[#D9432B]/10 p-3 font-mono text-xs text-[#D9432B]">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mt-4 flex items-center gap-2 rounded border border-[#7A8B6F] bg-[#7A8B6F]/10 p-3 font-mono text-xs text-[#7A8B6F] dark:text-[#92A585]">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSignIn} className="mt-6 space-y-4">
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1B1A17] dark:text-[#EBE3D3]">
              Admin Email
            </label>
            <div className="relative mt-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#837B6D]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="srivasrajan8@gmail.com"
                className="w-full rounded border border-[#1B1A17] bg-[#F2EBDD] py-2 pl-9 pr-3 font-mono text-sm text-[#1B1A17] focus:border-[#D9432B] focus:outline-none dark:border-[#EBE3D3] dark:bg-[#181512] dark:text-[#EBE3D3]"
              />
            </div>
          </div>

          {!isMagicLink && (
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#1B1A17] dark:text-[#EBE3D3]">
                Password
              </label>
              <div className="relative mt-1">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#837B6D]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded border border-[#1B1A17] bg-[#F2EBDD] py-2 pl-9 pr-3 font-mono text-sm text-[#1B1A17] focus:border-[#D9432B] focus:outline-none dark:border-[#EBE3D3] dark:bg-[#181512] dark:text-[#EBE3D3]"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs font-mono">
            <button
              type="button"
              onClick={() => setIsMagicLink(!isMagicLink)}
              className="text-[#D9432B] underline hover:opacity-80 dark:text-[#E55840]"
            >
              {isMagicLink ? "Use Password Instead" : "Send Magic Link via Email"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded border-2 border-[#1B1A17] bg-[#D9432B] py-3 font-mono text-xs font-black uppercase tracking-widest text-[#F2EBDD] shadow-[3px_3px_0px_0px_#1B1A17] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1B1A17] disabled:opacity-60 dark:border-[#EBE3D3] dark:shadow-[3px_3px_0px_0px_#EBE3D3]"
          >
            <span>{loading ? "Authenticating..." : isMagicLink ? "Dispatch Magic Link" : "Unlock Desk"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 border-t border-[#D3C4A5] pt-3 text-center font-mono text-[10px] text-[#837B6D] dark:border-[#3A3328] dark:text-[#7E7565]">
          <a href="/" className="hover:text-[#1B1A17] underline dark:hover:text-[#EBE3D3]">
            &larr; Return to Journal Front Cover
          </a>
        </div>
      </div>
    </div>
  );
}
