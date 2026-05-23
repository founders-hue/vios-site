"use client";

import dynamic from "next/dynamic";

const VerifyThumbnail = dynamic(() => import("@/components/three/VerifyThumbnail"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="aspect-square w-full rounded-sm border border-ink-100/10 bg-ink-900/40"
    />
  ),
});

export default function LazyVerifyThumbnail() {
  return <VerifyThumbnail />;
}
