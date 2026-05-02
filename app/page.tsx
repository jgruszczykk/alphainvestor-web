import Link from "next/link";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.18),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.25),transparent)]" />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Alpha Investor
        </span>
        <Link
          href="/privacy"
          className="text-sm text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Privacy
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center px-6 pb-20 pt-10 sm:px-10 sm:pt-16">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 text-center sm:gap-12">
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Early access
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
              Clarity for your portfolio, before the market moves.
            </h1>
            <p className="text-balance text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
              Alpha Investor helps you see positions, context, and risk in one
              place—built for serious investors who want less noise and more
              signal.
            </p>
          </div>

          <EarlyAccessForm />

          <p className="max-w-md text-xs text-zinc-500 dark:text-zinc-500">
            By joining, you agree we may email you about the product. See{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              Privacy
            </Link>
            .
          </p>
        </div>
      </main>

      <footer className="relative z-10 mt-auto border-t border-zinc-200/80 px-6 py-6 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        © {new Date().getFullYear()} Alpha Investor. All rights reserved.
      </footer>
    </div>
  );
}
