"use client";

import Link from "next/link";
import { useState } from "react";
import { useSignOut, useUserData } from "@nhost/react";
import { getUserRole } from "@/lib/auth/get-user-role";
import { ROLE_DASHBOARD_ROUTES } from "@/lib/auth/routes";

export default function DashboardPage() {
  const user = useUserData();
  const role = getUserRole(user);
  const { signOut } = useSignOut();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const onSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    setIsSigningOut(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f7f8] p-6 sm:p-10">
      <div className="mx-auto max-w-5xl rounded-2xl border border-[#d7e2e5] bg-white p-8 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold text-ink">Dashboard Placeholder</h1>
          <button
            type="button"
            onClick={onSignOut}
            disabled={isSigningOut}
            className="rounded-lg border border-[#d7e2e5] px-4 py-2 text-sm font-medium text-[#4f5a63] transition hover:border-[#c4d1d6] hover:bg-[#f5f8f9] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSigningOut ? "Signing out..." : "Sign out"}
          </button>
        </div>

        <div className="mt-8 grid gap-4 rounded-xl border border-[#d7e2e5] bg-[#f8fafb] p-5 sm:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-wide text-[#73818b]">User Email</p>
            <p className="mt-1 text-lg font-medium text-[#1c2730]">
              {user?.email ?? "No authenticated user"}
            </p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-[#73818b]">Detected Role</p>
            <p className="mt-1 text-lg font-medium text-[#1c2730]">{role}</p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <p className="text-sm uppercase tracking-wide text-[#73818b]">
            Role Dashboard Structure
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={ROLE_DASHBOARD_ROUTES.admin}
              className="rounded-lg border border-[#d7e2e5] px-3 py-2 text-sm text-[#4f5a63] hover:bg-[#f5f8f9]"
            >
              Admin Dashboard
            </Link>
            <Link
              href={ROLE_DASHBOARD_ROUTES.manager}
              className="rounded-lg border border-[#d7e2e5] px-3 py-2 text-sm text-[#4f5a63] hover:bg-[#f5f8f9]"
            >
              Manager Dashboard
            </Link>
            <Link
              href={ROLE_DASHBOARD_ROUTES.client}
              className="rounded-lg border border-[#d7e2e5] px-3 py-2 text-sm text-[#4f5a63] hover:bg-[#f5f8f9]"
            >
              Client Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
