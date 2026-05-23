"use client";

import dynamic from "next/dynamic";

const StageRenderer = dynamic(() => import("@/components/three/StageRenderer"), {
  ssr: false,
});

export default function LazyStageRenderer() {
  return <StageRenderer />;
}
