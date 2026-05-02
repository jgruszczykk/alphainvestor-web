"use client";

import { useState, useTransition } from "react";

type FormState =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function EarlyAccessForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  const disabled = isPending || state.status === "success";

  function onSubmit(formData: FormData) {
    const email = String(formData.get("email") ?? "");
    const name = String(formData.get("name") ?? "");

    startTransition(async () => {
      setState({ status: "pending" });
      try {
        const res = await fetch("/api/early-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name: name || undefined }),
        });

        const data = (await res.json()) as {
          ok?: boolean;
          message?: string;
          error?: string;
        };

        if (res.status === 503) {
          setState({
            status: "error",
            message:
              data.error ??
              "Signups are not available yet. Please try again later.",
          });
          return;
        }

        if (!res.ok) {
          setState({
            status: "error",
            message:
              data.error ?? "Something went wrong. Please try again.",
          });
          return;
        }

        setState({
          status: "success",
          message: data.message ?? "Thanks — we will be in touch.",
        });
      } catch {
        setState({
          status: "error",
          message: "Network error. Please check your connection and retry.",
        });
      }
    });
  }

  return (
    <form
      action={onSubmit}
      className="flex w-full max-w-md flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80"
    >
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Request early access
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Leave your email and we will notify you when spots open.
        </p>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        Email
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          disabled={disabled}
          placeholder="you@company.com"
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base font-normal text-zinc-900 outline-none ring-zinc-400/40 placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        Name{" "}
        <span className="font-normal text-zinc-500 dark:text-zinc-500">
          (optional)
        </span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          maxLength={120}
          disabled={disabled}
          placeholder="Ada Lovelace"
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base font-normal text-zinc-900 outline-none ring-zinc-400/40 placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500"
        />
      </label>

      <button
        type="submit"
        disabled={disabled}
        className="mt-1 inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      >
        {isPending ? "Submitting…" : "Join the waitlist"}
      </button>

      {state.status === "success" ? (
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          {state.message}
        </p>
      ) : null}
      {state.status === "error" ? (
        <p className="text-sm font-medium text-red-700 dark:text-red-400">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
