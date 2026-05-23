"use client";

import { useDrawer } from "@/components/ui/DrawerContext";
import { copy } from "@/lib/copy";

export default function Engage() {
  const { open } = useDrawer();

  return (
    <section
      data-stage="engage"
      className="relative flex h-stage w-full items-center justify-center bg-ink-900 px-6"
    >
      <div className="max-w-3xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-ink-100/40">
          {copy.engage.label}
        </p>
        <h2 className="font-serif text-4xl tracking-tight text-ink-50 sm:text-6xl">
          {copy.engage.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-balance text-ink-100/70">{copy.engage.body}</p>
        <button
          type="button"
          onClick={open}
          className="mt-10 inline-flex items-center justify-center rounded-sm border border-brass-500/60 px-8 py-3 text-sm uppercase tracking-[0.25em] text-brass-400 transition-colors hover:bg-brass-500/10"
        >
          {copy.engage.cta}
        </button>
      </div>
    </section>
  );
}
