import type { ReactNode } from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f7f6] lg:grid lg:grid-cols-[1.15fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-[#0d1612] lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(18,52,30,0.22),transparent_40%),radial-gradient(circle_at_80%_78%,rgba(15,42,25,0.25),transparent_45%)]" />
        <div className="absolute -left-12 bottom-14 h-60 w-60 rounded-full bg-[#12341e]/15 blur-[100px]" />
        <div className="absolute right-0 top-8 h-72 w-72 rounded-full bg-[#1a4d2e]/12 blur-[120px]" />
        <div className="relative z-10 m-auto w-full max-w-[950px] px-12 py-14">
          <div className="mb-2 inline-block rounded-full border border-[#1a4d2e]/40 bg-[#12341e]/30 px-3 py-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#4d9963]">
              Restaurant Builder
            </p>
          </div>
          <h2 className="mt-2 max-w-xl text-2xl font-semibold leading-snug tracking-tight text-white/95">
            One dashboard to manage orders, teams, and growth.
          </h2>
          <div className="mt-7 overflow-hidden rounded-2xl border border-[#1a3d28]/60 bg-[#0a1410]/85 p-3.5 shadow-[0_20px_55px_rgba(8,20,14,0.7)]">
            <Image
              src="/images/dashboard-preview.svg"
              alt="Restaurant dashboard preview"
              width={1600}
              height={1200}
              priority
              className="h-auto w-full rounded-xl"
            />
          </div>
        </div>
      </aside>

      <section className="relative flex min-h-screen items-center bg-[radial-gradient(circle_at_75%_10%,#ffffff,transparent_35%),radial-gradient(circle_at_30%_95%,#e5ebe8,transparent_40%)] px-6 py-10 sm:px-10 lg:px-12">
        <div className="pointer-events-none absolute left-6 top-6 h-16 w-16 rounded-full border border-white/50 bg-white/25 blur-sm" />
        <div className="pointer-events-none absolute bottom-14 right-10 h-32 w-32 rounded-full bg-[#12341e]/6 blur-2xl" />
        <div className="relative mx-auto w-full max-w-[480px] rounded-[24px] border border-white/70 bg-white/90 p-7 shadow-[0_20px_50px_rgba(20,45,32,0.11)] backdrop-blur-sm sm:p-10">
          <div className="mb-6 overflow-hidden rounded-xl border border-[#d9e6dd]/80 bg-[#0d1612] p-2 shadow-md lg:hidden">
            <Image
              src="/images/dashboard-preview.svg"
              alt="Restaurant dashboard preview"
              width={1280}
              height={720}
              className="h-auto w-full rounded-lg"
            />
          </div>

          <h1 className="text-[26px] font-semibold leading-tight tracking-tight text-ink">
            {title}
          </h1>
          <p className="mt-1.5 text-sm font-medium text-[#5f6d78]">
            {subtitle}
          </p>
          <div className="mt-7">{children}</div>
        </div>
      </section>
    </div>
  );
}
