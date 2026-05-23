export default function HomePage() {
  return (
    <main>
      <section className="flex h-stage items-center justify-center">
        <h1 className="font-serif text-5xl tracking-tight text-ink-50 sm:text-7xl">
          VIOS Group
        </h1>
      </section>

      <section className="flex h-stage items-center justify-center bg-ink-900">
        <p className="max-w-xl text-balance text-center text-ink-100/80">
          Immersive Intelligence for luxury real estate.
        </p>
      </section>

      <section className="flex h-stage items-center justify-center">
        <p className="text-sm uppercase tracking-[0.3em] text-ink-100/50">
          Scroll to continue
        </p>
      </section>

      <section className="flex h-stage items-center justify-center bg-ink-900">
        <p className="text-sm uppercase tracking-[0.3em] text-ink-100/50">End of placeholder</p>
      </section>
    </main>
  );
}
