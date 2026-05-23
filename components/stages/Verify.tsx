import LazyVerifyThumbnail from "@/components/three/LazyVerifyThumbnail";
import { copy } from "@/lib/copy";

export default function Verify() {
  return (
    <section
      data-stage="verify"
      className="relative flex h-stage w-full items-center bg-ink-950 px-6"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-12 gap-10">
        <div className="col-span-12 space-y-6 md:col-span-7">
          <p className="text-sm uppercase tracking-[0.3em] text-ink-100/40">
            {copy.verify.label}
          </p>
          <h2 className="font-serif text-3xl tracking-tight text-ink-50 sm:text-5xl">
            {copy.verify.headline}
          </h2>
          <div className="space-y-4 text-ink-100/75">
            {copy.verify.body.map((paragraph) => (
              <p key={paragraph} className="text-balance text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 md:col-start-9">
          <LazyVerifyThumbnail />
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-ink-100/35">
            Placeholder scan
          </p>
        </div>
      </div>
    </section>
  );
}
