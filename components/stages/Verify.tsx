import { copy } from "@/lib/copy";

export default function Verify() {
  return (
    <section
      data-stage="verify"
      className="relative flex h-stage w-full items-center justify-center bg-ink-950 px-6"
    >
      <div className="max-w-3xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-ink-100/40">
          {copy.verify.label}
        </p>
        <h2 className="font-serif text-4xl tracking-tight text-ink-50 sm:text-6xl">
          {copy.verify.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-balance text-ink-100/70">{copy.verify.body}</p>
      </div>
    </section>
  );
}
