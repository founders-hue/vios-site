"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { probeWebGL, type WebGLVerdict } from "@/lib/webgl-probe";

const ApproachScene = dynamic(() => import("@/components/three/ApproachScene"), {
  ssr: false,
  loading: () => <Poster />,
});

function Poster() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,oklch(0.18_0.012_75/_0.6)_0%,oklch(0.08_0.005_260)_60%)]"
    />
  );
}

export default function Approach() {
  const [verdict, setVerdict] = useState<WebGLVerdict | null>(null);

  useEffect(() => {
    setVerdict(probeWebGL());
  }, []);

  return (
    <section
      data-stage="approach"
      className="relative h-stage w-full overflow-hidden bg-ink-950"
    >
      {verdict === null || !verdict.ok ? <Poster /> : <ApproachScene />}
    </section>
  );
}
