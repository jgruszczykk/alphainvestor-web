import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notice for Alpha Investor early access.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col gap-8 px-6 py-16 sm:px-8">
      <Link
        href="/"
        className="text-sm text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Back home
      </Link>
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Privacy
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          This page is a placeholder. Before you collect real emails, replace
          this copy with your full privacy policy (data controller, purposes,
          retention, rights, subprocessors, and contact).
        </p>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Early access signups are processed on the server and stored with our
          email provider (Resend Contacts) for waitlist management only.
        </p>
      </div>
    </div>
  );
}
