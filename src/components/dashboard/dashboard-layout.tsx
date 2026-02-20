"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  useAuthenticationStatus,
  useHasuraClaims,
  useSignOut,
  useUserData,
} from "@nhost/react";
import { usePathname, useRouter } from "next/navigation";
import { getRoleFromHasuraClaims, getUserRole } from "@/lib/auth/get-user-role";
import { LOGIN_ROUTE, UNAUTHORIZED_ROUTE } from "@/lib/auth/routes";
import { IconRail, type DashboardRailTab } from "./icon-rail";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

function resolveActiveRailTab(pathname: string): DashboardRailTab {
  if (pathname.startsWith("/dashboard/reservations")) {
    return "reservations";
  }

  if (pathname.startsWith("/dashboard/team")) {
    return "team";
  }

  return "home";
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserData();
  const hasuraClaims = useHasuraClaims();
  const roleFromClaims = getRoleFromHasuraClaims(hasuraClaims);
  const roleFromUser = user ? getUserRole(user) : null;
  const role = roleFromClaims ?? roleFromUser;
  const { isAuthenticated, isLoading: isStatusLoading } = useAuthenticationStatus();
  const { signOut } = useSignOut();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [claimsWaitElapsed, setClaimsWaitElapsed] = useState(false);

  const activeTab = useMemo(() => resolveActiveRailTab(pathname), [pathname]);

  useEffect(() => {
    if (!isAuthenticated || roleFromClaims) {
      setClaimsWaitElapsed(false);
      return;
    }

    const timer = setTimeout(() => setClaimsWaitElapsed(true), 1200);
    return () => clearTimeout(timer);
  }, [isAuthenticated, roleFromClaims]);

  const isRoleResolved = Boolean(
    roleFromClaims ||
      (roleFromUser && roleFromUser !== "user") ||
      (claimsWaitElapsed && roleFromUser),
  );

  useEffect(() => {
    if (isStatusLoading) {
      return;
    }

    if (!isAuthenticated) {
      const nextParam = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`${LOGIN_ROUTE}${nextParam}`);
      return;
    }

    if (!isRoleResolved) {
      return;
    }

    if (role !== "admin") {
      router.replace(UNAUTHORIZED_ROUTE);
    }
  }, [isAuthenticated, isRoleResolved, isStatusLoading, pathname, role, router]);

  const onLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
    setIsLoggingOut(false);
    router.replace(LOGIN_ROUTE);
  };

  if (isStatusLoading || (isAuthenticated && !isRoleResolved)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f5f6]">
        <div className="rounded-xl border border-[#d7e2e6] bg-white px-5 py-3 text-sm text-[#5a6670]">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!isAuthenticated || role !== "admin") {
    return null;
  }

  const userLabel = user?.displayName?.trim() || user?.email || "Admin";

  return (
    <div className="min-h-screen bg-[#f3f5f6]">
      <div className="flex min-h-screen">
        <IconRail activeTab={activeTab} />
        <Sidebar activeTab={activeTab} pathname={pathname} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar userLabel={userLabel} onLogout={onLogout} isLoggingOut={isLoggingOut} />
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
