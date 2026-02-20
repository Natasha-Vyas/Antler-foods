"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useAuthenticationStatus } from "@nhost/react";
import { usePathname, useRouter } from "next/navigation";
import { LOGIN_ROUTE } from "@/lib/auth/routes";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const nextParam = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`${LOGIN_ROUTE}${nextParam}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7f8]">
        <div className="rounded-xl border border-[#d7e2e5] bg-white px-5 py-3 text-sm text-[#55616a]">
          Authenticating...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
