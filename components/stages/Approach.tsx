"use client";

import { useWebGL } from "@/components/three/WebGLContext";

function Poster() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,oklch(0.18_0.012_75/_0.6)_0%,oklch(0.08_0.005_260)_60%)]"
    />
  );
}

export default function Approach() {
  const verdict = useWebGL();
  const showPoster = verdict === null || !verdict.ok;

  return (
    <section
      data-stage="approach"
      className="relative h-stage w-full overflow-hidden"
    >
      {showPoster && <Poster />}
    </section>
  );
}
