"use client";

import { useEffect, useRef, useState } from "react";

interface UserMenuProps {
  userLabel: string;
  onLogout: () => Promise<void> | void;
  isLoggingOut: boolean;
}

export function UserMenu({ userLabel, onLogout, isLoggingOut }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[20px] font-medium text-[#111827] transition hover:bg-[#f2f5f6]"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="max-w-[220px] truncate">{userLabel}</span>
        <ChevronDownIcon />
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+8px)] z-30 min-w-[140px] rounded-xl border border-[#d7e2e6] bg-white p-2 shadow-[0_10px_30px_rgba(15,23,42,0.15)]">
          <button
            type="button"
            onClick={async () => {
              setOpen(false);
              await onLogout();
            }}
            disabled={isLoggingOut}
            className="w-full rounded-lg px-3 py-2 text-left text-base text-[#1f2937] transition hover:bg-[#f2f5f6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-[#374151]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
