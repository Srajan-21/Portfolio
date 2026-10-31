"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ADMIN_EMAIL } from "@/lib/auth";
import { KeyRound, Mail, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";

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
    <div className="flex min-h-screen items-center justify-center bg-[#F6F1E7] p-6 text-[#14110F]">
      <div className="w-full max-w-md rounded border border-[#6F665A]/25 bg-[#FAF7F2] p-8 shadow-sm">
        {/* Top Restricted Tag */}
        <div className="mb-4 flex items-center justify-between border-b border-[#6F665A]/15 pb-3 font-mono text-[10px] uppercase tracking-wider text-[#6F665A]">
          <span>MONOGRAPH // CURATOR ACCESS</span>
          <span className="font-semibold text-[#8C6B3A]">RESTRICTED</span>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-light text-[#14110F]">
          Curator Portal
        </h1>
        <p className="mt-1 font-serif text-sm text-[#6F665A]">
          Sign in to manage the resume dossier, update teammate profiles, and moderate guestbook entries.
        </p>

        {/* Alerts */}
        {errorMsg && (
          <div className="mt-4 flex items-center gap-2 rounded border border-[#6B1E1E]/30 bg-[#6B1E1E]/5 p-3 font-mono text-xs text-[#6B1E1E]">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mt-4 flex items-center gap-2 rounded border border-[#B08D57]/40 bg-[#EDE5D3]/40 p-3 font-mono text-xs text-[#8C6B3A]">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSignIn} className="mt-6 space-y-4 font-mono text-xs">
          <div>
            <label className="block font-medium text-[#14110F] text-[11px] uppercase tracking-wider">
              Admin Email
            </label>
            <div className="relative mt-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6F665A]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="srivasrajan8@gmail.com"
                className="w-full rounded border border-[#6F665A]/20 bg-[#F6F1E7] py-2.5 pl-9 pr-3 text-[#14110F] focus:border-[#B08D57] focus:outline-none"
              />
            </div>
          </div>

          {!isMagicLink && (
            <div>
              <label className="block font-medium text-[#14110F] text-[11px] uppercase tracking-wider">
                Password
              </label>
              <div className="relative mt-1">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6F665A]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded border border-[#6F665A]/20 bg-[#F6F1E7] py-2.5 pl-9 pr-3 text-[#14110F] focus:border-[#B08D57] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setIsMagicLink(!isMagicLink)}
              className="text-[10px] text-[#6F665A] hover:underline"
            >
              {isMagicLink ? "Switch to password sign in" : "Sign in via magic link"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded border border-[#B08D57] bg-[#EDE5D3] py-2.5 font-mono text-xs uppercase tracking-wider text-[#14110F] hover:bg-[#FAF7F2] transition-colors disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : isMagicLink ? "Send Magic Link" : "Sign In to Desk"}</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#B08D57]" />
          </button>
        </form>
      </div>
    </div>
  );
}
