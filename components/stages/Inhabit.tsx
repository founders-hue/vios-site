import { copy } from "@/lib/copy";

export default function Inhabit() {
  return (
    <section
      data-stage="inhabit"
      className="relative flex h-stage w-full items-center justify-center px-6"
    >
      <div className="max-w-3xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-ink-100/40">
          {copy.inhabit.label}
        </p>
        <h2 className="font-serif text-4xl tracking-tight text-ink-50 sm:text-6xl">
          {copy.inhabit.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-balance text-ink-100/70">{copy.inhabit.body}</p>
      </div>
    </section>
  );
}
